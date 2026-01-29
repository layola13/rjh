import { useContext, useEffect, useRef, useMemo, useImperativeHandle, ReactNode, FormEvent, ComponentType } from 'react';
import { FormInstance, FieldData, Store, ValidateMessages, InternalHooks } from './types';
import { FormContext } from './FormContext';
import { useForm } from './useForm';
import { HOOK_MARK } from './constants';
import { isSimilar } from './utils';

interface FormProps<Values = any> {
  name?: string;
  initialValues?: Partial<Values>;
  fields?: FieldData[];
  form?: FormInstance<Values>;
  preserve?: boolean;
  children?: ReactNode | ((values: Values, form: FormInstance<Values>) => ReactNode);
  component?: ComponentType<any> | string | false;
  validateMessages?: ValidateMessages;
  validateTrigger?: string | string[];
  onValuesChange?: (changedValues: Partial<Values>, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
  [key: string]: any;
}

export default function Form<Values = any>(
  props: FormProps<Values>,
  ref: React.Ref<FormInstance<Values>>
): JSX.Element {
  const {
    name,
    initialValues,
    fields,
    form,
    preserve,
    children,
    component = 'form',
    validateMessages,
    validateTrigger = 'onChange',
    onValuesChange,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    ...restProps
  } = props;

  const formContext = useContext(FormContext);
  const [formInstance] = useForm<Values>(form);

  const {
    useSubscribe,
    setInitialValues,
    setCallbacks,
    setValidateMessages,
    setPreserve
  } = formInstance.getInternalHooks(HOOK_MARK) as InternalHooks<Values>;

  useImperativeHandle(ref, () => formInstance);

  useEffect(() => {
    formContext.registerForm(name, formInstance);
    return () => {
      formContext.unregisterForm(name);
    };
  }, [formContext, formInstance, name]);

  setValidateMessages({
    ...formContext.validateMessages,
    ...validateMessages
  });

  setCallbacks({
    onValuesChange,
    onFieldsChange: (changedFields: FieldData[], ...args: any[]) => {
      formContext.triggerFormChange(name, changedFields);
      if (onFieldsChange) {
        onFieldsChange(changedFields, ...args);
      }
    },
    onFinish: (values: Values) => {
      formContext.triggerFormFinish(name, values);
      onFinish?.(values);
    },
    onFinishFailed
  });

  setPreserve(preserve);

  const isInitializedRef = useRef<boolean>(false);
  setInitialValues(initialValues, !isInitializedRef.current);
  if (!isInitializedRef.current) {
    isInitializedRef.current = true;
  }

  const isChildrenFunction = typeof children === 'function';
  let childrenNode: ReactNode = children;
  
  if (isChildrenFunction) {
    childrenNode = (children as (values: Values, form: FormInstance<Values>) => ReactNode)(
      formInstance.getFieldsValue(true),
      formInstance
    );
  }

  useSubscribe(!isChildrenFunction);

  const prevFieldsRef = useRef<FieldData[] | undefined>();
  useEffect(() => {
    if (!isSimilar(prevFieldsRef.current ?? [], fields ?? [])) {
      formInstance.setFields(fields ?? []);
    }
    prevFieldsRef.current = fields;
  }, [fields, formInstance]);

  const formContextValue = useMemo(
    () => ({
      ...formInstance,
      validateTrigger
    }),
    [formInstance, validateTrigger]
  );

  const formElement = (
    <FormContext.Provider value={formContextValue}>
      {childrenNode}
    </FormContext.Provider>
  );

  if (component === false) {
    return formElement;
  }

  const Component = component as ComponentType<any> | string;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    formInstance.submit();
  };

  return (
    <Component {...restProps} onSubmit={handleSubmit}>
      {formElement}
    </Component>
  );
}