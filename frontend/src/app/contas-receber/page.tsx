'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/services/api';
import { Trash2 } from 'lucide-react';

interface Pessoa {
  id: number;
  nome: string;
}

interface ContaReceber {
  id: number;
  pessoa_id: number;
  pessoa_nome: string;
  descricao: string;
  valor: number;
  data_esperada: string;
  status: string;
}

export default function ContasReceberPage() {
  const [contas, setContas] = useState<ContaReceber[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  
  const [pessoaId, setPessoaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataEsperada, setDataEsperada] = useState('');
  const [status, setStatus] = useState('pendente');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resContas, resPessoas] = await Promise.all([
        fetchApi('/contas-receber/'),
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
    if (!pessoaId || !descricao.trim() || !valor || !dataEsperada) return;

    try {
      await fetchApi('/contas-receber/', {
        method: 'POST',
        body: JSON.stringify({
          pessoa_id: parseInt(pessoaId),
          descricao,
          valor: parseFloat(valor),
          data_esperada: dataEsperada,
          status,
        }),
      });
      
      // Limpa formulário
      setPessoaId('');
      setDescricao('');
      setValor('');
      setDataEsperada('');
      setStatus('pendente');
      
      // Atualiza listagem
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
      alert('Erro ao salvar receita. Verifique os dados.');
    }
  };

  const deletarConta = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta conta?')) return;
    try {
      await fetchApi(`/contas-receber/${id}`, {
        method: 'DELETE',
      });
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      alert('Erro ao excluir conta.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Contas a Receber</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Formulário Grid-Based */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <form onSubmit={salvarConta} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Membro</label>
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
                  placeholder="Ex: Salário, Venda"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  required
                  value={dataEsperada}
                  onChange={(e) => setDataEsperada(e.target.value)}
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
                  <option value="recebido">Recebido</option>
                </select>
              </div>

              <div className="md:col-span-1 sm:col-span-2 md:col-span-6 flex justify-end mt-2 md:mt-0">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium h-[38px] w-full md:w-auto"
                >
                  Adicionar Receita
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-gray-700 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Membro</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Data</th>
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
                      Nenhuma receita cadastrada.
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
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(conta.data_esperada + "T00:00:00"))}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          conta.status === 'recebido' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {conta.status === 'recebido' ? 'Recebido' : 'Pendente'}
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
