import { useEffect, createElement, ReactNode } from 'react';
import { FormProvider } from 'rc-field-form';
import LocaleProvider, { ANT_MARK } from './LocaleProvider';
import { SizeContextProvider } from './SizeContext';
import { ConfigConsumer, ConfigContext } from './ConfigContext';
import type { ConfigConsumerProps, DirectionType, CSPConfig, RenderEmptyHandler } from './types';

export { ConfigConsumer, ConfigContext };

export const configConsumerProps: ConfigConsumerProps[] = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader'
];

interface FormConfig {
  validateMessages?: Record<string, string>;
}

interface InputConfig {
  autoComplete?: string;
}

interface SpaceConfig {
  size?: number | 'small' | 'middle' | 'large';
}

interface PageHeaderConfig {
  ghost?: boolean;
}

interface LocaleData {
  locale: string;
  Form?: {
    defaultValidateMessages?: Record<string, string>;
  };
}

interface ConfigProviderProps {
  prefixCls?: string;
  children?: ReactNode;
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: FormConfig;
  input?: InputConfig;
  locale?: LocaleData;
  pageHeader?: PageHeaderConfig;
  componentSize?: 'small' | 'middle' | 'large';
  direction?: DirectionType;
  space?: SpaceConfig;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
}

interface InternalConfigContext {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  locale?: LocaleData;
  direction?: DirectionType;
  space?: SpaceConfig;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  renderEmpty?: RenderEmptyHandler;
  pageHeader?: PageHeaderConfig;
  input?: InputConfig;
  form?: FormConfig;
}

const ConfigProvider = (props: ConfigProviderProps): JSX.Element => {
  useEffect(() => {
    if (props.direction) {
      // Configure RTL for message component
      const messageConfig = { rtl: props.direction === 'rtl' };
      // Configure RTL for notification component
      const notificationConfig = { rtl: props.direction === 'rtl' };
    }
  }, [props.direction]);

  const getPrefixClsWrapper = (context: InternalConfigContext) => {
    return (suffixCls?: string, customizePrefixCls?: string): string => {
      const { prefixCls } = props;
      
      if (customizePrefixCls) {
        return customizePrefixCls;
      }
      
      const basePrefixCls = prefixCls || context.getPrefixCls('');
      return suffixCls ? `${basePrefixCls}-${suffixCls}` : basePrefixCls;
    };
  };

  return createElement(LocaleProvider, null, (
    _localeValue: unknown,
    _localeCode: string,
    defaultLocale: LocaleData
  ) => {
    return createElement(ConfigConsumer, null, (contextConfig: InternalConfigContext) => {
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
        dropdownMatchSelectWidth
      } = props;

      const config: InternalConfigContext = {
        ...contextConfig,
        getPrefixCls: getPrefixClsWrapper(contextConfig),
        csp,
        autoInsertSpaceInButton,
        locale: locale || defaultLocale,
        direction,
        space,
        virtual,
        dropdownMatchSelectWidth
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

      let childNode: ReactNode = children;
      const validateMessages: Record<string, string> = {};

      if (locale?.Form?.defaultValidateMessages) {
        Object.assign(validateMessages, locale.Form.defaultValidateMessages);
      }

      if (form?.validateMessages) {
        Object.assign(validateMessages, form.validateMessages);
      }

      if (Object.keys(validateMessages).length > 0) {
        childNode = createElement(FormProvider, { validateMessages }, children);
      }

      const wrappedChildNode = locale === undefined 
        ? childNode 
        : createElement(LocaleProvider, {
            locale: locale || defaultLocale,
            _ANT_MARK__: ANT_MARK
          }, childNode);

      return createElement(SizeContextProvider, { size: componentSize },
        createElement(ConfigContext.Provider, { value: config }, wrappedChildNode)
      );
    });
  });
};

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;