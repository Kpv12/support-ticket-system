from django.db.models import Count, Avg
from django.db.models.functions import TruncDate

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(viewsets.ModelViewSet):

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]

    filterset_fields = [
        'category',
        'priority',
        'status',
    ]

    search_fields = [
        'title',
        'description',
    ]


class TicketStatsView(APIView):

    def get(self, request):

        total_tickets = Ticket.objects.count()

        open_tickets = Ticket.objects.filter(status='open').count()

        per_day = (
            Ticket.objects
            .annotate(day=TruncDate('created_at'))
            .values('day')
            .annotate(count=Count('id'))
        )

        avg_per_day = per_day.aggregate(
            avg=Avg('count')
        )['avg'] or 0

        priority_breakdown = dict(
            Ticket.objects
            .values('priority')
            .annotate(count=Count('id'))
            .values_list('priority', 'count')
        )

        category_breakdown = dict(
            Ticket.objects
            .values('category')
            .annotate(count=Count('id'))
            .values_list('category', 'count')
        )

        data = {
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "avg_tickets_per_day": round(avg_per_day, 2),
            "priority_breakdown": priority_breakdown,
            "category_breakdown": category_breakdown,
        }

        return Response(data)


class TicketClassifyView(APIView):

    def post(self, request):

        description = request.data.get('description')

        if not description:
            return Response(
                {"error": "Description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Placeholder (LLM integration next step)
        return Response({
            "suggested_category": None,
            "suggested_priority": None
        })
