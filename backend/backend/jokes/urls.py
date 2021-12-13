from django.urls import path
from . import views

app_name = "jokes"

urlpatterns = [
    path('', views.JokeListAPIView.as_view(), name="list"),
    path('random', views.JokeRandomAPIView.as_view(), name="random"),
    path('create', views.JokeCreateAPIView.as_view(), name="create"),
    path('<int:pk>', views.JokeDetailAPIView.as_view(), name="detail"),
    path('<int:pk>/update', views.JokeUpdateAPIView.as_view(), name="update"),
    path('<int:pk>/delete', views.JokeDeleteAPIView.as_view(), name="delete"),
]
