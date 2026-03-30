'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/services/api';
import { Trash2 } from 'lucide-react';

interface Pessoa {
  id: number;
  nome: string;
}

interface ContaPagar {
  id: number;
  pessoa_id: number;
  pessoa_nome: string;
  descricao: string;
  valor: number;
  data_vencimento: string;
  status: string;
}

export default function ContasPagarPage() {
  const [contas, setContas] = useState<ContaPagar[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  
  const [pessoaId, setPessoaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [status, setStatus] = useState('pendente');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resContas, resPessoas] = await Promise.all([
        fetchApi('/contas-pagar/'),
        fetchApi('/pessoas/'),
      ]);
      if (resContas) setContas(resContas);
      if (resPessoas) setPessoas(resPessoas);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarConta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pessoaId || !descricao.trim() || !valor || !dataVencimento) return;

    try {
      await fetchApi('/contas-pagar/', {
        method: 'POST',
        body: JSON.stringify({
          pessoa_id: parseInt(pessoaId),
          descricao,
          valor: parseFloat(valor),
          data_vencimento: dataVencimento,
          status,
        }),
      });
      
      // Limpa formulário
      setPessoaId('');
      setDescricao('');
      setValor('');
      setDataVencimento('');
      setStatus('pendente');
      
      // Atualiza listagem
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar conta a pagar:', error);
      alert('Erro ao salvar despesa. Verifique os dados.');
    }
  };

  const deletarConta = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) return;
    try {
      await fetchApi(`/contas-pagar/${id}`, {
        method: 'DELETE',
      });
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir conta a pagar:', error);
      alert('Erro ao excluir despesa.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Contas a Pagar</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Formulário Grid-Based */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <form onSubmit={salvarConta} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pessoa / Fornecedor</label>
                <select
                  required
                  value={pessoaId}
                  onChange={(e) => setPessoaId(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Selecione...</option>
                  {pessoas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Ex: Aluguel, Internet"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vencimento</label>
                <input
                  type="date"
                  required
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                </select>
              </div>

              <div className="md:col-span-1 sm:col-span-2 md:col-span-6 flex justify-end mt-2 md:mt-0">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-medium h-[38px] w-full md:w-auto"
                >
                  Adicionar Despesa
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-gray-700 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Pessoa</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Vencimento</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Carregando...
                    </td>
                  </tr>
                ) : contas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Nenhuma despesa cadastrada.
                    </td>
                  </tr>
                ) : (
                  contas.map((conta) => (
                    <tr key={conta.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{conta.pessoa_nome}</td>
                      <td className="px-6 py-4">{conta.descricao}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(conta.data_vencimento + "T00:00:00"))}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          conta.status === 'pago' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {conta.status === 'pago' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deletarConta(conta.id)}
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
