from django.contrib import admin
from django.urls import path, include
from autenticacao.views import home  

urlpatterns = [
    path('', include('autenticacao.urls')),  # Inclui as URLs do app autenticacao
    path('admin/', admin.site.urls),  
]
