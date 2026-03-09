import React from 'react';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
    title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "CasaTop Dashboard" }) => {
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

                <button
                    className="p-2 hover:bg-indigo-800 rounded-full transition-colors flex items-center gap-2"
                    aria-label="Perfil do usuário"
                >
                    <User className="w-5 h-5 text-indigo-50" />
                </button>
            </div>
        </header>
    );
};
