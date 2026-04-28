import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button onClick={toggleLanguage} aria-label="Toggle language">
      {i18n.language === 'es' ? t('language.en') : t('language.es')}
    </button>
  );
};

export default LanguageSwitcher;
