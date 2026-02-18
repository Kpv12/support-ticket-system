from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TicketViewSet,
    TicketStatsView,
    TicketClassifyView,
)


router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='ticket')


urlpatterns = [
    path('', include(router.urls)),
    path('tickets/stats/', TicketStatsView.as_view()),
    path('tickets/classify/', TicketClassifyView.as_view()),
]
