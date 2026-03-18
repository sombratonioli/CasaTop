from ninja import Router
from ninja_jwt.authentication import JWTAuth

router = Router(auth=JWTAuth())
