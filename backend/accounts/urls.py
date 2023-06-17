from django.urls import path
from accounts import views
from accounts.views import UserProfileAPIView, UserListAPIView, RegisterAPIView

urlpatterns = [
    path('profile/', UserProfileAPIView.as_view()),
    path('users/', UserListAPIView.as_view()),
    path('register/', RegisterAPIView.as_view()),
]