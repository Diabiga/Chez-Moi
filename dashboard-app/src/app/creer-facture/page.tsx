"use client";

import { FormEvent, useState } from "react";

type InvoiceFormState = {
  client: string;
  service: string;
  amount: string;
  dueDate: string;
  notes: string;
};

const initialFormState: InvoiceFormState = {
  client: "",
  service: "",
  amount: "",
  dueDate: "",
  notes: "",
};

export default function CreerFacturePage() {
  const [form, setForm] = useState<InvoiceFormState>(initialFormState);
  const [submittedInvoices, setSubmittedInvoices] = useState<InvoiceFormState[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedInvoices((prev) => [...prev, form]);
    setForm(initialFormState);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Créer une facture</h1>
        <p className="text-sm text-slate-600">
          Renseignez les informations essentielles pour générer une nouvelle facture.
        </p>
      </header>

      <form
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Client
            <input
              required
              value={form.client}
              onChange={(event) => setForm((prev) => ({ ...prev, client: event.target.value }))}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Nom du client"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Service
            <input
              required
              value={form.service}
              onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Service facturé"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Montant (EUR)
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="0,00"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Date d&apos;échéance
            <input
              required
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Notes complémentaires
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Informations additionnelles pour le client"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Générer la facture
        </button>
      </form>

      {submittedInvoices.length > 0 && (
        <section className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
          <h2 className="text-base font-semibold text-emerald-900">
            Factures récemment préparées (données locales)
          </h2>
          <ul className="space-y-2">
            {submittedInvoices.map((invoice, index) => (
              <li key={`${invoice.client}-${index}`} className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-semibold text-slate-900">{invoice.client}</p>
                <p className="text-xs text-slate-500">
                  {invoice.service} — {invoice.amount} € — Échéance {invoice.dueDate || "non spécifiée"}
                </p>
                {invoice.notes && (
                  <p className="mt-1 text-xs text-slate-600">Note : {invoice.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
