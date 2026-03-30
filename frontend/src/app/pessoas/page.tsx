'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/services/api';
import { Trash2 } from 'lucide-react';

interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
}

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/pessoas/');
      if (data) setPessoas(data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    try {
      await fetchApi('/pessoas/', {
        method: 'POST',
        body: JSON.stringify({ nome, cpf }),
      });
      setNome('');
      setCpf('');
      fetchPessoas();
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
      alert('Erro ao salvar. Verifique se os dados estão corretos.');
    }
  };

  const deletarPessoa = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      await fetchApi(`/pessoas/${id}`, {
        method: 'DELETE',
      });
      fetchPessoas();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
      alert('Erro ao excluir. Pode haver contas atreladas a este membro.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Membros da Família</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Header & Formulário */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <form onSubmit={salvarPessoa} className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF (Opcional)</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium h-[38px]"
                >
                  Adicionar
                </button>
              </form>
            </div>

            {/* Tabela de Listagem */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/50 text-gray-700 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Nome</th>
                    <th className="px-6 py-3">CPF</th>
                    <th className="px-6 py-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        Carregando...
                      </td>
                    </tr>
                  ) : pessoas.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        Nenhum membro cadastrado. Comece adicionando um acima!
                      </td>
                    </tr>
                  ) : (
                    pessoas.map((pessoa) => (
                      <tr key={pessoa.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">{pessoa.nome}</td>
                        <td className="px-6 py-4">{pessoa.cpf || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deletarPessoa(pessoa.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors inline-block p-1"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
