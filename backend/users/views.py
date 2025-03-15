from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Payee
from transactions.models import Transaction
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import CustomUser
from users.serializers import UserSerializer, RegisterSerializer, PayeeSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes

class UserProfileView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Returns the logged-in user


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token

            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_payees(request):
    # Find all recipients where the authenticated user has sent money
    payee_ids = Transaction.objects.filter(user=request.user).values_list('recipient', flat=True).distinct()
    
    # Get user objects for these payees
    payees = CustomUser.objects.filter(id__in=payee_ids)
    
    # Serialize and return the response
    serializer = PayeeSerializer(payees, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def check_account(request, recipient_id):
    """
    Checks if a user with the given recipient_id exists.
    """
    try:
        user_exists = CustomUser.objects.filter(id=recipient_id).exists()
        return Response({"exists": user_exists})
    except Exception as e:
        return Response({"error": str(e)}, status=400)