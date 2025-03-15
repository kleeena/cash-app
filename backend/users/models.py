import uuid
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=255)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=10000.00)

    def __str__(self):
        return self.username


class Payee(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # The user who owns the payee list
        on_delete=models.CASCADE,
        related_name="payees"
    )
    payee = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # The actual payee (another user)
        on_delete=models.CASCADE,
        related_name="as_payee"
    )

    def __str__(self):
        return f"{self.user.username} → {self.payee.username}"