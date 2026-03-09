import React, { useState } from 'react';
import { ItemDispensaCreate } from '../types/dispensa';
import { Button } from './Button';

interface ItemFormProps {
    onSubmit: (data: ItemDispensaCreate) => Promise<void>;
    onCancel?: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<ItemDispensaCreate>({
        nome: '',
        quantidade_atual: '',
        quantidade_minima: '',
        unidade_medida: 'UNIDADE',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const unidadesMedida = [
        { value: 'KG', label: 'Quilogramas (KG)' },
        { value: 'UNIDADE', label: 'Unidade' },
        { value: 'PACOTE', label: 'Pacote' },
        { value: 'CAIXA', label: 'Caixa' },
        { value: 'LITRO', label: 'Litros (L)' },
        { value: 'GRAMAS', label: 'Gramas (g)' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await onSubmit(formData);
            // Limpar formulário após sucesso
            setFormData({
                nome: '',
                quantidade_atual: '',
                quantidade_minima: '',
                unidade_medida: 'UNIDADE',
            });
        } catch (error) {
            console.error('Erro ao submeter formulário:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Novo Item</h3>

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

                <div className="sm:col-span-2">
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
                    {isSubmitting ? 'Salvando...' : 'Adicionar Item'}
                </Button>
            </div>
        </form>
    );
};
