from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Pessoa(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, blank=True)

    def __str__(self):
        return self.nome
