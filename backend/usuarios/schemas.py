from ninja import Schema

class RegistroIn(Schema):
    first_name: str
    email: str
    password: str
    nome_casa: str

class MensagemOut(Schema):
    mensagem: str

class PerfilOut(Schema):
    nome_casa: str
