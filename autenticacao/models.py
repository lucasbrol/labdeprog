from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UsuarioManager

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)  
    nome = models.CharField(max_length=100)
    token = models.CharField(max_length=64, blank=True, null=True)

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['nome']  

    objects = UsuarioManager()
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_groups',  
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_user_permissions', 
        blank=True
    )

    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return self.email

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=50)
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)

    def __str__(self):
        return self.nome
