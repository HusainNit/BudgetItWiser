from django.db import models
from django.db import transaction
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver
from decimal import Decimal

# Create your models here.
class Budget(models.Model):
    STATUS_CHOICES = [
        ('ok', 'Within Budget'),
        ('warning', 'Near Limit'),
        ('over', 'Over Budget'),
    ]
     
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    month = models.IntegerField()
    year = models.IntegerField()
    total_budget = models.DecimalField(max_digits=10, decimal_places=4)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ok')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def update_status(self):
        total_expenses = sum(e.amount for e in self.expense_set.all())
        if total_expenses > self.total_budget:
            self.status = 'over'
        elif total_expenses >= Decimal("0.85") * self.total_budget:
            self.status = 'warning'
        else:
            self.status = 'ok'
        self.save()

    class Meta:
        db_table ="Budget"


class Expense(models.Model):
    FIXED = 'fixed'
    ONE_TIME = 'one_time'
    TYPES = [(FIXED, 'Fixed'), (ONE_TIME, 'One-Time')]

    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    expense_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=4)
    expense_type = models.CharField(max_length=10, choices=TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        with transaction.atomic():
            super().save(*args, **kwargs)
            self.budget.update_status()
    
    @property
    def user(self):
        return self.budget.user

    class Meta:
        db_table = "Expense"


@receiver(post_delete, sender=Expense)
def update_budget_on_delete(sender, instance, **kwargs):
    if instance.budget:
        instance.budget.update_status()