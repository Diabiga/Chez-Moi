import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Tableau de bord</h1>
        <p className="text-sm text-slate-600">
          Surveillez rapidement vos factures, vos services et vos utilisateurs actifs.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Factures en attente",
            value: "8",
            trend: "+3 cette semaine",
            tone: "text-amber-600",
          },
          {
            label: "Factures payées",
            value: "24",
            trend: "+12 % vs. mois dernier",
            tone: "text-emerald-600",
          },
          {
            label: "Utilisateurs actifs",
            value: "18",
            trend: "2 en attente d'activation",
            tone: "text-slate-600",
          },
        ].map(({ label, value, trend, tone }) => (
          <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
            <p className={`mt-1 text-xs font-medium ${tone}`}>{trend}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Actions rapides</h2>
          <p className="mt-1 text-sm text-slate-600">
            Lancer rapidement les actions les plus utilisées.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="/creer-facture"
            >
              Créer une facture
              <p className="mt-1 text-xs font-normal text-slate-500">
                Préparer un nouveau document pour vos clients.
              </p>
            </Link>
            <Link
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="/voir-facture"
            >
              Consulter les factures
              <p className="mt-1 text-xs font-normal text-slate-500">
                Voir l&apos;historique et l&apos;état des règlements.
              </p>
            </Link>
            <Link
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="/parametre"
            >
              Gérer les utilisateurs
              <p className="mt-1 text-xs font-normal text-slate-500">
                Mettre à jour les rôles et les statuts d&apos;accès.
              </p>
            </Link>
            <Link
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="/parametre#services"
            >
              Ajouter un service
              <p className="mt-1 text-xs font-normal text-slate-500">
                Maintenir le catalogue des prestations proposées.
              </p>
            </Link>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Dernières factures</h2>
          <p className="mt-1 text-sm text-slate-600">
            Un aperçu des cinq dernières factures générées.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              { client: "Société Alpha", numero: "FA-2025-031", statut: "En attente", montant: "1 250 €" },
              { client: "Entreprise Beta", numero: "FA-2025-030", statut: "Payée", montant: "980 €" },
              { client: "Client Gamma", numero: "FA-2025-029", statut: "Payée", montant: "540 €" },
              { client: "SARL Delta", numero: "FA-2025-028", statut: "En retard", montant: "2 100 €" },
              { client: "TPE Epsilon", numero: "FA-2025-027", statut: "Payée", montant: "320 €" },
            ].map(({ client, numero, statut, montant }) => (
              <li
                key={numero}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800">{client}</p>
                  <p className="text-xs text-slate-500">{numero}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{montant}</p>
                  <p className="text-xs text-slate-500">{statut}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
