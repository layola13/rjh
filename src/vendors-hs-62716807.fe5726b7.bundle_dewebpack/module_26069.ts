import React, { Component, Context, ReactNode, useMemo, useContext } from 'react';

interface LocaleData {
  [key: string]: unknown;
}

interface LocaleContextValue {
  locale?: string;
  exist?: boolean;
  [componentName: string]: LocaleData | string | boolean | undefined;
}

interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: LocaleData | (() => LocaleData);
  children: (locale: LocaleData, localeCode?: string, context?: LocaleContextValue) => ReactNode;
}

interface DefaultLocales {
  [componentName: string]: LocaleData | (() => LocaleData);
  locale: string;
}

const defaultLocales: DefaultLocales = {
  global: {},
  locale: 'en-US'
};

const LocaleContext: Context<LocaleContextValue | undefined> = React.createContext<LocaleContextValue | undefined>(undefined);

export function useLocaleReceiver(
  componentName?: string,
  defaultLocale?: LocaleData | (() => LocaleData)
): [LocaleData] {
  const context = useContext(LocaleContext);

  const locale = useMemo(() => {
    const baseLocale = defaultLocale || defaultLocales[componentName || 'global'];
    const contextLocale = componentName && context ? context[componentName] : {};
    
    const resolvedBaseLocale = typeof baseLocale === 'function' ? baseLocale() : baseLocale;
    
    return {
      ...resolvedBaseLocale,
      ...(contextLocale || {})
    };
  }, [componentName, defaultLocale, context]);

  return [locale];
}

export default class LocaleReceiver extends Component<LocaleReceiverProps> {
  static defaultProps = {
    componentName: 'global'
  };

  static contextType = LocaleContext;
  
  declare context: LocaleContextValue | undefined;

  getLocale(): LocaleData {
    const { componentName, defaultLocale } = this.props;
    const baseLocale = defaultLocale || defaultLocales[componentName || 'global'];
    const context = this.context;
    const contextLocale = componentName && context ? context[componentName] : {};

    const resolvedBaseLocale = typeof baseLocale === 'function' ? baseLocale() : baseLocale;

    return {
      ...resolvedBaseLocale,
      ...(contextLocale || {})
    };
  }

  getLocaleCode(): string | undefined {
    const context = this.context;
    const contextLocale = context?.locale;

    return context?.exist && !contextLocale ? defaultLocales.locale : contextLocale;
  }

  render(): ReactNode {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context);
  }
}