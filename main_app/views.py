from .models import Budget, Expense
from .serializers import BudgetSerializer, ExpenseSerializer, SignUpSerializer
from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
# TODO fix the get_querySet for budget and the expenses


class UserViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):  # return info of the user currently sigin in , for later
        return Budget.objects.filter(user=self.request.user)

    @action(detail=False, methods=["get"], url_path="summary")
    def budget_summary(self, request):
        user = request.user
        budgets = Budget.objects.filter(user=user).order_by("year", "month")
        data = [
            {
                "id": b.id,
                "month": b.month,
                "year": b.year,
                "total_budget": float(b.total_budget),
                "status": b.status,
                "total_expenses": sum(float(e.amount) for e in b.expense_set.all()),
            }
            for b in budgets
        ]
        return Response(data)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(budget__user=self.request.user)


class SignUpView(
    generics.CreateAPIView
):  # only gives me create not update, delete, read
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]
