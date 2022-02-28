from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .permissions import IsQuadrant, IsWriter
from .models import QuadrantUser, QuadContestApplication
from .serializers import QuadRegisterInfoCheckSerializer, QuadContestInfoCheckSerializer,\
    QuadContestPatchInfoCheckSerializer, QuadProblemSerializer,\
    QuadProblemInfoCheckSerializer,QuadProblemPatchSerializer
from appauth.serializers import UserPreviewSerializer
from core.models import Contest, Contestchip, Problem, Option
from core.serializers import ContestPreviewSerializer
from rest_framework.exceptions import ValidationError


class QuadregisterView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        quadrantuser = get_object_or_404(QuadrantUser, user=user)
        if user.is_quadrant == False:
            return response.Response({
                "message": "Applied",
                "body": {
                    "SOP": quadrantuser.SOP
                }
            }, status=status.HTTP_200_OK)
        else:
            return response.Response({
                "message": "Accepted"
            }, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        serializer = QuadRegisterInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        SOP = data.get('SOP', None)
        quadrantuser, _ = QuadrantUser.objects.get_or_create(user=user)
        quadrantuser.SOP = SOP
        quadrantuser.save()
        return response.Response({'message': 'ok'}, status=status.HTTP_200_OK)


class ContestsPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15


class QuadContestsView(views.APIView):
    permission_classes = [IsAuthenticated, IsQuadrant]

    def post(self, request):
        user = request.user
        serializer = QuadContestInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        name = data['name']
        target_date = data['target_date']
        end_date = data['end_date']
        duration = data['duration']
        contest_type = data['contest_type']
        contest_difficulty = data['contest_difficulty']
        description = data['description']
        contest_chips = data['contest_chips']

        contest = Contest.objects.create(
            name=name,
            target_date=target_date,
            end_date=end_date,
            duration=duration,
            contest_type=contest_type,
            contest_difficulty=contest_difficulty,
            description=description
        )
        contest.writers.add(user)
        for contest_chip in contest_chips:
            contestchip, _ = Contestchip.objects.get_or_create(
                name=contest_chip['name'])
            contest.contest_chips.add(contestchip)
        contest.save()

        serializer = ContestPreviewSerializer(
            contest, context={'request': request})
        return response.Response(
            {
                "message": "Created Contest",
                "body": serializer.data,

            },
            status=status.HTTP_201_CREATED
        )

    def get(self, request):
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
    permission_classes = [IsAuthenticated, IsQuadrant]
    # IsContestWriterOrReadOnly

    def get(self, request, contest_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)
        serializer = ContestPreviewSerializer(
            contest, context={'request': request})
        return response.Response(
            {
                "message": "the contest",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

    def patch(self, request, contest_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)

        if not (user in contest.writers.all()):
            return response.Response({}, status=status.HTTP_400_BAD_REQUEST)
        serializer = QuadContestPatchInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        contest_chips = data.get('contest_chips', None)
        if contest_chips is not None:
            contest.contest_chips.clear()
            for contest_chip in contest_chips:
                contestchip, _ = Contestchip.objects.get_or_create(
                    name=contest_chip['name'])
                contest.contest_chips.add(contestchip)
            del data['contest_chips']
            contest.save()

        contest = contest.update(**data)

        serializer = ContestPreviewSerializer(
            contest, context={'request': request})
        return response.Response(
            {
                "message": "the contest",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )


class QuadContestApply(views.APIView):
    permission_classes = [IsAuthenticated, IsQuadrant]

    def post(self, request, contest_uuid):
        pass


class QuadContestProblemsView(views.APIView):
    permission_classes = [IsAuthenticated, IsQuadrant, IsWriter]
    # is contest writer

    def get(self, request, contest_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)
        problems = contest.problems.all()

        serializer = QuadProblemSerializer(
            problems, many=True, context={'request': request})
        return response.Response(
            {
                "message": "the contest problems",
                "body": serializer.data,
            },
            status=status.HTTP_200_OK
        )

    def post(self, request, contest_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)

        serializer = QuadProblemInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        content = data['content']
        content_image = data.get('content_image', None)
        problem_type = data['problem_type']
        subject = data['subject']
        correct_integer = data.get('correct_integer', None)
        options = data.get('options', [])
        tags = data.get('tags', None)

        problem = Problem(
            writer=user,
            content=content,
            content_image=content_image,
            problem_type=problem_type,
            subject=subject,
            contest=contest
        )
        

        if problem_type == Problem.INTEGER:
            if correct_integer is None:
                raise ValidationError(
                    'The question is integer type but no correct integer is submitted')
            problem.correct_integer = correct_integer
            problem.save()

        elif problem_type == Problem.SINGLE or problem_type == Problem.MULTIPLE:
            problem.save()
            if len(options) < 4 or len(options) > 6:
                raise ValidationError(
                    'The options submitted are less than 4, or more than 6')
            for option in options:
                opt = Option(
                    problem=problem,
                    is_correct=option['is_correct'],
                    option_image=option.get('option_image', None),
                    content=option['content']
                )
                opt.save()
        else:
            raise ValidationError('No proper problem type submitted')
        if tags is not None:
            for tag in tags:
                tg, _ = Contestchip.objects.get_or_create(name=tag['name'])
                problem.tags.add(tg)
        
        serializer = QuadProblemSerializer(
            problem, context={'request': request})
        return response.Response({
            'message': 'Problem created',
            'body': serializer.data
        })


class QuadContestProblemView(views.APIView):
    permission_classes = [IsAuthenticated, IsQuadrant, IsWriter]

    def get(self, request, contest_uuid, problem_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)

        problem = contest.problems.get(uuid=problem_uuid)
        serializer = QuadProblemSerializer(problem,context={'request':request})
        return response.Response({
            'message':'Retrived Problem',
            'body':serializer.data
        },status=status.HTTP_200_OK)

    def patch(self, request, contest_uuid, problem_uuid):
        user =  request.user
        contest = Contest.objects.get(uuid=contest_uuid)
        problem = contest.problems.get(uuid=problem_uuid)

        serializer = QuadProblemPatchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data



        content = data['content']
        content_image = data.get('content_image', None)
        subject = data['subject']
        correct_integer = data.get('correct_integer', None)

        new_options = data.get('new_options',[])
        patch_options = data.get('patch_options',[])
        delete_options = data.get('delete_options', [])
        tags = data.get('tags', None)

        new_len = len(problem.options.all()) + len(new_options)-len(delete_options)
        if new_len>6 or new_len<4:
            raise ValidationError('number of options is less than 4 or greater than 6')
        for option in delete_options:
            uuid = option['uuid']
            opt = problem.options.get(uuid=uuid)
            opt.delete()
        if data.get('delete_options',None) is not None:
            del data['delete_options']
        for option in new_options:
            opt = Option(
                    problem=problem,
                    is_correct=option['is_correct'],
                    option_image=option.get('option_image', None),
                    content=option['content']
                )
            opt.save()
        if data.get('new_options',None) is not None:
            del data['new_options']
        for option in patch_options:
            uuid = option['uuid']
            del option['uuid']
            opt = problem.options.get(uuid=uuid)
            opt.update(**option)
        if data.get('patch_options',None) is not None:
            del data['patch_options']
        if tags is not None:
            problem.tags.clear()
            for tag in tags:
                tg,_ = Contestchip.objects.get_or_create(name=tag['name'])
                problem.tags.add(tg)
            del data['tags']
        problem.save()
        problem = problem.update(**data)
        serializer = QuadProblemSerializer(problem,context={'request':request})
        return response.Response({
            'message':'Retrived Problem',
            'body':serializer.data
        },status=status.HTTP_200_OK)
        



    def delete(self, request, contest_uuid, problem_uuid):
        user = request.user
        contest = Contest.objects.get(uuid=contest_uuid)

        problem = contest.problems.get(uuid=problem_uuid)
        problem.delete()
        return response.Response({
            'message':'deleted problem'
        },status=status.HTTP_200_OK)


class QuadSelfContests(views.APIView):
    permission_classes = [IsAuthenticated, IsQuadrant]

    def get(self, request):
        user = request.user
        contests = user.written_contests.all()
        paginator = ContestsPagination()
        page = paginator.paginate_queryset(contests, request)
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
