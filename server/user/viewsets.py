from turtle import pd
from django.conf import settings
from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import User
from . import serializers
from django.core.mail import send_mail
from http import HTTPStatus
from json import loads
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
import pdb


class UserViewset(viewsets.ModelViewSet):
    queryset= User.objects.all()
    serializer_class= serializers.UserSerializer   
    def post(self,request):
        user=request.data
        serializer=self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data=serializer.data
        return Response(user_data,status=status.HTTP_201_CREATED)
       

class SaveViewset(viewsets.ModelViewSet):
    serializer_class= serializers.UserSerializer
    queryset= User.objects.all()
    http_method_name=['post']

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        address=request.data.get('email')
        matricul=request.data.get('matricul')

        try:
            validate_email(address)
        except  ValidationError:
            return JsonResponse({'status':'bad request'},status=HTTPStatus.BAD_REQUEST)
        email_body='matricul  :  '+matricul
        send_mail(
            subject='matricul',
            message = email_body,
            from_email = settings.EMAIL_HOST_USER,
            recipient_list=[address]
            )
        return JsonResponse({'status':'OK'},status=HTTPStatus.OK)


  
    




  
 
 
 
 
 



