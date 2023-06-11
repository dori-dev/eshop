from django.urls import path

from account import views


urlpatterns = [
    path('profile/', views.UserProfile.as_view()),
]
