import itertools
from collections import Counter
from api.parse import load_dataframes
#from api.category import stores
import pandas as pd
from datetime import datetime as dt
import shutil


def sort_stores_by_score(dataframes, n=30, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    scores_group = stores_reviews.groupby(["store", "store_name"]).mean()
    scores = scores_group.groupby(["store_name"]).mean().sort_values(by=["score"], ascending=False)
    scores = scores[scores["review_cnt"]>=30]
    return scores.head(n=n).reset_index()


def get_most_reviewed_stores(dataframes, n=20):
    """
    Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다
    """
    stores_hours = pd.merge(
        dataframes["stores"], dataframes["hours"], left_on="id", right_on="store"
    )
    reviews_group = stores_hours.groupby(['store_name', 'store']).mean()
    # 리뷰 수 기준으로 정렬
    review_cnt = reviews_group.groupby(["store_name"]).mean().sort_values(by=["review_cnt"], ascending=False)
    return review_cnt.head(n=n).reset_index()


def get_most_active_users(dataframes, n=100):
    """
    Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.
    """  
    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], left_on="id", right_on="user"
    )

    users_reviews["cnt"] = 1
    user_group = users_reviews.groupby('user').cnt.sum().to_frame()
    split_by_user = user_group.sort_values(by=["cnt"],ascending=False)
    return split_by_user.head(n=n).reset_index()


def score_by_gender(dataframes, n=60):
    '''
    Req2-1. 평점 높은순으로 음식점 보여주는데 성별로 구분(남, 여)
    '''
    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], left_on="id", right_on="user"
    )
    # stores는 user랑 review랑 결과 다 낸다음에 해당하는 store만 붙여야할것같다
    male =  users_reviews[users_reviews['gender']=="남"]
    female = users_reviews[users_reviews['gender']=="여"]

    # 결측값 없고 0이 존재 -> (44785, 19) vs (44781, 19) -> 0인거 제거
    male = male[male.score != 0]
    female = female[female.score != 0]
    # 남자 집단별 평균 + 평균 평점 기준 높은 평점 음식점 순으로 정렬
    male = male.groupby('store').mean()
    male = male.sort_values(by=["score"], ascending=False)
    # 여자
    female = female.groupby('store').mean()
    female = female.sort_values(by=["score"], ascending=False)
    
    # store랑 합치기
    # 남자
    mstore = pd.merge(male, dataframes['stores'], left_on='store', right_on='id')
    mstore = mstore[mstore["review_cnt"]>=15] # 리뷰 개수가 min_reviews 미만 음식점 제외
    # 여자
    fstore = pd.merge(female, dataframes['stores'], left_on='store', right_on='id')
    fstore = fstore[fstore["review_cnt"]>=15] # 리뷰 개수가 min_reviews 미만 음식점 제외

    return mstore[['store_name', 'score']].head(n=n)


def score_by_age(dataframes, age_num, n=60):
    # 가중치 두려면 store데이터 필요
    '''
    Req2-2. 평점 높은순으로 음식점 보여주는데 나이대에 따라 구분
    '''
    users = dataframes["users"]

    # 1. 나이대 지정하기
    now = dt.now()
    this_year = now.strftime('%Y')
    this_year = int(this_year)
    users["born_year"] = users["born_year"].astype(int)
    users["age"] = this_year - users["born_year"] + 1

    bins = [0, 19, 29, 39, 49, 59, 100]
    # bins_names = ["20세미만","20대","30대","40대","50대","60세이상"]
    bins_names = [1, 2, 3, 4, 5 ,6]
    users["age_category"] = pd.cut(users["age"], bins, labels=bins_names)

    users_reviews = pd.merge(
        users, dataframes["reviews"], left_on="id", right_on="user"
    )

    # 나이대별로 구분
    people = users_reviews[users_reviews['age_category']==age_num]

    # 결측값 없고 0이 존재 -> (44785, 19) vs (44781, 19) -> 0인거 제거
    people = people[people.score != 0]
    # 집단별 평균 + 평균 평점 기준 높은 평점 음식점 순으로 정렬
    people = people.groupby('store').mean()
    # people = people.sort_values(by=["score"], ascending=False)
    
    # store랑 합치기
    pstore = pd.merge(people, dataframes['stores'], left_on='store', right_on='id')
    pstore = pstore[pstore["review_cnt"]>=5] # 리뷰 개수가 min_reviews 미만 음식점 제외  5.0 두개나옴

    # 500위 정도로 들어오게 하려면 vote_count가 상위 몇 %이어야 할까요?
    # 이는 quantile을 이용해서 구할 수 있습니다.
    m = pstore['review_cnt'].quantile(0.9)  # 1838.4000000000015
    pstore = pstore.loc[pstore['review_cnt'] >= m]

    C = pstore['score'].mean()
    
    # review_cnt 따른 score 가중치
    def weighted_rating(x, m=m, C=C):
        v = x['review_cnt']
        R = x['score']
        
        return ( v / (v+m) * R ) + (m / (m + v) * C)

    pstore['weight_score'] = pstore.apply(weighted_rating, axis = 1)
    # return pstore[['store_name', 'score']].head(n=n)
    # return pstore[['score', 'weight_score']].head()
    pstore = pstore.sort_values(by=["score"], ascending=False)
    
    return pstore[['score', 'weight_score']].head()

def score_by_area(dataframes, area_name, n=60):
    # 지역별 갯수가 200개 넘는것들이 많이 없어서 가중치 필요안할듯
    '''
    Req2-4. 평점 높은순으로 음식점 보여주는데 지역별로 구분해서 보여주기
    '''
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    
    # area별로 나눔
    areas = stores_reviews[stores_reviews['area']==area_name]
    
    # 결측값 없고 0이 존재 -> (44785, 19) vs (44781, 19) -> 0인거 제거
    areas = areas[areas.score != 0]
    # area별 평균 + 평균 평점 기준 높은 평점 음식점 순으로 정렬
    areas = areas.groupby('store').mean()
    areas = areas.sort_values(by=["score"], ascending=False)
    areas = areas[areas["review_cnt"]>=5] # 리뷰 개수가 min_reviews 미만 음식점 제외
    return areas.head(n=n)



# 카테고리별 음식점 평점 높은 순으로 가중치 둬서 구분하기
def score_by_category(dataframes, cate, n=50):
    stores = dataframes["stores"]

    stores = stores[stores["big_cate"] == cate]
    
    # 점수없는 애들 제외
    stores = stores[stores.score != 0]
    stores = stores.groupby('store').mean()
    
    stores = stores[stores["review_cnt"]>=30]
    m = stores['review_cnt'].quantile(0.8)
    C = stores['score'].mean()
    
    # review_cnt 따른 score 가중치
    def weighted_rating(stores, m=m, C=C):
        v = stores['review_cnt']
        R = stores['score']
        
        return ( v / (v+m) * R ) + (m / (m + v) * C)

    stores['weight_score'] = stores.apply(weighted_rating, axis = 1)
    stores = stores.sort_values(by=["weight_score"], ascending=False)
    
    return stores.head(n=n)






def main():
    data = load_dataframes()
    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print(data)
    

    # # #
    # print(get_most_reviewed_stores(data))
    # print("지역별로 평점 높은 곳 배열")
    # print(score_by_area(data, "홍대"))


    # # 2-2. 평점 높은순으로 음식점 보여주기 (나이대별로)
    # stores_most_score_by_age = score_by_age(data, 3)  # 1~6중에 하나 고르기

    # print("[평점 높은순으로 음식점 보여주는데 나이대에 따라 구분]")
    # print(f"{separater}\n")
    # print(stores_most_score_by_age)


    # # 2-5. 평점 높은순으로 음식점 보여주기 (지역 카테고리별)
    # stores_most_score_by_area = score_by_area(data, '홍대')

    # print("[평점 높은순으로 음식점 보여주는데 지역별로 구분]")
    # print(f"{separater}\n")
    # print(stores_most_score_by_area)
    
    # # # 2-5. 평점 높은순으로 음식점 보여주기 (음식 카테고리별)
    # most_score_by_category = score_by_category(data, "한식")
    # print(f"{separater}\n")
    # print(most_score_by_category)


if __name__ == "__main__":
    main()
    
