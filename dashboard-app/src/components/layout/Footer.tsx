export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {currentYear} ChezMoi. Tous droits réservés.</p>
        <div className="flex flex-wrap gap-4">
          <span className="hover:text-white">Support</span>
          <span className="hover:text-white">Confidentialité</span>
          <span className="hover:text-white">Conditions</span>
        </div>
      </div>
    </footer>
  );
}
