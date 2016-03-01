from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, unique=True)
    picture = models.TextField()
    type = models.TextField(choices=(('C', 'Commuter'), ('O', 'Operator')),
                            default='C')
