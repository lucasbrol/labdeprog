from django.urls import path
from autenticacao.views import login, home, cadastro

urlpatterns = [
    path('', login.login_view, name='login'),
    path('home/', home.home_view, name='home'),
    path('cadastro/', cadastro.cadastro_view, name='cadastro'),
]
