from django.db import models
from django.contrib.auth import get_user_model
from pessoas.models import Pessoa

User = get_user_model()

class ContaPagar(models.Model):
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('pago', 'Pago'),
    )

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    pessoa = models.ForeignKey(Pessoa, on_delete=models.PROTECT)
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_vencimento = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')

    def __str__(self):
        return self.descricao
