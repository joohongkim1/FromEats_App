from django.utils import timezone
from django.db import models
import datetime


class Store(models.Model):
    id = models.AutoField(primary_key=True)
    store_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=20, null=True)
    area = models.CharField(max_length=50, null=True)
    tel = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=200, null=True)
    latitude = models.FloatField(max_length=10, null=True)
    longitude = models.FloatField(max_length=10, null=True)
    category = models.CharField(max_length=200, null=True)
    review_cnt =  models.FloatField(null=True)

    @property
    def category_list(self):
        return self.category.split("|") if self.category else []

# 이제 store_new 안쓰고 lifefstyle로 다 퉁치면 됨
class LifeStyle(models.Model):
    id = models.AutoField(primary_key=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="lifestyles") # 참조하는 store id
    # user = models.IntegerField(null=True) # 다시
    store_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=20, null=True)
    area = models.CharField(max_length=50, null=True)
    tel = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=200, null=True)
    latitude = models.FloatField(max_length=10, null=True)
    longitude = models.FloatField(max_length=10, null=True)
    category = models.CharField(max_length=200, null=True)
    review_cnt =  models.FloatField(null=True)
    big_cate = models.CharField(max_length=200, null=True)
    # score =  models.FloatField(null=True)
    mean_score =  models.FloatField(null=True) # 이번에 추가
    # content = models.TextField(null=True)
    lifestyle = models.CharField(max_length=200, null=True)
    ratio = models.FloatField(null=True)
    map_lifestyle = models.CharField(max_length=200, null=True)
    detail_lifestyle = models.CharField(max_length=200, null=True)
    img_url = models.CharField(max_length=500, null=True)


    def __str__(self):
        return f'{self.store}의 추천키워드는 {self.lifestyle}, 주요 카테고리는 {self.big_cate}'


class ImageURL(models.Model):
    id = models.AutoField(primary_key=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="Image") # 참조하는 store id
    img_url = models.CharField(max_length=500, null=True)

    def __str__(self):
        return f'{self.store}의 ImgUrl은 {self.img_url}'


# store : menu = 1 : n
class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="menus")
    menu_name = models.CharField(max_length=100, null=True)
    price = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.store}의 {self.menu_name}의 가격은 {self.price}'


# store : hour = 1 : 1
class Hour(models.Model):   
    id = models.AutoField(primary_key=True)
    oper_type = models.IntegerField(null=True)
    week_type = models.IntegerField(null=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="hours")
    mon = models.BooleanField(default=False)
    tue = models.BooleanField(default=False)
    wed = models.BooleanField(default=False)
    thu = models.BooleanField(default=False)
    fri = models.BooleanField(default=False)
    sat = models.BooleanField(default=False)
    sun = models.BooleanField(default=False)
    start_time = models.CharField(max_length=10, null=True)
    end_time = models.CharField(max_length=10, null=True)
    etc = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.oper_type


class Review_user(models.Model):
    id = models.AutoField(primary_key=True)
    # num = models.IntegerField(null=True) # 원래 있던 아이디
    gender = models.CharField(max_length=10, null=True)
    born_year = models.IntegerField()

    def __str__(self):
        return f'{self.id}유저는 {self.gender}, {self.born_year}년생'


class CustomUser(models.Model):
    id = models.AutoField(primary_key=True)
    # num = models.IntegerField(null=True) # 원래 있던 아이디
    gender = models.CharField(max_length=10, null=True)
    age = models.IntegerField()
    lifestyle = models.CharField(max_length=200, null=True)
    big_cate = models.CharField(max_length=200, null=True)
    sub_lifestyle = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f'Cutomer 번호 {self.id}유저는 {self.lifestyle} 라이프스타일, {self.sub_lifestyle} 서브 라이프스타일'

# review 테이블이 user : store = N : M인 ManyToManyField 대체 
# 자동으로 생성되는 id 칼럼은 filtering에 쓰지 말기
class Review(models.Model):
    id = models.AutoField(primary_key=True)
    num = models.IntegerField(null=True) # 원래 있던 아이디
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(Review_user, on_delete=models.CASCADE, related_name="reviews") # 다시
    score = models.IntegerField(null=True)
    content = models.TextField(null=True)
    reg_time = models.DateTimeField('date published', default=datetime.datetime.now) # 생성, 수정시 & 사용자 변경가능

    def __str__(self):
        return f'{self.store}번호 가게에 대한 {self.user}의 평점은 {self.score}'
