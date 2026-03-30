from ninja import Router
from ninja_jwt.authentication import JWTAuth
from typing import List
from django.shortcuts import get_object_or_404
from .models import Pessoa
from .schemas import PessoaIn, PessoaOut

router = Router(auth=JWTAuth())

@router.get("/", response=List[PessoaOut])
def list_pessoas(request):
    return Pessoa.objects.filter(usuario=request.user)

@router.post("/", response=PessoaOut)
def create_pessoa(request, payload: PessoaIn):
    return Pessoa.objects.create(**payload.dict(), usuario=request.user)

@router.delete("/{pessoa_id}", response=dict)
def delete_pessoa(request, pessoa_id: int):
    pessoa = get_object_or_404(Pessoa, id=pessoa_id, usuario=request.user)
    pessoa.delete()
    return {"success": True}
