from ninja import ModelSchema, Schema
from typing import Optional
from decimal import Decimal
from .models import Categoria, ItemDispensa

class CategoriaSchema(ModelSchema):
    class Meta:
        model = Categoria
        fields = ["id", "nome"]

class CategoriaCreateSchema(Schema):
    nome: str

class ItemDispensaSchema(ModelSchema):
    categoria: Optional[CategoriaSchema] = None

    class Meta:
        model = ItemDispensa
        fields = "__all__"

class ItemDispensaCreateSchema(Schema):
    nome: str
    categoria_id: Optional[int] = None
    quantidade_atual: Decimal
    quantidade_minima: Decimal
    unidade_medida: str

class ItemDispensaUpdateSchema(Schema):
    nome: Optional[str] = None
    categoria_id: Optional[int] = None
    quantidade_atual: Optional[Decimal] = None
    quantidade_minima: Optional[Decimal] = None
    unidade_medida: Optional[str] = None
