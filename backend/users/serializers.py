from rest_framework import serializers
from transactions.models import Transaction
from .models import CustomUser, Payee
from django.contrib.auth.hashers import make_password
from django.db.models import Sum




from rest_framework import serializers
from transactions.models import Transaction
from .models import CustomUser
from django.db.models import Sum

class UserSerializer(serializers.ModelSerializer):
    total_added = serializers.SerializerMethodField()
    total_subtracted = serializers.SerializerMethodField()
    starting_balance = serializers.SerializerMethodField()
    ending_balance = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'profile_image', 'balance',
                  'total_added', 'total_subtracted', 'starting_balance', 'ending_balance']

    def get_total_added(self, obj):
        return Transaction.objects.filter(recipient=obj, transaction_type="credit").aggregate(total=Sum('amount'))['total'] or 0

    def get_total_subtracted(self, obj):
        return Transaction.objects.filter(user=obj, transaction_type="debit").aggregate(total=Sum('amount'))['total'] or 0

    def get_starting_balance(self, obj):
        total_added = self.get_total_added(obj)
        total_subtracted = self.get_total_subtracted(obj)
        return obj.balance - total_added + total_subtracted

    def get_ending_balance(self, obj):
        return obj.balance  # Always returns the latest balance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'password', 'profile_image']

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])  # Hash password
        return super().create(validated_data)
    
class PayeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name']