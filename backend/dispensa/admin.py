from django.contrib import admin
from .models import Categoria, ItemDispensa

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    search_fields = ('nome',)

@admin.register(ItemDispensa)
class ItemDispensaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'quantidade_atual', 'quantidade_minima', 'unidade_medida')
    list_filter = ('categoria', 'unidade_medida')
    search_fields = ('nome',)
