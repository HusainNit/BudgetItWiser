from django.shortcuts import render
from .models import Budget, Expense
from .serializers import BudgetSerializer, ExpenseSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User


# Create your views here.

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def perform_create(self, serializer): # fix it later as serializer.save(user=self.request.user)
        dummy_user = User.objects.first()
        serializer.save(user=dummy_user)

    # def get_queryset(self):
    #     return Budget.objects.filter(user=self.request.user)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    # def perform_create(self, serializer): # fix it later as serializer.save(user=self.request.user)
    #     budget_test = Budget.objects.first()
    #     serializer.save(budget=budget_test)

    # def get_queryset(self):
    #     return Expense.objects.filter(budget__user=self.request.user)

    # def perform_create(self, serializer):
    #     user = self.request.user
    #     budget = Budget.objects.get(user=user)
    #     serializer.save(budget=budget)

