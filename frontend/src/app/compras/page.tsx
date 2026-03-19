export default function ComprasPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lista de Compras</h1>
        <p className="mt-2 text-sm text-gray-500">
          Módulo em construção. Aqui ficará o checklist inteligente e o histórico de compras.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center mt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <h2 className="text-xl font-medium text-gray-900">Em Breve</h2>
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
          Este módulo está sendo desenvolvido para facilitar suas compras diárias com checklist completo.
        </p>
      </div>
    </div>
  );
}
