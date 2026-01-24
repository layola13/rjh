/**
 * Form context module providing React context for form field management.
 * Handles form state, validation, and field registration.
 */

import type { Context } from 'react';

/**
 * Internal hook marker used to identify authorized internal hooks access.
 * Prevents external code from accessing internal form APIs.
 */
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

/**
 * Field metadata and state information.
 */
export interface FieldData {
  /** Field name path */
  name: string | string[];
  /** Current field value */
  value?: unknown;
  /** Whether the field has been modified */
  touched?: boolean;
  /** Whether the field is currently validating */
  validating?: boolean;
  /** Validation error messages */
  errors?: string[];
}

/**
 * Form store internal hooks for advanced operations.
 * Only accessible via HOOK_MARK authentication.
 */
export interface InternalFormHooks {
  /** Dispatch form state changes */
  dispatch: (action: unknown) => void;
  
  /** Initialize entity value in the store */
  initEntityValue: (entity: unknown) => void;
  
  /** Register a field with the form store */
  registerField: (entity: unknown) => () => void;
  
  /** Subscribe to form state updates */
  useSubscribe: (subscribable: boolean) => void;
  
  /** Set initial values for all fields */
  setInitialValues: (values: Record<string, unknown>, init: boolean) => void;
  
  /** Set form callbacks (onFinish, onFinishFailed, etc.) */
  setCallbacks: (callbacks: Record<string, unknown>) => void;
  
  /** Get all registered fields */
  getFields: () => unknown[];
  
  /** Set validation messages template */
  setValidateMessages: (messages: Record<string, string>) => void;
  
  /** Set whether to preserve field value when field is removed */
  setPreserve: (preserve: boolean) => void;
}

/**
 * Form instance API exposed to consumers.
 */
export interface FormInstance<Values = unknown> {
  /** Get single field value by name */
  getFieldValue: (name: string | string[]) => unknown;
  
  /** Get multiple field values */
  getFieldsValue: (nameList?: string[][] | true, filterFunc?: (meta: unknown) => boolean) => Values;
  
  /** Get validation errors for a single field */
  getFieldError: (name: string | string[]) => string[];
  
  /** Get validation errors for multiple fields */
  getFieldsError: (nameList?: string[][]) => Array<{ name: string[]; errors: string[] }>;
  
  /** Check if any fields have been touched */
  isFieldsTouched: (nameList?: string[][], allFieldsTouched?: boolean) => boolean;
  
  /** Check if a specific field has been touched */
  isFieldTouched: (name: string | string[]) => boolean;
  
  /** Check if a specific field is validating */
  isFieldValidating: (name: string | string[]) => boolean;
  
  /** Check if any fields are validating */
  isFieldsValidating: (nameList: string[][]) => boolean;
  
  /** Reset fields to initial values */
  resetFields: (fields?: string[][]) => void;
  
  /** Set field data (value, errors, touched, etc.) */
  setFields: (fields: FieldData[]) => void;
  
  /** Set field values programmatically */
  setFieldsValue: (values: Partial<Values>) => void;
  
  /** Trigger field validation */
  validateFields: (nameList?: string[][]) => Promise<Values>;
  
  /** Submit the form */
  submit: () => void;
  
  /** Get internal hooks (requires HOOK_MARK authentication) */
  getInternalHooks: (mark: string) => InternalFormHooks;
}

/**
 * Default context instance with error-throwing stub functions.
 * Used when Form component is not properly wrapped.
 */
declare const FormContext: Context<FormInstance>;

export default FormContext;