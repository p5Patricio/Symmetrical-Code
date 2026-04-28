import { useTranslation } from 'react-i18next';

const TeamSection = () => {
  const { t } = useTranslation();

  const members = [
    { key: 'member1' },
    { key: 'member2' },
    { key: 'member3' },
  ];

  return (
    <section id="team">
      <h2>{t('team.title')}</h2>
      <p>{t('team.subtitle')}</p>
      <div>
        {members.map((member) => (
          <article key={member.key}>
            <h3>{t(`team.${member.key}.name`)}</h3>
            <p>{t(`team.${member.key}.role`)}</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              {t(`team.${member.key}.portfolio`)}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
