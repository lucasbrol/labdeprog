from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate
import json, os, hashlib

caminho = os.path.join(os.path.dirname(__file__), 'users.json')

def login_view(request):
    if request.method == 'GET':
        return render(request, 'tela.html')

    elif request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        if not email or not senha:
            messages.error(request, "Todos os campos são obrigatórios!")
            return redirect("login")

        user = authenticate(request, username=email, password=senha)
        if user is None:
            messages.error(request, "Credenciais inválidas!")
            return redirect('login')

        token = hashlib.sha256(f"{email}{senha}".encode()).hexdigest()

        try:
            with open(caminho, 'r+') as f:
                try:
                    usuarios = json.load(f)
                except json.JSONDecodeError:
                    usuarios = []

                if not any(user['email'] == email and user['token'] == token for user in usuarios):
                    usuarios.append({'email': email, 'token': token})
                    f.seek(0)
                    f.truncate()
                    json.dump(usuarios, f, indent=4)

        except FileNotFoundError:
            with open(caminho, 'w') as f:
                json.dump([{'email': email, 'token': token}], f, indent=4)

        request.session['user'] = email
        return redirect('home')
