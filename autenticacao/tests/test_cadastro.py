import pytest
from django.urls import reverse
from bs4 import BeautifulSoup

@pytest.mark.django_db
def test_botao_cadastro_esta_desabilitado(client):
    response = client.get(reverse('cadastro'))
    soup = BeautifulSoup(response.content, 'html.parser')
    botao = soup.find('button', {'type': 'submit'})
    assert botao is not None, "Botão de submit não encontrado"
    assert botao.has_attr('disabled'), "Botão de cadastro deveria estar desabilitado"
