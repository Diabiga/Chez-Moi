'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const menuItems = [
  { label: "Créer facture", href: "/creer-facture" },
  { label: "Voir facture", href: "/voir-facture" },
  { label: "Paramètre", href: "/parametre" },
  { label: "Connexion", href: "/connexion" },
];

export function Header() {
  const pathname = usePathname();

  const activePath = useMemo(() => {
    if (!pathname) {
      return "/";
    }

    if (pathname === "/") {
      return pathname;
    }

    const matchingItem = menuItems.find((item) =>
      pathname.startsWith(item.href),
    );

    return matchingItem?.href ?? pathname;
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">
            ChezMoi
          </span>
          <span className="text-lg font-semibold text-slate-800">
            Tableau de bord
          </span>
        </div>
        <nav className="flex items-center gap-6">
          {menuItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-500"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="text-sm font-semibold text-slate-700">
          Utilisateur: Marie Dupont
        </div>
      </div>
    </header>
  );
}
