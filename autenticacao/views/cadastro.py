from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from autenticacao.models import Usuario
import re

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def cadastro_view(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')

    elif request.method == "POST":
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        if not email or not senha:
            messages.error(request, "Todos os campos são obrigatórios!")
            return redirect('cadastro')

        if not re.match(EMAIL_REGEX, email):
            messages.error(request, "Formato de email inválido!")
            return redirect('cadastro')

        try:
            validate_email(email)
        except ValidationError:
            messages.error(request, "Email inválido!")
            return redirect('cadastro')

        if Usuario.objects.filter(email=email).exists():
            messages.error(request, "Email já cadastrado.")
            return redirect('cadastro')

        Usuario.objects.create_user(username=email, email=email, password=senha)

        messages.success(request, "Cadastro realizado com sucesso!")
        return redirect('login')