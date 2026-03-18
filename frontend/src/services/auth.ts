import { BASE_URL } from './api';

export const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/token`, {
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
        if (data.refresh) {
            localStorage.setItem('refresh', data.refresh);
        }
    }
    return true;
};

export const register = async (first_name: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, email, password }),
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
        window.location.href = '/login';
    }
};
