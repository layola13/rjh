import React, { Component, Fragment, useContext, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { toArray } from './utils/toArray';
import { validateRules } from './utils/validateRules';
import { 
  containsNamePath, 
  getNamePath, 
  getValue, 
  defaultGetValueFromEvent 
} from './utils/namePathUtils';
import FieldContext, { HOOK_MARK } from './FieldContext';

type NamePath = (string | number)[];
type StoreValue = any;
type Store = Record<string, StoreValue>;
type EventArgs = any[];

interface Rule {
  validateTrigger?: string | string[];
  [key: string]: any;
}

interface ValidateOptions {
  triggerName?: string;
  validateMessages?: Record<string, string>;
}

interface FieldEntity {
  onStoreChange: (prevStore: Store, namePathList: NamePath[] | null, info: NotifyInfo) => void;
  isFieldTouched: () => boolean;
  isFieldDirty: () => boolean;
  isFieldValidating: () => boolean;
  validateRules: (options?: ValidateOptions) => Promise<string[]>;
  getMeta: () => Meta;
  getNamePath: () => NamePath;
  getErrors: () => string[];
  isListField: () => boolean;
  isList: () => boolean;
}

interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  name: NamePath;
}

interface NotifyInfo {
  type: 'valueUpdate' | 'reset' | 'setField' | 'dependenciesUpdate';
  source?: 'internal' | 'external';
  store?: Store;
  data?: Partial<FieldData>;
  relatedFields?: NamePath[];
}

interface FieldData {
  touched: boolean;
  validating: boolean;
  errors: string[];
  originRCField?: boolean;
}

interface InternalHooks {
  dispatch: (action: FieldAction) => void;
  registerField: (entity: FieldEntity) => () => void;
  initEntityValue: (entity: FieldEntity) => void;
}

interface FieldAction {
  type: 'updateValue' | 'validateField';
  namePath: NamePath;
  value?: StoreValue;
  triggerName?: string;
}

interface FieldContextProps {
  getFieldsValue: (nameList?: true | NamePath[]) => Store;
  getInternalHooks: (mark: string) => InternalHooks;
  prefixName?: NamePath;
  validateTrigger?: string | string[];
}

interface ChildProps {
  [key: string]: any;
}

interface ChildNode {
  child: ReactNode;
  isFunction: boolean;
}

interface FieldProps {
  name?: NamePath;
  trigger?: string;
  valuePropName?: string;
  validateTrigger?: string | string[];
  rules?: Rule[] | ((context: FieldContextProps) => Rule[]);
  validateFirst?: boolean;
  dependencies?: NamePath[];
  shouldUpdate?: boolean | ((prevStore: Store, curStore: Store, info: NotifyInfo) => boolean);
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;
  getValueProps?: (value: StoreValue) => Record<string, any>;
  messageVariables?: Record<string, string>;
  preserve?: boolean;
  isListField?: boolean;
  isList?: boolean;
  onReset?: () => void;
  fieldContext?: FieldContextProps;
  children?: ReactNode | ((control: ChildProps, meta: Meta, context: FieldContextProps) => ReactNode);
}

interface FieldState {
  resetCount: number;
}

function shouldComponentUpdate(
  shouldUpdate: boolean | Function | undefined,
  prevStore: Store,
  curStore: Store,
  prevValue: StoreValue,
  curValue: StoreValue,
  info: NotifyInfo
): boolean {
  if (typeof shouldUpdate === 'function') {
    const extraInfo = 'source' in info ? { source: info.source } : {};
    return shouldUpdate(prevStore, curStore, extraInfo);
  }
  return prevValue !== curValue;
}

class Field extends Component<FieldProps, FieldState> implements FieldEntity {
  static contextType = FieldContext;
  static defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value'
  };

  public state: FieldState = {
    resetCount: 0
  };

  private cancelRegisterFunc: (() => void) | null = null;
  private mounted: boolean = false;
  private touched: boolean = false;
  private dirty: boolean = false;
  private validatePromise: Promise<string[]> | null = null;
  private errors: string[] = [];
  private prevValidating?: boolean;

  constructor(props: FieldProps) {
    super(props);

    const { fieldContext } = props;
    if (fieldContext) {
      const { initEntityValue } = fieldContext.getInternalHooks(HOOK_MARK);
      initEntityValue(this);
    }
  }

  componentDidMount(): void {
    const { shouldUpdate, fieldContext } = this.props;
    this.mounted = true;

    if (fieldContext) {
      const { registerField } = fieldContext.getInternalHooks(HOOK_MARK);
      this.cancelRegisterFunc = registerField(this);
    }

    if (shouldUpdate === true) {
      this.reRender();
    }
  }

  componentWillUnmount(): void {
    this.cancelRegister();
    this.mounted = false;
  }

  public cancelRegister = (): void => {
    const { preserve, isListField } = this.props;
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc(isListField, preserve);
      this.cancelRegisterFunc = null;
    }
  };

  public getNamePath = (): NamePath => {
    const { name, fieldContext } = this.props;
    const prefixName = fieldContext?.prefixName ?? [];
    return name !== undefined ? [...prefixName, ...name] : [];
  };

  public getRules = (): Rule[] => {
    const { rules = [], fieldContext } = this.props;
    return rules.map(rule => {
      return typeof rule === 'function' ? rule(fieldContext!) : rule;
    });
  };

  public refresh = (): void => {
    if (!this.mounted) return;
    this.setState(prevState => ({
      resetCount: prevState.resetCount + 1
    }));
  };

  public onStoreChange = (prevStore: Store, namePathList: NamePath[] | null, info: NotifyInfo): void => {
    const { shouldUpdate, dependencies = [], onReset } = this.props;
    const { store } = info;
    const namePath = this.getNamePath();
    const prevValue = this.getValue(prevStore);
    const curValue = this.getValue(store);
    const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

    if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
      this.touched = true;
      this.dirty = true;
      this.validatePromise = null;
      this.errors = [];
    }

    switch (info.type) {
      case 'reset':
        if (!namePathList || namePathMatch) {
          this.touched = false;
          this.dirty = false;
          this.validatePromise = null;
          this.errors = [];
          if (onReset) {
            onReset();
          }
          this.refresh();
          return;
        }
        break;

      case 'setField':
        if (namePathMatch) {
          const data = info.data!;
          if ('touched' in data) {
            this.touched = data.touched;
          }
          if ('validating' in data && !('originRCField' in data)) {
            this.validatePromise = data.validating ? Promise.resolve([]) : null;
          }
          if ('errors' in data) {
            this.errors = data.errors || [];
          }
          this.dirty = true;
          this.reRender();
          return;
        }

        if (shouldUpdate && !namePath.length && shouldComponentUpdate(shouldUpdate, prevStore, store!, prevValue, curValue, info)) {
          this.reRender();
          return;
        }
        break;

      case 'dependenciesUpdate':
        const dependencyPaths = dependencies.map(getNamePath);
        if (dependencyPaths.some(dep => containsNamePath(info.relatedFields!, dep))) {
          this.reRender();
          return;
        }
        break;

      default:
        if (
          namePathMatch ||
          ((!dependencies.length || namePath.length || shouldUpdate) &&
            shouldComponentUpdate(shouldUpdate, prevStore, store!, prevValue, curValue, info))
        ) {
          this.reRender();
          return;
        }
    }

    if (shouldUpdate === true) {
      this.reRender();
    }
  };

  public validateRules = (options?: ValidateOptions): Promise<string[]> => {
    const namePath = this.getNamePath();
    const currentValue = this.getValue();

    const promise = Promise.resolve().then(() => {
      if (!this.mounted) {
        return [];
      }

      const { validateFirst = false, messageVariables } = this.props;
      const { triggerName } = options || {};
      let filteredRules = this.getRules();

      if (triggerName) {
        filteredRules = filteredRules.filter(rule => {
          const { validateTrigger } = rule;
          if (!validateTrigger) return true;
          return toArray(validateTrigger).includes(triggerName);
        });
      }

      const validatePromise = validateRules(
        namePath,
        currentValue,
        filteredRules,
        options,
        validateFirst,
        messageVariables
      );

      return validatePromise
        .catch(errorList => errorList)
        .then((errorList: string[] = []) => {
          if (this.validatePromise === promise) {
            this.validatePromise = null;
            this.errors = errorList;
            this.reRender();
          }
        });
    });

    this.validatePromise = promise;
    this.dirty = true;
    this.errors = [];
    this.reRender();

    return promise;
  };

  public isFieldValidating = (): boolean => {
    return !!this.validatePromise;
  };

  public isFieldTouched = (): boolean => {
    return this.touched;
  };

  public isFieldDirty = (): boolean => {
    return this.dirty;
  };

  public getErrors = (): string[] => {
    return this.errors;
  };

  public isListField = (): boolean => {
    return !!this.props.isListField;
  };

  public isList = (): boolean => {
    return !!this.props.isList;
  };

  public getMeta = (): Meta => {
    this.prevValidating = this.isFieldValidating();
    return {
      touched: this.isFieldTouched(),
      validating: this.prevValidating,
      errors: this.errors,
      name: this.getNamePath()
    };
  };

  private getOnlyChild = (children: ReactNode | Function): ChildNode => {
    if (typeof children === 'function') {
      const meta = this.getMeta();
      return {
        ...this.getOnlyChild(children(this.getControlled(), meta, this.props.fieldContext!)),
        isFunction: true
      };
    }

    const childList = toArray(children);
    if (childList.length === 1 && isValidElement(childList[0])) {
      return {
        child: childList[0],
        isFunction: false
      };
    }

    return {
      child: childList,
      isFunction: false
    };
  };

  private getValue = (store?: Store): StoreValue => {
    const { fieldContext } = this.props;
    const getFieldsValue = fieldContext!.getFieldsValue;
    const namePath = this.getNamePath();
    return getValue(store || getFieldsValue(true), namePath);
  };

  private getControlled = (childProps: ChildProps = {}): ChildProps => {
    const {
      trigger = 'onChange',
      validateTrigger,
      getValueFromEvent,
      normalize,
      valuePropName = 'value',
      getValueProps,
      fieldContext
    } = this.props;

    const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : fieldContext!.validateTrigger;
    const namePath = this.getNamePath();
    const { dispatch } = fieldContext!.getInternalHooks(HOOK_MARK);
    const { getFieldsValue } = fieldContext!;
    const value = this.getValue();

    const valueProps = getValueProps ? getValueProps(value) : { [valuePropName]: value };
    const originTrigger = childProps[trigger];

    const control: ChildProps = {
      ...childProps,
      ...valueProps
    };

    control[trigger] = (...args: EventArgs): void => {
      this.touched = true;
      this.dirty = true;

      let newValue: StoreValue;
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args);
      }

      if (normalize) {
        newValue = normalize(newValue, value, getFieldsValue(true));
      }

      dispatch({
        type: 'updateValue',
        namePath,
        value: newValue
      });

      if (originTrigger) {
        originTrigger(...args);
      }
    };

    toArray(mergedValidateTrigger || []).forEach((triggerName: string) => {
      const originValidateTrigger = control[triggerName];
      control[triggerName] = (...args: EventArgs): void => {
        if (originValidateTrigger) {
          originValidateTrigger(...args);
        }

        const { rules } = this.props;
        if (rules && rules.length) {
          dispatch({
            type: 'validateField',
            namePath,
            triggerName
          });
        }
      };
    });

    return control;
  };

  private reRender(): void {
    if (!this.mounted) return;
    this.forceUpdate();
  }

  render(): ReactNode {
    const { resetCount } = this.state;
    const { children } = this.props;
    const { child, isFunction } = this.getOnlyChild(children);

    let returnChild: ReactNode;
    if (isFunction) {
      returnChild = child;
    } else if (isValidElement(child)) {
      returnChild = cloneElement(child, this.getControlled(child.props));
    } else {
      console.warn('`children` of Field is not validate ReactElement.');
      returnChild = child;
    }

    return <Fragment key={resetCount}>{returnChild}</Fragment>;
  }
}

export default function FieldWrapper(props: FieldProps): ReactElement {
  const { name, ...restProps } = props;
  const fieldContext = useContext(FieldContext);
  const namePath = name !== undefined ? getNamePath(name) : undefined;

  let key: string = 'keep';
  if (!restProps.isListField) {
    key = `_${(namePath || []).join('_')}`;
  }

  return (
    <Field
      key={key}
      name={namePath}
      {...restProps}
      fieldContext={fieldContext}
    />
  );
}