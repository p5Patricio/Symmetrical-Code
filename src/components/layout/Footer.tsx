import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[rgba(0,229,255,0.08)] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Symmetrical Code" className="h-6 w-auto opacity-60" />
          <span className="font-mono text-xs text-white/30">
            {t('footer.tagline')}
          </span>
        </div>
        <span className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} Symmetrical Code. {t('footer.rights')}
        </span>
      </div>
    </footer>
  );
}