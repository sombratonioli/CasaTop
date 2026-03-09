from django.contrib import admin
from .models import ContaReceber

@admin.register(ContaReceber)
class ContaReceberAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'valor', 'vencimento', 'recebido')
    search_fields = ('descricao',)
    list_filter = ('recebido', 'vencimento')
