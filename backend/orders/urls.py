from django.urls import path

from orders import views

urlpatterns = [
    path('add/', views.AddOrderItemAPIView.as_view()),
    path('<int:pk>/', views.OrderDetailAPIView.as_view()),
]
