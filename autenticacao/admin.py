from django.contrib import admin
from .models import Usuario

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('email', 'nome', 'is_active', 'is_staff')  
    search_fields = ('email', 'nome')  
    list_filter = ('is_active', 'is_staff')  

admin.site.register(Usuario, UsuarioAdmin)
