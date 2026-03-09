from django.db import models

class Arrecadacao(models.Model):
    competencia = models.CharField(max_length=10) # Ex: 03/2026
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    data_fechamento = models.DateField()

    def __str__(self):
        return f"Arrecadação - {self.competencia}"
