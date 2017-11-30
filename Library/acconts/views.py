from django.shortcuts import render
from rest_framework.generics import ListAPIView,CreateAPIView
from .serializers import AccountsSerializer,AccountsCreateSerializer
from .models import Account
from rest_framework import status
from rest_framework.response import Response
from userprofile.models import UserProfile
# Create your views here.

class AccountAPIView(ListAPIView):
    serializer_class = AccountsSerializer
#    queryset = Account.objects.all()
    lookup_field = 'student_id'
    lookup_url_kwarg = 'student'
    def get_queryset(self):
        k=UserProfile.objects.get(roll_number__iexact=self.kwargs['student'])
        if k:
            return Account.objects.filter(student__roll_number=self.kwargs['student'])

        content = {'please move along': 'nothing to see here'}
        return Response(content, status=status.HTTP_404_NOT_FOUND)



class AccountCreateAPIView(CreateAPIView):
    serializer_class = AccountsCreateSerializer
    queryset = Account.objects.all()