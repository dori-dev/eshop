from django.urls import path

from account import views


urlpatterns = [
    path('profile/', views.UserProfileAPIView.as_view()),
    path('', views.UserListAPIView.as_view()),
]
