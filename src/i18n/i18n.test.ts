import { describe, it, expect } from 'vitest';
import es from './locales/es.json';
import en from './locales/en.json';

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationValue[]
  | { [key: string]: TranslationValue };

type TranslationObject = { [key: string]: TranslationValue };

describe('Internacionalización (i18n)', () => {
  it('debe tener las mismas llaves en español e inglés', () => {
    const esKeys = Object.keys(es).sort();
    const enKeys = Object.keys(en).sort();
    expect(esKeys).toEqual(enKeys);
  });

  const checkNestedKeys = (objEs: TranslationObject, objEn: TranslationObject, path = '') => {
    const keysEs = Object.keys(objEs);
    
    keysEs.forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      expect(objEn, `La llave "${currentPath}" falta en el archivo EN`).toHaveProperty(key);
      
      const esValue = objEs[key];
      const enValue = objEn[key];

      if (typeof esValue === 'object' && esValue !== null && !Array.isArray(esValue)) {
        checkNestedKeys(esValue, enValue as TranslationObject, currentPath);
      }
    });
  };

  it('debe tener todas las llaves anidadas consistentes', () => {
    checkNestedKeys(es, en);
  });

  it('los items de servicios deben tener la misma cantidad en ambos idiomas', () => {
    expect(es.services.items.length).toBe(en.services.items.length);
  });
});
