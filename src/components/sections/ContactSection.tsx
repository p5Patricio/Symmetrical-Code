import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact">
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.subtitle')}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email">{t('contact.email')}</label>
          <input id="email" type="email" name="email" />
        </div>
        <div>
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea id="message" name="message" rows={4} />
        </div>
        <button type="submit">{t('contact.send')}</button>
      </form>
    </section>
  );
};

export default ContactSection;
