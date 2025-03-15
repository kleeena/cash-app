from django.urls import path
from .views import UserProfileView, RegisterView, LoginView, LogoutView, get_payees, check_account

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('payees/', get_payees, name='payees'),
    path("check-account/<int:recipient_id>/", check_account, name="check-account"),
]
