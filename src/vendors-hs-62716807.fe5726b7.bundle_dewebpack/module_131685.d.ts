import type { ReactNode, ReactElement } from 'react';
import type { Locale } from './locale';
import type { SizeType } from './SizeContext';
import type { ValidateMessages } from 'rc-field-form/lib/interface';

/**
 * Configuration consumer props that can be passed through context
 */
export declare const configConsumerProps: [
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

/**
 * Content Security Policy configuration
 */
export interface CSPConfig {
  nonce?: string;
}

/**
 * Direction type for RTL/LTR support
 */
export type DirectionType = 'ltr' | 'rtl';

/**
 * Function to get prefix class name
 */
export type GetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => string;

/**
 * Page header configuration
 */
export interface PageHeaderConfig {
  ghost?: boolean;
}

/**
 * Form configuration
 */
export interface FormConfig {
  validateMessages?: ValidateMessages;
  requiredMark?: boolean | 'optional';
  colon?: boolean;
}

/**
 * Input configuration
 */
export interface InputConfig {
  autoComplete?: string;
}

/**
 * Space configuration
 */
export interface SpaceConfig {
  size?: SizeType | number;
}

/**
 * Virtual scroll configuration
 */
export interface VirtualConfig {
  dropdownMatchSelectWidth?: boolean | number;
}

/**
 * ConfigProvider component props
 */
export interface ConfigProviderProps {
  /** Get container for portals */
  getTargetContainer?: () => HTMLElement;
  
  /** Get container for popups */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  
  /** Root prefix class name */
  rootPrefixCls?: string;
  
  /** Prefix class name */
  prefixCls?: string;
  
  /** Custom function to get prefix class name */
  getPrefixCls?: GetPrefixCls;
  
  /** Render empty content */
  renderEmpty?: (componentName?: string) => ReactNode;
  
  /** Content Security Policy configuration */
  csp?: CSPConfig;
  
  /** Auto insert space in button */
  autoInsertSpaceInButton?: boolean;
  
  /** Locale configuration */
  locale?: Locale;
  
  /** Page header configuration */
  pageHeader?: PageHeaderConfig;
  
  /** Component size */
  componentSize?: SizeType;
  
  /** Text direction */
  direction?: DirectionType;
  
  /** Space configuration */
  space?: SpaceConfig;
  
  /** Virtual scroll configuration */
  virtual?: VirtualConfig;
  
  /** Dropdown match select width */
  dropdownMatchSelectWidth?: boolean | number;
  
  /** Form configuration */
  form?: FormConfig;
  
  /** Input configuration */
  input?: InputConfig;
  
  /** Children nodes */
  children?: ReactNode;
}

/**
 * Config context value type
 */
export interface ConfigConsumerProps extends ConfigProviderProps {
  getPrefixCls: GetPrefixCls;
}

/**
 * Config context
 */
export declare const ConfigContext: React.Context<ConfigConsumerProps>;

/**
 * Config consumer component
 */
export declare const ConfigConsumer: typeof ConfigContext.Consumer;

/**
 * ConfigProvider component for global configuration
 */
declare const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
};

export default ConfigProvider;