from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .permissions import IsQuadrant
from .models import QuadrantUser
from .serializers import QuadRegisterInfoCheckSerializer,QuadContestInfoCheckSerializer
from appauth.serializers import UserPreviewSerializer
from core.models import Contest,Contestchip
from core.serializers import ContestPreviewSerializer
class QuadregisterView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request):
        user = request.user
        quadrantuser = get_object_or_404(QuadrantUser,user=user)
        if user.is_quadrant==False:
            return response.Response({
                "message":"Applied",
                "body":{
                    "SOP":quadrantuser.SOP
                }
            },status=status.HTTP_200_OK)
        else:
            return response.Response({
                "message":"Accepted"
            },status=status.HTTP_200_OK)

    def post(self,request):
        user = request.user
        serializer = QuadRegisterInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        SOP = data.get('SOP',None)
        quadrantuser,_ = QuadrantUser.objects.get_or_create(user=user)
        quadrantuser.SOP = SOP
        quadrantuser.save()
        return response.Response({'message':'ok'},status=status.HTTP_200_OK)


class ContestsPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15
class QuadContestsView(views.APIView):
    permission_classes = [IsAuthenticated,IsQuadrant]

    def post(self,request):
        user = request.user
        serializer = QuadContestInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data  = serializer.validated_data

        name = data['name']
        target_date = data['target_date']
        end_date = data['end_date']
        duration = data['duration']
        contest_type = data['contest_type']
        contest_difficulty = data['contest_difficulty']
        description = data['description']
        contest_chips = data['contest_chips']

        contest = Contest.objects.create(
            name = name,
            target_date = target_date,
            end_date = end_date,
            duration = duration,
            contest_type = contest_type,
            contest_difficulty = contest_difficulty,
            description=description
        )
        contest.writers.add(user)
        for contest_chip in contest_chips:
            contestchip,_ = Contestchip.objects.get_or_create(name=contest_chip['name'])
            contest.contest_chips.add(contestchip)
        contest.save()

        serializer = ContestPreviewSerializer(contest,context={'request':request})
        return response.Response(
            {
                "message": "Created Contest",
                "body": serializer.data,
             
            },
            status=status.HTTP_201_CREATED
        )


    def get(self,request):
        queryset = Contest.objects.all().exclude(contest_status=Contest.DEAD)
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

class QuadContestView(views.APIView):
    permission_classes =  [IsAuthenticated,IsQuadrant]
    ##IsContestWriterOrReadOnly

    def get(self,request,contest_uuid):
        pass


    def patch(self,request,contest_uuid):
        pass


class QuadContestApply(views.APIView):
    permission_classes = [IsAuthenticated,IsQuadrant]

    def post(self,request,contest_uuid):
        pass


class QuadContestProblemsView(views.APIView):
    permission_classes = [IsAuthenticated,IsQuadrant]
    #is contest writer

    def get(self,request,contest_uuid):
        pass

    def post(self,request,contest_uuid):
        pass

class QuadContestProblemView(views.APIView):
    permission_classes = [IsAuthenticated,IsQuadrant]
    ##is contest problem owner

    def get(self,request,contest_uuid,problem_uuid):
        pass

    def post(self,request,contest_uuid,problem_uuid):
        pass

    def delete(self,request,contest_uuid,problem_uuid):
        pass

class QuadSelfContests(views.APIView):
    permission_classes = [IsAuthenticated,IsQuadrant]

    def get(self,request):
        pass