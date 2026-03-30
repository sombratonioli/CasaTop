from ninja import Schema
from typing import Optional

class PessoaIn(Schema):
    nome: str
    cpf: Optional[str] = ""

class PessoaOut(Schema):
    id: int
    nome: str
    cpf: str
