'use client';
import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { logout } from '@/services/auth';

interface HeaderProps {
    title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Domus Dashboard" }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="h-16 bg-indigo-900 text-white flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10 shadow-sm">
            {/* Left Space for balancing flex-between if we want true center */}
            <div className="flex-1"></div>

            {/* Center Title */}
            <div className="flex-1 flex justify-center">
                <h2 className="text-lg font-medium tracking-wide">{title}</h2>
            </div>

            {/* Right Icons */}
            <div className="flex-1 flex justify-end items-center space-x-4">
                <button
                    className="p-2 hover:bg-indigo-800 rounded-full transition-colors relative"
                    aria-label="Notificações"
                >
                    <Bell className="w-5 h-5 text-indigo-50" />
                    {/* Badge indicator */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                    <button
                        className="p-2 hover:bg-indigo-800 rounded-full transition-colors flex items-center gap-2"
                        aria-label="Perfil do usuário"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <User className="w-5 h-5 text-indigo-50" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden text-sm">
                            <div className="px-4 py-3 text-gray-500 cursor-default">
                                Usuário Logado
                            </div>
                            <hr className="border-gray-100" />
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600 font-medium"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
