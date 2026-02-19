from django.contrib.auth import get_user_model
from django.db import models

__all__ = [
    "Movie",
    "Platform",
]

User = get_user_model()


class Platform(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=1000, default="")

    def __str__(self):
        return self.name


class Movie(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=250)
    subtitle = models.CharField(max_length=250, null=True, blank=True)  # noqa: DJ001
    director = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    platform = models.ForeignKey(
        Platform, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title
