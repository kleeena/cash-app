from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Payee

# Customizing how the user model appears in the admin panel
class CustomUserAdmin(UserAdmin):
    list_display = ('id','username', 'full_name', 'is_superuser', 'is_staff', 'balance')
    search_fields = ('username', 'full_name')

admin.site.register(CustomUser, CustomUserAdmin)  # ✅ Register CustomUser



class PayeeAdmin(admin.ModelAdmin):
    list_display = ("user", "payee")  # Show who added whom as a payee
    search_fields = ("user__username", "payee__username")  # Search by usernames

admin.site.register(Payee, PayeeAdmin)
