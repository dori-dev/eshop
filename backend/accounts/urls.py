from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
)

from accounts import views


token = [
    path('', TokenObtainPairView.as_view()),
    path('refresh/', views.CustomTokenRefreshView.as_view()),
    path('verify/', TokenVerifyView.as_view()),
]

urlpatterns = [
    path('profile/', views.UserProfileAPIView.as_view()),
    path('profile/update/', views.UpdateProfileAPIView.as_view()),
    path('users/', views.UserListAPIView.as_view()),
    path('register/', views.RegisterAPIView.as_view()),
    path('verify/', views.VerifyOtpAPIView.as_view()),
    path('token/', include(token)),
]
