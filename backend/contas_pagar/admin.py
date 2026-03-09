from django.contrib import admin
from .models import ContaPagar

@admin.register(ContaPagar)
class ContaPagarAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'valor', 'vencimento', 'pago')
    search_fields = ('descricao',)
    list_filter = ('pago', 'vencimento')
