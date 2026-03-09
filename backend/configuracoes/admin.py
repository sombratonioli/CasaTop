from django.contrib import admin
from .models import ConfiguracaoSistema

@admin.register(ConfiguracaoSistema)
class ConfiguracaoSistemaAdmin(admin.ModelAdmin):
    list_display = ('chave', 'valor', 'descricao')
    search_fields = ('chave',)
