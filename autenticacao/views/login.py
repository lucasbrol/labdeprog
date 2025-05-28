from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate
import json
import os
import hashlib

caminho_users_json = os.path.join(os.path.dirname(__file__), 'users.json')

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

        if user is not None:
            token = hashlib.sha256(f"{email}{senha}".encode()).hexdigest()

            try:
                with open(caminho_users_json, 'r+') as f:
                    try:
                        usuarios_registrados = json.load(f)
                    except json.JSONDecodeError:
                        usuarios_registrados = []

                    usuario_encontrado = False
                    for u in usuarios_registrados:
                        if u.get('email') == email and u.get('token') == token:
                            usuario_encontrado = True
                            break
                    
                    if not usuario_encontrado:
                        usuarios_registrados.append({'email': email, 'token': token})
                        f.seek(0)
                        f.truncate()
                        json.dump(usuarios_registrados, f, indent=4)

            except FileNotFoundError:
                with open(caminho_users_json, 'w') as f:
                    json.dump([{'email': email, 'token': token}], f, indent=4)
            
            request.session['user'] = email
            return redirect('home')
        else:
            messages.error(request, "Credenciais inválidas!")
            return redirect('login')

    return redirect('login')