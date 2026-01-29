import { createContext } from 'react';

interface I18nOptions {
  bindI18n?: string;
  bindI18nStore?: string;
  transEmptyNodeValue?: string;
  transSupportBasicHtmlNodes?: boolean;
  transWrapTextNodes?: string;
  transKeepBasicHtmlNodesFor?: string[];
  useSuspense?: boolean;
  unescape?: (text: string) => string;
}

interface ResourceBundle {
  [key: string]: unknown;
}

interface LanguageResources {
  [namespace: string]: ResourceBundle;
}

interface I18nStore {
  [language: string]: LanguageResources;
}

interface InitialProps {
  initialI18nStore: I18nStore;
  initialLanguage: string;
}

interface I18nInstance {
  languages: string[];
  language: string;
  options: {
    react?: I18nOptions;
  };
  reportNamespaces?: ReportNamespaces;
  getResourceBundle: (language: string, namespace: string) => ResourceBundle | null;
}

interface ComponentContext {
  ctx?: unknown;
  [key: string]: unknown;
}

interface ComponentWithInitialProps {
  getInitialProps?: (context: ComponentContext) => Promise<Record<string, unknown>>;
}

const unescape = (text: string): string => {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x60;': '`'
  };
  return text.replace(/&(?:amp|lt|gt|quot|#x27|#x60);/g, match => map[match] ?? match);
};

const defaults: I18nOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape
};

export const I18nContext = createContext<I18nInstance | undefined>(undefined);

export class ReportNamespaces {
  private usedNamespaces: Record<string, boolean> = {};

  addUsedNamespaces(namespaces: string[]): void {
    namespaces.forEach(namespace => {
      if (!this.usedNamespaces[namespace]) {
        this.usedNamespaces[namespace] = true;
      }
    });
  }

  getUsedNamespaces(): string[] {
    return Object.keys(this.usedNamespaces);
  }
}

let i18nInstance: I18nInstance | undefined;

export function setDefaults(options: I18nOptions = {}): void {
  Object.assign(defaults, options);
}

export function getDefaults(): I18nOptions {
  return defaults;
}

export function setI18n(instance: I18nInstance): void {
  i18nInstance = instance;
}

export function getI18n(): I18nInstance | undefined {
  return i18nInstance;
}

export const initReactI18next = {
  type: '3rdParty' as const,
  init(instance: I18nInstance): void {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

export function getInitialProps(): InitialProps {
  const i18n = getI18n();
  
  if (!i18n) {
    return {
      initialI18nStore: {},
      initialLanguage: ''
    };
  }

  const namespaces = i18n.reportNamespaces?.getUsedNamespaces() ?? [];
  const store: I18nStore = {};

  i18n.languages.forEach(language => {
    store[language] = {};
    namespaces.forEach(namespace => {
      store[language][namespace] = i18n.getResourceBundle(language, namespace) ?? {};
    });
  });

  return {
    initialI18nStore: store,
    initialLanguage: i18n.language
  };
}

export function composeInitialProps(Component: ComponentWithInitialProps) {
  return async (context: ComponentContext): Promise<Record<string, unknown>> => {
    return new Promise(resolve => {
      const initialProps = getInitialProps();
      
      if (Component.getInitialProps) {
        Component.getInitialProps(context).then(componentProps => {
          resolve({
            ...componentProps,
            ...initialProps
          });
        });
      } else {
        resolve(initialProps);
      }
    });
  };
}