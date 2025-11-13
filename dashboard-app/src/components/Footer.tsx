export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} ChezMoi. Tous droits réservés.</p>
        <p className="text-xs sm:text-sm">
          Besoin d&apos;aide ? Contactez-nous via support@chezmoi.com
        </p>
      </div>
    </footer>
  );
}
