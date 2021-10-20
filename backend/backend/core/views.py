from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import UserTokenObtainPairSerializer

# Create your views here.
class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserTokenRefreshView(TokenRefreshView):
    pass
