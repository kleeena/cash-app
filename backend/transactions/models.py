import uuid
from django.db import models
from django.conf import settings

class Transaction(models.Model):
    user = models.ForeignKey(  # Sender
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_transactions"
    )
    recipient = models.ForeignKey(  # Recipient
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_transactions"
    )

   
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    transaction_type = models.CharField(
        max_length=20, choices=[("transfer", "Transfer")]
    )

    def __str__(self):
        return f"Transaction {self.id}: {self.user.username} -> {self.recipient.username} (${self.amount})"
