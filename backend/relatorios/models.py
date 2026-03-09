from django.db import models

class RelatorioGerado(models.Model):
    nome = models.CharField(max_length=255)
    tipo = models.CharField(max_length=100)
    data_geracao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.tipo}) - {self.data_geracao.strftime('%d/%m/%Y %H:%M')}"
