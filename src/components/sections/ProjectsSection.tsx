import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects">
      <h2>{t('projects.title')}</h2>
      <p>{t('projects.subtitle')}</p>
      {/* Placeholder for future project cards */}
      <div>
        <article>
          <h3>Project Alpha</h3>
          <p>Description coming soon...</p>
        </article>
        <article>
          <h3>Project Beta</h3>
          <p>Description coming soon...</p>
        </article>
        <article>
          <h3>Project Gamma</h3>
          <p>Description coming soon...</p>
        </article>
      </div>
    </section>
  );
};

export default ProjectsSection;
