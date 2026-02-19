from rest_framework import serializers

from movies.models import Movie

__all__ = ["MovieSerializer"]


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "subtitle", "director", "description"]
