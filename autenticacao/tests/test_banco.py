import pytest
from django.contrib.auth import get_user_model

@pytest.mark.django_db
def test_banco_criacao_usuario():
    User = get_user_model()
    usuario = User.objects.create_user(email='bd@exemplo.com', password='senha123')
    assert User.objects.get(email='bd@exemplo.com') == usuario
