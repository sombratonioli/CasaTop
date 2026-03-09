from django.db import models

class ContaReceber(models.Model):
    descricao = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    vencimento = models.DateField()
    recebido = models.BooleanField(default=False)

    def __str__(self):
        return self.descricao
