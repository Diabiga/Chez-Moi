'use client';

import { FormEvent, useState } from "react";

type Credentials = {
  email: string;
  password: string;
  remember: boolean;
};

const defaultCredentials: Credentials = {
  email: "",
  password: "",
  remember: true,
};

export default function ConnexionPage() {
  const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      setMessage("Veuillez renseigner vos identifiants.");
      return;
    }
    setMessage("Connexion réussie ! Vous allez être redirigé vers le tableau de bord.");
    setCredentials(defaultCredentials);
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white px-6 py-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-2xl font-semibold text-slate-900">Connexion</h1>
      <p className="mt-1 text-sm text-slate-600">
        Accédez à votre espace sécurisé pour gérer vos factures et paramètres.
      </p>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(event) =>
              setCredentials((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="vous@example.com"
            className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(event) =>
              setCredentials((prev) => ({ ...prev, password: event.target.value }))
            }
            placeholder="••••••••"
            className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={credentials.remember}
              onChange={(event) =>
                setCredentials((prev) => ({
                  ...prev,
                  remember: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
            Rester connecté(e)
          </label>
          <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500" href="#">
            Mot de passe oublié ?
          </a>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          Se connecter
        </button>
      </form>
      {message && (
        <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          {message}
        </div>
      )}
      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">
          Contactez-nous
        </a>
      </p>
    </div>
  );
}
