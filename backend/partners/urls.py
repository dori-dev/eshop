from django.urls import path

from partners.views import PartnerProductAddView, PartnerView, PartnerStockView

urlpatterns = [
    path('partner-view/', PartnerView.as_view(), name='partner-view'),
    path('partner-view/add', PartnerProductAddView.as_view(), name='partner-add'),
    path('partner-view/stock/<int:pk>', PartnerStockView.as_view(), name='stock-view')
]
