from parse import load_dataframes
import pandas as pd
import shutil


def sort_stores_by_score(dataframes, n=30, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """

    # stores 테이블의 id와 reviews테이블의 store번호가 동일하게 병합
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    
    # null 값을 평균값으로 채워줌
    scores_group = stores_reviews.groupby(["store", "store_name"]).mean()
    
    # 평균 평점 기준 높은 평점 음식점 순으로 정렬
    scores = scores_group.groupby(["store_name"]).mean().sort_values(by=["score"], ascending=False)
    
    # 리뷰 개수가 min_reviews 미만 음식점 제외
    # 굳이 astype(float)로 바꿀 필요가 없다 -> why? json은 int는 int대로,string은 string대로 인식하기때문
    scores = scores[scores["review_cnt"]>=30]

    # reset_index(): 인덱스 리셋 -> 새로운 단순한 정수 인덱스 세팅
    # reset_index() 작성하지 않으면 결과 보여줄 때, 인덱스가 아예 존재하지 않음
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
    # users와 reviews를 병합
    # 이때 users_reviews가 아닌 reviews_users로 병합하면 똑같은 리뷰가 엄청 여러개 나옴 why??????????????????    
    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], left_on="id", right_on="user"
    )

    users_reviews["cnt"] = 1
    # print(users_reviews.head())
    
    user_group = users_reviews.groupby('user').cnt.sum().to_frame()
    split_by_user = user_group.sort_values(by=["cnt"],ascending=False)

    return split_by_user.head(n=n).reset_index()


def main():
    data = load_dataframes()
    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    # 음식점 평점 순 출력, 최소리뷰 개수 필터링
    stores_most_scored = sort_stores_by_score(data)

    print("[최고 평점 음식점]")
    print(f"{separater}\n")
    for i, store in stores_most_scored.iterrows():
        print(
            "{rank}위: {store}({score}점)".format(
                rank=i + 1, store=store.store_name, score=store.score
            )
        )
    print(f"\n{separater}\n\n")


    # 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬
    stores_most_review = get_most_reviewed_stores(data)

    print("[가장 많은 리뷰를 받은 음식점]")
    print(f"{separater}\n")
    print(stores_most_review)


    # 가장 많은 리뷰를 작성한 `n`개의 유저를 정렬
    users_most_review = get_most_active_users(data)

    print("[가장 많은 리뷰를 작성한 유저]")
    print(f"{separater}\n")
    print(users_most_review)



if __name__ == "__main__":
    main()
