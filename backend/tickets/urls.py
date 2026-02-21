from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketStatsView, TicketClassifyView

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', TicketStatsView.as_view()),
    path('classify/', TicketClassifyView.as_view()),
]
