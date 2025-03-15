from rest_framework import serializers
from transactions.models import Transaction
from users.models import CustomUser  # Import CustomUser model

class TransactionSerializer(serializers.ModelSerializer):
    recipient_name = serializers.CharField(source='recipient.username', read_only=True)
    class Meta:
        model = Transaction
        fields = ['user', 'recipient', 'recipient_name', 'amount', 'transaction_type', 'timestamp']
        read_only_fields = ['timestamp', 'transaction_type']

    def validate(self, data):
        sender = data['user']
        recipient = data['recipient']
        amount = data['amount']

        # Ensure sender and recipient are different
        if sender == recipient:
            raise serializers.ValidationError("You cannot send money to yourself.")

        # Check if sender has enough balance
        if sender.balance < amount:
            raise serializers.ValidationError("Insufficient balance.")

        return data

    def create(self, validated_data):
        sender = validated_data['user']
        recipient = validated_data['recipient']
        amount = validated_data['amount']

        # Deduct amount from sender
        sender.balance -= amount
        sender.save(update_fields=['balance'])  # ✅ Save only the balance field

        # Add amount to recipient
        recipient.balance += amount
        recipient.save(update_fields=['balance'])

        sender_transaction = Transaction.objects.create(
            user=sender, recipient=recipient, amount=amount, transaction_type="debit"  # ✨ Mark as debit
        )

        recipient_transaction = Transaction.objects.create(
            user=recipient, recipient=sender, amount=amount, transaction_type="credit"  # ✨ Mark as credit
        )

        return sender_transaction
