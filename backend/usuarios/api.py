from ninja import Router
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .schemas import RegistroIn, MensagemOut

router = Router()

@router.post("/registro", response={200: MensagemOut, 400: MensagemOut})
def registro(request, payload: RegistroIn):
    if User.objects.filter(email=payload.email).exists():
        return 400, MensagemOut(mensagem="E-mail já cadastrado.")
    
    user = User.objects.create(
        username=payload.email,
        email=payload.email,
        first_name=payload.first_name,
        password=make_password(payload.password),
        is_active=False
    )
    return 200, MensagemOut(mensagem="Usuário criado. Aguardando aprovação do administrador.")
