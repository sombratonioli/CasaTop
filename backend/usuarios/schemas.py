from ninja import Schema

class RegistroIn(Schema):
    first_name: str
    email: str
    password: str

class MensagemOut(Schema):
    mensagem: str
