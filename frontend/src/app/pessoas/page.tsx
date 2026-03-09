export default function PessoasPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pessoas</h1>
                <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2"
                >
                    + Cadastrar Pessoa
                </button>
            </div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">Nome</th>
                                <th scope="col" className="px-6 py-3 font-medium">CPF/CNPJ</th>
                                <th scope="col" className="px-6 py-3 font-medium">Email</th>
                                <th scope="col" className="px-6 py-3 font-medium">Telefone</th>
                                <th scope="col" className="px-6 py-3 font-medium">Tipo</th>
                                <th scope="col" className="px-6 py-3 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Mock Data - Empty State */}
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                    Nenhuma pessoa cadastrada.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
