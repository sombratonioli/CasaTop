from ninja import Router
from ninja_jwt.authentication import JWTAuth
from typing import List
from django.shortcuts import get_object_or_404
from .models import ContaReceber
from pessoas.models import Pessoa
from .schemas import ContaIn, ContaOut

router = Router(auth=JWTAuth())

@router.get("/", response=List[ContaOut])
def list_contas(request):
    contas = ContaReceber.objects.filter(usuario=request.user).select_related('pessoa')
    return [
        ContaOut(
            id=conta.id,
            pessoa_id=conta.pessoa.id,
            pessoa_nome=conta.pessoa.nome,
            descricao=conta.descricao,
            valor=float(conta.valor),
            data_esperada=conta.data_esperada,
            status=conta.status
        )
        for conta in contas
    ]

@router.post("/", response=ContaOut)
def create_conta(request, payload: ContaIn):
    pessoa = get_object_or_404(Pessoa, id=payload.pessoa_id, usuario=request.user)
    conta = ContaReceber.objects.create(
        usuario=request.user,
        pessoa=pessoa,
        descricao=payload.descricao,
        valor=payload.valor,
        data_esperada=payload.data_esperada,
        status=payload.status
    )
    return ContaOut(
        id=conta.id,
        pessoa_id=conta.pessoa.id,
        pessoa_nome=conta.pessoa.nome,
        descricao=conta.descricao,
        valor=float(conta.valor),
        data_esperada=conta.data_esperada,
        status=conta.status
    )

@router.delete("/{conta_id}", response=dict)
def delete_conta(request, conta_id: int):
    conta = get_object_or_404(ContaReceber, id=conta_id, usuario=request.user)
    conta.delete()
    return {"success": True}
