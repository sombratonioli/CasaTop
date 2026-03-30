from ninja import Schema
from datetime import date

class ContaIn(Schema):
    pessoa_id: int
    descricao: str
    valor: float
    data_esperada: date
    status: str = 'pendente'

class ContaOut(Schema):
    id: int
    pessoa_id: int
    pessoa_nome: str
    descricao: str
    valor: float
    data_esperada: date
    status: str
