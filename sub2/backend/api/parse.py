import json
import csv
import pandas as pd
import os
import shutil

DATA_DIR = "../data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

store_columns = (
    "id",  # 음식점 고유번호
    "store_name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "area",  # 음식점 위치
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "latitude",  # 음식점 위도  # 위치기반 음식점 추천할 때 사용
    "longitude",  # 음식점 경도  # 위치기반 음식점 추천할 때 사용
    "category",  # 음식점 카테고리
    "review_cnt",  # 리뷰 갯수
)

menu_colums = (
    "store",  # 음식점 고유번호
    "menu",  # 메뉴 이름
    "price",  # 메뉴 가격
)

hour_colums = (
    "type",  # 영업시간 종류
    "week_type",  # 주단위 종류
    "store",  # 음식점 고유번호
    "mon",  # 월요일 포함유무
    "tue",  # 화요일 포함유무
    "wed",  # 수요일 포함유무
    "thu",  # 목요일 포함유무
    "fri",  # 금요일 포함유무
    "sat",  # 토요일 포함유무
    "sun",  # 일요일 포함유무
    "start_time",  # 시작시간
    "end_time",  # 종료시간
    "etc",  # 기타
)

review_columns = (
    "id",  # 리뷰 고유번호
    "store",  # 음식점 고유번호
    "user",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "reg_time",  # 리뷰 등록 시간
)

user_colums = (
    "id",  # 유저 고유번호
    "gender",  # 성별
    "born_year"  # 태어난 해
)


def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """
    

    try:
        with open(data_path, encoding="utf-8") as f:
            data = json.loads(f.read())
    except FileNotFoundError:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    stores = []  # 음식점 테이블
    menus = []  # 메뉴 테이블
    hours = []  # 음식점 시간 테이블
    reviews = []  # 리뷰 테이블
    users = []  # 유저 테이블

    for d in data:

        categories = [c["category"] for c in d["category_list"]]
        # review_cnt = 
        stores.append(
            [
                d["id"],
                d["name"],
                d["branch"],
                d["area"],
                d["tel"],
                d["address"],
                d["latitude"],
                d["longitude"],
                "|".join(categories),
                d["review_cnt"]
            ]
        )
  
        for menu in d["menu_list"]:
            menus.append(
                [d["id"], menu["menu"], menu["price"]]
            )
        
        for hour in d["bhour_list"]:
            hours.append(
                [
                    hour["type"], hour["week_type"], d["id"],
                    hour["mon"], hour["tue"], hour["wed"], hour["thu"],
                    hour["fri"], hour["sat"], hour["sun"],
                    hour["start_time"], hour["end_time"], hour["etc"]
                ]
            )
  
        for review in d["review_list"]:
            r = review["review_info"]
            u = review["writer_info"]

            reviews.append(
                [r["id"], d["id"], u["id"], r["score"], r["content"], r["reg_time"]]
            )

            users.append(
                [u["id"], u["gender"], u["born_year"]]
            )

    store_frame = pd.DataFrame(data=stores, columns=store_columns)
    menu_frame = pd.DataFrame(data=menus, columns=menu_colums)
    hour_frame = pd.DataFrame(data=hours, columns=hour_colums)
    review_frame = pd.DataFrame(data=reviews, columns=review_columns)
    user_frame = pd.DataFrame(data=users, columns=user_colums)
    user_frame = user_frame.drop_duplicates()

    return {"stores": store_frame, "menus": menu_frame, "hours": hour_frame,
            "reviews": review_frame, "users": user_frame}


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes():
    return pd.read_pickle(DUMP_FILE)



def main():

    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print("[메뉴]")
    print(f"{separater}\n")
    print(data["menus"].head())
    print(f"\n{separater}\n\n")

    print("[영업시간]")
    print(f"{separater}\n")
    print(data["hours"].head())
    print(f"\n{separater}\n\n")

    print("[리뷰]")
    print(f"{separater}\n")
    print(data["reviews"].head())
    print(f"\n{separater}\n\n")

    print("[유저]")
    print(f"{separater}\n")
    print(data["users"].head())
    print(f"\n{separater}\n\n")


    # print(data)


if __name__ == "__main__":
    main()
    
print('---------------------------------------------------------------------------------------------------------')

  