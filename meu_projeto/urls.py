from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('autenticacao.urls')),
    path('home/', include('home.urls')),
]
