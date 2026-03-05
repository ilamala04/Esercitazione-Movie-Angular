from rest_framework import serializers
from movies.models import Movie, StreamingChannel

__all__ = ["MovieSerializer", "StreamingChannelSerializer"]

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "subtitle", "director", "description"]

class StreamingChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamingChannel
        fields = '__all__'