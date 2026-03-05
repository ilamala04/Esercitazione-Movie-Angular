from rest_framework import viewsets
from movies.models import Movie, StreamingChannel
from movies.serializers import MovieSerializer, StreamingChannelSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class StreamingChannelViewSet(viewsets.ModelViewSet):
    queryset = StreamingChannel.objects.all()
    serializer_class = StreamingChannelSerializer