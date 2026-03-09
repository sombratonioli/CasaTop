from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import F
from ninja import Router

from .models import ItemDispensa, Categoria
from .schemas import ItemDispensaSchema, ItemDispensaCreateSchema, ItemDispensaUpdateSchema, CategoriaSchema, CategoriaCreateSchema

router = Router()

@router.get("/categorias", response=List[CategoriaSchema])
def list_categorias(request):
    return Categoria.objects.all()

@router.post("/categorias", response=CategoriaSchema)
def create_categoria(request, payload: CategoriaCreateSchema):
    categoria = Categoria.objects.create(**payload.dict())
    return categoria

@router.get("/", response=List[ItemDispensaSchema])
def list_items(request):
    return ItemDispensa.objects.all()

@router.get("/compras", response=List[ItemDispensaSchema])
def list_compras(request):
    return ItemDispensa.objects.filter(quantidade_atual__lte=F('quantidade_minima'))

@router.post("/", response=ItemDispensaSchema)
def create_item(request, payload: ItemDispensaCreateSchema):
    context = payload.dict()
    if context.get('quantidade_atual') < 0:
        context['quantidade_atual'] = 0
    if context.get('quantidade_minima') < 0:
        context['quantidade_minima'] = 0
        
    item = ItemDispensa.objects.create(**context)
    return item

@router.patch("/{item_id}", response=ItemDispensaSchema)
def update_item(request, item_id: int, payload: ItemDispensaUpdateSchema):
    item = get_object_or_404(ItemDispensa, id=item_id)
    
    update_data = payload.dict(exclude_unset=True)
    if update_data.get('quantidade_atual') is not None and update_data['quantidade_atual'] < 0:
        update_data['quantidade_atual'] = 0
    if update_data.get('quantidade_minima') is not None and update_data['quantidade_minima'] < 0:
        update_data['quantidade_minima'] = 0

    for attr, value in update_data.items():
        setattr(item, attr, value)
    item.save()
    return item

@router.delete("/{item_id}")
def delete_item(request, item_id: int):
    item = get_object_or_404(ItemDispensa, id=item_id)
    item.delete()
    return {"success": True}
