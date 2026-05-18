import { useState, useEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Tipos ─── */
interface Member {
  id: string;
  name: string;
  nickname: string;
  role: string;
  photo: string;
  animatedPhoto: string;
  skills: string[];
  portfolio: string;
  location: string;
  experience: string;
  projects: number;
  github: string;
  linkedin: string;
  email: string;
  color: string;
  specialty: string;
}

interface TranslatedMemberInfo {
  specialty: string;
  detail: string;
  bio: string;
}

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

interface MemberCardProps {
  member: Member;
  index: number;
  onOpen: (member: Member) => void;
}

/* ─── Iconos ─── */
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ─── Helper: obtiene la info traducida con fallback seguro ─── */
function useTranslatedMember(member: Member): TranslatedMemberInfo {
  const { t } = useTranslation();
  const raw = t(`team.members.${member.id}`, { returnObjects: true }) as unknown as Partial<TranslatedMemberInfo>;
  return {
    specialty: raw?.specialty ?? member.role,
    detail: raw?.detail ?? '',
    bio: raw?.bio ?? '',
  };
}

/* ══════════════════════════════════════════
   MODAL — Tarjeta expandida
══════════════════════════════════════════ */
function MemberModal({ member, onClose }: MemberModalProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const translatedInfo = useTranslatedMember(member);

  useEffect(() => {
    setIsOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: 'rgba(2,4,8,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.4s ease',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: '880px',
          background: 'linear-gradient(135deg, #070f1a 0%, #0a1220 100%)',
          border: `1px solid ${member.color}40`,
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: `0 0 80px ${member.color}25, 0 30px 60px rgba(0,0,0,0.6)`,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)',
          margin: 'auto',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, transparent, ${member.color}, ${member.color}aa, ${member.color}, transparent)`,
          animation: 'borderGlow 3s ease-in-out infinite',
          zIndex: 5,
        }} />

        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
            width: '38px', height: '38px',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
            transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.background = `${member.color}20`;
            e.currentTarget.style.borderColor = member.color;
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <CloseIcon />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }} className="modal-grid">
          <div style={{ position: 'relative', background: '#03060a', minHeight: '500px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 40% 30%, ${member.color}20, transparent 70%)`,
              zIndex: 1,
              animation: 'pulseGlow 4s ease-in-out infinite',
            }} />
            <img
              src={member.animatedPhoto}
              alt={member.name}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                position: 'absolute', inset: 0,
                filter: 'contrast(1.05) saturate(1.05)',
                animation: 'gentleZoom 8s ease-in-out infinite',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, transparent 40%, #0a1220 100%), linear-gradient(to top, #03060a 0%, transparent 60%)`,
              zIndex: 2,
            }} />

            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 3 }}>
              <div style={{
                fontFamily: 'monospace', fontSize: '9px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: member.color,
                background: 'rgba(0,0,0,0.6)',
                padding: '4px 10px', borderRadius: '4px',
                backdropFilter: 'blur(4px)',
                border: `1px solid ${member.color}30`,
              }}>
                {translatedInfo.specialty}
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: '24px', left: '20px',
              fontFamily: 'monospace', fontSize: '11px',
              color: member.color,
              border: `1px solid ${member.color}50`,
              background: 'rgba(2,4,8,0.85)',
              padding: '6px 16px',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.15em',
              borderRadius: '30px',
              zIndex: 3,
            }}>
              /{member.nickname}
            </div>
          </div>

          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <p style={{
                fontFamily: 'monospace', fontSize: '9px',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: member.color, opacity: 0.8, marginBottom: '10px',
              }}>
                {translatedInfo.specialty}
              </p>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 900,
                fontSize: '34px', color: '#fff',
                lineHeight: 1.1, marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}>
                {member.name}
              </h3>
              <p style={{
                fontFamily: 'monospace', fontSize: '10px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {member.role}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '8px 0' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${member.color}30`,
                borderRadius: '30px',
                padding: '8px 18px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ color: member.color, display: 'inline-flex' }}><CalendarIcon /></span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{member.experience}</span>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${member.color}30`,
                borderRadius: '30px',
                padding: '8px 18px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: member.color }}>{member.projects}+</span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>proyectos</span>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${member.color}30`,
                borderRadius: '30px',
                padding: '8px 18px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ color: member.color, display: 'inline-flex' }}><LocationIcon /></span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{member.location.split(',')[0]}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, textAlign: 'justify' }}>
              {translatedInfo.detail}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {member.skills.map((skill: string) => (
                <span key={skill} style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  color: `${member.color}dd`,
                  border: `1px solid ${member.color}30`,
                  padding: '6px 14px', borderRadius: '30px',
                }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a href={member.portfolio} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '10px',
                  color: member.color,
                  border: `1px solid ${member.color}40`,
                  borderRadius: '40px',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s ease',
                }}
              >
                <LinkIcon /> {t('team.modal_portfolio')}
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '40px',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s ease',
                }}
              >
                <GithubIcon /> GitHub
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '40px',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s ease',
                }}
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CARD — Versión minimalista horizontal
══════════════════════════════════════════ */
function MemberCard({ member, index, onOpen }: MemberCardProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '50px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 0.1}s,
                     transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 0.1}s,
                     border-color 0.3s ease,
                     box-shadow 0.3s ease`,
        background: `linear-gradient(115deg, ${member.color}18 0%, rgba(7,15,26,0.55) 55%, rgba(5,10,18,0.7) 100%)`,
        border: `1px solid ${hovered ? member.color + '55' : member.color + '22'}`,
        borderRadius: '18px',
        padding: '28px 30px', //tamaño de la card
        display: 'flex',
        alignItems: 'center',
        gap: '16px',        // tamaño entre foto y texto
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        boxShadow: hovered
          ? `0 10px 28px rgba(0,0,0,0.4), 0 0 24px ${member.color}10`
          : '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 0% 50%, ${member.color}15, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${member.color}40`,
          background: '#03060a',
          boxShadow: hovered ? `0 0 16px ${member.color}30` : 'none',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}>
          <img
            src={member.photo}
            alt={member.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transition: 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>

        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: member.color,
          opacity: 0.85,
          whiteSpace: 'nowrap',
        }}>
          {member.specialty}
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <h3 style={{
          padding: '10px 0 4px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          color: '#fff',
          marginBottom: '3px',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {member.name}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '10px',
          lineHeight: 1.3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {member.role}
        </p>

        <button
          onClick={() => onOpen(member)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.08em',
            color: '#fff',
            background: 'rgba(2,4,8,0.55)',
            border: `1px solid ${hovered ? member.color : member.color + '40'}`,
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          }}
          onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = `${member.color}22`;
            e.currentTarget.style.transform = 'translateX(3px)';
          }}
          onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = 'rgba(2,4,8,0.55)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          {t('team.know_more')} <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════
   TEAM — Sección principal
══════════════════════════════════════════ */
export default function Team() {
  const { t } = useTranslation();
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  const members: Member[] = [
    {
      id: 'eduardo',
      name: 'Eduardo Estrada',
      nickname: 'Lalo',
      role: 'Ing. Sistemas Computacionales',
      photo: '/lalo.png',
      animatedPhoto: '/laloanimada.png',
      skills: ['React', 'TypeScript', 'CSS', 'Framer Motion'],
      portfolio: 'https://eduardo-portfolio.com',
      location: 'Dolores Hidalgo, México',
      experience: '3+ años',
      projects: 12,
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'eduardo@example.com',
      color: '#00e5ff',
      specialty: 'UI / UX Designer',
    },
    {
      id: 'patricio',
      name: 'Patricio García',
      nickname: 'Pato',
      role: 'Ing. Sistemas Computacionales',
      photo: '/pato.png',
      animatedPhoto: '/patoanimada.png',
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
      portfolio: '#',
      location: 'Guanajuato, México',
      experience: '4+ años',
      projects: 18,
      github: '#',
      linkedin: '#',
      email: '#',
      color: '#00b4d8',
      specialty: 'Backend & DevOps',
    },
    {
      id: 'mario',
      name: 'Mario Delgado',
      nickname: 'Mario',
      role: 'Ing. Sistemas Computacionales',
      photo: '/mario.png',
      animatedPhoto: '/marioanimada.png',
      skills: ['Next.js', 'AWS', 'MongoDB', 'GraphQL'],
      portfolio: 'https://portafolio-mario-delgado.vercel.app/',
      location: 'San Miguel de Allende, México',
      experience: '5+ años',
      projects: 24,
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mario@example.com',
      color: '#7dd3fc',
      specialty: 'Fullstack & Cloud',
    },
  ];

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  useEffect(() => {
    if (document.getElementById('tm-styles')) return;
    const s = document.createElement('style');
    s.id = 'tm-styles';
    s.textContent = `
      @keyframes gentleZoom {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }
      @keyframes pulseGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
      @keyframes borderGlow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      @media (max-width: 768px) {
        .modal-grid {
          grid-template-columns: 1fr !important;
        }
        .modal-grid > div:first-child {
          min-height: 300px !important;
        }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section id="team" style={{
      position: 'relative',
      padding: '80px 0',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 0%, #051530, #020408 70%)',
    }}>

      <div style={{
        position: 'absolute', left: 0, top: '25%', bottom: '25%',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 2 }}>

        <div style={{
          marginBottom: '48px',
          textAlign: 'center',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
            marginBottom: '18px',
          }}>
            <span style={{
              flex: 1, maxWidth: '80px', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3))',
            }} />
            <span style={{
              fontFamily: 'monospace', fontSize: '10px',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(0,229,255,0.75)',
            }}>
              {t('team.label')}
            </span>
            <span style={{
              flex: 1, maxWidth: '80px', height: '1px',
              background: 'linear-gradient(270deg, transparent, rgba(0,229,255,0.3))',
            }} />
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 900,
            fontSize: 'clamp(36px, 5.5vw, 56px)',
            color: '#00e5ff',
            marginBottom: '14px',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            {t('team.title')}
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '16px',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {t('team.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {members.map((member: Member, i: number) => (
            <MemberCard
              key={member.id}
              member={member}
              index={i}
              onOpen={setActiveMember}
            />
          ))}
        </div>
      </div>

      {activeMember && (
        <MemberModal
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      )}
    </section>
  );
}
