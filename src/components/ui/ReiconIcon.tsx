import React from 'react';
import {
  Database,
  Cpu,
  Code,
  ShieldCheck,
  Palette,
  ChartBarTrendUp,
  Server,
  Cloud,
  ArrowRight,
  ArrowUpRight,
  MessageText,
  Mobile,
  Flash,
} from 'reicon-react';
import { FiCheck, FiShield } from 'react-icons/fi';

interface ReiconProps {
  name: string;
  size?: number;
  weight?: 'Outline' | 'Filled';
  color?: string;
  className?: string;
}

export const ReiconIcon: React.FC<ReiconProps> = ({
  name,
  size = 22,
  weight = 'Outline',
  color = 'currentColor',
  className = '',
}) => {
  const norm = name.toLowerCase().trim();

  switch (norm) {
    case 'database':
    case 'systems':
    case 'software-empresarial':
      return <Database size={size} weight={weight} color={color} className={className} />;
    case 'cpu':
    case 'ai':
    case 'inteligencia-artificial':
      return <Cpu size={size} weight={weight} color={color} className={className} />;
    case 'code':
    case 'web':
    case 'desarrollo-web-movil':
      return <Code size={size} weight={weight} color={color} className={className} />;
    case 'shield':
    case 'security':
    case 'ciberseguridad':
      return <ShieldCheck size={size} weight={weight} color={color} className={className} />;
    case 'palette':
    case 'design':
    case 'diseno-ui-ux':
      return <Palette size={size} weight={weight} color={color} className={className} />;
    case 'chart':
    case 'analytics':
    case 'automatizacion-analitica':
      return <ChartBarTrendUp size={size} weight={weight} color={color} className={className} />;
    case 'server':
      return <Server size={size} weight={weight} color={color} className={className} />;
    case 'cloud':
      return <Cloud size={size} weight={weight} color={color} className={className} />;
    case 'mobile':
      return <Mobile size={size} weight={weight} color={color} className={className} />;
    case 'zap':
      return <Flash size={size} weight={weight} color={color} className={className} />;
    case 'arrow-right':
      return <ArrowRight size={size} weight={weight} color={color} className={className} />;
    case 'arrow-up-right':
      return <ArrowUpRight size={size} weight={weight} color={color} className={className} />;
    case 'message':
    case 'whatsapp':
      return <MessageText size={size} weight={weight} color={color} className={className} />;
    case 'check':
      return <FiCheck size={size} color={color} className={className} />;
    default:
      return <FiShield size={size} color={color} className={className} />;
  }
};

export default ReiconIcon;
