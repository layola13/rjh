import React, { Component, Context, ReactNode, useMemo, useContext } from 'react';
import defaultLocales from './defaultLocales';
import LocaleContext from './LocaleContext';

interface LocaleData {
  [key: string]: any;
}

type LocaleProvider = LocaleData | (() => LocaleData);

interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: LocaleProvider;
  children: (locale: LocaleData, localeCode?: string, context?: LocaleContextValue) => ReactNode;
}

interface LocaleContextValue {
  locale?: string;
  exist?: boolean;
  [componentName: string]: any;
}

export function useLocaleReceiver(
  componentName?: string,
  defaultLocale?: LocaleProvider
): [LocaleData] {
  const context = useContext<LocaleContextValue>(LocaleContext);

  const locale = useMemo(() => {
    const defaultData = defaultLocale || defaultLocales[componentName || 'global'];
    const componentLocale = componentName && context ? context[componentName] : {};

    const resolvedDefault = typeof defaultData === 'function' ? defaultData() : defaultData;

    return {
      ...resolvedDefault,
      ...(componentLocale || {})
    };
  }, [componentName, defaultLocale, context]);

  return [locale];
}

class LocaleReceiver extends Component<LocaleReceiverProps> {
  static defaultProps = {
    componentName: 'global'
  };

  static contextType = LocaleContext;
  
  declare context: LocaleContextValue;

  getLocale(): LocaleData {
    const { componentName, defaultLocale } = this.props;
    const defaultData = defaultLocale || defaultLocales[componentName || 'global'];
    const context = this.context;
    const componentLocale = componentName && context ? context[componentName] : {};

    const resolvedDefault = typeof defaultData === 'function' ? defaultData() : defaultData;

    return {
      ...resolvedDefault,
      ...(componentLocale || {})
    };
  }

  getLocaleCode(): string | undefined {
    const context = this.context;
    const localeCode = context?.locale;

    return context?.exist && !localeCode ? defaultLocales.locale : localeCode;
  }

  render(): ReactNode {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context);
  }
}

export default LocaleReceiver;