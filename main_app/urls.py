from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, ExpenseViewSet, SignUpView, UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r"budget", BudgetViewSet)
router.register(r"expenses", ExpenseViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("auth/sign-in/", TokenObtainPairView.as_view()),
    path("auth/sign-up/", SignUpView.as_view()),
    path("auth/user/", UserViewSet.as_view())
]
