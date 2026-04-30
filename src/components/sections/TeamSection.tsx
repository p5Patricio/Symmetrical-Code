import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Iconos ─── */
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ══════════════════════════════════════════
   MODAL — Tarjeta expandida con badges mejorados
══════════════════════════════════════════ */
function MemberModal({ member, onClose }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const translatedInfo = t(`team.members.${member.id}`, { returnObjects: true }) || member;

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,4,8,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.4s ease',
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
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${member.color}, ${member.color}aa, ${member.color}, transparent)`,
          animation: 'borderGlow 3s ease-in-out infinite',
          zIndex: 5,
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 20% 30%, ${member.color}08, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
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
          onMouseEnter={e => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.background = `${member.color}20`;
            e.currentTarget.style.borderColor = member.color;
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <CloseIcon />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>

          {/* Imagen lateral */}
          <div style={{
            position: 'relative',
            background: '#03060a',
            minHeight: '500px',
            overflow: 'hidden',
          }}>
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
            
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              zIndex: 3,
              animation: 'slideInRight 0.5s ease-out',
            }}>
              <div style={{
                fontFamily: 'monospace', fontSize: '9px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: member.color,
                background: 'rgba(0,0,0,0.6)',
                padding: '4px 10px',
                borderRadius: '4px',
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
              animation: 'fadeInUp 0.5s ease-out 0.2s both',
            }}>
              /{member.nickname}
            </div>
          </div>

          {/* Contenido derecho */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header */}
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
              <p style={{
                fontFamily: 'monospace', fontSize: '10px',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: member.color, opacity: 0.8,
                marginBottom: '10px',
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

            {/* Línea decorativa */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              margin: '4px 0',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: `linear-gradient(90deg, ${member.color}50, transparent)`,
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: member.color,
                opacity: 0.8,
                boxShadow: `0 0 8px ${member.color}`,
              }} />
              <div style={{
                flex: 1,
                height: '1px',
                background: `linear-gradient(270deg, ${member.color}50, transparent)`,
              }} />
            </div>

            {/* Badges de información - mejor acomodados en fila flexible */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'space-between',
              margin: '8px 0',
            }}>
              {/* Badge Experience */}
              <div style={{
                flex: 1,
                minWidth: '120px',
                background: `linear-gradient(135deg, ${member.color}12, ${member.color}03)`,
                border: `1px solid ${member.color}30`,
                borderRadius: '20px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = member.color;
                e.currentTarget.style.boxShadow = `0 12px 24px -8px ${member.color}30`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}18, ${member.color}06)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${member.color}30`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}12, ${member.color}03)`;
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${member.color}30, ${member.color}08)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CalendarIcon style={{ color: member.color, width: '22px', height: '22px' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    background: `linear-gradient(135deg, ${member.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}>{member.experience}</div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '4px',
                  }}>EXPERIENCE</div>
                </div>
              </div>

              {/* Badge Projects */}
              <div style={{
                flex: 1,
                minWidth: '120px',
                background: `linear-gradient(135deg, ${member.color}12, ${member.color}03)`,
                border: `1px solid ${member.color}30`,
                borderRadius: '20px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = member.color;
                e.currentTarget.style.boxShadow = `0 12px 24px -8px ${member.color}30`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}18, ${member.color}06)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${member.color}30`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}12, ${member.color}03)`;
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${member.color}30, ${member.color}08)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>📁</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    background: `linear-gradient(135deg, ${member.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}>{member.projects}+</div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '4px',
                  }}>PROJECTS</div>
                </div>
              </div>

              {/* Badge Location */}
              <div style={{
                flex: 1,
                minWidth: '120px',
                background: `linear-gradient(135deg, ${member.color}12, ${member.color}03)`,
                border: `1px solid ${member.color}30`,
                borderRadius: '20px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = member.color;
                e.currentTarget.style.boxShadow = `0 12px 24px -8px ${member.color}30`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}18, ${member.color}06)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${member.color}30`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = `linear-gradient(135deg, ${member.color}12, ${member.color}03)`;
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${member.color}30, ${member.color}08)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <LocationIcon style={{ color: member.color, width: '22px', height: '22px' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    background: `linear-gradient(135deg, ${member.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.3,
                  }}>{member.location.split(',')[0]}</div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '4px',
                  }}>LOCATION</div>
                </div>
              </div>
            </div>

            {/* Párrafo justificado */}
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              textAlign: 'justify',
              animation: 'fadeInUp 0.5s ease-out 0.2s both',
              marginTop: '4px',
            }}>
              {translatedInfo.detail}
            </p>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
              {member.skills.map((skill, idx) => (
                <span key={skill} style={{
                  fontFamily: 'monospace', fontSize: '11px',
                  color: `${member.color}dd`,
                  border: `1px solid ${member.color}30`,
                  padding: '8px 18px',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  animation: `fadeInScale 0.3s ease-out ${0.4 + idx * 0.05}s both`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${member.color}15`;
                  e.currentTarget.style.borderColor = `${member.color}60`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = `${member.color}30`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Botones sociales */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px', animation: 'fadeInUp 0.5s ease-out 0.4s both' }}>
              <a href={member.portfolio} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '11px',
                  color: member.color,
                  border: `1px solid ${member.color}40`,
                  borderRadius: '40px',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                  background: 'transparent',
                  fontWeight: 500,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${member.color}20`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${member.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <LinkIcon /> {t('team.modal_portfolio')}
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '40px',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = member.color;
                  e.currentTarget.style.borderColor = `${member.color}50`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <GithubIcon /> GitHub
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'monospace', fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '40px',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = member.color;
                  e.currentTarget.style.borderColor = `${member.color}50`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
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
   CARD — Tarjeta individual
══════════════════════════════════════════ */
function MemberCard({ member, index, onOpen }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const translatedInfo = t(`team.members.${member.id}`, { returnObjects: true }) || member;

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
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 0.12}s, 
                     transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 0.12}s`,
        background: 'linear-gradient(145deg, #070f1a 0%, #050a12 100%)',
        border: `1px solid ${hovered ? member.color + '40' : 'rgba(0,229,255,0.08)'}`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        cursor: 'default',
        boxShadow: hovered 
          ? `0 0 0 1px ${member.color}15, 0 25px 45px rgba(0,0,0,0.5), 0 0 40px ${member.color}08` 
          : '0 8px 25px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s ease, box-shadow 0.4s ease',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${member.color}10, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${member.color}, ${member.color}aa, ${member.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        zIndex: 5,
      }} />

      <div style={{
        position: 'relative', 
        overflow: 'hidden',
        aspectRatio: '1/1',
        background: '#03060a',
      }}>
        <img
          src={member.photo}
          alt={member.name}
          style={{
            width: '100%', 
            height: '100%',
            objectFit: 'contain', 
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1), filter 0.4s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            filter: hovered ? 'brightness(1.08) contrast(1.05)' : 'brightness(1) contrast(1)',
            animation: visible ? 'softFloat 8s ease-in-out infinite' : 'none',
          }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #050a12 0%, transparent 40%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          fontFamily: 'monospace', fontSize: '10px',
          color: member.color,
          border: `1px solid ${member.color}40`,
          background: 'rgba(2,4,8,0.85)',
          padding: '5px 14px',
          backdropFilter: 'blur(12px)',
          letterSpacing: '0.1em',
          borderRadius: '30px',
          zIndex: 3,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}>
          /{member.nickname}
        </div>

        <div style={{
          position: 'absolute', bottom: '20px', left: '16px',
          fontFamily: 'monospace', fontSize: '8px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: member.color,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
          background: 'rgba(0,0,0,0.5)',
          padding: '3px 10px',
          borderRadius: '15px',
          backdropFilter: 'blur(8px)',
          zIndex: 3,
        }}>
          {translatedInfo.specialty}
        </div>
      </div>

      <div style={{
        padding: '24px 22px 24px',
        display: 'flex', 
        flexDirection: 'column',
        gap: '14px', 
        flex: 1,
        position: 'relative',
        zIndex: 4,
      }}>
        <div>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: '20px', marginBottom: '6px',
            background: hovered 
              ? `linear-gradient(135deg, #ffffff, ${member.color})` 
              : 'none',
            WebkitBackgroundClip: hovered ? 'text' : 'none',
            WebkitTextFillColor: hovered ? 'transparent' : '#fff',
            transition: 'all 0.3s ease',
          }}>
            {member.name}
          </h3>
          <p style={{
            fontFamily: 'monospace', fontSize: '9px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: `${member.color}aa`,
            lineHeight: 1.4,
          }}>
            {member.role}
          </p>
        </div>

        <p style={{
          fontSize: '12.5px', 
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65, 
          textAlign: 'justify',
          flex: 1,
        }}>
          {translatedInfo.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {member.skills.slice(0, 3).map((skill, idx) => (
            <span key={skill} style={{
              fontFamily: 'monospace', fontSize: '9px',
              color: `${member.color}bb`,
              border: `1px solid ${member.color}25`,
              padding: '4px 12px',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              animation: visible ? `fadeInScale 0.3s ease-out ${idx * 0.05}s` : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${member.color}15`;
              e.currentTarget.style.borderColor = `${member.color}50`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${member.color}25`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              {skill}
            </span>
          ))}
        </div>

        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, ${member.color}25, transparent)`,
          margin: '6px 0',
        }} />

        <button
          onClick={() => onOpen(member)}
          style={{
            width: '100%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            fontFamily: 'monospace', 
            fontSize: '10px',
            letterSpacing: '0.1em', 
            textTransform: 'uppercase',
            color: '#020408',
            background: member.color,
            border: 'none',
            borderRadius: '40px',
            padding: '12px 16px',
            cursor: 'pointer',
            fontWeight: 700,
            transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${member.color}40`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{t('team.know_more')}</span>
          <ArrowIcon />
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
  const [activeMember, setActiveMember] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const members = [
    {
      id: 'eduardo',
      name: 'Eduardo Estrada',
      nickname: 'Lalo',
      role: 'Ingeniero en Sistemas Computacionales',
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
    },
    {
      id: 'patricio',
      name: 'Patricio García',
      nickname: 'Pato',
      role: 'Ingeniero en Sistemas Computacionales',
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
    },
    {
      id: 'mario',
      name: 'Mario Delgado',
      nickname: 'Mario',
      role: 'Ingeniero en Sistemas Computacionales',
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
    },
  ];

  useEffect(() => {
    setHeaderVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (document.getElementById('tm-styles')) return;
    const s = document.createElement('style');
    s.id = 'tm-styles';
    s.textContent = `
      @keyframes softFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      
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
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @media (max-width: 768px) {
        .modal-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section id="team" style={{
      position: 'relative',
      padding: '120px 0',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 30% 20%, #051530, #020408 70%)',
    }}>

      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,229,255,0.02), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'softFloat 12s ease-in-out infinite',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,229,255,0.02), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'softFloat 10s ease-in-out infinite reverse',
      }} />

      <div
        style={{
          position: 'absolute', left: 0, top: '20%', bottom: '20%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.2), rgba(0,229,255,0.05), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.02}px)`,
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 2 }}>

        <div style={{
          marginBottom: '80px',
          textAlign: 'center',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(25px)',
          transition: 'all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
            marginBottom: '24px',
          }}>
            <span style={{
              flex: 1, maxWidth: '120px', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3))',
            }} />
            <span style={{
              fontFamily: 'monospace', fontSize: '11px',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(0,229,255,0.8)',
            }}>
              {t('team.label')}
            </span>
            <span style={{
              flex: 1, maxWidth: '120px', height: '1px',
              background: 'linear-gradient(270deg, transparent, rgba(0,229,255,0.3))',
            }} />
          </div>
          
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 900,
            fontSize: 'clamp(44px, 7vw, 72px)',
            background: 'linear-gradient(135deg, #ffffff, rgba(0,229,255,0.8), #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            {t('team.title')}
          </h2>
          
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '15px',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            {t('team.subtitle')}
          </p>
          
          <div style={{
            width: '80px', 
            height: '2px', 
            margin: '32px auto 0',
            background: `linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent)`,
            animation: 'borderGlow 3s ease-in-out infinite',
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ alignItems: 'stretch' }}>
          {members.map((member, i) => (
            <MemberCard
              key={i}
              member={member}
              index={i}
              onOpen={setActiveMember}
            />
          ))}
        </div>

        <div style={{
          marginTop: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px',
          opacity: 0.35,
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5))' }} />
          <span style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '10px', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#00e5ff',
          }}>
            {members.length} {t('team.footer_developers')}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(0,229,255,0.5))' }} />
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