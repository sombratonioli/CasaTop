from ninja import Schema
from datetime import date

class ContaPagarIn(Schema):
    pessoa_id: int
    descricao: str
    valor: float
    data_vencimento: date
    status: str = 'pendente'

class ContaPagarOut(Schema):
    id: int
    pessoa_id: int
    pessoa_nome: str
    descricao: str
    valor: float
    data_vencimento: date
    status: str
