from .models import Store, Menu, Hour, Review_user, Review, LifeStyle, CustomUser, ImageURL
from rest_framework import serializers



class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = [
            "id",
            "store_name",
            "branch",
            "area",
            "tel",
            "address",
            "latitude",
            "longitude",
            "category_list",
            "review_cnt",
        ]


class LifeStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LifeStyle
        fields = [
            "id",
            "store",
            # "user",
            "store_name",
            "branch",
            "area",
            "tel",
            "address",
            "latitude",
            "longitude",
            "category",
            "review_cnt",
            "big_cate",
            # "score",
            # "content",
            "mean_score",
            "lifestyle",
            "ratio",
            "map_lifestyle",
            "detail_lifestyle",
            "img_url",
        ]


class ImageURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageURL
        fields = [
            "id",
            "store_id",
            "img_url",
        ]

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = [    
            "id",
            "store_id",  
            "menu_name",  
            "price",  
        ]
        

class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hour
        fields = [
            "id", 
            "oper_type", 
            "week_type",  
            "store_id",  
            "mon",  
            "tue",  
            "wed",  
            "thu",  
            "fri",  
            "sat",  
            "sun",  
            "start_time",  
            "end_time",  
            "etc",  
        ]


class Review_userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review_user
        fields = [
            "id",  
            "gender",  
            "born_year",
        ]



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",  
            "gender",  
            "age",
            "lifestyle",
            "big_cate",
            "sub_lifestyle",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    # read_only field 해제, 처음 db saving때는 주석처리해야
    # store_id = serializers.IntegerField(read_only=False)
    # user_id = serializers.IntegerField(read_only=False)

    class Meta:
        model = Review
        fields = [
            "id",  
            "num",
            "store_id",  
            "user_id",  
            "score", 
            "content", 
            "reg_time",  
        ]