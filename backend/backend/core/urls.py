from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("login", views.UserTokenObtainPairView.as_view(), name="login"),
    path("refresh", views.UserTokenRefreshView.as_view(), name="refresh"),
]
