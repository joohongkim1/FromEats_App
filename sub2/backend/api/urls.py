from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from api import views


router = DefaultRouter(trailing_slash=False)
router.register(r"stores", views.StoreViewSet, basename="stores")
router.register(r"storebyarea", views.StoreAreaViewSet, basename="storebyarea")
router.register(r"storebycate", views.StoreCateViewSet, basename="storebycate")
router.register(r"lifestyle", views.LifeStyleViewSet, basename="lifestyle")
router.register(r"lifestylePK", views.LifeStylePKViewSet, basename="lifestylePK")
router.register(r"map", views.MapViewSet, basename="map")
router.register(r"menus", views.MenuViewSet, basename="menus")
router.register(r"hours", views.HourViewSet, basename="hours")
router.register(r"review_users", views.Review_userViewSet, basename="review_users")
router.register(r"reviews", views.ReviewViewSet, basename="reviews")
router.register(r"customuser", views.CustomUserViewSet, basename="customuser")
router.register(r"recommend", views.RecommendViewSet, basename="recommend")


urlpatterns = router.urls
