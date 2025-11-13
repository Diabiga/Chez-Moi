"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/creer-facture", label: "Créer facture" },
  { href: "/voir-facture", label: "Voir facture" },
  { href: "/parametre", label: "Paramètre" },
  { href: "/connexion", label: "Connexion" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          ChezMoi Dashboard
        </Link>
        <nav aria-label="Menu principal">
          <ul className="flex items-center gap-4 text-sm font-medium text-slate-600">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 ${
                      isActive ? "bg-slate-900 text-white" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="text-slate-500" aria-label="Utilisateur actuel">
              Marie Dupont
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
