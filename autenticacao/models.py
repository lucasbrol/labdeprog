from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'nome']

    # Evitar o conflito nos campos groups e user_permissions com o related_name
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_set',  # Define o related_name para evitar conflito
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_permissions',  # Define o related_name para evitar conflito
        blank=True
    )

    def __str__(self):
        return self.email


