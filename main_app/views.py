from django.shortcuts import render
from .models import Budget, Expense
from .serializers import BudgetSerializer, ExpenseSerializer ,SignUpSerializer
from rest_framework import viewsets , generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated


# Create your views here.
# TODO fix the get_querySet for budget and the expenses

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer): 
        serializer.save(user=self.request.user)

    # def get_queryset(self): # return info of the user currently sigin in , for later
    #     return Budget.objects.filter(user=self.request.user)



class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self): # return info of the user currently sigin in , for later
    #     return Expense.objects.filter(user=self.request.user)



class SignUpView(generics.CreateAPIView): #only gives me create not update, delete, read
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]