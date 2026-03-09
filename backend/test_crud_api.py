import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/dispensa"

def print_result(step, response):
    print(f"\n--- {step} ---")
    print(f"Status: {response.status_code}")
    try:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    except:
        print(response.text)
    print("-" * 30)

def run_tests():
    print("Iniciando testes CRUD para o backend da Dispensa...")
    
    # 1. Criar Categoria
    cat_payload = {"nome": "Teste Categoria"}
    r = requests.post(f"{BASE_URL}/categorias", json=cat_payload)
    print_result("1. Criar Categoria", r)
    cat_id = r.json().get('id', None)

    # 2. Listar Categorias
    r = requests.get(f"{BASE_URL}/categorias")
    print_result("2. Listar Categorias", r)

    # 3. Criar Item (validação negativo tbm)
    item_payload = {
        "nome": "Arroz de Teste",
        "categoria_id": cat_id,
        "quantidade_atual": -5,  # Should become 0
        "quantidade_minima": 2,
        "unidade_medida": "PACOTE"
    }
    r = requests.post(f"{BASE_URL}/", json=item_payload)
    print_result("3. Criar Item (com qtde atual negativa)", r)
    item_id = r.json().get('id', None)

    # 4. Listar Itens
    r = requests.get(f"{BASE_URL}/")
    print_result("4. Listar Itens (geral)", r)

    # 5. Lista de Compras (Arroz deve aparecer pq 0 <= 2)
    r = requests.get(f"{BASE_URL}/compras")
    print_result("5. Lista de Compras", r)

    # 6. Atualizar Item
    update_payload = {
        "quantidade_atual": 5
    }
    r = requests.patch(f"{BASE_URL}/{item_id}", json=update_payload)
    print_result("6. Atualizar Item (qte aumentada para 5)", r)

    # 7. Lista de Compras (Arroz NÃO deve aparecer pq 5 > 2)
    r = requests.get(f"{BASE_URL}/compras")
    print_result("7. Lista de Compras (Após upgrade de estoque)", r)

    # 8. Deletar Item
    r = requests.delete(f"{BASE_URL}/{item_id}")
    print_result("8. Deletar Item", r)

if __name__ == "__main__":
    run_tests()
