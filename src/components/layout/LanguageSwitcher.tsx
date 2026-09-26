import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button variant="icon" size="sm" onClick={toggleLanguage} aria-label={t('nav.language_toggle')}>
      <span className="font-mono text-[11px] font-semibold">{i18n.language === 'es' ? 'EN' : 'ES'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
