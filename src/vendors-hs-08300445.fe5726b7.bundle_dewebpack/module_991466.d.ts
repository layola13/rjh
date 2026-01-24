/**
 * Form field component type definitions
 * Handles form field registration, validation, and state management
 */

import type { ReactElement, ReactNode, ComponentType } from 'react';
import type { FormInstance } from './FormInstance';
import type { NamePath, StoreValue, Store, InternalNamePath } from './interface';

/**
 * Validation rule definition
 */
export interface Rule {
  /** Validation error message */
  message?: string | ReactNode;
  /** Validation type (e.g., 'string', 'number', 'email', etc.) */
  type?: string;
  /** Whether field is required */
  required?: boolean;
  /** Custom validator function */
  validator?: (rule: Rule, value: StoreValue, callback: (error?: string) => void) => Promise<void> | void;
  /** Trigger event name(s) for validation */
  validateTrigger?: string | string[];
  /** Pattern for regex validation */
  pattern?: RegExp;
  /** Minimum value/length */
  min?: number;
  /** Maximum value/length */
  max?: number;
  /** Whitespace handling */
  whitespace?: boolean;
  /** Transform value before validation */
  transform?: (value: StoreValue) => StoreValue;
  /** Default field value */
  defaultField?: Rule;
  /** Array of nested rules */
  fields?: Record<string, Rule>;
  [key: string]: unknown;
}

/**
 * Field metadata information
 */
export interface Meta {
  /** Whether field has been touched/focused */
  touched: boolean;
  /** Whether field is currently validating */
  validating: boolean;
  /** Current validation errors */
  errors: string[];
  /** Field name path */
  name: InternalNamePath;
}

/**
 * Field validation options
 */
export interface ValidateOptions {
  /** Trigger event name that initiated validation */
  triggerName?: string;
  /** Whether to stop validation on first error */
  validateFirst?: boolean;
  /** Custom error messages */
  validateMessages?: Record<string, string>;
}

/**
 * Internal field context hooks
 */
export interface InternalHooks {
  /** Initialize entity value */
  initEntityValue: (entity: FieldEntity) => void;
  /** Register field entity */
  registerField: (entity: FieldEntity) => () => void;
  /** Dispatch field action */
  dispatch: (action: FieldAction) => void;
}

/**
 * Field action types for state updates
 */
export type FieldAction =
  | { type: 'updateValue'; namePath: InternalNamePath; value: StoreValue }
  | { type: 'validateField'; namePath: InternalNamePath; triggerName?: string }
  | { type: 'reset'; namePath?: InternalNamePath }
  | { type: 'setField'; namePath: InternalNamePath; data: Partial<FieldData> };

/**
 * Field data structure
 */
export interface FieldData {
  /** Field name path */
  name: NamePath;
  /** Current field value */
  value?: StoreValue;
  /** Whether field has been touched */
  touched?: boolean;
  /** Whether field is validating */
  validating?: boolean;
  /** Validation errors */
  errors?: string[];
  /** Internal marker */
  originRCField?: boolean;
}

/**
 * Field context provided to child components
 */
export interface FieldContext {
  /** Prefix name path for nested fields */
  prefixName?: InternalNamePath;
  /** Get all field values */
  getFieldsValue: (nameList?: NamePath[] | true) => Store;
  /** Default validation trigger event */
  validateTrigger?: string | string[];
  /** Get internal hooks */
  getInternalHooks: (key: string) => InternalHooks;
  /** Form instance */
  formInstance?: FormInstance;
}

/**
 * Store change notification data
 */
export interface NotifyInfo {
  /** Change type */
  type: 'valueUpdate' | 'reset' | 'setField' | 'dependenciesUpdate';
  /** Data store */
  store: Store;
  /** Change source */
  source?: 'internal' | 'external';
  /** Related field paths */
  relatedFields?: InternalNamePath[];
  /** Field data for setField action */
  data?: FieldData;
}

/**
 * Child render function signature
 */
export type ChildrenRenderFunction = (
  control: ControlFunctionArg,
  meta: Meta,
  context: FieldContext
) => ReactElement;

/**
 * Control properties passed to child components
 */
export interface ControlFunctionArg {
  [key: string]: unknown;
}

/**
 * Field entity interface - internal field controller
 */
export interface FieldEntity {
  /** Callback when store changes */
  onStoreChange: (prevStore: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) => void;
  /** Validate field rules */
  validateRules: (options?: ValidateOptions) => Promise<string[]>;
  /** Check if field is validating */
  isFieldValidating: () => boolean;
  /** Check if field has been touched */
  isFieldTouched: () => boolean;
  /** Check if field value has changed */
  isFieldDirty: () => boolean;
  /** Get current errors */
  getErrors: () => string[];
  /** Get field name path */
  getNamePath: () => InternalNamePath;
  /** Get field metadata */
  getMeta: () => Meta;
  /** Check if this is a list field */
  isListField: () => boolean;
  /** Check if this manages a list */
  isList: () => boolean;
  /** Refresh/re-render field */
  refresh: () => void;
}

/**
 * Field component props
 */
export interface FieldProps {
  /** Field name (string or path array) */
  name?: NamePath;
  /** Validation rules */
  rules?: Array<Rule | ((context: FieldContext) => Rule)>;
  /** Field dependencies - triggers re-render when dependency values change */
  dependencies?: NamePath[];
  /** Custom update condition - determines when field should update */
  shouldUpdate?: boolean | ((prevValues: Store, curValues: Store, info: NotifyInfo) => boolean);
  /** Trigger event name for value changes */
  trigger?: string;
  /** Trigger event name(s) for validation */
  validateTrigger?: string | string[];
  /** Property name for value in child component */
  valuePropName?: string;
  /** Extract value from event object */
  getValueFromEvent?: (...args: unknown[]) => StoreValue;
  /** Get value props for child component */
  getValueProps?: (value: StoreValue) => Record<string, unknown>;
  /** Normalize value before storing */
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;
  /** Whether to preserve value when field is unmounted */
  preserve?: boolean;
  /** Variables for validation message interpolation */
  messageVariables?: Record<string, string>;
  /** Initial field value */
  initialValue?: StoreValue;
  /** Callback when field is reset */
  onReset?: () => void;
  /** Child component or render function */
  children?: ReactNode | ChildrenRenderFunction;
  /** Internal: whether this is a list field */
  isListField?: boolean;
  /** Internal: whether this field manages a list */
  isList?: boolean;
  /** Internal: field context */
  fieldContext?: FieldContext;
}

/**
 * Field component state
 */
export interface FieldState {
  /** Reset counter for forcing re-render */
  resetCount: number;
}

/**
 * Field component class
 * Manages individual form field state, validation, and updates
 */
export declare class FieldClass extends Component<FieldProps, FieldState> {
  static contextType: Context<FieldContext>;
  static defaultProps: {
    trigger: string;
    valuePropName: string;
  };

  /** Cancel registration function */
  private cancelRegisterFunc: (() => void) | null;
  /** Whether component is mounted */
  private mounted: boolean;
  /** Whether field has been touched/focused */
  private touched: boolean;
  /** Whether field value has changed */
  private dirty: boolean;
  /** Current validation promise */
  private validatePromise: Promise<string[]> | null;
  /** Current validation errors */
  private errors: string[];

  /** Cancel field registration */
  private cancelRegister: () => void;
  /** Get field name path */
  private getNamePath: () => InternalNamePath;
  /** Get resolved validation rules */
  private getRules: () => Rule[];
  /** Refresh/re-render component */
  private refresh: () => void;
  /** Handle store changes */
  private onStoreChange: (prevStore: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) => void;
  /** Validate field rules */
  private validateRules: (options?: ValidateOptions) => Promise<string[]>;
  /** Check if field is validating */
  private isFieldValidating: () => boolean;
  /** Check if field has been touched */
  private isFieldTouched: () => boolean;
  /** Check if field value has changed */
  private isFieldDirty: () => boolean;
  /** Get current errors */
  private getErrors: () => string[];
  /** Check if this is a list field */
  private isListField: () => boolean;
  /** Check if this manages a list */
  private isList: () => boolean;
  /** Get field metadata */
  private getMeta: () => Meta;
  /** Get single child element */
  private getOnlyChild: (children: ReactNode | ChildrenRenderFunction) => { child: ReactNode; isFunction: boolean };
  /** Get field value from store */
  private getValue: (store?: Store) => StoreValue;
  /** Get controlled props for child component */
  private getControlled: (childProps?: Record<string, unknown>) => Record<string, unknown>;
  /** Force re-render */
  private reRender: () => void;

  componentDidMount(): void;
  componentWillUnmount(): void;
  render(): ReactElement;
}

/**
 * Field functional component
 * Wraps FieldClass with context and provides cleaner API
 */
declare const Field: ComponentType<FieldProps>;

export default Field;