import React from 'react';
import { ItemDispensa } from '../types/dispensa';
import { Button } from './Button';
import { Badge } from './Badge';

interface CardItemProps {
    item: ItemDispensa;
    onIncrement: (item: ItemDispensa) => void;
    onDecrement: (item: ItemDispensa) => void;
    onDelete: (item: ItemDispensa) => void;
}

export const CardItem: React.FC<CardItemProps> = ({
    item,
    onIncrement,
    onDecrement,
    onDelete
}) => {
    const qtdAtual = parseFloat(item.quantidade_atual);
    const qtdMinima = parseFloat(item.quantidade_minima);

    // Status definitions
    const isEmFalta = qtdAtual === 0;
    const isEstoqueBaixo = qtdAtual > 0 && qtdAtual <= qtdMinima;

    let headerColor = 'bg-white';
    if (isEmFalta) headerColor = 'bg-red-50';
    else if (isEstoqueBaixo) headerColor = 'bg-yellow-50';

    return (
        <div className={`flex flex-col rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md ${headerColor}`}>
            <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate" title={item.nome}>
                        {item.nome}
                    </h3>
                    <Badge variant={isEmFalta ? 'danger' : isEstoqueBaixo ? 'warning' : 'success'}>
                        {isEmFalta ? 'Em Falta' : isEstoqueBaixo ? 'Baixo' : 'Ok'}
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                    {item.categoria && (
                        <Badge variant="info">{item.categoria.nome}</Badge>
                    )}
                    <Badge variant="default">{item.unidade_medida}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 bg-white rounded-md p-2 border border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Atual</span>
                        <span className={`font-medium ${isEmFalta ? 'text-red-600' : isEstoqueBaixo ? 'text-yellow-600' : 'text-gray-900'}`}>
                            {item.quantidade_atual}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Mínima</span>
                        <span className="font-medium text-gray-600">{item.quantidade_minima}</span>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onDecrement(item)}
                        className="w-8 h-8 !p-0 rounded-full"
                        aria-label="Diminuir quantidade"
                        disabled={qtdAtual <= 0}
                    >
                        -
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onIncrement(item)}
                        className="w-8 h-8 !p-0 rounded-full text-lg"
                        aria-label="Aumentar quantidade"
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="flex items-center space-x-1"
                >
                    <svg xmlns="http://www.w3.org/Dom/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </Button>
            </div>
        </div>
    );
};
