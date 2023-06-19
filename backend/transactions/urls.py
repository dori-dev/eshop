from django.urls import path
from transactions.views import TransactionListView, TransactionView, TransferView, UserBalanceView

urlpatterns = {
    path('', TransactionListView.as_view(), name='transactions'),
    path('id/<int:transaction_number>', TransactionView.as_view(), name='transaction-view'),
    path('transfer/', TransferView.as_view(), name='transfer-view'),
    path('balance/', UserBalanceView.as_view(), name='balance')
}
