import { fetchApi } from './api';
import { ItemDispensa, ItemDispensaCreate, ItemDispensaUpdate, Categoria } from '../types/dispensa';

export const getItens = async (): Promise<ItemDispensa[]> => {
    return fetchApi('dispensa/');
};

export const getCompras = async (): Promise<ItemDispensa[]> => {
    return fetchApi('dispensa/compras');
};

export const getCategorias = async (): Promise<Categoria[]> => {
    return fetchApi('dispensa/categorias');
};

export const createCategoria = async (data: { nome: string }): Promise<Categoria> => {
    return fetchApi('dispensa/categorias', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const createItem = async (data: ItemDispensaCreate): Promise<ItemDispensa> => {
    return fetchApi('dispensa/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateItem = async (id: number, data: ItemDispensaUpdate): Promise<ItemDispensa> => {
    return fetchApi(`dispensa/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
};

export const deleteItem = async (id: number): Promise<void> => {
    return fetchApi(`dispensa/${id}`, {
        method: 'DELETE',
    });
};
