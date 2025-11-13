"use client";

import { useMemo, useState } from "react";

type Invoice = {
  id: string;
  client: string;
  amount: number;
  status: "Payée" | "En attente" | "En retard";
  issuedAt: string;
  dueAt: string;
};

const INVOICES: Invoice[] = [
  { id: "FA-2025-031", client: "Société Alpha", amount: 1250, status: "En attente", issuedAt: "2025-11-10", dueAt: "2025-11-25" },
  { id: "FA-2025-030", client: "Entreprise Beta", amount: 980, status: "Payée", issuedAt: "2025-11-02", dueAt: "2025-11-12" },
  { id: "FA-2025-029", client: "Client Gamma", amount: 540, status: "Payée", issuedAt: "2025-10-28", dueAt: "2025-11-07" },
  { id: "FA-2025-028", client: "SARL Delta", amount: 2100, status: "En retard", issuedAt: "2025-10-15", dueAt: "2025-10-30" },
  { id: "FA-2025-027", client: "TPE Epsilon", amount: 320, status: "Payée", issuedAt: "2025-10-05", dueAt: "2025-10-20" },
  { id: "FA-2025-026", client: "Start-up Zeta", amount: 1560, status: "En attente", issuedAt: "2025-10-01", dueAt: "2025-10-15" },
];

const STATUSES: Invoice["status"][] = ["Payée", "En attente", "En retard"];

export default function VoirFacturePage() {
  const [statusFilter, setStatusFilter] = useState<Invoice["status"] | "Toutes">("Toutes");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = useMemo(() => {
    return INVOICES.filter((invoice) => {
      const matchesStatus = statusFilter === "Toutes" ? true : invoice.status === statusFilter;
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchTerm]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Consulter les factures</h1>
        <p className="text-sm text-slate-600">
          Parcourez vos factures, filtrez par statut et recherchez par client ou numéro.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full max-w-xs flex-col gap-1 text-sm font-medium text-slate-700">
            Rechercher
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Client ou numéro de facture"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="flex w-full max-w-xs flex-col gap-1 text-sm font-medium text-slate-700">
            Statut
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as Invoice["status"] | "Toutes")}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              <option value="Toutes">Toutes</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">N°</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Émise le</th>
                <th className="px-4 py-3">Échéance</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{invoice.id}</td>
                  <td className="px-4 py-3">{invoice.client}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {invoice.amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3">{new Date(invoice.issuedAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3">{new Date(invoice.dueAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice.status === "Payée"
                          ? "bg-emerald-100 text-emerald-700"
                          : invoice.status === "En attente"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                    Aucune facture ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
