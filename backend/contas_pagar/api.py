from ninja import Router
from ninja_jwt.authentication import JWTAuth
from typing import List
from django.shortcuts import get_object_or_404
from .models import ContaPagar
from pessoas.models import Pessoa
from .schemas import ContaPagarIn, ContaPagarOut

router = Router(auth=JWTAuth())

@router.get("/", response=List[ContaPagarOut])
def list_contas_pagar(request):
    contas = ContaPagar.objects.filter(usuario=request.user).select_related('pessoa')
    return [
        ContaPagarOut(
            id=conta.id,
            pessoa_id=conta.pessoa.id,
            pessoa_nome=conta.pessoa.nome,
            descricao=conta.descricao,
            valor=float(conta.valor),
            data_vencimento=conta.data_vencimento,
            status=conta.status
        )
        for conta in contas
    ]

@router.post("/", response=ContaPagarOut)
def create_conta_pagar(request, payload: ContaPagarIn):
    pessoa = get_object_or_404(Pessoa, id=payload.pessoa_id, usuario=request.user)
    conta = ContaPagar.objects.create(
        usuario=request.user,
        pessoa=pessoa,
        descricao=payload.descricao,
        valor=payload.valor,
        data_vencimento=payload.data_vencimento,
        status=payload.status
    )
    return ContaPagarOut(
        id=conta.id,
        pessoa_id=conta.pessoa.id,
        pessoa_nome=conta.pessoa.nome,
        descricao=conta.descricao,
        valor=float(conta.valor),
        data_vencimento=conta.data_vencimento,
        status=conta.status
    )

@router.delete("/{conta_id}", response=dict)
def delete_conta_pagar(request, conta_id: int):
    conta = get_object_or_404(ContaPagar, id=conta_id, usuario=request.user)
    conta.delete()
    return {"success": True}
