from django.urls import path

from product import views


urlpatterns = [
    path('', views.ProductListAPIView.as_view()),
    path('<int:pk>/', views.ProductDetailAPIView.as_view()),
]
