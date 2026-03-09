'use client';

import React, { useState, useEffect } from 'react';
import { ItemDispensa, ItemDispensaCreate } from '@/types/dispensa';
import { getItens, updateItem, deleteItem, createItem } from '@/services/dispensa';
import { ItemTable } from '@/components/ItemTable';
import { ItemForm } from '@/components/ItemForm';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ConfirmModal } from '@/components/ConfirmModal';

export default function DispensaPage() {
    const [itens, setItens] = useState<ItemDispensa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemDispensa | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'COMPRAS'>('ALL');
    const [deletingItem, setDeletingItem] = useState<ItemDispensa | null>(null);

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

    const filteredItems = filter === 'ALL'
        ? itens
        : itens.filter(i => parseFloat(i.quantidade_atual) <= parseFloat(i.quantidade_minima));

    const handleCreateOrUpdate = async (data: ItemDispensaCreate | any) => {
        try {
            if (editingItem) {
                const updatedItem = await updateItem(editingItem.id, data);
                setItens(itens.map(i => i.id === editingItem.id ? updatedItem : i));
            } else {
                const newItem = await createItem(data as ItemDispensaCreate);
                setItens([...itens, newItem]);
            }
            setShowForm(false);
            setEditingItem(null);
        } catch (err: any) {
            console.error('Erro ao salvar item:', err);
            alert('Erro ao salvar item.');
        }
    };

    const handleEdit = (item: ItemDispensa) => {
        setEditingItem(item);
        setShowForm(true);
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

    const handleDeleteRequest = (item: ItemDispensa) => {
        setDeletingItem(item);
    };

    const confirmDelete = async () => {
        if (!deletingItem) return;

        try {
            await deleteItem(deletingItem.id);
            setItens(itens.filter(i => i.id !== deletingItem.id));
        } catch (err) {
            console.error('Erro ao deletar item:', err);
        } finally {
            setDeletingItem(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Minha Dispensa
                    </h1>
                    <Button onClick={() => {
                        setEditingItem(null);
                        setShowForm(!showForm);
                    }}>
                        {showForm ? 'Fechar Formulário' : '+ Novo Item'}
                    </Button>
                </div>

                <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                        className={`pb-2 px-1 text-sm font-medium ${filter === 'ALL' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setFilter('ALL')}
                    >
                        Todos os Itens
                    </button>
                    <button
                        className={`pb-2 px-1 text-sm font-medium ${filter === 'COMPRAS' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setFilter('COMPRAS')}
                    >
                        Lista de Compras
                    </button>
                </div>

                <Modal
                    isOpen={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                    title={editingItem ? "Editar Item" : "Novo Item"}
                >
                    <ItemForm
                        onSubmit={handleCreateOrUpdate}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingItem(null);
                        }}
                        initialData={editingItem ? {
                            id: editingItem.id,
                            nome: editingItem.nome,
                            categoria_id: editingItem.categoria?.id || null,
                            quantidade_atual: editingItem.quantidade_atual,
                            quantidade_minima: editingItem.quantidade_minima,
                            unidade_medida: editingItem.unidade_medida
                        } : undefined}
                    />
                </Modal>

                <ConfirmModal
                    isOpen={deletingItem !== null}
                    onClose={() => setDeletingItem(null)}
                    onConfirm={confirmDelete}
                    title="Excluir Item"
                    message={`Tem certeza que deseja remover "${deletingItem?.nome}" da dispensa? Esta ação não pode ser desfeita.`}
                    confirmText="Sim, excluir"
                    cancelText="Não, cancelar"
                />

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
                ) : (
                    <ItemTable
                        itens={filteredItems}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onDelete={handleDeleteRequest}
                        onEdit={handleEdit}
                    />
                )}
            </div>
        </div>
    );
}

