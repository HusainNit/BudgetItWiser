from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, ExpenseViewSet

router = DefaultRouter()
router.register(r'budget', BudgetViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
   path('api/', include(router.urls)),
]
