import * as React from 'react';
import { FormProvider as RcFormProvider } from 'rc-field-form';

interface FormContextValue {
  labelAlign: 'left' | 'right';
  vertical: boolean;
  itemRef: (name: string | number | (string | number)[]) => (node: React.ReactElement) => void;
}

interface FormItemContextValue {
  updateItemErrors: (name: string, errors: string[], warnings: string[]) => void;
}

interface FormItemPrefixContextValue {
  prefixCls: string;
}

interface FormProviderProps {
  prefixCls?: string;
  onFormChange?: (name: string, info: any) => void;
  onFormFinish?: (name: string, info: any) => void;
  children?: React.ReactNode;
}

export const FormContext = React.createContext<FormContextValue>({
  labelAlign: 'right',
  vertical: false,
  itemRef: () => {}
});

export const FormItemContext = React.createContext<FormItemContextValue>({
  updateItemErrors: () => {}
});

export const FormItemPrefixContext = React.createContext<FormItemPrefixContextValue>({
  prefixCls: ''
});

export const FormProvider: React.FC<FormProviderProps> = (props) => {
  const { prefixCls, ...restProps } = props;
  return React.createElement(RcFormProvider, restProps);
};