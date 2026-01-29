import { useContext, useMemo, useImperativeHandle, createElement, forwardRef, Context, ReactElement, RefObject } from 'react';
import type { FormInstance, FormProps, FieldData, ScrollOptions } from './types';

interface SizeContextValue {
  size?: 'small' | 'default' | 'large';
}

interface ConfigContextValue {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
  form?: {
    requiredMark?: boolean | 'optional';
  };
}

interface FormContextValue {
  name?: string;
  labelAlign?: 'left' | 'right';
  labelCol?: Record<string, unknown>;
  wrapperCol?: Record<string, unknown>;
  vertical?: boolean;
  colon?: boolean;
  requiredMark?: boolean | 'optional';
  itemRef: (name: string) => RefObject<unknown>;
}

interface InternalFormInstance extends FormInstance {
  __INTERNAL__: {
    name?: string;
    itemRef: (name: string) => RefObject<unknown>;
  };
}

interface FinishFailedErrorInfo {
  errorFields: Array<{ name: string[]; errors: string[] }>;
  outOfDate: boolean;
  values: Record<string, unknown>;
}

interface FormComponentProps extends Omit<FormProps, 'prefixCls' | 'className' | 'size' | 'form' | 'colon' | 'labelAlign' | 'labelCol' | 'wrapperCol' | 'hideRequiredMark' | 'layout' | 'scrollToFirstError' | 'requiredMark' | 'onFinishFailed' | 'name'> {
  prefixCls?: string;
  className?: string;
  size?: 'small' | 'default' | 'large';
  form?: FormInstance;
  colon?: boolean;
  labelAlign?: 'left' | 'right';
  labelCol?: Record<string, unknown>;
  wrapperCol?: Record<string, unknown>;
  hideRequiredMark?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
  scrollToFirstError?: boolean | ScrollOptions;
  requiredMark?: boolean | 'optional';
  onFinishFailed?: (errorInfo: FinishFailedErrorInfo) => void;
  name?: string;
}

declare const SizeContext: Context<SizeContextValue>;
declare const ConfigContext: Context<ConfigContextValue>;
declare const FormContext: Context<FormContextValue>;
declare const SizeContextProvider: React.ComponentType<{ size?: 'small' | 'default' | 'large'; children: React.ReactNode }>;
declare const InternalForm: React.ComponentType<any>;
declare function useForm(form?: FormInstance): [InternalFormInstance];
declare function classNames(...args: Array<string | Record<string, boolean> | undefined>): string;

export { List } from './List';
export { default as useForm } from './useForm';

const FormComponent = (props: FormComponentProps, ref: React.Ref<FormInstance>): ReactElement => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    size: customizeSize,
    form: customizeForm,
    colon,
    labelAlign,
    labelCol,
    wrapperCol,
    hideRequiredMark,
    layout = 'horizontal',
    scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    ...restProps
  } = props;

  const sizeContext = useContext(SizeContext);
  const configContext = useContext(ConfigContext);
  const { getPrefixCls, direction, form: formConfig } = configContext;

  const mergedSize = customizeSize ?? sizeContext;

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }
    if (formConfig?.requiredMark !== undefined) {
      return formConfig.requiredMark;
    }
    return !hideRequiredMark;
  }, [hideRequiredMark, requiredMark, formConfig]);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${mergedSize}`]: !!mergedSize,
    },
    className
  );

  const [formInstance] = useForm(customizeForm);
  const internalFormInstance = formInstance as InternalFormInstance;
  const { __INTERNAL__: internal } = internalFormInstance;
  internal.name = name;

  const formContextValue = useMemo<FormContextValue>(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical',
      colon,
      requiredMark: mergedRequiredMark,
      itemRef: internal.itemRef,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, colon, mergedRequiredMark]
  );

  useImperativeHandle(ref, () => formInstance);

  const handleFinishFailed = (errorInfo: FinishFailedErrorInfo): void => {
    onFinishFailed?.(errorInfo);

    if (scrollToFirstError && errorInfo.errorFields.length > 0) {
      let scrollOptions: ScrollOptions = { block: 'nearest' };
      if (typeof scrollToFirstError === 'object') {
        scrollOptions = scrollToFirstError;
      }
      formInstance.scrollToField(errorInfo.errorFields[0].name, scrollOptions);
    }
  };

  return createElement(
    SizeContextProvider,
    { size: mergedSize },
    createElement(
      FormContext.Provider,
      { value: formContextValue },
      createElement(InternalForm, {
        id: name,
        ...restProps,
        name,
        onFinishFailed: handleFinishFailed,
        form: formInstance,
        className: formClassName,
      })
    )
  );
};

const Form = forwardRef(FormComponent);

export default Form;