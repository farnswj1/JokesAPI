from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.response import Response
from .models import Joke
from .serializers import JokeSerializer
from .filters import JokeFilterSet
from random import choice

# Create your views here.
class JokeRandomAPIView(ListAPIView):
    def get(self, request, format=None):
        pk = choice(Joke.objects.values_list('pk', flat=True))
        joke = Joke.objects.get(pk=pk)
        data = JokeSerializer(joke).data
        return Response(data)


class JokeListAPIView(ListAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer
    filterset_class = JokeFilterSet


class JokeDetailAPIView(RetrieveAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer


class JokeCreateAPIView(CreateAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer


class JokeUpdateAPIView(UpdateAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer


class JokeDeleteAPIView(DestroyAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer
