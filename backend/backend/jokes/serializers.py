from rest_framework.serializers import ModelSerializer
from .models import Joke


class JokeSerializer(ModelSerializer):
    class Meta:
        model = Joke
        fields = "__all__"


class JokeListSerializer(ModelSerializer):
    class Meta:
        model = Joke
        exclude = ("body",)
