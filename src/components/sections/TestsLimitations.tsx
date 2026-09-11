import { limitations, testRecords } from '../../data/content';

export function TestsLimitations() {
  return (
    <section id="testes" className="bg-creme px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Testes e limitações</h2>
          <p className="mt-4 text-tinta-500">
            Apenas os testes efetivamente realizados ou documentados durante o estágio.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-4xl bg-white p-2 shadow-soft">
          {testRecords.length === 0 ? (
            <p className="p-8 text-center text-sm text-tinta-500">
              Nenhum teste cadastrado ainda. Preencher com os testes reais realizados ou documentados.
            </p>
          ) : (
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="text-tinta-500">
                  <th className="px-4 py-3 font-semibold">Teste</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Observação</th>
                </tr>
              </thead>
              <tbody>
                {testRecords.map((record) => (
                  <tr key={record.id} className="border-t border-rosa-100">
                    <td className="px-4 py-3 font-medium text-tinta-800">{record.name}</td>
                    <td className="px-4 py-3 text-tinta-600">{record.type}</td>
                    <td className="px-4 py-3 text-tinta-600">
                      {record.status === 'realizado' ? 'Realizado' : 'Documentado'}
                    </td>
                    <td className="px-4 py-3 text-tinta-500">{record.note ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 rounded-4xl bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-tinta-800">Limitações</h3>
          {limitations.length === 0 ? (
            <p className="mt-2 text-sm text-tinta-500">Nenhuma limitação cadastrada ainda.</p>
          ) : (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-tinta-600">
              {limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
