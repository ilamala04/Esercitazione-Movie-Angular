from rest_framework.routers import SimpleRouter

from movies.views import MovieViewSet

app_name = "movies"

router = SimpleRouter()
router.register("movies", MovieViewSet, basename="movies")

urlpatterns = router.urls
