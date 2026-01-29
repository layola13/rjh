import * as React from 'react';

export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

type NamePath = string | number | (string | number)[];
type StoreValue = any;
type Store = Record<string, StoreValue>;

interface FieldError {
  name: NamePath;
  errors: string[];
  warnings?: string[];
}

interface FieldData {
  name: NamePath;
  value?: StoreValue;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface InternalHooks {
  dispatch: (action: any) => void;
  initEntityValue: (entity: any) => void;
  registerField: (entity: any) => () => void;
  useSubscribe: (subscribable: boolean) => void;
  setInitialValues: (values: Store, init: boolean) => void;
  setCallbacks: (callbacks: any) => void;
  getFields: () => any[];
  setValidateMessages: (messages: any) => void;
  setPreserve: (preserve: boolean) => void;
}

interface FormInstance {
  getFieldValue: (name: NamePath) => StoreValue;
  getFieldsValue: (nameList?: NamePath[] | true, filterFunc?: (meta: any) => boolean) => Store;
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (nameList?: NamePath[]) => FieldError[];
  isFieldsTouched: (nameList?: NamePath[] | boolean, allFieldsTouched?: boolean) => boolean;
  isFieldTouched: (name: NamePath) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  isFieldsValidating: (nameList?: NamePath[]) => boolean;
  resetFields: (fields?: NamePath[]) => void;
  setFields: (fields: FieldData[]) => void;
  setFieldsValue: (values: Store) => void;
  validateFields: (nameList?: NamePath[]) => Promise<Store>;
  submit: () => void;
  getInternalHooks: (key: string) => InternalHooks | null;
}

const warningFunction = (): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Can not find FormContext. Please make sure you wrap Field under Form.');
  }
};

const defaultGetInternalHooks = (): InternalHooks => {
  warningFunction();
  return {
    dispatch: warningFunction,
    initEntityValue: warningFunction,
    registerField: warningFunction as any,
    useSubscribe: warningFunction,
    setInitialValues: warningFunction,
    setCallbacks: warningFunction,
    getFields: warningFunction as any,
    setValidateMessages: warningFunction,
    setPreserve: warningFunction,
  };
};

const FormContext = React.createContext<FormInstance>({
  getFieldValue: warningFunction as any,
  getFieldsValue: warningFunction as any,
  getFieldError: warningFunction as any,
  getFieldsError: warningFunction as any,
  isFieldsTouched: warningFunction as any,
  isFieldTouched: warningFunction as any,
  isFieldValidating: warningFunction as any,
  isFieldsValidating: warningFunction as any,
  resetFields: warningFunction,
  setFields: warningFunction,
  setFieldsValue: warningFunction,
  validateFields: warningFunction as any,
  submit: warningFunction,
  getInternalHooks: defaultGetInternalHooks as any,
});

export default FormContext;