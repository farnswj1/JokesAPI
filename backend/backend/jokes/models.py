from django.db import models
from django.core.validators import (
    MinLengthValidator,
    MaxLengthValidator,
    RegexValidator
)

# Create your models here.
class Joke(models.Model):
    title = models.CharField(
        max_length=100,
        null=False,
        validators=[
            MinLengthValidator(1),
            MaxLengthValidator(100),
            RegexValidator(r'^[^\n]+$')
        ]
    )
    body = models.CharField(
        max_length=1000,
        null=False,
        validators=[
            MinLengthValidator(1),
            MaxLengthValidator(1000)
        ]
    )

    def __str__(self):
        return str(self.id) + ": " + self.title

    class Meta:
        ordering = ("id",)
