'use client';

import React, { useState, useEffect } from 'react';
import { ItemDispensa, ItemDispensaCreate, ItemDispensaUpdate } from '@/types/dispensa';
import { getItens, updateItem, deleteItem, createItem } from '@/services/dispensa';
import { DataTable } from '@/components/DataTable';
import { Edit2, Trash2 } from 'lucide-react';
import { DispensaForm } from '@/components/DispensaForm';
import { Modal } from '@/components/Modal';
import { ConfirmModal } from '@/components/ConfirmModal';

export default function ComprasPage() {
    const [itens, setItens] = useState<ItemDispensa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemDispensa | null>(null);
    const [filter, setFilter] = useState<'MISSING' | 'ALL'>('MISSING');
    const [deletingItem, setDeletingItem] = useState<ItemDispensa | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchItens = async () => {
        try {
            setLoading(true);
            const data = await getItens();
            setItens(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar itens da dispensa');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItens();
    }, []);

    const filteredItems = itens.filter(item => {
        // Toggle Filter: MISSING (<= min) or ALL
        const isMissingRow = parseFloat(item.quantidade_atual) <= parseFloat(item.quantidade_minima);
        const matchesTab = filter === 'ALL' || isMissingRow;

        // Search text (case insensitive)
        const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const handleCreateOrUpdate = async (data: ItemDispensaCreate | ItemDispensaUpdate) => {
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
        } catch (err) {
            console.error('Erro ao salvar item:', err);
            alert('Erro ao salvar item.');
        }
    };

    const handleEdit = (item: ItemDispensa) => {
        setEditingItem(item);
        setShowForm(true);
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Lista de Compras
                    </h1>

                    {/* Toggle Button */}
                    <div className="flex items-center bg-gray-200 p-1 rounded-lg">
                        <button
                            onClick={() => setFilter('MISSING')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${filter === 'MISSING'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Apenas Falta
                        </button>
                        <button
                            onClick={() => setFilter('ALL')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${filter === 'ALL'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Todos os Itens
                        </button>
                    </div>
                </div>

                <Modal
                    isOpen={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                    title={editingItem ? "Editar Item" : "Novo Item"}
                >
                    <DispensaForm
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <DataTable
                        columns={['NOME', 'CATEGORIA', 'QTD ATUAL', 'QTD MÍNIMA', 'MEDIDA', 'AÇÕES']}
                        onSearch={setSearchTerm}
                        onAdd={() => {
                            setEditingItem(null);
                            setShowForm(true);
                        }}
                    >
                        {filteredItems.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                    Nenhum item na lista de compras.
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map((item) => {
                                const qtdAtual = parseFloat(item.quantidade_atual);
                                const qtdMinima = parseFloat(item.quantidade_minima);
                                const isEmFalta = qtdAtual === 0;
                                const isEstoqueBaixo = qtdAtual > 0 && qtdAtual <= qtdMinima;

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                {item.nome}
                                                {isEmFalta && <span className="w-2 h-2 rounded-full bg-red-500 inline-block" title="Em Falta"></span>}
                                                {isEstoqueBaixo && <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" title="Estoque Baixo"></span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.categoria ? item.categoria.nome : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`text-sm font-bold ${isEmFalta ? 'text-red-600' : isEstoqueBaixo ? 'text-yellow-600' : 'text-gray-900'}`}>
                                                {item.quantidade_atual}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 font-medium">
                                            {item.quantidade_minima}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.unidade_medida}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRequest(item)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </DataTable>
                )}
            </div>
        </div>
    );
}
