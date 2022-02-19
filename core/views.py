from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .models import Contest, Contestprocess
from .serializers  import ContestPreviewSerializer

class ContestsPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15
class ContestsView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request):
        queryset = Contest.objects.all()
        paginator = ContestsPagination()
        page = paginator.paginate_queryset(queryset, request)
        serializer = ContestPreviewSerializer(
            page, many=True, context={'request': request})

        return response.Response(
            {
                "message": "All the contests",
                "body": serializer.data,
                "pages": paginator.page.paginator.num_pages,
                "page": paginator.page.number
            },
            status=status.HTTP_200_OK
        )
class ContestView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request,contest_uuid):
        query = Contest.objects.get(uuid=contest_uuid)
        serializer = ContestPreviewSerializer(
            query, context={'request': request})

        return response.Response(
            {
                "message": "retrieved the contests",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

class ApplyContest(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self,request,contest_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user
        contestprocess = Contestprocess(user=user,contest=contest)
        contestprocess.save()

        return response.Response(
            {
                "message": "Applied",
               
            },
            status=status.HTTP_200_OK
        )
