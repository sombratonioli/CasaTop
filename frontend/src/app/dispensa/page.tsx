'use client';

import React, { useState, useEffect } from 'react';
import { ItemDispensa, ItemDispensaCreate } from '@/types/dispensa';
import { getItens, updateItem, deleteItem, createItem } from '@/services/dispensa';
import { CardItem } from '@/components/CardItem';
import { ItemForm } from '@/components/ItemForm';
import { Button } from '@/components/Button';

export default function DispensaPage() {
    const [itens, setItens] = useState<ItemDispensa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchItens = async () => {
        try {
            setLoading(true);
            const data = await getItens();
            setItens(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar itens da dispensa');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItens();
    }, []);

    const handleCreate = async (data: ItemDispensaCreate) => {
        const newItem = await createItem(data);
        setItens([...itens, newItem]);
        setShowForm(false);
    };

    const handleIncrement = async (item: ItemDispensa) => {
        try {
            const novaQuantidade = parseFloat(item.quantidade_atual) + 1;
            const updatedItem = await updateItem(item.id, {
                quantidade_atual: novaQuantidade.toString()
            });
            setItens(itens.map(i => i.id === item.id ? updatedItem : i));
        } catch (err) {
            console.error('Erro ao incrementar item:', err);
        }
    };

    const handleDecrement = async (item: ItemDispensa) => {
        const quantidadeAtual = parseFloat(item.quantidade_atual);
        if (quantidadeAtual <= 0) return;

        try {
            const novaQuantidade = Math.max(0, quantidadeAtual - 1);
            const updatedItem = await updateItem(item.id, {
                quantidade_atual: novaQuantidade.toString()
            });
            setItens(itens.map(i => i.id === item.id ? updatedItem : i));
        } catch (err) {
            console.error('Erro ao decrementar item:', err);
        }
    };

    const handleDelete = async (item: ItemDispensa) => {
        if (!window.confirm(`Tem certeza que deseja remover ${item.nome} da dispensa?`)) {
            return;
        }

        try {
            await deleteItem(item.id);
            setItens(itens.filter(i => i.id !== item.id));
        } catch (err) {
            console.error('Erro ao deletar item:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Minha Dispensa
                    </h1>
                    <Button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Fechar Formulário' : '+ Novo Item'}
                    </Button>
                </div>

                {showForm && (
                    <div className="mb-8 transition-all duration-300 ease-in-out">
                        <ItemForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                                <button onClick={fetchItens} className="text-sm text-red-600 underline mt-2">
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : itens.length === 0 && !error ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum item</h3>
                        <p className="mt-1 text-sm text-gray-500">Sua dispensa está vazia. Adicione novos itens acima.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {itens.map((item) => (
                            <CardItem
                                key={item.id}
                                item={item}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

