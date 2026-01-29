import React, { useEffect, createElement, ReactNode } from 'react';
import { FormProvider } from 'rc-field-form';
import LocaleReceiver from './LocaleReceiver';
import LocaleProvider, { ANT_MARK } from './LocaleProvider';
import { ConfigConsumer, ConfigContext } from './context';
import { SizeContextProvider } from './SizeContext';
import defaultRenderEmpty from './defaultRenderEmpty';
import message from './message';
import notification from './notification';

export { ConfigConsumer, ConfigContext };

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
] as const;

export type Direction = 'ltr' | 'rtl';
export type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface CSPConfig {
  nonce?: string;
}

export interface FormConfig {
  validateMessages?: Record<string, string>;
  requiredMark?: 'optional' | boolean;
  colon?: boolean;
}

export interface InputConfig {
  autoComplete?: string;
}

export interface PageHeaderConfig {
  ghost?: boolean;
}

export interface SpaceConfig {
  size?: SizeType | number;
}

export interface Locale {
  locale?: string;
  Form?: {
    defaultValidateMessages?: Record<string, string>;
  };
  [key: string]: unknown;
}

export interface ConfigProviderProps {
  children?: ReactNode;
  prefixCls?: string;
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  renderEmpty?: (componentName?: string) => ReactNode;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: FormConfig;
  input?: InputConfig;
  locale?: Locale;
  pageHeader?: PageHeaderConfig;
  componentSize?: SizeType;
  direction?: Direction;
  space?: SpaceConfig;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
}

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: (componentName?: string) => ReactNode;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  locale?: Locale;
  direction?: Direction;
  space?: SpaceConfig;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
  form?: FormConfig;
  input?: InputConfig;
  pageHeader?: PageHeaderConfig;
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
} = (props) => {
  useEffect(() => {
    if (props.direction) {
      message.config({
        rtl: props.direction === 'rtl',
      });
      notification.config({
        rtl: props.direction === 'rtl',
      });
    }
  }, [props.direction]);

  const getPrefixClsWrapper = (context: ConfigConsumerProps) => {
    return (suffixCls?: string, customizePrefixCls?: string): string => {
      const { prefixCls } = props;

      if (customizePrefixCls) {
        return customizePrefixCls;
      }

      const mergedPrefixCls = prefixCls || context.getPrefixCls('');

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
  };

  return createElement(LocaleReceiver, null, (
    _localeValue: unknown,
    localeCode: string,
    localeData: Locale,
  ) => {
    return createElement(ConfigConsumer, null, (context: ConfigConsumerProps) => {
      const {
        children,
        getTargetContainer,
        getPopupContainer,
        renderEmpty,
        csp,
        autoInsertSpaceInButton,
        form,
        input,
        locale,
        pageHeader,
        componentSize,
        direction,
        space,
        virtual,
        dropdownMatchSelectWidth,
      } = props;

      const config: ConfigConsumerProps = {
        ...context,
        getPrefixCls: getPrefixClsWrapper(context),
        csp,
        autoInsertSpaceInButton,
        locale: locale || localeData,
        direction,
        space,
        virtual,
        dropdownMatchSelectWidth,
      };

      if (getTargetContainer) {
        config.getTargetContainer = getTargetContainer;
      }

      if (getPopupContainer) {
        config.getPopupContainer = getPopupContainer;
      }

      if (renderEmpty) {
        config.renderEmpty = renderEmpty;
      }

      if (pageHeader) {
        config.pageHeader = pageHeader;
      }

      if (input) {
        config.input = input;
      }

      if (form) {
        config.form = form;
      }

      let childNode = children;
      const validateMessages: Record<string, string> = {};

      if (locale?.Form?.defaultValidateMessages) {
        Object.assign(validateMessages, locale.Form.defaultValidateMessages);
      }

      if (form?.validateMessages) {
        Object.assign(validateMessages, form.validateMessages);
      }

      if (Object.keys(validateMessages).length > 0) {
        childNode = createElement(
          FormProvider,
          { validateMessages },
          children,
        );
      }

      const localeWrappedNode = locale === undefined
        ? childNode
        : createElement(
            LocaleProvider,
            {
              locale: locale || localeData,
              _ANT_MARK__: ANT_MARK,
            },
            childNode,
          );

      return createElement(
        SizeContextProvider,
        { size: componentSize },
        createElement(
          ConfigContext.Provider,
          { value: config },
          localeWrappedNode,
        ),
      );
    });
  });
};

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;