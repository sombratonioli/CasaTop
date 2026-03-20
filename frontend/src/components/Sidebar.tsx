import React from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Users, Briefcase, TrendingDown, TrendingUp, FileText, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/resumo">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight hover:text-indigo-600 transition-colors cursor-pointer">Domus</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">

        {/* Domus Section */}
        <div className="px-6 mb-2 mt-4 first:mt-0">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Domus
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          <li>
            <Link
              href="/dispensa"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Package className="w-5 h-5 mr-3 text-gray-400" />
              Minha dispensa
            </Link>
          </li>
          <li>
            <Link
              href="/compras"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-3 text-gray-400" />
              Lista de compras
            </Link>
          </li>
          <li>
            <Link
              href="/pessoas"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Users className="w-5 h-5 mr-3 text-gray-400" />
              Pessoas
            </Link>
          </li>
          <li>
            <Link
              href="/servicos"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
              Serviços
            </Link>
          </li>
          <li>
            <Link
              href="/contas-pagar"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <TrendingDown className="w-5 h-5 mr-3 text-gray-400" />
              Contas a Pagar
            </Link>
          </li>
          <li>
            <Link
              href="/contas-receber"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <TrendingUp className="w-5 h-5 mr-3 text-gray-400" />
              Contas a Receber
            </Link>
          </li>
        </ul>

        {/* Sistema Section */}
        <div className="px-6 mb-2 mt-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sistema
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          <li>
            <Link
              href="/relatorios"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <FileText className="w-5 h-5 mr-3 text-gray-400" />
              Relatórios
            </Link>
          </li>
          <li>
            <Link
              href="/configuracoes"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
