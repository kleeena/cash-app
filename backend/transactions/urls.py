from django.urls import path
from .views import TransactionView, SendMoneyView, TransactionHistoryView
urlpatterns = [
    path('transaction/', TransactionView.as_view(), name='transaction'),
    path('send-money/', SendMoneyView.as_view(), name='send-money'),
    path('history/', TransactionHistoryView.as_view(), name='transaction-history'),
]
