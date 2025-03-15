from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics
from decimal import Decimal
from django.contrib.auth import get_user_model
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer
from users.models import CustomUser


User = get_user_model()

class TransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        transaction_type = request.data.get('transaction_type')
        amount = Decimal(request.data.get('amount'))

        if transaction_type not in ['deposit', 'withdrawal', 'transfer']:
            return Response({'error': 'Invalid transaction type'}, status=400)

        if transaction_type == 'withdrawal' and user.balance < amount:
            return Response({'error': 'Insufficient balance'}, status=400)

        if transaction_type == 'transfer':
            recipient_id = request.data.get('recipient_id')
            try:
                recipient = User.objects.get(id=recipient_id)
            except User.DoesNotExist:
                return Response({'error': 'Recipient not found'}, status=404)

            if user.balance < amount:
                return Response({'error': 'Insufficient balance'}, status=400)

            user.balance -= amount
            recipient.balance += amount
            recipient.save()

            Transaction.objects.create(user=user, recipient=recipient, amount=amount, transaction_type='transfer')

        else:  # Deposit or Withdrawal
            if transaction_type == 'deposit':
                user.balance += amount
            else:
                user.balance -= amount

            Transaction.objects.create(user=user, amount=amount, transaction_type=transaction_type)

        user.save()
        return Response({'message': f'{transaction_type.capitalize()} successful', 'balance': user.balance})
    


class SendMoneyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        sender = request.user
        recipient_id = request.data.get("recipient_id")
        amount = request.data.get("amount")

        try:
            recipient = CustomUser.objects.get(id=recipient_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "Recipient not found"}, status=400)

        data = {
            "user": sender.id,
            "recipient": recipient.id,
            "amount": amount,
            "recipient_name": recipient.username
        }

        serializer = TransactionSerializer(data=data, context={"request": request})
        if serializer.is_valid():
            transaction = serializer.save()  

            return Response({
                "message": "Transaction successful",
                "updated_balance": sender.balance,  
                "data": serializer.data
            }, status=201)
        
        return Response(serializer.errors, status=400)

class TransactionHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Get transactions where user is the sender (debit) or recipient (credit)
        transactions = Transaction.objects.filter(
            (Q(user=user) & Q(transaction_type="debit")) | 
            (Q(user=user) & Q(transaction_type="credit"))
        )

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

