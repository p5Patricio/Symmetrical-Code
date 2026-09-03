import React from 'react';
import {
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiRedis,
  SiFastapi,
  SiPytorch,
  SiOpenai,
  SiHuggingface,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFlutter,
  SiTailwindcss,
  SiLinux,
  SiGit,
  SiFigma,
  SiStorybook,
  SiN8N,
  SiApachekafka,
  SiApacheairflow,
  SiGrafana,
  SiMetabase,
  SiWhatsapp,
  SiStripe,
  SiSupabase,
  SiMongodb,
  SiGraphql,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { FiShield, FiLock, FiTerminal, FiCpu } from 'react-icons/fi';

interface TechConfig {
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  brandColor: string;
  fallbackName: string;
}

const TECH_MAP: Record<string, TechConfig> = {
  'node.js': { icon: SiNodedotjs, brandColor: '#5FA04E', fallbackName: 'Node.js' },
  node: { icon: SiNodedotjs, brandColor: '#5FA04E', fallbackName: 'Node.js' },
  python: { icon: SiPython, brandColor: '#3776AB', fallbackName: 'Python' },
  postgresql: { icon: SiPostgresql, brandColor: '#4169E1', fallbackName: 'PostgreSQL' },
  docker: { icon: SiDocker, brandColor: '#2496ED', fallbackName: 'Docker' },
  redis: { icon: SiRedis, brandColor: '#FF4438', fallbackName: 'Redis' },
  fastapi: { icon: SiFastapi, brandColor: '#009688', fallbackName: 'FastAPI' },
  pytorch: { icon: SiPytorch, brandColor: '#EE4C2C', fallbackName: 'PyTorch' },
  openai: { icon: SiOpenai, brandColor: '#10A37F', fallbackName: 'OpenAI' },
  'hugging face': { icon: SiHuggingface, brandColor: '#FFD21E', fallbackName: 'Hugging Face' },
  react: { icon: SiReact, brandColor: '#61DAFB', fallbackName: 'React' },
  'react native': { icon: SiReact, brandColor: '#61DAFB', fallbackName: 'React Native' },
  'next.js': { icon: SiNextdotjs, brandColor: '#FFFFFF', fallbackName: 'Next.js' },
  nextjs: { icon: SiNextdotjs, brandColor: '#FFFFFF', fallbackName: 'Next.js' },
  typescript: { icon: SiTypescript, brandColor: '#3178C6', fallbackName: 'TypeScript' },
  flutter: { icon: SiFlutter, brandColor: '#02569B', fallbackName: 'Flutter' },
  'tailwind css': { icon: SiTailwindcss, brandColor: '#06B6D4', fallbackName: 'Tailwind CSS' },
  tailwind: { icon: SiTailwindcss, brandColor: '#06B6D4', fallbackName: 'Tailwind' },
  linux: { icon: SiLinux, brandColor: '#FCC624', fallbackName: 'Linux' },
  git: { icon: SiGit, brandColor: '#F05032', fallbackName: 'Git' },
  figma: { icon: SiFigma, brandColor: '#F24E1E', fallbackName: 'Figma' },
  storybook: { icon: SiStorybook, brandColor: '#FF4785', fallbackName: 'Storybook' },
  n8n: { icon: SiN8N, brandColor: '#EA4B71', fallbackName: 'n8n' },
  'apache kafka': { icon: SiApachekafka, brandColor: '#231F20', fallbackName: 'Kafka' },
  kafka: { icon: SiApachekafka, brandColor: '#231F20', fallbackName: 'Kafka' },
  'apache airflow': { icon: SiApacheairflow, brandColor: '#017CEE', fallbackName: 'Airflow' },
  airflow: { icon: SiApacheairflow, brandColor: '#017CEE', fallbackName: 'Airflow' },
  grafana: { icon: SiGrafana, brandColor: '#F46800', fallbackName: 'Grafana' },
  metabase: { icon: SiMetabase, brandColor: '#509EE3', fallbackName: 'Metabase' },
  whatsapp: { icon: SiWhatsapp, brandColor: '#25D366', fallbackName: 'WhatsApp API' },
  stripe: { icon: SiStripe, brandColor: '#635BFF', fallbackName: 'Stripe' },
  aws: { icon: FaAws, brandColor: '#FF9900', fallbackName: 'AWS' },
  supabase: { icon: SiSupabase, brandColor: '#3ECF8E', fallbackName: 'Supabase' },
  mongodb: { icon: SiMongodb, brandColor: '#47A248', fallbackName: 'MongoDB' },
  graphql: { icon: SiGraphql, brandColor: '#E10098', fallbackName: 'GraphQL' },
  owasp: { icon: FiShield, brandColor: '#00e5ff', fallbackName: 'OWASP' },
  cifrado: { icon: FiLock, brandColor: '#fde68a', fallbackName: 'Cifrado' },
  encryption: { icon: FiLock, brandColor: '#fde68a', fallbackName: 'Encryption' },
  kernel: { icon: FiTerminal, brandColor: '#86efac', fallbackName: 'Kernel' },
};

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  showColor?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  size = 20,
  className = '',
  showColor = true,
}) => {
  const normalized = name.toLowerCase().trim();
  const found = Object.entries(TECH_MAP).find(([key]) =>
    normalized.includes(key)
  );

  if (found) {
    const [, config] = found;
    const IconComponent = config.icon;
    return (
      <IconComponent
        size={size}
        color={showColor ? config.brandColor : 'currentColor'}
        className={className}
      />
    );
  }

  // Fallback for custom or unrecognized names
  return <FiCpu size={size} className={className} color="#00e5ff" />;
};

export function getTechBrandColor(name: string): string {
  const normalized = name.toLowerCase().trim();
  const found = Object.entries(TECH_MAP).find(([key]) =>
    normalized.includes(key)
  );
  return found ? found[1].brandColor : '#00e5ff';
}

export default TechIcon;
