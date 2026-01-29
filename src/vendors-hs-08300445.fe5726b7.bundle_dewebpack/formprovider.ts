import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface FormInstance {
  [key: string]: any;
}

interface FormChangeInfo {
  changedFields: any[];
  forms: Record<string, FormInstance>;
}

interface FormFinishInfo {
  values: any;
  forms: Record<string, FormInstance>;
}

interface FormContextValue {
  validateMessages?: Record<string, string>;
  triggerFormChange: (formName: string, changedFields: any[]) => void;
  triggerFormFinish: (formName: string, values: any) => void;
  registerForm: (formName: string, formInstance: FormInstance) => void;
  unregisterForm: (formName: string) => void;
}

interface FormProviderProps {
  validateMessages?: Record<string, string>;
  onFormChange?: (formName: string, info: FormChangeInfo) => void;
  onFormFinish?: (formName: string, info: FormFinishInfo) => void;
  children: ReactNode;
}

const FormContext = createContext<FormContextValue>({
  triggerFormChange: () => {},
  triggerFormFinish: () => {},
  registerForm: () => {},
  unregisterForm: () => {}
});

export const FormProvider: React.FC<FormProviderProps> = ({
  validateMessages,
  onFormChange,
  onFormFinish,
  children
}) => {
  const parentContext = useContext(FormContext);
  const formsRef = useRef<Record<string, FormInstance>>({});

  const contextValue: FormContextValue = {
    ...parentContext,
    validateMessages: {
      ...parentContext.validateMessages,
      ...validateMessages
    },
    triggerFormChange: (formName: string, changedFields: any[]) => {
      if (onFormChange) {
        onFormChange(formName, {
          changedFields,
          forms: formsRef.current
        });
      }
      parentContext.triggerFormChange(formName, changedFields);
    },
    triggerFormFinish: (formName: string, values: any) => {
      if (onFormFinish) {
        onFormFinish(formName, {
          values,
          forms: formsRef.current
        });
      }
      parentContext.triggerFormFinish(formName, values);
    },
    registerForm: (formName: string, formInstance: FormInstance) => {
      if (formName) {
        formsRef.current = {
          ...formsRef.current,
          [formName]: formInstance
        };
      }
      parentContext.registerForm(formName, formInstance);
    },
    unregisterForm: (formName: string) => {
      const updatedForms = { ...formsRef.current };
      delete updatedForms[formName];
      formsRef.current = updatedForms;
      parentContext.unregisterForm(formName);
    }
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;