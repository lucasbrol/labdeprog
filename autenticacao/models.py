from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)  # Email obrigatório e único
    nome = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'  # Login será feito com email
    REQUIRED_FIELDS = ['nome']  # Não precisa de 'username' aqui, pois o Django já exige

    # Evitar conflito nos campos groups e user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_groups',  # Define um related_name único
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_user_permissions',  # Define um related_name único
        blank=True
    )

    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return self.email
