from django.contrib import admin
from .models import Pessoa

@admin.register(Pessoa)
class PessoaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_cnpj', 'email', 'telefone', 'tipo')
    search_fields = ('nome', 'cpf_cnpj')
    list_filter = ('tipo',)
