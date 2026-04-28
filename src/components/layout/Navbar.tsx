import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <div>
        <span>{t('navbar.brand')}</span>
      </div>
      <ul>
        <li>
          <button onClick={() => scrollTo('hero')}>{t('navbar.home')}</button>
        </li>
        <li>
          <button onClick={() => scrollTo('projects')}>{t('navbar.projects')}</button>
        </li>
        <li>
          <button onClick={() => scrollTo('team')}>{t('navbar.team')}</button>
        </li>
        <li>
          <button onClick={() => scrollTo('contact')}>{t('navbar.contact')}</button>
        </li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;
