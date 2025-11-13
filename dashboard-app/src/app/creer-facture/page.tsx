'use client';

import { FormEvent, useState } from "react";

type InvoiceForm = {
  reference: string;
  client: string;
  service: string;
  montant: string;
  dateEcheance: string;
  notes: string;
};

type InvoiceRecord = InvoiceForm & { status: "Brouillon" | "Envoyée" };

const defaultForm: InvoiceForm = {
  reference: "",
  client: "",
  service: "",
  montant: "",
  dateEcheance: "",
  notes: "",
};

const sampleServices = [
  "Audit énergétique",
  "Maintenance annuelle",
  "Installation domotique",
  "Service personnalisé",
];

export default function CreerFacturePage() {
  const [form, setForm] = useState<InvoiceForm>(defaultForm);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<InvoiceRecord["status"]>("Brouillon");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.reference || !form.client || !form.montant || !form.dateEcheance) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    const newInvoice: InvoiceRecord = {
      ...form,
      status: statusFilter,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setForm(defaultForm);
  };

  const handleChange = <K extends keyof InvoiceForm>(key: K, value: InvoiceForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Créer une facture</h1>
        <p className="mt-1 text-sm text-slate-600">
          Renseignez les informations ci-dessous pour générer une nouvelle facture client.
        </p>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="reference">
                Référence *
              </label>
              <input
                id="reference"
                value={form.reference}
                onChange={(event) => handleChange("reference", event.target.value)}
                required
                placeholder="FAC-2025-001"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="client">
                Client *
              </label>
              <input
                id="client"
                value={form.client}
                onChange={(event) => handleChange("client", event.target.value)}
                required
                placeholder="Entreprise ou personne"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="service">
                Service
              </label>
              <select
                id="service"
                value={form.service}
                onChange={(event) => handleChange("service", event.target.value)}
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Sélectionner un service</option>
                {sampleServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="montant">
                Montant (EUR) *
              </label>
              <input
                id="montant"
                type="number"
                min="0"
                step="0.01"
                value={form.montant}
                onChange={(event) => handleChange("montant", event.target.value)}
                required
                placeholder="0,00"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="dateEcheance">
                Date d&apos;échéance *
              </label>
              <input
                id="dateEcheance"
                type="date"
                value={form.dateEcheance}
                onChange={(event) => handleChange("dateEcheance", event.target.value)}
                required
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="status">
                Statut initial
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as InvoiceRecord["status"])
                }
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Brouillon">Brouillon</option>
                <option value="Envoyée">Envoyée</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(event) => handleChange("notes", event.target.value)}
              placeholder="Ajouter des informations complémentaires"
              rows={4}
              className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="reset"
              onClick={() => setForm(defaultForm)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Factures récemment créées
          </h2>
          <p className="text-sm text-slate-500">
            {invoices.length} facture(s) ajoutée(s) cette session.
          </p>
        </div>
        {invoices.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Aucune facture enregistrée pour le moment. Soumettez le formulaire ci-dessus pour commencer.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-600">Référence</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Client</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Service</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Montant</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Échéance</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {invoices.map((invoice) => (
                  <tr key={invoice.reference}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{invoice.reference}</td>
                    <td className="px-4 py-3 text-slate-600">{invoice.client}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {invoice.service || "—"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {Number(invoice.montant).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {invoice.dateEcheance}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${invoice.status === "Envoyée" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
