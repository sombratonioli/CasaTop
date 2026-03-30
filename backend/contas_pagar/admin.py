from django.contrib import admin
from .models import ContaPagar

@admin.register(ContaPagar)
class ContaPagarAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'pessoa', 'valor', 'data_vencimento', 'status')
    search_fields = ('descricao', 'pessoa__nome')
    list_filter = ('status', 'data_vencimento')
