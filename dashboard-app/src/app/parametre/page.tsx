'use client';

import { FormEvent, useMemo, useState } from "react";

type UserRecord = {
  id: number;
  nom: string;
  email: string;
  role: "Administrateur" | "Manager" | "Collaborateur";
  actif: boolean;
};

type UserForm = Omit<UserRecord, "id" | "actif">;

type ServiceRecord = {
  id: number;
  nom: string;
  description: string;
};

type ServiceForm = Omit<ServiceRecord, "id">;

const initialUsers: UserRecord[] = [
  {
    id: 1,
    nom: "Marie Dupont",
    email: "marie.dupont@example.com",
    role: "Administrateur",
    actif: true,
  },
  {
    id: 2,
    nom: "Luc Moreau",
    email: "luc.moreau@example.com",
    role: "Manager",
    actif: true,
  },
  {
    id: 3,
    nom: "Awa Diouf",
    email: "awa.diouf@example.com",
    role: "Collaborateur",
    actif: false,
  },
];

const initialServices: ServiceRecord[] = [
  { id: 1, nom: "Installation domotique", description: "Mise en place de solutions connectées pour la maison." },
  { id: 2, nom: "Maintenance annuelle", description: "Entretien préventif et curatif des installations." },
];

export default function ParametrePage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [services, setServices] = useState<ServiceRecord[]>(initialServices);
  const [userForm, setUserForm] = useState<UserForm>({
    nom: "",
    email: "",
    role: "Collaborateur",
  });
  const [serviceForm, setServiceForm] = useState<ServiceForm>({
    nom: "",
    description: "",
  });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const term = searchUser.toLowerCase();
      return (
        user.nom.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    });
  }, [searchUser, users]);

  const handleUserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userForm.nom || !userForm.email) {
      alert("Le nom et l'adresse e-mail sont obligatoires.");
      return;
    }

    if (editingUserId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId ? { ...user, ...userForm } : user,
        ),
      );
      setEditingUserId(null);
    } else {
      const nextId = Math.max(0, ...users.map((user) => user.id)) + 1;
      setUsers((prev) => [
        ...prev,
        { id: nextId, actif: true, ...userForm },
      ]);
    }
    setUserForm({ nom: "", email: "", role: "Collaborateur" });
  };

  const handleUserDelete = (id: number) => {
    if (confirm("Supprimer cet utilisateur ?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (editingUserId === id) {
        setEditingUserId(null);
        setUserForm({ nom: "", email: "", role: "Collaborateur" });
      }
    }
  };

  const handleUserEdit = (user: UserRecord) => {
    setEditingUserId(user.id);
    setUserForm({
      nom: user.nom,
      email: user.email,
      role: user.role,
    });
  };

  const handleToggleActive = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, actif: !user.actif } : user,
      ),
    );
  };

  const handleServiceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceForm.nom) {
      alert("Le nom du service est obligatoire.");
      return;
    }

    const nextId = Math.max(0, ...services.map((service) => service.id)) + 1;
    setServices((prev) => [...prev, { id: nextId, ...serviceForm }]);
    setServiceForm({ nom: "", description: "" });
  };

  const resetUserForm = () => {
    setEditingUserId(null);
    setUserForm({ nom: "", email: "", role: "Collaborateur" });
  };

  return (
    <div className="space-y-8">
      <header className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-600">
          Gérez votre équipe et configurez les services proposés aux clients.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Utilisateurs
              </h2>
              <p className="text-sm text-slate-500">
                Créez, modifiez et activez ou désactivez vos collaborateurs.
              </p>
            </div>
            <input
              type="search"
              value={searchUser}
              onChange={(event) => setSearchUser(event.target.value)}
              placeholder="Rechercher un utilisateur"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
            />
          </div>
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-600">Nom</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Rôle</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Statut</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-5 text-center text-sm text-slate-500"
                    >
                      Aucun utilisateur ne correspond à votre recherche.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {user.nom}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{user.email}</td>
                      <td className="px-4 py-3 text-slate-600">{user.role}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${user.actif ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                        >
                          {user.actif ? "Actif" : "Désactivé"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleToggleActive(user.id)}
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                          >
                            {user.actif ? "Désactiver" : "Activer"}
                          </button>
                          <button
                            onClick={() => handleUserEdit(user)}
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleUserDelete(user.id)}
                            className="rounded-md border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:text-rose-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingUserId ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h2>
          <p className="text-sm text-slate-500">
            {editingUserId
              ? "Mettez à jour les informations du collaborateur sélectionné."
              : "Créez un nouvel accès pour un membre de l'équipe."}
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleUserSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="user-name">
                Nom complet *
              </label>
              <input
                id="user-name"
                value={userForm.nom}
                onChange={(event) => setUserForm((prev) => ({ ...prev, nom: event.target.value }))}
                required
                placeholder="Prénom Nom"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="user-email">
                Email *
              </label>
              <input
                id="user-email"
                type="email"
                value={userForm.email}
                onChange={(event) => setUserForm((prev) => ({ ...prev, email: event.target.value }))}
                required
                placeholder="exemple@entreprise.com"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="user-role">
                Rôle
              </label>
              <select
                id="user-role"
                value={userForm.role}
                onChange={(event) =>
                  setUserForm((prev) => ({
                    ...prev,
                    role: event.target.value as UserRecord["role"],
                  }))
                }
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Administrateur">Administrateur</option>
                <option value="Manager">Manager</option>
                <option value="Collaborateur">Collaborateur</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
              >
                {editingUserId ? "Mettre à jour" : "Créer"}
              </button>
              <button
                type="button"
                onClick={resetUserForm}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Catalogue des services
              </h2>
              <p className="text-sm text-slate-500">
                Centralisez les prestations disponibles pour la facturation.
              </p>
            </div>
            <span className="text-sm font-medium text-slate-500">
              {services.length} service(s) configuré(s)
            </span>
          </div>
          <ul className="mt-6 space-y-4">
            {services.map((service) => (
              <li
                key={service.id}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {service.nom}
                </p>
                <p className="text-xs text-slate-600">{service.description || "—"}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Ajouter un service
          </h2>
          <p className="text-sm text-slate-500">
            Déclarez une nouvelle prestation pour faciliter la création de factures.
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleServiceSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="service-name">
                Nom du service *
              </label>
              <input
                id="service-name"
                value={serviceForm.nom}
                onChange={(event) =>
                  setServiceForm((prev) => ({ ...prev, nom: event.target.value }))
                }
                required
                placeholder="Ex: Audit complet"
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700" htmlFor="service-description">
                Description
              </label>
              <textarea
                id="service-description"
                value={serviceForm.description}
                onChange={(event) =>
                  setServiceForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                rows={4}
                placeholder="Détaillez les éléments inclus dans cette prestation."
                className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              Ajouter au catalogue
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
