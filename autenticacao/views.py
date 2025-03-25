from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import re

# Obtém o modelo de usuário correto
User = get_user_model()

# Expressão regular para validar email
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def registrar_usuario(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')  # Exibe a página de cadastro

    elif request.method == "POST":
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        nome = request.POST.get('nome')  # Pegando o nome do usuário

        # Verifica se os campos foram preenchidos corretamente
        if not email or not senha or not nome:
            messages.error(request, "Todos os campos são obrigatórios!")
            return redirect('cadastro')

        # Verifica se o email está no formato correto
        if not re.match(EMAIL_REGEX, email):
            messages.error(request, "Formato de email inválido!")
            return redirect('cadastro')

        # Valida o email com o Django
        try:
            validate_email(email)
        except ValidationError:
            messages.error(request, "Email inválido!")
            return redirect('cadastro')

        # Verifica se o email já existe no banco de dados
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email já cadastrado!")
            return redirect('cadastro')

        # Cria o usuário se tudo estiver correto
        try:
            user = User.objects.create_user(
                username=email,  # Django usa "username" internamente, mas pode ser o email
                email=email,
                password=senha,
                nome=nome  # Adicionando o nome do usuário
            )
            messages.success(request, "Usuário cadastrado com sucesso! Faça login.")
            return redirect("login")  # Redireciona para login após cadastro
        except Exception as e:
            messages.error(request, f"Erro ao cadastrar usuário: {str(e)}")
            return redirect('cadastro')

def login_usuario(request):
    if request.method == 'GET':
        return render(request, 'tela.html')  # Exibe a página de login

    elif request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        # Buscar usuário pelo email (o Django autentica pelo USERNAME_FIELD, que agora é email)
        user = User.objects.filter(email=email).first()

        if user:  # Se encontrou o usuário, tenta autenticar
            user = authenticate(request, username=user.email, password=senha)

        if user:
            login(request, user)  # Faz login do usuário
            return redirect('home')  # Redireciona para a página inicial

        messages.error(request, "Credenciais inválidas!")  # Exibe erro corretamente
        return redirect('login')  # Mantém na tela de login

@login_required
def home(request):
    return render(request, 'home.html')  # Agora renderiza a página correta

def cadastro(request):
    return render(request, 'cadastro.html')
