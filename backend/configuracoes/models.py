from django.db import models

class ConfiguracaoSistema(models.Model):
    chave = models.CharField(max_length=100, unique=True)
    valor = models.CharField(max_length=255)
    descricao = models.TextField()

    def __str__(self):
        return self.chave
