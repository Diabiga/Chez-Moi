const stats = [
  {
    label: "Factures totales",
    value: "128",
    trend: "+12 ce mois",
  },
  {
    label: "Payées",
    value: "94",
    trend: "73 % du total",
  },
  {
    label: "En attente",
    value: "21",
    trend: "Temps moyen 8j",
  },
  {
    label: "Clients actifs",
    value: "46",
    trend: "+3 nouveaux",
  },
];

const recentInvoices = [
  { id: "FAC-2024-118", client: "Les Jardins Bleus", status: "En attente", amount: "1 280 €" },
  { id: "FAC-2024-117", client: "Studio Horizon", status: "Payée", amount: "890 €" },
  { id: "FAC-2024-116", client: "Cuisine & Co", status: "Payée", amount: "2 150 €" },
  { id: "FAC-2024-115", client: "Nova Transport", status: "Retard", amount: "640 €" },
];

const reminders = [
  {
    title: "Relancer Nova Transport",
    description: "Facture FAC-2024-115 en retard de 5 jours.",
  },
  {
    title: "Programmer la formation équipe",
    description: "Nouvelle fonctionnalité facturation récurrente.",
  },
  {
    title: "Valider les tarifs 2025",
    description: "Coordonner avec l'équipe commerciale avant fin du mois.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Bonjour Marie,
            </h1>
              <p className="text-sm text-slate-500">
                Suivez l&apos;activité de votre entreprise en temps réel.
              </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/creer-facture"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              Créer une facture
            </a>
            <a
              href="/voir-facture"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
            >
              Voir les factures
            </a>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              <p className="text-xs text-slate-500">{item.trend}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Dernières factures
              </h2>
              <a
                href="/voir-facture"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Tout voir
              </a>
            </div>
            <div className="divide-y divide-slate-200">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{invoice.id}</p>
                    <p className="text-sm text-slate-500">{invoice.client}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${invoice.status === "Payée" ? "bg-emerald-100 text-emerald-700" : invoice.status === "Retard" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {invoice.status}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {invoice.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                À faire aujourd&apos;hui
              </h2>
              <p className="text-sm text-slate-500">
                Planifiez vos prochaines actions pour rester à jour.
              </p>
            </div>
            <ul className="space-y-4 px-6 py-4">
              {reminders.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
