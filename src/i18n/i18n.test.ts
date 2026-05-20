import { describe, it, expect } from 'vitest';
import es from './locales/es.json';
import en from './locales/en.json';

describe('Internacionalización (i18n)', () => {
  it('debe tener las mismas llaves en español e inglés', () => {
    const esKeys = Object.keys(es).sort();
    const enKeys = Object.keys(en).sort();
    expect(esKeys).toEqual(enKeys);
  });

  const checkNestedKeys = (objEs: any, objEn: any, path = '') => {
    const keysEs = Object.keys(objEs);
    
    keysEs.forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      expect(objEn, `La llave "${currentPath}" falta en el archivo EN`).toHaveProperty(key);
      
      if (typeof objEs[key] === 'object' && objEs[key] !== null && !Array.isArray(objEs[key])) {
        checkNestedKeys(objEs[key], objEn[key], currentPath);
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
