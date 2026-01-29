import { memo, useRef, useState, useContext, useEffect, ReactElement, ReactNode, CSSProperties } from 'react';
import { ConfigContext } from './ConfigContext';
import { FormContext, FormItemContext } from './FormContext';
import FormContext as FormContextModule from './FormContextModule';
import Row from './Row';
import ItemLabel from './ItemLabel';
import ItemControl from './ItemControl';
import { Field } from './Field';
import { supportRef } from './supportRef';
import { toArray, getFieldId } from './utils';
import { isValidElement, cloneElement } from 'react';
import useForceUpdate from './useForceUpdate';
import useMergedRef from './useMergedRef';
import isEqual from './isEqual';
import omit from './omit';
import warning from './warning';

type ValidateStatus = 'success' | 'warning' | 'error' | 'validating' | '';

interface Rule {
  required?: boolean;
  [key: string]: unknown;
}

interface FieldMeta {
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
  warnings?: string[];
  name?: (string | number)[];
  value?: unknown;
}

interface FormItemProps {
  name?: string | number | (string | number)[];
  fieldKey?: string | number | (string | number)[];
  noStyle?: boolean;
  dependencies?: (string | number)[] | ((string | number)[])[];
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  shouldUpdate?: boolean | ((prevValues: unknown, curValues: unknown) => boolean);
  hasFeedback?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateStatus?: ValidateStatus;
  children?: ReactNode | ((form: unknown) => ReactNode);
  required?: boolean;
  label?: ReactNode;
  messageVariables?: Record<string, string>;
  trigger?: string;
  validateTrigger?: string | string[];
  hidden?: boolean;
  colon?: boolean;
  extra?: ReactNode;
  getValueFromEvent?: (...args: unknown[]) => unknown;
  getValueProps?: (value: unknown) => Record<string, unknown>;
  htmlFor?: string;
  id?: string;
  initialValue?: unknown;
  isListField?: boolean;
  labelAlign?: 'left' | 'right';
  labelCol?: Record<string, unknown>;
  normalize?: (value: unknown, prevValue: unknown, allValues: unknown) => unknown;
  preserve?: boolean;
  tooltip?: ReactNode;
  validateFirst?: boolean;
  valuePropName?: string;
  wrapperCol?: Record<string, unknown>;
  _internalItemRender?: unknown;
}

interface ErrorState {
  [key: string]: string[];
}

const ValueContext = memo<{ value: unknown; update: number; children: ReactNode }>(
  ({ children }) => children as ReactElement,
  (prev, next) => prev.value === next.value && prev.update === next.update
);

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    name,
    fieldKey,
    noStyle,
    dependencies,
    prefixCls: customPrefixCls,
    style,
    className,
    shouldUpdate,
    hasFeedback,
    help,
    rules,
    validateStatus,
    children,
    required,
    label,
    messageVariables,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    ...restProps
  } = props;

  const isUnmountedRef = useRef<boolean>(false);
  const { getPrefixCls } = useContext(ConfigContext);
  const { name: formName, requiredMark } = useContext(FormContext);
  const { updateItemErrors } = useContext(FormItemContext);

  const [helpStatus, setHelpStatus] = useState<boolean>(!!help);
  const [errorState, setErrorState] = useState<ErrorState>({});

  const { validateTrigger: contextValidateTrigger } = useContext(FormContextModule);
  const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  const updateHelpStatus = (visible: boolean): void => {
    if (!isUnmountedRef.current) {
      setHelpStatus(visible);
    }
  };

  const hasName = name !== null && name !== undefined;
  if (name === null) {
    warning(false, 'Form.Item', '`null` is passed as `name` property');
  }

  const errorKeys = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      updateItemErrors(errorKeys.current.join('__SPLIT__'), []);
    };
  }, []);

  const prefixCls = getPrefixCls('form', customPrefixCls);

  const updateErrors = noStyle
    ? updateItemErrors
    : (key: string, errors: string[]): void => {
        setErrorState((prev = {}) => {
          if (isEqual(prev[key], errors)) {
            return prev;
          }
          return { ...prev, [key]: errors };
        });
      };

  const mergedRef = useMergedRef();

  const renderLayout = (
    childNode: ReactNode,
    fieldId?: string,
    meta?: FieldMeta,
    isRequired?: boolean
  ): ReactElement => {
    if (noStyle && !hidden) {
      return childNode as ReactElement;
    }

    let mergedErrors: string[] = [];
    Object.keys(errorState).forEach((key) => {
      mergedErrors = [...mergedErrors, ...(errorState[key] || [])];
    });

    const mergedHelp = help !== undefined && help !== null ? toArray(help) : meta?.errors || [];
    const finalErrors = [...mergedHelp, ...mergedErrors];

    let mergedValidateStatus: ValidateStatus = '';
    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta?.validating) {
      mergedValidateStatus = 'validating';
    } else if (meta?.errors?.length || mergedErrors.length) {
      mergedValidateStatus = 'error';
    } else if (meta?.touched) {
      mergedValidateStatus = 'success';
    }

    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: helpStatus || help,
      [`${className}`]: !!className,
      [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
      [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
      [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
      [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
      [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
      [`${prefixCls}-item-hidden`]: hidden,
    };

    const omittedProps = omit(restProps, [
      'colon',
      'extra',
      'getValueFromEvent',
      'getValueProps',
      'htmlFor',
      'id',
      'initialValue',
      'isListField',
      'labelAlign',
      'labelCol',
      'normalize',
      'preserve',
      'tooltip',
      'validateFirst',
      'valuePropName',
      'wrapperCol',
      '_internalItemRender',
    ]);

    return (
      <Row className={Object.keys(itemClassName).filter(k => itemClassName[k]).join(' ')} style={style} key="row" {...omittedProps}>
        <ItemLabel
          htmlFor={fieldId}
          required={isRequired}
          requiredMark={requiredMark}
          {...props}
          prefixCls={prefixCls}
        />
        <ItemControl
          {...props}
          {...meta}
          errors={finalErrors}
          prefixCls={prefixCls}
          status={mergedValidateStatus}
          onDomErrorVisibleChange={updateHelpStatus}
          validateStatus={mergedValidateStatus}
        >
          <FormItemContext.Provider value={{ updateItemErrors: updateErrors }}>
            {childNode}
          </FormItemContext.Provider>
        </ItemControl>
      </Row>
    );
  };

  const isRenderProps = typeof children === 'function';
  const updateCount = useRef<number>(0);
  updateCount.current += 1;

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children);
  }

  let mergedMessageVariables: Record<string, string> = {};
  if (typeof label === 'string') {
    mergedMessageVariables.label = label;
  }
  if (messageVariables) {
    mergedMessageVariables = { ...mergedMessageVariables, ...messageVariables };
  }

  return (
    <Field
      {...props}
      messageVariables={mergedMessageVariables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onReset={() => updateHelpStatus(false)}
    >
      {(control: Record<string, unknown>, meta: FieldMeta, form: unknown) => {
        const { errors } = meta;
        const namePath = toArray(name).length && meta ? meta.name : [];
        const fieldId = getFieldId(namePath as (string | number)[], formName);

        if (noStyle) {
          errorKeys.current = [...namePath] as string[];
          if (fieldKey) {
            const keys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
            errorKeys.current = [...(namePath as (string | number)[]).slice(0, -1), ...keys] as string[];
          }
          updateItemErrors(errorKeys.current.join('__SPLIT__'), errors);
        }

        const isRequired =
          required !== undefined
            ? required
            : !!(rules?.some((rule) => {
                if (rule && typeof rule === 'object' && rule.required) {
                  return true;
                }
                if (typeof rule === 'function') {
                  const ruleResult = rule(form);
                  return ruleResult && (ruleResult as Rule).required;
                }
                return false;
              }));

        const mergedControl = { ...control };
        let childNode: ReactNode = null;

        warning(
          !(shouldUpdate && dependencies),
          'Form.Item',
          '`shouldUpdate` and `dependencies` shouldn\'t be used together. See https://ant.design/components/form/#dependencies.'
        );

        if (Array.isArray(children) && hasName) {
          warning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
          childNode = children;
        } else if (isRenderProps && (!shouldUpdate && !dependencies || hasName)) {
          warning(
            !(!shouldUpdate && !dependencies),
            'Form.Item',
            '`children` of render props only work with `shouldUpdate` or `dependencies`.'
          );
          warning(!hasName, 'Form.Item', 'Do not use `name` with `children` of render props since it\'s not a field.');
        } else if (!dependencies || isRenderProps || hasName) {
          if (isValidElement(children)) {
            warning(
              children.props.defaultValue === undefined,
              'Form.Item',
              '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.'
            );

            const childProps = { ...children.props, ...mergedControl };
            if (!childProps.id) {
              childProps.id = fieldId;
            }

            if (supportRef(children)) {
              childProps.ref = mergedRef(namePath as (string | number)[], children);
            }

            const triggerSet = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);
            triggerSet.forEach((eventName) => {
              childProps[eventName] = (...args: unknown[]) => {
                mergedControl[eventName]?.(...args);
                (children.props as Record<string, unknown>)[eventName]?.(...args);
              };
            });

            childNode = (
              <ValueContext value={mergedControl[props.valuePropName || 'value']} update={updateCount.current}>
                {cloneElement(children, childProps)}
              </ValueContext>
            );
          } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
            childNode = (children as (form: unknown) => ReactNode)(form);
          } else {
            warning(
              !namePath.length,
              'Form.Item',
              '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
            );
            childNode = children;
          }
        } else {
          warning(false, 'Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
        }

        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </Field>
  );
};

export default FormItem;