/**
 * Form component type definitions
 * Wraps rc-field-form to provide React form functionality with field management
 */

import type { FormInstance, FieldData, Store, InternalHooks } from 'rc-field-form';
import type { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import type { ValidateMessages } from 'rc-field-form/lib/interface';

/**
 * Form component props
 * @template Values - The type of form values object
 */
export interface FormProps<Values = any> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /**
   * Form name, used for form registration in context
   */
  name?: string;

  /**
   * Initial values for form fields
   */
  initialValues?: Partial<Values>;

  /**
   * External field data to sync with form state
   */
  fields?: FieldData[];

  /**
   * Form instance for imperative control
   */
  form?: FormInstance<Values>;

  /**
   * Whether to preserve field value when field is unmounted
   * @default true
   */
  preserve?: boolean;

  /**
   * Form content, can be render function or React node
   */
  children?: React.ReactNode | ((values: Values, form: FormInstance<Values>) => React.ReactNode);

  /**
   * Root component type, set to false to not render wrapper
   * @default 'form'
   */
  component?: string | false | React.ComponentType<any>;

  /**
   * Custom validation error messages
   */
  validateMessages?: ValidateMessages;

  /**
   * When to trigger field validation
   * @default 'onChange'
   */
  validateTrigger?: string | string[];

  /**
   * Callback when field values change
   * @param changedValues - The changed field values
   * @param allValues - All current field values
   */
  onValuesChange?: (changedValues: Partial<Values>, allValues: Values) => void;

  /**
   * Callback when field metadata changes (value, touched, validating, errors, etc.)
   * @param changedFields - The changed field metadata
   * @param allFields - All current field metadata
   */
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;

  /**
   * Callback when form validation succeeds
   * @param values - The validated form values
   */
  onFinish?: (values: Values) => void;

  /**
   * Callback when form validation fails
   * @param errorInfo - Error information including values, errors, and outOfDate flag
   */
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}

/**
 * Validation error information
 */
export interface ValidateErrorEntity<Values = any> {
  /**
   * Current form values
   */
  values: Values;

  /**
   * Fields with validation errors
   */
  errorFields: { name: (string | number)[]; errors: string[] }[];

  /**
   * Whether form data is out of date (changed during validation)
   */
  outOfDate: boolean;
}

/**
 * Form component
 * Provides form state management, validation, and submission handling
 * 
 * @example
 *