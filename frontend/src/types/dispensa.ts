export interface Categoria {
    id: number;
    nome: string;
}

export interface ItemDispensa {
    id: number;
    nome: string;
    categoria: Categoria | null;
    quantidade_atual: string;
    quantidade_minima: string;
    unidade_medida: string;
}

export interface ItemDispensaCreate {
    nome: string;
    categoria_id?: number | null;
    quantidade_atual: string | number;
    quantidade_minima: string | number;
    unidade_medida: string;
}

export interface ItemDispensaUpdate {
    nome?: string;
    categoria_id?: number | null;
    quantidade_atual?: string | number;
    quantidade_minima?: string | number;
    unidade_medida?: string;
}
