import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User

admin_email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
admin_pass = os.environ.get('ADMIN_PASS', 'senha_padrao_insegura')

# Verifica se o usuário 'admin' já existe para não dar erro em deploys futuros
if not User.objects.filter(username='admin').exists():
    print(f"Criando superusuário com email: {admin_email}")
    User.objects.create_superuser('admin', admin_email, admin_pass)
    print("Superusuário criado com sucesso!")
else:
    print("Superusuário 'admin' já existe no banco de dados.")
