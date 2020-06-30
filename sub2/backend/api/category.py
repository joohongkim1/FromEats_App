import itertools
# from parse import load_dataframes
from api.parse import load_dataframes
from collections import Counter
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel 
import seaborn as sns
import csv
import json
import shutil
import os


# data = load_dataframes()

# term_w = shutil.get_terminal_size()[0] - 1
# separater = "-" * term_w

DATA_DIR = "./data"
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


def import_store(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """
    
    data = []  # 음식점 테이블
    with open('./data/store.csv') as f:
        for row in csv.DictReader(f):
            data.append(row)

    stores = json.dumps(data)

    stores = []  # 음식점 테이블

    for d in data:

        # review_cnt = 
        stores.append(
            [
                d["id"],
                d["store_name"],
                d["branch"],
                d["area"],
                d["tel"],
                d["address"],
                d["latitude"],
                d["longitude"],
                d["category"],
                d["review_cnt"]
            ]
        )
    
    store_frame = pd.DataFrame(data=stores, columns=store_columns)

    return {"stores": store_frame}

# 데이터 필요한것만
stores = import_store()

# # 카테고리 종류 : 카페.디저트 / 한식 / 분식 / 돈가스.회.일식 / 치킨 /
# #                술 / 피자 / 아시안 / 양식 / 중국집 / 족발.보쌈 / 패스트푸드

def filter_category(category):
    A = ["쌀국수", "베트남", "태국", "중앙아시아", "아시아", "인도", "중동", "월남쌈",
        "타코", "멕시칸", "네팔", "커리", "카레"]
    for a in A:
        if a in category:
            return "아시안요리"

    B = ["중식", "중국", "중화요리", "중식", "도삭면", "샤오롱바오", "딤섬", "탕수육"]
    for b in B:
        if b in category:
            return "중식"

    C = ["떡볶이", "김밥"]
    for c in C:
        if c in category:
            return "분식"

    D = ["치킨", "통닭", "닭강정"]
    for d in D:
        if d in category:
            return "치킨"
    
    E = ["짜장", "훠궈", "양꼬치", "마라", "짬뽕", "양고기"]
    for e in E:
        if e in category:
            return "중식"

    F = ["분식"]
    for f in F:
        if f in category:
            return "분식"
    
    G = ["한식", "곤드레밥", "부대찌개", "감자탕", "국밥", "해장국", "백반", "닭볶음탕", "닭갈비", "닭곰탕", "죽",
         "추어탕", "닭도리탕", "아구찜", "해물탕", "애호박찌개", "쭈꾸미", "알탕",
         "닭한마리", "오리탕", "꼬리찜"]
    for g in G:
        if g in category:
            return "한식"
 
    H = ["족발", "보쌈"]
    for h in H:
        if h in category:
            return "족발, 보쌈"

    I = ["국수", "만두전골", "두부", "샤브샤브", "낙지", "간장게장", "찜닭", "꼼장어", "조개구이", "갈낙탕",
         "갈비탕만", "곰탕", "우거지", "청국장", "수제비", "굴비", "비빔밥", 
         "생선구이", "갈비탕", "우럭조림", "문어라면"]
    for i in I:
        if i in category:
            return "한식"

    J = ["갈비만두", "만두", "쫄면"]
    for j in J:
        if j in category:
            return "분식"

    K = ["버거"]
    for k in K:
        if k in category:
            return "버거"

    L = ["펍", "pub", "이자카야"]
    for l in L:
        if l in category:
            return "술"
                
    Z = ["라멘", "참치회","사케동", "간장새우"]
    for z in Z:
        if z in category:
            return "돈가스,회,일식"
        
    M = ["삼겹살", "흑돼지", "고기집", "고깃집", "목살", "la갈비", "갈매기살",
         "곱창", "막창", "갈비살", "가브리살", "특수", "돼지갈비", "한우", 
         "차돌박이", "껍데기", "토시살", "오겹살", "왕갈비"]
    for m in M:
        if m in category:
            return "고기"

    N = ["스파게티", "파스타", "pizza", "피자", "스테이크", "이탈리", "spaghetti",
         "pasta", "호주", "이태리", "뷔페", "미국", "레스토랑", "오므라이스",
         "오믈렛", "스페인"]
    for n in N:
        if n in category:
            return "피자,파스타,스테이크"
        
    R = ["불백", "김치찌개", "몸국", "설농탕", "순대", "설렁탕", "냉면", "돌솥밥",
         "낙곱새", "보리밥", "덮밥", "꼬막"]
    for r in R:
        if r in category:
            return "한식"

    O = ["일식", "초밥", "가츠동", "회덮밥", "돈까스", "돈가스", "횟집", "물회", 
         "규동", "돈부리", "돈가츠", "전복돌솥밥", "일본", "스시", "소바", "방어회",
         "해산물"]
    for o in O:
        if o in category:
            return "돈가스,회,일식"
        
    RR = ["돌솥밥", "갈치조림", "쌈밥", "감자", "백숙", "두루치기", "밀면", "떡갈비",
         "뚝배기", "메밀", "복국", "불고기", "한정식", "제육볶음", "게장"]
    for rr in RR:
        if rr in category:
            return "한식"

    P = ["cafe", "Cafe", "카페", "브런치", "까페", "빙수", "아이스크림", "베이커리", "디저트", "샌드위치", "케이크", "에스프레소", "마카롱"]  # 더있음
    for p in P:
        if p in category:
            return "카페"
    
    PP = ["소고기", "갈비"]  # 더있음
    for pp in PP:
        if pp in category:
            return "고기"
        
    QQ = ["술집", "포차", "닭발", "bar", "맥주", "호프", "가라아게", "소주", "빈대떡", 
          "칵테일", "노가리", "골뱅이", "가맥", "황태구이", "막걸리", "전집"]  # 더있음
    for q in QQ:
        if q in category:
            return "술"
    
    OO = ["장어", "우동", "서대회", "대게"]
    for oo in OO:
        if oo in category:
            return "돈가스,회,일식"
        
    V = ["빵", "쉐이크", "샐러드", "베이글", "와플", "제과점", "커피"]  # 더있음
    for v in V:
        if v in category:
            return "카페"

stores = stores["stores"]
stores["big_cate"] = stores["category"].apply(lambda category: filter_category(category))
# print(df)
# print(stores)


# koreanfood = df[df["big_cate"] == "한식"]
# cafe = df[df["big_cate"] == "카페"]

# print(koreanfood.head())

# koreanfood_review = pd.merge(
#     koreanfood, data["reviews"], left_on="id", right_on="store"
# )