import React, { useState, useEffect } from 'react';
import { ItemDispensaCreate, ItemDispensaUpdate, Categoria } from '../types/dispensa';
import { getCategorias, createCategoria } from '../services/dispensa';
import { Button } from './Button';

interface DispensaFormProps {
    initialData?: {
        id: number;
        nome: string;
        categoria_id?: number | null;
        quantidade_atual: string;
        quantidade_minima: string;
        unidade_medida: string;
    };
    onSubmit: (data: ItemDispensaCreate | ItemDispensaUpdate) => Promise<void>;
    onCancel?: () => void;
}

export const DispensaForm: React.FC<DispensaFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const isEditMode = !!initialData;
    const [formData, setFormData] = useState({
        nome: initialData?.nome || '',
        categoria_id: initialData?.categoria_id || '',
        quantidade_atual: initialData?.quantidade_atual || '',
        quantidade_minima: initialData?.quantidade_minima || '',
        unidade_medida: initialData?.unidade_medida || 'UNIDADE',
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao carregar categorias', error);
        }
    };

    const unidadesMedida = [
        { value: 'KG', label: 'Quilogramas (KG)' },
        { value: 'UNIDADE', label: 'Unidade' },
        { value: 'PACOTE', label: 'Pacote' },
        { value: 'CAIXA', label: 'Caixa' },
        { value: 'LITRO', label: 'Litros (L)' },
        { value: 'GRAMAS', label: 'Gramas (g)' },
    ];

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            setIsCreatingCategory(true);
            const newCat = await createCategoria({ nome: newCategoryName });
            setCategorias([...categorias, newCat]);
            setFormData(prev => ({ ...prev, categoria_id: newCat.id }));
            setNewCategoryName('');
        } catch (error) {
            console.error('Erro ao criar categoria', error);
        } finally {
            setIsCreatingCategory(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'categoria_id' ? (value ? Number(value) : null) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const submitData = {
                ...formData,
                categoria_id: formData.categoria_id === '' ? null : formData.categoria_id
            };
            await onSubmit(submitData as any);

            if (!isEditMode) {
                setFormData({
                    nome: '',
                    categoria_id: '',
                    quantidade_atual: '',
                    quantidade_minima: '',
                    unidade_medida: 'UNIDADE',
                });
            }
        } catch (error) {
            console.error('Erro ao submeter formulário:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                        Nome do Item
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            value={formData.nome}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="Ex: Arroz Branco"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="quantidade_atual" className="block text-sm font-medium text-gray-700">
                        Quantidade Atual
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            name="quantidade_atual"
                            id="quantidade_atual"
                            required
                            value={formData.quantidade_atual}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="quantidade_minima" className="block text-sm font-medium text-gray-700">
                        Quantidade Mínima
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            name="quantidade_minima"
                            id="quantidade_minima"
                            required
                            value={formData.quantidade_minima}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-700">
                        Categoria
                    </label>
                    <div className="mt-1 flex gap-2">
                        <select
                            id="categoria_id"
                            name="categoria_id"
                            value={formData.categoria_id || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white"
                        >
                            <option value="">Sem Categoria</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2 flex gap-2">
                        <input
                            type="text"
                            placeholder="Nova Categoria..."
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-xs"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleCreateCategory}
                            disabled={isCreatingCategory || !newCategoryName.trim()}
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="unidade_medida" className="block text-sm font-medium text-gray-700">
                        Unidade de Medida
                    </label>
                    <div className="mt-1">
                        <select
                            id="unidade_medida"
                            name="unidade_medida"
                            required
                            value={formData.unidade_medida}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white"
                        >
                            {unidadesMedida.map(unidade => (
                                <option key={unidade.value} value={unidade.value}>
                                    {unidade.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Item')}
                </Button>
            </div>
        </form>
    );
};
