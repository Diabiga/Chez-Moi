'use client';

import { useMemo, useState } from "react";

type Invoice = {
  id: string;
  client: string;
  montant: number;
  statut: "Payée" | "En attente" | "Retard";
  dateEmission: string;
  dateEcheance: string;
};

const invoices: Invoice[] = [
  {
    id: "FAC-2024-118",
    client: "Les Jardins Bleus",
    montant: 1280,
    statut: "En attente",
    dateEmission: "2024-11-02",
    dateEcheance: "2024-11-17",
  },
  {
    id: "FAC-2024-117",
    client: "Studio Horizon",
    montant: 890,
    statut: "Payée",
    dateEmission: "2024-10-28",
    dateEcheance: "2024-11-12",
  },
  {
    id: "FAC-2024-116",
    client: "Cuisine & Co",
    montant: 2150,
    statut: "Payée",
    dateEmission: "2024-10-15",
    dateEcheance: "2024-10-30",
  },
  {
    id: "FAC-2024-115",
    client: "Nova Transport",
    montant: 640,
    statut: "Retard",
    dateEmission: "2024-09-30",
    dateEcheance: "2024-10-15",
  },
  {
    id: "FAC-2024-114",
    client: "Boulangerie du Port",
    montant: 485,
    statut: "En attente",
    dateEmission: "2024-11-05",
    dateEcheance: "2024-11-20",
  },
];

export default function VoirFacturePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Invoice["statut"] | "Toutes">(
    "Toutes",
  );

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "Toutes" ? true : invoice.statut === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Voir les factures</h1>
        <p className="mt-1 text-sm text-slate-600">
          Filtrez et retrouvez rapidement l&apos;ensemble de vos factures clients.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Rechercher une facture ou un client"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:max-w-sm"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-600" htmlFor="status">
              Statut
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as Invoice["statut"] | "Toutes")
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Toutes">Toutes</option>
              <option value="Payée">Payée</option>
              <option value="En attente">En attente</option>
              <option value="Retard">Retard</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Résultats</h2>
          <p className="text-sm text-slate-500">
            {filteredInvoices.length} facture(s) correspondante(s)
          </p>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600">Référence</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Client</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Montant</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Statut</th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Émission
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">Échéance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {invoice.id}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{invoice.client}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {invoice.montant.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${invoice.statut === "Payée" ? "bg-emerald-100 text-emerald-700" : invoice.statut === "Retard" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {invoice.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{invoice.dateEmission}</td>
                  <td className="px-4 py-3 text-slate-600">{invoice.dateEcheance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
