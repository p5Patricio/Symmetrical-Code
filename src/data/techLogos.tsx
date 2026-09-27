import type { ComponentType, SVGProps } from 'react';

// Self-hosted, colored tech-logo marks compiled into the bundle at build
// time via unplugin-icons — no runtime network requests, unlike the old
// external-CDN <img> URLs this registry replaces.
import IconJavascript from '~icons/logos/javascript';
import IconTypescript from '~icons/logos/typescript-icon';
import IconReact from '~icons/logos/react';
import IconVue from '~icons/logos/vue';
import IconNodejs from '~icons/logos/nodejs-icon';
import IconExpress from '~icons/logos/express';
import IconPython from '~icons/logos/python';
import IconFlutter from '~icons/logos/flutter-icon';
import IconDart from '~icons/logos/dart';
import IconHtml5 from '~icons/logos/html-5';
import IconCss3 from '~icons/logos/css-3';
import IconCplusplus from '~icons/logos/c-plusplus';
import IconC from '~icons/logos/c';
import IconCsharp from '~icons/logos/c-sharp';
import IconMysql from '~icons/logos/mysql-icon';
import IconMariadb from '~icons/logos/mariadb-icon';
import IconPostgresql from '~icons/logos/postgresql';
import IconMongodb from '~icons/logos/mongodb-icon';
import IconSqlite from '~icons/logos/sqlite';
import IconSupabase from '~icons/logos/supabase-icon';
import IconDocker from '~icons/logos/docker-icon';
import IconGit from '~icons/logos/git-icon';
import IconGithub from '~icons/logos/github-icon';
import IconBootstrap from '~icons/logos/bootstrap';
import IconAndroid from '~icons/logos/android-icon';
import IconVisualStudioCode from '~icons/logos/visual-studio-code';
import IconVercel from '~icons/logos/vercel-icon';
import IconNetlify from '~icons/logos/netlify-icon';
import IconFastapi from '~icons/logos/fastapi-icon';
import IconTensorflow from '~icons/logos/tensorflow';
import IconPytorch from '~icons/logos/pytorch-icon';
import IconFirebase from '~icons/logos/firebase-icon';
import IconOpencv from '~icons/logos/opencv';
import IconRedis from '~icons/logos/redis';
import IconOpenai from '~icons/logos/openai-icon';
import IconClaude from '~icons/logos/claude-icon';
import IconPinecone from '~icons/logos/pinecone-icon';
import IconHuggingface from '~icons/logos/hugging-face-icon';
import IconNextjs from '~icons/logos/nextjs-icon';
import IconTailwindcss from '~icons/logos/tailwindcss-icon';
import IconThreejs from '~icons/logos/threejs';
import IconStripe from '~icons/logos/stripe';
import IconFigma from '~icons/logos/figma';
import IconStorybook from '~icons/logos/storybook-icon';
import IconWhatsapp from '~icons/logos/whatsapp-icon';
import IconTwilio from '~icons/logos/twilio-icon';
import IconPandas from '~icons/logos/pandas-icon';
import IconMetabase from '~icons/logos/metabase';
import IconGrafana from '~icons/logos/grafana';
import IconAws from '~icons/logos/aws';
import IconDigitalOcean from '~icons/logos/digital-ocean-icon';
import IconCloudflare from '~icons/logos/cloudflare-icon';
import IconJwt from '~icons/logos/jwt-icon';
import IconSonarqube from '~icons/logos/sonarqube';
import IconSnyk from '~icons/logos/snyk';
import IconN8n from '~icons/logos/n8n-icon';

export type LogoComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Logos that render as a pure black/near-black mark with no built-in light
 * variant. Left as-is they vanish against the site's dark background, so
 * consumers pair them with the `.logo--mono` class, which the dark theme
 * inverts (see `html.dark .logo--mono` in `src/index.css`).
 */
const MONO_DARK_LOGOS = new Set<LogoComponent>([
  IconVercel,
  IconNextjs,
  IconGithub,
  IconOpenai,
  IconExpress,
  IconThreejs,
]);

export function isMonoDarkLogo(component: LogoComponent): boolean {
  return MONO_DARK_LOGOS.has(component);
}

/**
 * Exact-match registry mirroring the old `techIconMap` keys from
 * `src/data/projects.ts` 1:1 (same tag strings used in `Project.tags`).
 * `null` marks tags with no faithful logo available — text-only fallback.
 */
export const techLogoMap: Record<string, LogoComponent | null> = {
  JavaScript: IconJavascript,
  TypeScript: IconTypescript,
  React: IconReact,
  'Vue.js': IconVue,
  'Node.js': IconNodejs,
  Python: IconPython,
  Flutter: IconFlutter,
  Dart: IconDart,
  HTML5: IconHtml5,
  CSS3: IconCss3,
  'C++': IconCplusplus,
  C: IconC,
  'C#': IconCsharp,
  MySQL: IconMysql,
  PostgreSQL: IconPostgresql,
  MongoDB: IconMongodb,
  SQLite: IconSqlite,
  Supabase: IconSupabase,
  Docker: IconDocker,
  Git: IconGit,
  GitHub: IconGithub,
  Bootstrap: IconBootstrap,
  MATLAB: null,
  'Android Studio': IconAndroid,
  'VS Code': IconVisualStudioCode,
  Vercel: IconVercel,
  Netlify: IconNetlify,
  Render: null,
  FastAPI: IconFastapi,
  TensorFlow: IconTensorflow,
  PyTorch: IconPytorch,
  Firebase: IconFirebase,
  'API REST': null,
  'Fetch API': null,
  'PokéAPI': null,
  Tkinter: null,
  Matplotlib: null,
  Hashlib: null,
  'Metodos Numéricos': null,
  'Newton-Raphson': null,
  PyGame: null,
  'REST Countries API': null,
  'API REST Countries': null,
  // Generic tags have no brand logo: text-only.
  'Machine Learning': null,
  'Computer Vision': null,
  NLP: null,
  Audio: null,
  AI: null,
  Game: null,
  CLI: null,
  'Canvas API': null,
};

/**
 * Substring registry for the free-form `TechItem.name` strings in
 * `src/data/services.ts` (e.g. "Node.js / Express", "OpenAI API (GPT-4o /
 * Whisper)"). Only real brand marks are listed: a tech without its own logo
 * renders as text instead of borrowing another brand's.
 */
const SERVICE_TECH_KEYWORDS: Array<[string, LogoComponent]> = [
  ['node.js', IconNodejs],
  ['express', IconExpress],
  ['fastapi', IconFastapi],
  ['python', IconPython],
  ['postgresql', IconPostgresql],
  ['mariadb', IconMariadb],
  ['mysql', IconMysql],
  ['mongodb', IconMongodb],
  ['docker', IconDocker],
  ['redis', IconRedis],
  ['supabase', IconSupabase],
  ['openai', IconOpenai],
  ['claude', IconClaude],
  ['anthropic', IconClaude],
  ['pinecone', IconPinecone],
  ['pgvector', IconPostgresql],
  ['opencv', IconOpencv],
  ['huggingface', IconHuggingface],
  ['hugging face', IconHuggingface],
  ['next.js', IconNextjs],
  ['nextjs', IconNextjs],
  ['react', IconReact],
  ['typescript', IconTypescript],
  ['flutter', IconFlutter],
  ['dart', IconDart],
  ['tailwind', IconTailwindcss],
  ['firebase', IconFirebase],
  ['cloudflare', IconCloudflare],
  ['vercel', IconVercel],
  ['three.js', IconThreejs],
  ['stripe', IconStripe],
  ['figma', IconFigma],
  ['storybook', IconStorybook],
  ['whatsapp', IconWhatsapp],
  ['twilio', IconTwilio],
  ['pandas', IconPandas],
  ['metabase', IconMetabase],
  ['grafana', IconGrafana],
  ['aws', IconAws],
  ['digitalocean', IconDigitalOcean],
  ['jwt', IconJwt],
  ['sonarqube', IconSonarqube],
  ['snyk', IconSnyk],
  ['n8n', IconN8n],
];

/** Best-effort logo lookup for a `services.ts` `TechItem.name` string.
 * Returns `null` when nothing matches — callers render text-only. */
export function getServiceTechLogo(name: string): LogoComponent | null {
  const normalized = name.toLowerCase();
  // The brand named first wins ("Vercel / Cloudflare" -> Vercel), regardless
  // of keyword order; list order only breaks ties at the same position.
  let best: { index: number; logo: LogoComponent } | null = null;
  for (const [keyword, logo] of SERVICE_TECH_KEYWORDS) {
    const index = normalized.indexOf(keyword);
    if (index !== -1 && (best === null || index < best.index)) best = { index, logo };
  }
  return best ? best.logo : null;
}
