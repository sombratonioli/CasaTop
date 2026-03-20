import { BASE_URL } from './api';

export const fetchMe = async (token: string) => {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    }
    return null;
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/token/pair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
    });

    if (!response.ok) {
        throw new Error('Falha no login. Verifique suas credenciais.');
    }

    const data = await response.json();
    if (typeof window !== 'undefined') {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('user_email', email);
        
        const meData = await fetchMe(data.access);
        if (meData && meData.nome_casa) {
            localStorage.setItem('nome_casa', meData.nome_casa);
        }
    }
    return true;
};

export const register = async (first_name: string, email: string, password: string, nome_casa: string) => {
    const response = await fetch(`${BASE_URL}/auth/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, email, password, nome_casa }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensagem || 'Erro ao realizar cadastro.');
    }

    return await response.json();
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_email');
        window.location.href = '/login';
    }
};
