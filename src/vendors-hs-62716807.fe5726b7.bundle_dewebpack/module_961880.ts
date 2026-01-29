import React, { Component, ReactNode } from 'react';
import { changeConfirmLocale } from './confirm';

export const ANT_MARK = "internalMark";

interface ModalLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
}

interface Locale {
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

const LocaleContext = React.createContext<LocaleContextValue>({
  exist: false,
});

/**
 * @deprecated LocaleProvider is deprecated. Please use `locale` with `ConfigProvider` instead
 * @see http://u.ant.design/locale
 */
export default class LocaleProvider extends Component<LocaleProviderProps> {
  static defaultProps: LocaleProviderProps = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      const isInternalMark = props._ANT_MARK__ === ANT_MARK;
      if (!isInternalMark) {
        console.warn(
          'LocaleProvider',
          '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale'
        );
      }
    }

    changeConfirmLocale(props.locale?.Modal);
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
    const { locale = {}, children } = this.props;

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

export { LocaleContext };