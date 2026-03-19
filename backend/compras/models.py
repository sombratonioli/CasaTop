from django.db import models
from django.contrib.auth.models import User
from dispensa.models import ItemDispensa

class ListaCompra(models.Model):
    STATUS_CHOICES = [
        ('aberta', 'Aberta'),
        ('concluida', 'Concluída'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_criacao = models.DateTimeField(auto_now_add=True)
    mercado = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberta')

    def __str__(self):
        return f"Lista de Compra {self.id} - {self.status}"

class ItemListaCompra(models.Model):
    lista = models.ForeignKey(ListaCompra, on_delete=models.CASCADE, related_name='itens')
    item_dispensa = models.ForeignKey(ItemDispensa, on_delete=models.SET_NULL, null=True, blank=True)
    nome_avulso = models.CharField(max_length=255, blank=True, null=True)
    quantidade = models.DecimalField(max_digits=10, decimal_places=2)
    preco_unidade = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    comprado = models.BooleanField(default=False)

    def __str__(self):
        nome = self.item_dispensa.produto.nome if self.item_dispensa else self.nome_avulso
        return f"{self.quantidade} de {nome}"
