from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .models import Contest, Contestprocess,Submission,Option
from .serializers  import ContestPreviewSerializer,  ProblemSerializer,\
    AnswerSerializer,AnswerModelSerializer, XProblemSerializer,\
        StandingsModelSerializer

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
class AttemptContest(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self,request,contest_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user
        print(contest.status())
        if  contest.status()!='Active':
            return response.Response({},status=status.HTTP_404_NOT_FOUND)
        
        contestprocess =get_object_or_404(Contestprocess,user=user,contest=contest)
        contestprocess.attempt = True
        contestprocess.save()

        return response.Response(
            {
                "message": "Attempt begins",
               
            },
            status=status.HTTP_200_OK
        )
class ProblemsView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request,contest_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user  
        problems = contest.problems.all()
        if  contest.status()!='Active':
            return response.Response({},status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProblemSerializer(problems,many=True,context={'request':request})

        return response.Response(
            {
                "message": "All the problems",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

class ProblemView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request,contest_uuid,problem_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user  
        problem = contest.problems.get(uuid=problem_uuid)
        if  contest.status()!='Active':
            return response.Response({},status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProblemSerializer(problem,context={'request':request})

        return response.Response(
            {
                "message": "problem",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

class AnswerView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self,request,contest_uuid,problem_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user  
        problem = contest.problems.get(uuid=problem_uuid)
        if  contest.status()!='Active':
            return response.Response({},status=status.HTTP_404_NOT_FOUND)
        contestprocess = Contestprocess.objects.get(user=user,contest=contest)
        serializer = AnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        submission,_ = Submission.objects.get_or_create(user=user,contestprocess=contestprocess,problem=problem)
        
        options = data.get('options',None)
        integer_content = data.get('integer_content',None)
        if options==None and integer_content==None:
            return response.Response({},status=status.HTTP_400_BAD_REQUEST)

        if integer_content is not None:
            submission.integer_content = integer_content
        if options is not None:
            for option in options:
                opt = Option.objects.get(uuid=option['uuid'])
                submission.options.add(opt)

        serializer = AnswerModelSerializer(submission,context={'request':request})

        return response.Response(
            {
                'body':serializer.data,
                "message": "ok",
               
            },
            status=status.HTTP_200_OK
        )

class SubmissionsView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request,contest_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user
        if  contest.status()!='Passed':
            return response.Response({},status=status.HTTP_404_NOT_FOUND)
        problems = contest.problems.all()
        serializer = XProblemSerializer(problems,many=True,context={'request':request})

        return response.Response(
            {
                "message": "All the problems",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

class StandingsPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15
class StandingsView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request,contest_uuid):
        contest = Contest.objects.get(uuid=contest_uuid)
        user = request.user
        contestprocesses = Contestprocess.objects.filter(contest=contest)
        paginator = ContestsPagination()
        page = paginator.paginate_queryset(contestprocesses, request)
        serializer = StandingsModelSerializer(page,many=True,context={'request':request})
        return response.Response(
            {
                "message": "All the standings",
                "body": serializer.data,
                "pages": paginator.page.paginator.num_pages,
                "page": paginator.page.number
            },
            status=status.HTTP_200_OK
        )