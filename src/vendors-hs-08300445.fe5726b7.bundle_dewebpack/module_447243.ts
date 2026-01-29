import { useContext, useState, useEffect, useRef } from 'react';
import { I18nContext, getI18n, getDefaults, ReportNamespaces } from './I18nContext';
import { warnOnce, hasLoadedNamespace, loadNamespaces } from './utils';

interface I18nOptions {
  react?: {
    wait?: boolean;
    useSuspense?: boolean;
    bindI18n?: string;
    bindI18nStore?: string;
    nsMode?: string;
  };
  defaultNS?: string | string[];
}

interface I18nextInstance {
  reportNamespaces?: ReportNamespaces;
  options: I18nOptions;
  isInitialized: boolean;
  initializedStoreOnce: boolean;
  getFixedT: (lng: null, ns: string, keyPrefix?: string) => TranslationFunction;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  store: {
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  };
}

interface UseTranslationOptions {
  i18n?: I18nextInstance;
  useSuspense?: boolean;
  keyPrefix?: string;
  bindI18n?: string;
  bindI18nStore?: string;
  nsMode?: string;
}

interface TranslationFunction {
  (key: string | string[]): string;
}

interface UseTranslationResponse {
  0: TranslationFunction;
  1: I18nextInstance;
  2: boolean;
  t: TranslationFunction;
  i18n: I18nextInstance;
  ready: boolean;
}

function usePrevious<T>(value: T, isReady?: boolean): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = isReady ? ref.current : value;
  }, [value, isReady]);
  
  return ref.current;
}

export function useTranslation(
  namespace?: string | string[],
  options: UseTranslationOptions = {}
): UseTranslationResponse {
  const { i18n: i18nFromOptions } = options;
  const contextValue = useContext(I18nContext) || {};
  const { i18n: i18nFromContext, defaultNS } = contextValue;
  
  const i18n = i18nFromOptions || i18nFromContext || getI18n();
  
  if (i18n && !i18n.reportNamespaces) {
    i18n.reportNamespaces = new ReportNamespaces();
  }
  
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using initReactI18next");
    
    const fallbackTranslation = (key: string | string[]): string => {
      return Array.isArray(key) ? key[key.length - 1] : key;
    };
    
    const fallbackResponse: UseTranslationResponse = [
      fallbackTranslation,
      {} as I18nextInstance,
      false
    ] as UseTranslationResponse;
    
    fallbackResponse.t = fallbackTranslation;
    fallbackResponse.i18n = {} as I18nextInstance;
    fallbackResponse.ready = false;
    
    return fallbackResponse;
  }
  
  if (i18n.options.react?.wait !== undefined) {
    warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  }
  
  const mergedOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...options
  };
  
  const { useSuspense, keyPrefix, nsMode } = mergedOptions;
  
  let namespaces = namespace || defaultNS || i18n.options?.defaultNS;
  namespaces = typeof namespaces === "string" ? [namespaces] : namespaces || ["translation"];
  
  if (i18n.reportNamespaces?.addUsedNamespaces) {
    i18n.reportNamespaces.addUsedNamespaces(namespaces);
  }
  
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && 
    namespaces.every((ns: string) => hasLoadedNamespace(ns, i18n, mergedOptions));
  
  function getTranslation(): TranslationFunction {
    return i18n.getFixedT(
      null, 
      nsMode === "fallback" ? namespaces : namespaces[0], 
      keyPrefix
    );
  }
  
  const [translation, setTranslation] = useState<TranslationFunction>(getTranslation);
  const namespacesKey = namespaces.join();
  const previousNamespacesKey = usePrevious(namespacesKey);
  const isMountedRef = useRef<boolean>(true);
  
  useEffect(() => {
    const { bindI18n, bindI18nStore } = mergedOptions;
    
    function onUpdate(): void {
      if (isMountedRef.current) {
        setTranslation(getTranslation);
      }
    }
    
    isMountedRef.current = true;
    
    if (!ready && !useSuspense) {
      loadNamespaces(i18n, namespaces, () => {
        if (isMountedRef.current) {
          setTranslation(getTranslation);
        }
      });
    }
    
    if (ready && previousNamespacesKey && previousNamespacesKey !== namespacesKey && isMountedRef.current) {
      setTranslation(getTranslation);
    }
    
    if (bindI18n && i18n) {
      i18n.on(bindI18n, onUpdate);
    }
    
    if (bindI18nStore && i18n) {
      i18n.store.on(bindI18nStore, onUpdate);
    }
    
    return () => {
      isMountedRef.current = false;
      
      if (bindI18n && i18n) {
        bindI18n.split(" ").forEach((event: string) => i18n.off(event, onUpdate));
      }
      
      if (bindI18nStore && i18n) {
        bindI18nStore.split(" ").forEach((event: string) => i18n.store.off(event, onUpdate));
      }
    };
  }, [i18n, namespacesKey]);
  
  const isFirstRender = useRef<boolean>(true);
  
  useEffect(() => {
    if (isMountedRef.current && !isFirstRender.current) {
      setTranslation(getTranslation);
    }
    isFirstRender.current = false;
  }, [i18n, keyPrefix]);
  
  const result: UseTranslationResponse = [
    translation,
    i18n,
    ready
  ] as UseTranslationResponse;
  
  result.t = translation;
  result.i18n = i18n;
  result.ready = ready;
  
  if (ready) {
    return result;
  }
  
  if (!ready && !useSuspense) {
    return result;
  }
  
  throw new Promise<void>((resolve) => {
    loadNamespaces(i18n, namespaces, () => {
      resolve();
    });
  });
}