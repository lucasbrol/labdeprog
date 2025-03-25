from django.contrib import admin
# Register your models here.
from .models import Usuario

# Registra o modelo Usuario no painel de administração
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('email', 'nome', 'is_active', 'is_staff')  # Campos a serem exibidos na lista
    search_fields = ('email', 'nome')  # Campos que podem ser pesquisados
    list_filter = ('is_active', 'is_staff')  # Filtros disponíveis para o painel

# Registra o modelo com a classe de administração
admin.site.register(Usuario, UsuarioAdmin)
