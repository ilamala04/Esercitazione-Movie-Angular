from rest_framework.routers import SimpleRouter
from movies.views import MovieViewSet, StreamingChannelViewSet  

app_name = "movies"

router = SimpleRouter()
router.register("movies", MovieViewSet, basename="movies")
router.register("channels", StreamingChannelViewSet, basename="channels")  

urlpatterns = router.urls