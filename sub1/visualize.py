import itertools
from collections import Counter
from parse import load_dataframes
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
from datetime import datetime as dt
import folium


def set_config():
    # 폰트, 그래프 색상 설정
    font_list = fm.findSystemFonts(fontpaths=None, fontext="ttf")
    if any(["notosanscjk" in font.lower() for font in font_list]):
        plt.rcParams["font.family"] = "Noto Sans CJK JP"
    else:
        if not any(["malgun" in font.lower() for font in font_list]):
            raise Exception(
                "Font missing, please install Noto Sans CJK or Malgun Gothic. If you're using ubuntu, try `sudo apt install fonts-noto-cjk`"
            )

        plt.rcParams["font.family"] = "Malgun Gothic"

    sns.set_palette(sns.color_palette("Spectral"))
    plt.rc("xtick", labelsize=6)


def show_store_categories_graph(dataframes, n=100):
    """
    Tutorial: 전체 음식점의 상위 `n`개 카테고리 분포를 그래프로 나타냅니다.
    """

    stores = dataframes["stores"]

    # 모든 카테고리를 1차원 리스트에 저장합니다
    categories = stores.category.apply(lambda c: c.split("|"))
    categories = itertools.chain.from_iterable(categories)

    # 카테고리가 없는 경우 / 상위 카테고리를 추출합니다
    categories = filter(lambda c: c != "", categories)
    categories_count = Counter(list(categories))
    best_categories = categories_count.most_common(n=n)
    df = pd.DataFrame(best_categories, columns=["category", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="category", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 카테고리 분포")
    plt.show()


def show_store_review_distribution_graph(dataframes,n=100):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    # 음식점 정보를 가지고와서
    stores = dataframes["stores"]

    # review_cnt가 많은 순으로 보이기
    df = pd.DataFrame(stores, columns=["store_name", "review_cnt"]).sort_values(
        by=["review_cnt"], ascending=False
    )

    # 100개만 사용(용량이 너무 크기때문)
    store_data = df.head(n=n)

    # 음식점 정보 중 review_cnt를 가지고 그래프에 나타냄
    chart = sns.barplot(x="store_name", y="review_cnt", data=store_data)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)  # rotation: x축 라벨 45도회전
    plt.title("음식점 리뷰 갯수 분포")
    plt.show()


def show_store_average_ratings_graph(dataframes, n=100):
    """
    Req. 1-3-2 각 음식점의 평균 평점을 그래프로 나타냅니다.
    """
    # 음식점 table + 리뷰 table
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    # 평균 평점 기준 높은 평점 음식점 순으로 정렬
    scores_group = stores_reviews.groupby(["store", "store_name"]).mean()
    scores = scores_group.groupby(["store_name"]).mean().sort_values(by=["score"], ascending=False).reset_index()
        #.reset_index()를 안붙이니까 store_name이 index로 가서 store_name열에 NaN으로 나옴

    # 리뷰 개수가 min_reviews 미만 음식점 제외 -> 리뷰 수가 1개인데 5.0인 경우 너무 많다
    scores = scores[scores["review_cnt"]>=10]
    
    # score평균을 낸 table 기준으로 score가 높은 순으로 보이기
    df = pd.DataFrame(scores, columns=["store_name","score"])

    # 100개만 사용
    store_data = df.head(n=n)

    # 음식점 정보 중 score를 가지고 그래프에 나타냄
    chart = sns.barplot(x="store_name", y="score", data=store_data)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점별 score 분포")
    plt.show()

# analyze의 4번 문항 해결하고 오자!!!!!!

def show_user_review_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """

    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], left_on="id", right_on="user"
    )

    users_reviews["cnt"] = 1
    # print(users_reviews.head())
    
    user_group = users_reviews.groupby('user').cnt.sum().to_frame()
    split_by_user = user_group.sort_values(by=["cnt"],ascending=False)

    # 100개만 사용
    split_by_user = split_by_user.head(n=n).reset_index()
    # print(user_group_data.head())

    # 음식점 정보 중 score를 가지고 그래프에 나타냄
    chart = sns.barplot(x="user", y="cnt", data=split_by_user)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("전체 유저의 리뷰 개수 분포")
    plt.show()


def show_user_age_gender_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    # 유저 table 가지고오기
    users = dataframes["users"]  # 성별: 남, 여, 나이대: 태어난해
    # 중복 삭제
    users = users.drop_duplicates(["id"], keep='first')
    
    # 1. 나이대 지정하기
    # 1-1. 나이 표현하기(현재년도-born_year+1해서 나이 계산)
    now = dt.now()
    this_year = now.strftime('%Y')
    this_year = int(this_year)
    users["born_year"] = users["born_year"].astype(int)
    users["age"] = this_year - users["born_year"] + 1  # int
    # print(users.head(n=50))
    
    # # 1-2. 나이대 분류 (ex. 31,28과 같은 숫자로 나이대 구분)
    # # 이렇게 하면 맨 처음나오는 사람의 나이대가 처음부터 끝까지 작성됨
    # def classify_age(data):
    #     for a in data["age"]:
    #         if 10 <= a < 20:
    #             return "10대"
            
    #         elif 20 <= a < 30:
    #             return "20대"

    #         elif 30 <= a < 40:
    #             return "30대"

    #         elif 40 <= a < 50:
    #             return "40대" 

    #         elif 50 <= a:
    #             return "50대 이상"

    # users["age_category"] = classify_age(users)

    # 1-2. 나이대 분류 (cut함수 이용)
    
    bins = [0, 19, 29, 39, 59, 100]
    bins_names = ["20세미만","20대","30대","4-50대","60세이상"]

    users["age_category"] = pd.cut(users["age"], bins, labels=bins_names)
    print(users.head(n=20))

    # 2. 그래프 그리기 x=나이대, y=성별
    df = pd.DataFrame(users, columns=["gender","age_category"])
    # # print(df.head(n=5))
    # # 2-1. 나이대별로 그룹짓기
    sum_by_age_male = users[users['gender']=="남"].groupby("age_category").age.count()
    sum_by_age_female = users[users['gender']=="여"].groupby("age_category").age.count()
    # print(sum_by_age_male.head())
    # print('---------------------------------------')
    # print(sum_by_age_female.head())

    # # 2-2-1. 나이대 및 성별 기준 그래프그리기(x축 나이대, 하나의 나이대에 두줄로 남, 여 표시)
    index = np.arange(5)
    bar_width = 0.35
    alpha = 0.5
    p1 = plt.bar(index, sum_by_age_male, bar_width,color="b", alpha=alpha,label="남")
    p2 = plt.bar(index+bar_width, sum_by_age_female, bar_width,color="r", alpha=alpha,label="여")

    plt.title("나이대 및 성별 기준 그래프")
    labels=["20세미만","20대","30대","4-50대","60세이상"]
    plt.xticks(index, labels)
    plt.legend((p1[0], p2[0]), ('남', '여'), fontsize=15)
    plt.show()

    # 2-2-2. 나이대 및 성별 기준 그래프그리기(x축 나이대, 하나의 나이대에 남, 여 쌓기)
    labels=["20세미만","20대","30대","4-50대","60세이상"]
    index = np.arange(5)
    alpha = 0.5

    p11 = plt.bar(index, sum_by_age_male,color="b", alpha=alpha)
    p22 = plt.bar(index, sum_by_age_female,color="r",
                alpha=alpha,bottom=sum_by_age_male)

    plt.title("나이대 및 성별 기준 그래프")
    labels=["20세미만","20대","30대","4-50대","60세이상"]
    plt.xticks(index, labels)
    plt.legend((p11[0], p22[0]), ('남', '여'), fontsize=15)
    plt.show()


def show_stores_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    stores = dataframes["stores"]
    
    # 위치 분포 지정
    '''
    <지도에 나타내는건지 모르고..>
    1. 특별시 기준으로 나눴을때 어쨋든 큰단위를 기준으로함. 
        sum_by_address = stores.groupby("address_data").sum() 이거로하니까 412개 나오는데 주소입력이 제각각이라 아예 area해서 거기서 구분해서 구단위 등으로 하는게 나을듯
    '''

    # 1. 가게이름, 위도, 경도를 가지고 지도에 표시
    stores = stores[["store_name", "latitude", "longitude", "review_cnt"]].sort_values(
        by=["review_cnt"], ascending=False
    ).reset_index()
    
    stores = stores.head(n=50)

    # 2. 지도 시각화
    map = folium.Map(location=[37.5642135,127.0016985], zoom_start=12)

    # 3. 지도에 리뷰갯수 상위 50개 표시
    for store in stores.index:
        lati = stores.loc[store, "latitude"]
        longi = stores.loc[store, "longitude"]

        folium.Marker([lati, longi],
                    popup=stores.loc[store,"store_name"],
                    icon=folium.Icon(color='red',icon='star')
                    ).add_to(map)
    map.save('map.html')



def main():
    set_config()
    data = load_dataframes()
    show_store_categories_graph(data)

    # 1-3-1
    show_store_review_distribution_graph(data)

    # 1-3-2
    show_store_average_ratings_graph(data)

    # 1-3-3
    show_user_review_distribution_graph(data)

    # 1-3-4 
    show_user_age_gender_distribution_graph(data)

    # 1-3-5 
    show_stores_distribution_graph(data)


if __name__ == "__main__":
    main()

