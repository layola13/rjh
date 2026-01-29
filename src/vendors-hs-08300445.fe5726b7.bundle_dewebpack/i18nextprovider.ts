import { useMemo, createElement, ReactNode } from 'react';
import { I18nContext } from './I18nContext';

interface I18nextProviderProps {
  i18n: any;
  defaultNS?: string;
  children: ReactNode;
}

export function I18nextProvider({ i18n, defaultNS, children }: I18nextProviderProps) {
  const contextValue = useMemo(() => {
    return {
      i18n,
      defaultNS
    };
  }, [i18n, defaultNS]);

  return createElement(I18nContext.Provider, {
    value: contextValue
  }, children);
}