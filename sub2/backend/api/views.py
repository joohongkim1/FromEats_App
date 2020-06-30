from api import models, serializers
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
import json
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_pandas.io import read_frame
from api.analyze import score_by_area
import pandas as pd
# Matrix Factorizaion
from django.contrib.auth.models import User
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
from api.recomm import recommendation



class SmallPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 500

# store_name으로 filter
class StoreViewSet(viewsets.ModelViewSet):
    # serializer_class = serializers.StoreSerializer
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination
    filter_backends = [SearchFilter]

    def get_queryset(self): 
        # store_id를 넣으면 그거에 해당하는 Hour들을 불러온다. 
        store_name = self.request.query_params.get("search", "")
        if store_name : 
            queryset = (
                models.LifeStyle.objects.all().filter(store_name__contains=store_name)
            )
        else:
            queryset = (
                models.LifeStyle.objects.all().order_by("store") # 임의로 섞음

            )
        return queryset


# area로 filter
# 두가지 용도로 쓸 수 있음 :
# 1. area로 동네별 검색(/api/storebyarea) 2. id값 넣으면 detail page show (/api/storebyarea/{id})
class StoreAreaViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination

    # (GET)/api/storebyarea 에 search 란에 넣으면 됨 - 전체 리스트에서 
    filter_backends = [SearchFilter]
    def get_queryset(self): 
        res = self.request.path
        # detail_id = int(list(self.request.path)[-1])
        print(res)
        list_res = res.split('/')
        print(list_res[-1])  
        try : 
            if list_res[-1]:
                detail_id =  int(list_res[-1]) # for detail page
                print("detail_id : ", detail_id)
                print(detail_id)
                store = get_object_or_404(models.StoreNew, pk=detail_id) # 37(detail_id로 바꿔야)일때 있는 리뷰,메뉴들 모두 존재, 가격 좀 이상해
                reviews = store.reviews.all()
                menus = store.menus.all()
                print(reviews)
                print(menus)    
                # 나중에 쿼리셋을 store, reviews, menus, user까지 모두 모아서 줘야   
                             
        except:
                print("id를 입력한 path가 아닙니다")

        area = self.request.query_params.get("search", "")

        queryset = (
            models.LifeStyle.objects.all().filter(area__contains=area).order_by("id")
        )
        return queryset


def get_all_objects(detail_id):
    print("함수 들어옴")
    # stores = models.Store.reviews.all()
    store = get_object_or_404(models.LifeStyle, pk=37) # 37일때 있는 리뷰,메뉴들 모두 존재, 가격 좀 이상해
    reviews = store.reviews.all()
    menus = store.menus.all()
    # 문제는, 리뷰를 가진 유저 번호들을 캐치하는 것
    print(reviews) # 쿼리셋으로 가져옴
    print(menus)
    return reviews


# 한식, 양식, 중식 등등 카테고리 입력에 따라서 데이터 가져오는 url
class StoreCateViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination

    # (GET)/api/storebyarea 에 search 란에 넣으면 됨 - 전체 리스트에서 
    filter_backends = [SearchFilter]
    def get_queryset(self): 
        cate = self.request.query_params.get("search", "")
        if cate : 
            queryset = (
                models.LifeStyle.objects.all().filter(big_cate__contains=cate).order_by("id") # ratio로 정렬안하고 store번호로 임의로 섞음

            )
        else:
            queryset = (
                models.LifeStyle.objects.all().order_by("store") # 임의로 섞음
            )
        return queryset


# search에 넣을 라이프스타일
# ["커피 한잔의 낭만파","저녁시간, 가족과 오붓하게 파(=> 이거는 '저녁시간'으로만 검색해주세요)","부드러운 음식으로 마음을 녹일 보들파","점심 두둑히 먹어야 할 든든파","가성비 맛집 헌터파","고기압승파","진한 국물을 음미하는 어르신파","리마리오 뺨치는 느끼함을 원하는 버터파",]
class LifeStyleViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination

    filter_backends = [SearchFilter]
    def get_queryset(self): 
        lifestyle = self.request.query_params.get("search", "")
        queryset = (
            models.LifeStyle.objects.all().filter(lifestyle__contains=lifestyle).order_by("id")
        )
        return queryset


class LifeStylePKViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination

    filter_backends = [SearchFilter]
    def get_queryset(self): 
        store_id = self.request.query_params.get("search", "")
        queryset = (
            models.LifeStyle.objects.all().filter(store_id=store_id).order_by("id")
        )
        return queryset



# lifestyle에서 lifestyle번호를 넣으면 store_id=1이렇게 해서 다 불러오는 것으로 하기



# class MapViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.LifeStyleSerializer
#     pagination_class = SmallPagination

#     filter_backends = [SearchFilter]
#     def get_queryset(self): 
#         res = self.request.path
#         print(res)
#         list_res = res.split('/')
#         print(list_res[-1])  


#         # 근데 일단 post요청, 중복적으로 들어오면 어칼껀디 얘기해야
#         lifestyle="점심"
#         big_cate="분식"
#         area = "용산구" # 서울용산구, 용산구 o / but 서울 용산구 -  안됨
#         res =  models.LifeStyle.objects.all().filter(lifestyle__contains=lifestyle, big_cate__contains=big_cate, area__contains=area).order_by("-mean_score")[:8]
#         queryset = (
#             res
#         )#.order_by("-mean_score")
#         return queryset


# 이렇게 고쳐야 함 

# cate 전체보기로 하기

class MapViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination
    filter_backends = [SearchFilter]
    lifestyle_list = []
    maplifestyle_list = [] 
    def get_queryset(self): 
        lifestyle_list = []
        maplifestyle_list = [] 
        # search 예시 : 점심!분식!용산구
        res = self.request.query_params.get("search", "")
        res = res.split('!')
        l = len(res)
        for i in range(l-1):
            tmp = res[i]
            # print(tmp)
            tmp = tmp.split('-')
            # print(tmp)
            lifestyle = tmp[0]
            lifestyle_list.append(tmp[0])
            map_lifestyle = tmp[1]
            map_lifestyle = map_lifestyle.split(',')
            # print(map_lifestyle)
            maplifestyle_list.extend(map_lifestyle)
        area = res[-1]
        print(lifestyle_list)
        print(maplifestyle_list)
        print(str(area))
        # big_cate = ["분식","버거","피자,파스타,스테이크"]
        # lifestyle = ["점심 두둑히 먹어야 할 든든파", "리마리오 뺨치는 느끼함을 원하는 버터파"]
        # 점심 두둑히 먹어야 할 든든파-분식,버거!리마리오 뺨치는 느끼함을 원하는 버터파-버거,피자!서울중구
        # 가성비맛집헌터파-피자&파스타&스테이크!리마리오뺨치는느끼함을원하는버터파-버거!점심두둑히먹어야할든든파-버거,분식!진한국물을음미하는어르신파-한식!서울중구
        res =  models.LifeStyle.objects.all().filter(lifestyle__in=lifestyle_list,big_cate__in=maplifestyle_list, area__contains=area)
        queryset = (
            res
        )
        return queryset


# 라1-빅카테1,빅카테2@라2-빅카테1,빅카테2!용산구


# 알고리즘
# 지역, 라이프스타일, 서브카테, 가격 으로 상위 8개 필터
# 가격만 가져오기 위해서는 store_id로 orm 끌어와야 
# 커피한잔의 낭만파 - 카페, 
# 저녁시간, ~  -한식, 중식, 고기, 술
# 부드러운 ~ - 한식, 족발,보쌈 , 아시안요리, 
# 점심 두둑히 ~ - 분식, 족발,보쌈, 돈가스,회,일식 , 버거, 치킨
# 가성비 맛집 헌터파 - 한식, 고기,  피자,파스타,스테이크 , 돈가스,회,일식
# 고기 압승파 - 족발,보쌈, 고기, 치킨,
# 진한 국물 ~ - 중식, 한식, 술
# 리마리오 - 피자,파스타,스테이크 , 버거


# Menu, Hour, Review_user, Review - user
class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MenuSerializer
    pagination_class = SmallPagination

    filter_backends = [SearchFilter]
    def get_queryset(self): 
        # store_id를 넣으면 그거에 해당하는 menu들을 불러온다. 
        store_id = self.request.query_params.get("search", "")
        queryset = (
            models.Menu.objects.all().filter(store_id=store_id).order_by("id")
        )
        return queryset

class HourViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.HourSerializer
    pagination_class = SmallPagination
    filter_backends = [SearchFilter]
    def get_queryset(self): 
        # store_id를 넣으면 그거에 해당하는 Hour들을 불러온다. 
        store_id = self.request.query_params.get("search", "")
        queryset = (
            models.Hour.objects.all().filter(store_id=store_id).order_by("id")
        )
        return queryset



class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomUserSerializer
    pagination_class = SmallPagination
    def get_queryset(self):
        user_num = self.request.query_params.get("user_num", "")
        queryset = (
            models.CustomUser.objects.all().filter(id__contains=user_num).order_by("id")

        )
        return queryset


# user_id를 넣으면 해당 유저가 단 리뷰, 평점 관리
class Review_userViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ReviewSerializer
    pagination_class = SmallPagination
    filter_backends = [SearchFilter]

    def get_queryset(self):
        user_num = self.request.query_params.get("search", "")
        queryset = (
            models.Review.objects.all().filter(user_id=user_num).order_by("id")
        )
        return queryset


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ReviewSerializer
    pagination_class = SmallPagination

    filter_backends = [SearchFilter]
    def get_queryset(self): 
        # store_id를 넣으면 그거에 해당하는 리뷰들을 불러온다. 
        store_id = self.request.query_params.get("search", "")
        queryset = (
            models.Review.objects.all().filter(store_id=store_id).order_by("id")

        )
        return queryset


class RecommendViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LifeStyleSerializer
    pagination_class = SmallPagination
    print("=========유저정보반환=========")
    # user = User.objects.get(pk=2) # 그냥 이렇게 하자
    # print(user)
    print(User.username) # 9852 -> /api/review_users search에 댓글들 확인해서 정보로 넘기기 -> 추천알고리즘 돌리기(이거 자체로 user_id)

    filter_backends = [SearchFilter]
    def get_queryset(self): 
        # store_id를 넣으면 그거에 해당하는 리뷰들을 불러온다. 
        user_id = self.request.query_params.get("search", "")
        # recomm_list = recommendation(user_id)
        queryset = (
            # models.LifeStyle.objects.all().filter(store_id__in=recomm_list).order_by("id")
            models.LifeStyle.objects.all().filter(store_id=user_id).order_by("id")
        )
        return queryset



