from django.urls import path

from orders import views

urlpatterns = [
    path('add/', views.AddOrderItemAPIView.as_view()),
]
