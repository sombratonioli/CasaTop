import React from 'react';
import Link from 'next/link';
import { Package, Receipt, FolderKanban } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 h-screen bg-white border-r fixed flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">CasaTop</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4">
                {/* Menu Section */}
                <div className="px-6 mb-2">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Apps
                    </h2>
                </div>

                <ul className="space-y-1 px-3">
                    <li>
                        <Link
                            href="/dispensa"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <Package className="w-5 h-5 mr-3 text-gray-400" />
                            Minha Dispensa
                        </Link>
                    </li>
                    {/*
          <li>
            <Link 
              href="/contas" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Receipt className="w-5 h-5 mr-3 text-gray-400" />
              Contas a Pagar
            </Link>
          </li>
          <li>
            <Link 
              href="/projetos" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <FolderKanban className="w-5 h-5 mr-3 text-gray-400" />
              Projetos
            </Link>
          </li>
          */}
                </ul>
            </nav>
        </aside>
    );
};
