interface I18nextInstance {
  languages?: string[];
  options?: {
    ignoreJSONStructure?: boolean;
    fallbackLng?: string | string[] | false;
    resources?: Record<string, unknown>;
    partialBundledLanguages?: boolean;
  };
  services: {
    backendConnector: {
      state: Record<string, number>;
      backend?: unknown;
    };
  };
  isLanguageChangingTo?: string;
  hasResourceBundle(language: string, namespace: string): boolean;
  hasLoadedNamespace(
    namespace: string,
    options?: {
      precheck?: (instance: I18nextInstance, checkFn: CheckFunction) => boolean | void;
    }
  ): boolean;
  isInitialized: boolean;
  on(event: string, callback: () => void): void;
  off(event: string, callback: () => void): void;
  loadNamespaces(namespaces: string | string[], callback: () => void): void;
}

interface NamespaceOptions {
  bindI18n?: string;
}

type CheckFunction = (language: string, namespace: string) => boolean;

type ComponentType = { displayName?: string; name?: string } | string;

const warnOnceCache: Record<string, Date> = {};

function warn(...args: unknown[]): void {
  if (console && console.warn) {
    const messages = [...args];
    if (typeof messages[0] === "string") {
      messages[0] = `react-i18next:: ${messages[0]}`;
    }
    console.warn(...messages);
  }
}

function warnOnce(...args: unknown[]): void {
  const firstArg = args[0];
  if (typeof firstArg === "string" && warnOnceCache[firstArg]) {
    return;
  }
  if (typeof firstArg === "string") {
    warnOnceCache[firstArg] = new Date();
  }
  warn(...args);
}

export function getDisplayName(component: ComponentType): string {
  if (typeof component === "string" && component.length > 0) {
    return component;
  }
  if (typeof component === "object") {
    return component.displayName || component.name || "Unknown";
  }
  return "Unknown";
}

function hasLoadedNamespaceWithoutIgnoreJSONStructure(
  namespace: string,
  i18n: I18nextInstance,
  options: NamespaceOptions = {}
): boolean {
  const primaryLanguage = i18n.languages[0];
  const fallbackLanguage = i18n.options?.fallbackLng;
  const lastLanguage = i18n.languages[i18n.languages.length - 1];

  if (primaryLanguage.toLowerCase() === "cimode") {
    return true;
  }

  const isLanguageLoaded: CheckFunction = (language: string, ns: string): boolean => {
    const backendState = i18n.services.backendConnector.state[`${language}|${ns}`];
    return backendState === -1 || backendState === 2;
  };

  const isLanguageChanging =
    options.bindI18n &&
    options.bindI18n.indexOf("languageChanging") > -1 &&
    i18n.services.backendConnector.backend &&
    i18n.isLanguageChangingTo &&
    !isLanguageLoaded(i18n.isLanguageChangingTo, namespace);

  if (isLanguageChanging) {
    return false;
  }

  if (i18n.hasResourceBundle(primaryLanguage, namespace)) {
    return true;
  }

  const hasBackend = i18n.services.backendConnector.backend;
  const hasResources = i18n.options?.resources;
  const isPartialBundled = i18n.options?.partialBundledLanguages;

  if (!hasBackend || hasResources || !isPartialBundled) {
    return false;
  }

  const primaryLoaded = isLanguageLoaded(primaryLanguage, namespace);
  const fallbackLoaded = fallbackLanguage && isLanguageLoaded(lastLanguage, namespace);

  return primaryLoaded || !fallbackLanguage || !!fallbackLoaded;
}

export function hasLoadedNamespace(
  namespace: string,
  i18n: I18nextInstance,
  options: NamespaceOptions = {}
): boolean {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce("i18n.languages were undefined or empty", i18n.languages);
    return true;
  }

  if (i18n.options?.ignoreJSONStructure === undefined) {
    return hasLoadedNamespaceWithoutIgnoreJSONStructure(namespace, i18n, options);
  }

  return i18n.hasLoadedNamespace(namespace, {
    precheck: (instance: I18nextInstance, checkFn: CheckFunction): boolean | void => {
      const isLanguageChanging =
        options.bindI18n &&
        options.bindI18n.indexOf("languageChanging") > -1 &&
        instance.services.backendConnector.backend &&
        instance.isLanguageChangingTo &&
        !checkFn(instance.isLanguageChangingTo, namespace);

      if (isLanguageChanging) {
        return false;
      }
    },
  });
}

export function loadNamespaces(
  i18n: I18nextInstance,
  namespaces: string | string[],
  callback: () => void
): void {
  i18n.loadNamespaces(namespaces, () => {
    if (i18n.isInitialized) {
      callback();
    } else {
      const initHandler = (): void => {
        setTimeout(() => {
          i18n.off("initialized", initHandler);
        }, 0);
        callback();
      };
      i18n.on("initialized", initHandler);
    }
  });
}

export { warn, warnOnce };