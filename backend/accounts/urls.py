from django.urls import path

from accounts import views


urlpatterns = [
    path('profile/', views.UserProfileAPIView.as_view()),
    path('users/', views.UserListAPIView.as_view()),
    path('register/', views.RegisterAPIView.as_view()),
]
