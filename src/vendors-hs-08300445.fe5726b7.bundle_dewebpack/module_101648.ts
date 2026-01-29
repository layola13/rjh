import { useContext } from 'react';
import { I18nContext, getI18n } from './i18n-context';

interface ResourceStore {
  [language: string]: {
    [namespace: string]: Record<string, unknown>;
  };
}

interface I18nServices {
  resourceStore: {
    data: ResourceStore;
  };
}

interface I18nOptions {
  isClone?: boolean;
  ns?: string[];
}

interface I18n {
  options?: I18nOptions;
  services: I18nServices;
  initializedStoreOnce?: boolean;
  initializedLanguageOnce?: boolean;
  isInitialized?: boolean;
  changeLanguage(language: string): void;
}

interface UseSSROptions {
  i18n?: I18n;
}

export function useSSR(
  resourceStore?: ResourceStore,
  language?: string,
  options: UseSSROptions = {}
): void {
  const contextI18n = useContext(I18nContext)?.i18n;
  const i18n = options.i18n || contextI18n || getI18n();

  if (i18n.options?.isClone) {
    return;
  }

  if (resourceStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = resourceStore;
    
    i18n.options = i18n.options || {};
    i18n.options.ns = Object.values(resourceStore).reduce(
      (namespaces: string[], translations) => {
        Object.keys(translations).forEach((namespace) => {
          if (namespaces.indexOf(namespace) < 0) {
            namespaces.push(namespace);
          }
        });
        return namespaces;
      },
      i18n.options.ns || []
    );
    
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }

  if (language && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(language);
    i18n.initializedLanguageOnce = true;
  }
}