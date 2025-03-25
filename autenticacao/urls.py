from django.urls import path
from .views import login_usuario, home, registrar_usuario
from . import views
from.views import home

urlpatterns = [
    path('', home, name='home'),  
    path('login/', login_usuario, name='login'),
    path('cadastro/', registrar_usuario, name='cadastro'), 
    #path('logout/', LogoutView.as_view(next_page='login'), name='logout'),  
     
]
