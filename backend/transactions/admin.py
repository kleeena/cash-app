from django.contrib import admin
from transactions.models import Transaction

# Register Transaction model
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'recipient', 'amount', 'transaction_type', 'timestamp')
    search_fields = ('user__username', 'recipient__username', 'transaction_type')

admin.site.register(Transaction, TransactionAdmin)  # ✅ Register Transaction
