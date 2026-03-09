import React from 'react';
import { ItemDispensa } from '../types/dispensa';
import { Button } from './Button';
import { Badge } from './Badge';

interface ItemTableProps {
    itens: ItemDispensa[];
    onIncrement: (item: ItemDispensa) => void;
    onDecrement: (item: ItemDispensa) => void;
    onDelete: (item: ItemDispensa) => void;
    onEdit: (item: ItemDispensa) => void;
}

export const ItemTable: React.FC<ItemTableProps> = ({
    itens,
    onIncrement,
    onDecrement,
    onDelete,
    onEdit
}) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm mt-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Categoria / Unidade
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Qtd Atual
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Qtd Mínima
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {itens.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                Nenhum item na dispensa. Adicione novos itens acima.
                            </td>
                        </tr>
                    ) : (
                        itens.map((item) => {
                            const qtdAtual = parseFloat(item.quantidade_atual);
                            const qtdMinima = parseFloat(item.quantidade_minima);
                            const isEmFalta = qtdAtual === 0;
                            const isEstoqueBaixo = qtdAtual > 0 && qtdAtual <= qtdMinima;

                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={isEmFalta ? 'danger' : isEstoqueBaixo ? 'warning' : 'success'}>
                                            {isEmFalta ? 'Em Falta' : isEstoqueBaixo ? 'Baixo' : 'Ok'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 items-center min-h-[72px]">
                                        {item.categoria && <Badge variant="info">{item.categoria.nome}</Badge>}
                                        <Badge variant="default">{item.unidade_medida}</Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`text-base font-semibold ${isEmFalta ? 'text-red-600' : isEstoqueBaixo ? 'text-yellow-600' : 'text-gray-900'}`}>
                                            {item.quantidade_atual}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 font-medium">
                                        {item.quantidade_minima}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="w-8 h-8 !p-0 rounded-full flex items-center justify-center"
                                                title="Editar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onDecrement(item)}
                                                className="w-8 h-8 !p-0 rounded-full flex items-center justify-center text-lg"
                                                aria-label="Diminuir quantidade"
                                                disabled={qtdAtual <= 0}
                                            >
                                                -
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => onIncrement(item)}
                                                className="w-8 h-8 !p-0 rounded-full flex items-center justify-center text-lg"
                                                aria-label="Aumentar quantidade"
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                                className="flex items-center space-x-1 ml-4"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};
