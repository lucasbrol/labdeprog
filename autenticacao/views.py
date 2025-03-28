from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import re

User = get_user_model()

# Expressão regular para validar email
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def registrar_usuario(request):
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

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email já cadastrado!")
            return redirect('cadastro')

        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=senha,
            )
            messages.success(request, "Usuário cadastrado com sucesso! Faça login.")
            return redirect("login") 
        except Exception as e:
            messages.error(request, f"Erro ao cadastrar usuário: {str(e)}")
            return redirect('cadastro')

def login_usuario(request):
    if request.method == 'GET':
        return render(request, 'tela.html')

    elif request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        user = User.objects.filter(email=email).first()

        if user:
            user = authenticate(request, username=user.email, password=senha)

        if user:
            login(request, user)
            return redirect('home')

        messages.error(request, "Credenciais inválidas!")
        return redirect('login')

@login_required
def home(request):
    return render(request, 'home.html')

def cadastro(request):
    return render(request, 'cadastro.html')
