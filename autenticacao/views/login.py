from django.shortcuts import render, redirect
from django.contrib import messages
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

        token = hashlib.sha256(f"{email}{senha}".encode()).hexdigest()

        try:
            with open(caminho, 'r+') as f:
                try:
                    usuarios = json.load(f)
                except json.JSONDecodeError:
                    usuarios = []

                for user in usuarios:
                    if user['email'] == email and user['token'] == token:
                        request.session['user'] = email
                        return redirect('home')

                usuarios.append({'email': email, 'token': token})
                f.seek(0)
                f.truncate()
                json.dump(usuarios, f, indent=4)

                request.session['user'] = email
                return redirect('home')

        except FileNotFoundError:
            with open(caminho, 'w') as f:
                json.dump([{'email': email, 'token': token}], f, indent=4)

            request.session['user'] = email
            return redirect('home')

        messages.error(request, "Credenciais inválidas!")
        return redirect('login')
