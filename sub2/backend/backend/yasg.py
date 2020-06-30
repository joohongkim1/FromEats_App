#-*- coding:utf-8 -*-
from django.conf.urls import url
from django.urls import path, include
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from drf_yasg import openapi
 
schema_url_v1_patterns = [
    url('api/', include('api.urls')),
    path("rest-auth/", include("rest_auth.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("social/", include("allauth.urls")),
]
 
schema_view_v1 = get_schema_view(
    openapi.Info(
        title="A205 Open API",
        default_version='v1',
        description="Team A205 Open API page",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="test@google.com"),
        license=openapi.License(name="Team205"),
    ),
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,),
    patterns=schema_url_v1_patterns,
)
 
