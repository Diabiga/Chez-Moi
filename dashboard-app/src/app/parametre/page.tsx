"use client";

import { FormEvent, useMemo, useState } from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: "Administrateur" | "Gestionnaire" | "Collaborateur";
  active: boolean;
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const initialUsers: User[] = [
  {
    id: "usr-001",
    fullName: "Marie Dupont",
    email: "marie.dupont@example.com",
    role: "Administrateur",
    active: true,
  },
  {
    id: "usr-002",
    fullName: "Jean Martin",
    email: "jean.martin@example.com",
    role: "Gestionnaire",
    active: true,
  },
  {
    id: "usr-003",
    fullName: "Léa Bernard",
    email: "lea.bernard@example.com",
    role: "Collaborateur",
    active: false,
  },
];

const initialServices: Service[] = [
  {
    id: "srv-001",
    name: "Audit énergétique",
    description: "Analyse complète des consommations énergétiques du logement.",
    price: 399,
  },
  {
    id: "srv-002",
    name: "Entretien annuel",
    description: "Service annuel de maintenance et vérification des installations.",
    price: 249,
  },
];

const emptyUserForm: Omit<User, "id"> = {
  fullName: "",
  email: "",
  role: "Collaborateur",
  active: true,
};

const emptyServiceForm = {
  name: "",
  description: "",
  price: "",
};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function ParametrePage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>(initialServices);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);

  const activeUsers = useMemo(() => users.filter((user) => user.active).length, [users]);

  const handleUserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingUserId) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                ...userForm,
              }
            : user,
        ),
      );
    } else {
      setUsers((previous) => [
        ...previous,
        {
          id: createId("usr"),
          ...userForm,
        },
      ]);
    }
    setUserForm(emptyUserForm);
    setEditingUserId(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setUserForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((previous) => previous.filter((user) => user.id !== userId));
    if (editingUserId === userId) {
      setEditingUserId(null);
      setUserForm(emptyUserForm);
    }
  };

  const handleToggleActive = (userId: string) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === userId
          ? {
              ...user,
              active: !user.active,
            }
          : user,
      ),
    );
  };

  const handleServiceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServices((previous) => [
      ...previous,
      {
        id: createId("srv"),
        name: serviceForm.name,
        description: serviceForm.description,
        price: Number(serviceForm.price),
      },
    ]);
    setServiceForm(emptyServiceForm);
  };

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-600">
          Configurez les utilisateurs, leurs droits d&apos;accès et gérez le catalogue de services.
        </p>
      </header>

      <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Gestion des utilisateurs</h2>
            <p className="text-sm text-slate-600">
              Créez, modifiez ou supprimez des comptes. Activez ou désactivez les accès.
            </p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">
            {activeUsers} utilisateur(s) actif(s) / {users.length} au total
          </p>
        </div>

        <form className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4" onSubmit={handleUserSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Nom complet
              <input
                required
                value={userForm.fullName}
                onChange={(event) => setUserForm((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder="Ex. Jeanne Leroy"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Adresse e-mail
              <input
                required
                type="email"
                value={userForm.email}
                onChange={(event) => setUserForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="prenom.nom@exemple.com"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Rôle
              <select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm((prev) => ({ ...prev, role: event.target.value as User["role"] }))
                }
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="Administrateur">Administrateur</option>
                <option value="Gestionnaire">Gestionnaire</option>
                <option value="Collaborateur">Collaborateur</option>
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={userForm.active}
                onChange={(event) => setUserForm((prev) => ({ ...prev, active: event.target.checked }))}
                className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
              />
              Compte actif
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {editingUserId && (
              <button
                type="button"
                onClick={() => {
                  setEditingUserId(null);
                  setUserForm(emptyUserForm);
                }}
                className="inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {editingUserId ? "Mettre à jour l'utilisateur" : "Ajouter l'utilisateur"}
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Utilisateur</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rôle</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {user.active ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(user.id)}
                        className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-white"
                      >
                        {user.active ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-md border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    Aucun utilisateur pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section id="services" className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Catalogue des services</h2>
          <p className="text-sm text-slate-600">
            Enrichissez votre offre en ajoutant de nouveaux services proposés à vos clients.
          </p>
        </div>

        <form className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4" onSubmit={handleServiceSubmit}>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Nom du service
            <input
              required
              value={serviceForm.name}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Ex. Installation de domotique"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Description
            <textarea
              required
              rows={3}
              value={serviceForm.description}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Décrivez en quelques mots la prestation proposée."
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Prix (EUR)
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={serviceForm.price}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, price: event.target.value }))}
              placeholder="0,00"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Ajouter le service
            </button>
          </div>
        </form>

        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <header className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{service.name}</h3>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {service.price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </header>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            </article>
          ))}
          {services.length === 0 && (
            <p className="rounded-md border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              Aucun service enregistré.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
