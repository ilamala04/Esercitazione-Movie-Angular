from rest_framework import viewsets

from movies.models import Movie
from movies.serializers import MovieSerializer

__all__ = [
    "MovieViewSet",
]


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    #    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
