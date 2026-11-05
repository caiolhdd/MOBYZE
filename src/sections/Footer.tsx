import { InstagramIcon } from "../components/Icons";
import { Logo } from "../components/Logo";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold text-muted-navy transition-colors hover:text-cream">
          <InstagramIcon />@{INSTAGRAM_HANDLE}
        </a>
        <p className="text-[0.875rem] text-muted-navy">© {new Date().getFullYear()} Mobyze. Sites e aplicativos.</p>
      </div>
    </footer>
  );
}
