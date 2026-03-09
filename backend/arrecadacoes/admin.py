from django.contrib import admin
from .models import Arrecadacao

@admin.register(Arrecadacao)
class ArrecadacaoAdmin(admin.ModelAdmin):
    list_display = ('competencia', 'valor_total', 'data_fechamento')
    search_fields = ('competencia',)
