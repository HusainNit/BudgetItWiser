from django.contrib import admin
from .models import Budget
from .models import Expense

# Register your models here.
admin.site.register(Budget)
admin.site.register(Expense)