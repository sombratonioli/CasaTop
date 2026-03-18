from django.db import models
from django.contrib.auth.models import User

class Categoria(models.Model):
    nome = models.CharField(max_length=255)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome

class ItemDispensa(models.Model):
    UNIDADE_CHOICES = [
        ('KG', 'KG'),
        ('UNIDADE', 'UNIDADE'),
        ('PACOTE', 'PACOTE'),
        ('CAIXA', 'CAIXA'),
        ('LITRO', 'LITRO'),
        ('GRAMAS', 'GRAMAS'),
    ]

    nome = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    quantidade_atual = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade_minima = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade_ideal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True, null=True)
    unidade_medida = models.CharField(max_length=20, choices=UNIDADE_CHOICES)

    def __str__(self):
        return self.nome
