import { useTranslation } from 'react-i18next';

const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

const members = [
  {
    name: 'Eduardo Estrada',
    nickname: 'Lalo',
    role: 'Ingeniero en Sistemas Computacionales',
    photo: '/lalo.png',
    bio: 'Apasionado del frontend y la experiencia de usuario. Especialista en interfaces modernas, animaciones y diseño que convierte.',
    skills: ['React', 'TypeScript', 'CSS'],
    portfolio: '#',
  },
  {
    name: 'Patricio García',
    nickname: 'Pato',
    role: 'Ingeniero en Sistemas Computacionales',
    photo: '/pato.png',
    bio: 'Arquitecto de sistemas backend con enfoque en escalabilidad, seguridad y APIs de alto rendimiento.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    portfolio: '#',
  },
  {
    name: 'Mario Delgado',
    nickname: 'Mario',
    role: 'Ingeniero en Sistemas Computacionales',
    photo: '/mario.png',
    bio: 'Fullstack developer con visión de producto. Lidera proyectos de inicio a producción con arquitectura sólida.',
    skills: ['Next.js', 'AWS', 'MongoDB'],
    portfolio: '#',
  },
];

export default function Team() {
  const { t } = useTranslation();

  return (
    <section id="team" className="relative py-32 overflow-hidden">
      {/* Decorative left line */}
      <div className="absolute left-0 top-1/4 w-px h-1/2 opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #00e5ff, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="flex-1 max-w-xs h-px bg-[rgba(0,229,255,0.1)]" />
            <span className="section-label">{t('team.label')}</span>
            <span className="flex-1 max-w-xs h-px bg-[rgba(0,229,255,0.1)]" />
          </div>
          <h2 className="font-syne font-black text-5xl md:text-6xl text-white mb-4">
            {t('team.title')}
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            {t('team.subtitle')}
          </p>
        </div>

        {/* Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <article key={i}
              className="glass-card overflow-hidden flex flex-col group">

              {/* Photo — full image with contain so nothing gets cropped */}
              <div className="relative overflow-hidden bg-[#060d14]"
                style={{ aspectRatio: '4/5' }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Subtle bottom gradient to blend into card body */}
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #020408 0%, transparent 100%)' }} />

                {/* Nickname badge */}
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-xs text-[#00e5ff] border border-[rgba(0,229,255,0.3)] bg-[rgba(2,4,8,0.75)] px-2.5 py-1 backdrop-blur-sm">
                    /{member.nickname}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-syne font-bold text-lg text-white mb-1 group-hover:text-[#00e5ff] transition-colors duration-300">
                    {member.name}
                  </h3>
                  {/* Role — full text, no truncation */}
                  <p className="font-mono text-[0.65rem] tracking-widest uppercase text-[#00e5ff]/60 leading-snug">
                    {member.role}
                  </p>
                </div>

                <p className="text-white/40 text-sm leading-relaxed flex-1">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill}
                      className="font-mono text-xs text-[#00e5ff]/55 border border-[rgba(0,229,255,0.12)] px-2.5 py-1">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Portfolio link */}
                <a href={member.portfolio} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-[#00e5ff]/50 hover:text-[#00e5ff] border border-[rgba(0,229,255,0.12)] hover:border-[rgba(0,229,255,0.35)] px-4 py-2.5 transition-all duration-200 self-start mt-auto">
                  <LinkIcon />
                  {t('team.portfolio')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}