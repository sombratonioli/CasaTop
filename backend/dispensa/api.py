from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import F
from ninja import Router

from .models import ItemDispensa
from .schemas import ItemDispensaSchema, ItemDispensaCreateSchema, ItemDispensaUpdateSchema

router = Router()

@router.get("/", response=List[ItemDispensaSchema])
def list_items(request):
    return ItemDispensa.objects.all()

@router.get("/compras", response=List[ItemDispensaSchema])
def list_compras(request):
    return ItemDispensa.objects.filter(quantidade_atual__lte=F('quantidade_minima'))

@router.post("/", response=ItemDispensaSchema)
def create_item(request, payload: ItemDispensaCreateSchema):
    item = ItemDispensa.objects.create(**payload.dict())
    return item

@router.patch("/{item_id}", response=ItemDispensaSchema)
def update_item(request, item_id: int, payload: ItemDispensaUpdateSchema):
    item = get_object_or_404(ItemDispensa, id=item_id)
    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(item, attr, value)
    item.save()
    return item

@router.delete("/{item_id}")
def delete_item(request, item_id: int):
    item = get_object_or_404(ItemDispensa, id=item_id)
    item.delete()
    return {"success": True}
