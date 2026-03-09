from django.contrib import admin
from .models import RelatorioGerado

@admin.register(RelatorioGerado)
class RelatorioGeradoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo', 'data_geracao')
    search_fields = ('nome', 'tipo')
    list_filter = ('tipo', 'data_geracao')
