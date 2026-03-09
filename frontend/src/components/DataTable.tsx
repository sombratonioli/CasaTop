import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from './Button';

interface DataTableProps {
    columns: string[];
    children: React.ReactNode;
    onAdd?: () => void;
    onSearch?: (term: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
    columns,
    children,
    onAdd,
    onSearch
}) => {
    return (
        <div className="w-full">
            {/* Toolbar Area */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        onChange={(e) => onSearch?.(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 shadow-sm"
                    />
                </div>

                {/* Add Button */}
                {onAdd && (
                    <Button
                        variant="primary"
                        onClick={onAdd}
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>CADASTRAR</span>
                    </Button>
                )}
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
