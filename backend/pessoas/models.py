from django.db import models

class Pessoa(models.Model):
    TIPO_CHOICES = [
        ('Morador', 'Morador'),
        ('Funcionario', 'Funcionário'),
        ('Fornecedor', 'Fornecedor'),
    ]

    nome = models.CharField(max_length=255)
    cpf_cnpj = models.CharField(max_length=20)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    def __str__(self):
        return self.nome
