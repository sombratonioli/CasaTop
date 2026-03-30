from django.contrib import admin
from .models import ContaReceber

@admin.register(ContaReceber)
class ContaReceberAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'pessoa', 'valor', 'data_esperada', 'status')
    search_fields = ('descricao', 'pessoa__nome')
    list_filter = ('status', 'data_esperada')
