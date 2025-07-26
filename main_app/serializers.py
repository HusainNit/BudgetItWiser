from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Budget, Expense

class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields =("id","user","month","year","total_budget","status","created_at","updated_at")
    
    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "email":obj.user.email
        }


class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    budget = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ("id","user","budget","expense_name","amount","expense_type","month","year","created_at","updated_at")

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "email":obj.user.email
        }
    
    def get_budget(self, obj):
        return {
            "id": obj.budget.id,
            "month": obj.budget.month,
            "year":obj.budget.year,
            "total_budget":obj.budget.total_budget,
            "status":obj.budget.status,
            "created_at":obj.budget.created_at,
            "updated_at":obj.budget.updated_at
        }
    
    def create(self, validated_data):
        return Expense.objects.create(**validated_data)


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email","password"]
        extra_kwargs = {'password':{"write_only":True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)