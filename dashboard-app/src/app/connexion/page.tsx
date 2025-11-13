"use client";

import { FormEvent, useState } from "react";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setFeedback("Merci de renseigner vos identifiants.");
      return;
    }
    setFeedback(`Connexion simulée pour ${email}.`);
    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Connexion</h1>
        <p className="text-sm text-slate-600">
          Accédez à votre espace sécurisé pour gérer vos factures et vos services.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Adresse e-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="vous@exemple.com"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
          />
          Se souvenir de moi
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Se connecter
        </button>
      </form>

      {feedback && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {feedback}
        </p>
      )}
    </div>
  );
}
