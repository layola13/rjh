import React, { Component, ReactNode } from 'react';
import { changeConfirmLocale } from './confirm';
import LocaleContext from './LocaleContext';

export const ANT_MARK = 'internalMark';

interface ModalLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
}

interface Locale {
  locale?: string;
  Modal?: ModalLocale;
  [key: string]: unknown;
}

interface LocaleProviderProps {
  locale?: Locale;
  children?: ReactNode;
  _ANT_MARK__?: string;
}

interface LocaleContextValue extends Locale {
  exist: boolean;
}

export default class LocaleProvider extends Component<LocaleProviderProps> {
  static defaultProps: Partial<LocaleProviderProps> = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    
    changeConfirmLocale(props.locale?.Modal);
    
    if (process.env.NODE_ENV !== 'production') {
      if (props._ANT_MARK__ === ANT_MARK) {
        console.warn(
          'LocaleProvider',
          '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale'
        );
      }
    }
  }

  componentDidUpdate(prevProps: LocaleProviderProps): void {
    const { locale } = this.props;
    
    if (prevProps.locale !== locale) {
      changeConfirmLocale(locale?.Modal);
    }
  }

  componentWillUnmount(): void {
    changeConfirmLocale();
  }

  render(): ReactNode {
    const { locale, children } = this.props;
    
    const contextValue: LocaleContextValue = {
      ...locale,
      exist: true,
    };

    return (
      <LocaleContext.Provider value={contextValue}>
        {children}
      </LocaleContext.Provider>
    );
  }
}