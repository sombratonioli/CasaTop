from ninja import Router
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from ninja_jwt.authentication import JWTAuth
from .schemas import RegistroIn, MensagemOut, PerfilOut
from .models import Perfil

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
    Perfil.objects.create(usuario=user, nome_casa=payload.nome_casa)
    return 200, MensagemOut(mensagem="Usuário criado. Aguardando aprovação do administrador.")

@router.get("/me", auth=JWTAuth(), response=PerfilOut)
def get_me(request):
    perfil, _ = Perfil.objects.get_or_create(usuario=request.user)
    return perfil
