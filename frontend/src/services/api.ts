export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
    const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : '',
        ...options?.headers,
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401 && typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
            try {
                const refreshRes = await fetch(`${BASE_URL}/token/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh: refreshToken })
                });

                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    localStorage.setItem('access', data.access);

                    // Refaz a requisição original com o novo token
                    const newHeaders = new Headers(options?.headers as any);
                    newHeaders.set('Authorization', `Bearer ${data.access}`);
                    const newResponse = await fetch(url, { ...options, headers: newHeaders });
                    
                    if (newResponse.status === 204 || newResponse.headers.get('content-length') === '0') {
                        return null;
                    }
                    return newResponse.json();
                }
            } catch (error) {
                console.error("Erro ao renovar token", error);
            }
        }
        // Se chegou aqui, o refresh falhou ou não existe. Aí sim, limpa e desloga.
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return null;
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${errorData.message || response.statusText}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return response.json();
};
