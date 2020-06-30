import sklearn
import pandas as pd
import sqlite3
import json
import csv
import os
from sqlalchemy import create_engine
# from api.category import stores
# from category import stores
import pickle


DATA_DIR = "./data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DATA_FILE2 = os.path.join(DATA_DIR, "lifestyle.pickle")

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
    "id", # 메뉴 고유번호 
    "store_id",  # 음식점 고유번호 (FK)
    "menu_name",  # 메뉴 이름
    "price",  # 메뉴 가격
)

hour_colums = (
    "id", # 시간테이블 고유번호
    "oper_type",  # 영업시간 종류
    "week_type",  # 주단위 종류
    "store_id",  # 음식점 고유번호
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
    "id", # 리뷰 고유번호
    "num",  # 리뷰 실제번호
    "store_id",  # 음식점 고유번호
    "user_id",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "reg_time",  # 리뷰 등록 시간
)

user_colums = (
    "id", # 유저 고유번호
    # "num",  # 유저 실제번호
    "gender",  # 성별
    "born_year"  # 태어난 해
)



def import_data(data_path=DATA_FILE):
    try:
        with open(data_path, encoding="utf-8") as f:
                data = json.loads(f.read())
    except FileNotFoundError as e:
            print(f"`{data_path}` 가 존재하지 않습니다.")
            exit(1)

    stores = []  # 음식점 테이블
    menus = []  # 메뉴 테이블
    hours = []  # 음식점 시간 테이블
    reviews = []  # 리뷰 테이블
    users = []  # 유저 테이블

    idx = 0
    idx2 = 0
    idx3 = 0
    idx4 = 0

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
                d["review_cnt"],
            ]
        )

        for menu in d["menu_list"]:
            idx += 1
            menus.append(
                [str(idx), d["id"], menu["menu"], menu["price"]]
            )
        
        for hour in d["bhour_list"]:
            idx2 += 1
            hours.append(
                [   str(idx2),
                    hour["type"], hour["week_type"], d["id"],
                    hour["mon"], hour["tue"], hour["wed"], hour["thu"],
                    hour["fri"], hour["sat"], hour["sun"],
                    hour["start_time"], hour["end_time"], hour["etc"]
                ]
            )
  
        for review in d["review_list"]:
            idx3 += 1
            # idx4 += 1

            r = review["review_info"]
            u = review["writer_info"]

            reviews.append(
                [int(idx3), r["id"], d["id"], u["id"], r["score"], r["content"], r["reg_time"]]
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



engine = create_engine("mysql+pymysql://root:"+"scarletpassword"+"@i02a205.p.ssafy.io:3306/deploydb?charset=utf8mb4")
# engine = create_engine("mysql+pymysql://root:"+"scarletpassword"+"@127.0.0.1:3306/deploydb?charset=utf8mb4")
conn = engine.connect()
data = import_data()
category = ["stores", "menus", "hours",  "users", "reviews"]
table = ["api_store", "api_menu", "api_hour", "api_review_user", "api_review"]
for i in range(0, 5):
   df = data[category[i]]
   df.to_sql(name=table[i], con=engine, if_exists='append', index=False)


# 이건 데이터프레임 자체 형식임 주의
f = open("./data/lifestylegroup4.pickle", "rb", "utf-8") # 배포 때문에 "utf-8", 중복제거 파일로 insert
lifestylegroup = pickle.load(f) 
f.close()
lifestylegroup.rename(columns = {'store' : 'store_id'}, inplace = True)

#table =  ["api_lifestyle"]
df = lifestylegroup
df.to_sql(name="api_lifestyle", con=engine, if_exists='append', index=False)


# df = data["reviews"]
# print(df.head())
# print("=====")
# df.to_sql(name='api_review', con=engine, if_exists='append', index=False)

conn.close()
