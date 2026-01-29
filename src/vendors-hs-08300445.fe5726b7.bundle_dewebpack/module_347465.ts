import React from 'react';
import Trigger from 'rc-trigger';
import { isEqualArrays } from './utils';
import Menus from './Menus';
import KeyCode from './KeyCode';
import { getArrayActiveOption } from './utils/arrayTreeFilter';
import placements from './placements';

interface FieldNames {
  label: string;
  value: string;
  children: string;
}

interface CascaderOption {
  label?: string;
  value?: string | number;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  [key: string]: unknown;
}

interface CascaderProps {
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  options?: CascaderOption[];
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  disabled?: boolean;
  transitionName?: string;
  prefixCls?: string;
  popupClassName?: string;
  popupPlacement?: string;
  builtinPlacements?: Record<string, unknown>;
  expandTrigger?: 'click' | 'hover';
  changeOnSelect?: boolean;
  fieldNames?: FieldNames;
  filedNames?: FieldNames; // deprecated typo
  loadData?: (selectedOptions: CascaderOption[]) => void;
  expandIcon?: React.ReactNode;
  children?: React.ReactElement;
  dropdownRender?: (menus: React.ReactElement) => React.ReactElement;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

interface CascaderState {
  popupVisible: boolean;
  activeValue: (string | number)[];
  value: (string | number)[];
  prevProps: CascaderProps;
}

class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    onChange: () => {},
    onPopupVisibleChange: () => {},
    disabled: false,
    transitionName: '',
    prefixCls: 'rc-cascader',
    popupClassName: '',
    popupPlacement: 'bottomLeft',
    builtinPlacements: placements,
    expandTrigger: 'click' as const,
    fieldNames: {
      label: 'label',
      value: 'value',
      children: 'children',
    },
    expandIcon: '>',
  };

  private trigger: Trigger | null = null;
  private readonly defaultFieldNames: FieldNames = {
    label: 'label',
    value: 'value',
    children: 'children',
  };

  constructor(props: CascaderProps) {
    super(props);

    const initialValue: (string | number)[] = [];
    if ('value' in props) {
      initialValue.push(...(props.value || []));
    } else if ('defaultValue' in props) {
      initialValue.push(...(props.defaultValue || []));
    }

    if (process.env.NODE_ENV !== 'production') {
      if ('filedNames' in props) {
        console.warn('`filedNames` of Cascader is a typo usage and deprecated, please use `fieldNames` instead.');
      }
    }

    this.state = {
      popupVisible: props.popupVisible ?? false,
      activeValue: [...initialValue],
      value: [...initialValue],
      prevProps: props,
    };
  }

  static getDerivedStateFromProps(props: CascaderProps, state: CascaderState): Partial<CascaderState> | null {
    const { prevProps = {} } = state;
    const newState: Partial<CascaderState> = {
      prevProps: props,
    };

    if ('value' in props && !isEqualArrays(prevProps.value, props.value)) {
      newState.value = props.value || [];
      if (!('loadData' in props)) {
        newState.activeValue = props.value || [];
      }
    }

    if ('popupVisible' in props) {
      newState.popupVisible = props.popupVisible ?? false;
    }

    return newState;
  }

  getPopupDOMNode(): HTMLElement | null {
    return this.trigger?.getPopupDomNode() ?? null;
  }

  getFieldName(name: keyof FieldNames): string {
    const { fieldNames, filedNames } = this.props;
    if ('filedNames' in this.props && filedNames) {
      return filedNames[name] || this.defaultFieldNames[name];
    }
    return (fieldNames && fieldNames[name]) || this.defaultFieldNames[name];
  }

  getFieldNames(): FieldNames {
    const { fieldNames, filedNames } = this.props;
    return ('filedNames' in this.props && filedNames) ? filedNames : (fieldNames || this.defaultFieldNames);
  }

  getCurrentLevelOptions(): CascaderOption[] {
    const { options = [] } = this.props;
    const { activeValue = [] } = this.state;

    const activeOptions = getArrayActiveOption(
      options,
      (option: CascaderOption, index: number) => option[this.getFieldName('value')] === activeValue[index],
      { childrenKeyName: this.getFieldName('children') }
    );

    const parentOption = activeOptions[activeOptions.length - 2];
    if (parentOption) {
      return parentOption[this.getFieldName('children')] || [];
    }

    return [...options].filter((option: CascaderOption) => !option.disabled);
  }

  getActiveOptions(value: (string | number)[]): CascaderOption[] {
    return getArrayActiveOption(
      this.props.options || [],
      (option: CascaderOption, index: number) => option[this.getFieldName('value')] === value[index],
      { childrenKeyName: this.getFieldName('children') }
    );
  }

  setPopupVisible = (visible: boolean): void => {
    const { value } = this.state;
    
    if (!('popupVisible' in this.props)) {
      this.setState({ popupVisible: visible });
    }

    if (visible && !this.state.popupVisible) {
      this.setState({ activeValue: [...value] });
    }

    this.props.onPopupVisibleChange?.(visible);
  };

  handleChange = (selectedOptions: CascaderOption[], meta: { visible: boolean }, event: React.SyntheticEvent): void => {
    const { visible } = meta;
    
    if (event.type === 'keydown' && (event as React.KeyboardEvent).keyCode !== KeyCode.ENTER) {
      return;
    }

    const values = selectedOptions.map((option: CascaderOption) => option[this.getFieldName('value')]);
    this.props.onChange?.(values, selectedOptions);
    this.setPopupVisible(visible);
  };

  handlePopupVisibleChange = (visible: boolean): void => {
    this.setPopupVisible(visible);
  };

  handleMenuSelect = (targetOption: CascaderOption, menuIndex: number, event: React.SyntheticEvent): void => {
    const rootNode = this.trigger?.getRootDomNode();
    if (rootNode?.focus) {
      rootNode.focus();
    }

    const { changeOnSelect, loadData, expandTrigger } = this.props;

    if (!targetOption || targetOption.disabled) {
      return;
    }

    let { activeValue } = this.state;
    activeValue = activeValue.slice(0, menuIndex + 1);
    activeValue[menuIndex] = targetOption[this.getFieldName('value')];

    const activeOptions = this.getActiveOptions(activeValue);

    if (targetOption.isLeaf === false && !targetOption[this.getFieldName('children')] && loadData) {
      if (changeOnSelect) {
        this.handleChange(activeOptions, { visible: true }, event);
      }
      this.setState({ activeValue });
      loadData(activeOptions);
      return;
    }

    const newState: Partial<CascaderState> = {};

    if (targetOption[this.getFieldName('children')]?.length) {
      if (changeOnSelect && (event.type === 'click' || event.type === 'keydown')) {
        if (expandTrigger === 'hover') {
          this.handleChange(activeOptions, { visible: false }, event);
        } else {
          this.handleChange(activeOptions, { visible: true }, event);
        }
        newState.value = activeValue;
      }
    } else {
      this.handleChange(activeOptions, { visible: false }, event);
      newState.value = activeValue;
    }

    newState.activeValue = activeValue;

    if ('value' in this.props || (event.type === 'keydown' && (event as React.KeyboardEvent).keyCode !== KeyCode.ENTER)) {
      delete newState.value;
    }

    this.setState(newState as CascaderState);
  };

  handleItemDoubleClick = (): void => {
    if (this.props.changeOnSelect) {
      this.setPopupVisible(false);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    const { children } = this.props;

    if (children?.props.onKeyDown) {
      children.props.onKeyDown(event);
      return;
    }

    const activeValue = [...this.state.activeValue];
    const currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
    const currentOptions = this.getCurrentLevelOptions();
    const currentIndex = currentOptions
      .map((option: CascaderOption) => option[this.getFieldName('value')])
      .indexOf(activeValue[currentLevel]);

    const { keyCode } = event;

    if (
      keyCode === KeyCode.DOWN ||
      keyCode === KeyCode.UP ||
      keyCode === KeyCode.LEFT ||
      keyCode === KeyCode.RIGHT ||
      keyCode === KeyCode.ENTER ||
      keyCode === KeyCode.SPACE ||
      keyCode === KeyCode.BACKSPACE ||
      keyCode === KeyCode.ESC ||
      keyCode === KeyCode.TAB
    ) {
      if (
        !this.state.popupVisible &&
        keyCode !== KeyCode.BACKSPACE &&
        keyCode !== KeyCode.LEFT &&
        keyCode !== KeyCode.RIGHT &&
        keyCode !== KeyCode.ESC &&
        keyCode !== KeyCode.TAB
      ) {
        this.setPopupVisible(true);
        this.props.onKeyDown?.(event);
        return;
      }

      if (keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
        event.preventDefault();
        let nextIndex = currentIndex;
        if (nextIndex !== -1) {
          if (keyCode === KeyCode.DOWN) {
            nextIndex = (nextIndex + 1) >= currentOptions.length ? 0 : nextIndex + 1;
          } else {
            nextIndex = (nextIndex - 1) < 0 ? currentOptions.length - 1 : nextIndex - 1;
          }
        } else {
          nextIndex = 0;
        }
        activeValue[currentLevel] = currentOptions[nextIndex][this.getFieldName('value')];
      } else if (keyCode === KeyCode.LEFT || keyCode === KeyCode.BACKSPACE) {
        event.preventDefault();
        activeValue.splice(activeValue.length - 1, 1);
      } else if (keyCode === KeyCode.RIGHT) {
        event.preventDefault();
        const currentOption = currentOptions[currentIndex];
        const children = currentOption?.[this.getFieldName('children')];
        if (children?.[0]) {
          activeValue.push(children[0][this.getFieldName('value')]);
        }
      } else if (keyCode === KeyCode.ESC || keyCode === KeyCode.TAB) {
        this.setPopupVisible(false);
        this.props.onKeyDown?.(event);
        return;
      }

      if (!activeValue || activeValue.length === 0) {
        this.setPopupVisible(false);
      }

      const selectedOptions = this.getActiveOptions(activeValue);
      const targetOption = selectedOptions[selectedOptions.length - 1];
      this.handleMenuSelect(targetOption, selectedOptions.length - 1, event);
      this.props.onKeyDown?.(event);
    }
  };

  saveTrigger = (node: Trigger | null): void => {
    this.trigger = node;
  };

  render(): React.ReactElement {
    const {
      prefixCls = 'rc-cascader',
      transitionName,
      popupClassName = '',
      options = [],
      disabled = false,
      builtinPlacements,
      popupPlacement,
      children,
      dropdownRender,
      ...restProps
    } = this.props;

    let menus: React.ReactElement = React.createElement('div', null);
    let emptyMenuClassName = '';

    if (options && options.length > 0) {
      menus = (
        <Menus
          {...this.props}
          fieldNames={this.getFieldNames()}
          defaultFieldNames={this.defaultFieldNames}
          activeValue={this.state.activeValue}
          onSelect={this.handleMenuSelect}
          onItemDoubleClick={this.handleItemDoubleClick}
          visible={this.state.popupVisible}
        />
      );
    } else {
      emptyMenuClassName = ` ${prefixCls}-menus-empty`;
    }

    let popup = menus;
    if (dropdownRender) {
      popup = dropdownRender(menus);
    }

    return (
      <Trigger
        ref={this.saveTrigger}
        {...restProps}
        popupPlacement={popupPlacement}
        builtinPlacements={builtinPlacements}
        popupTransitionName={transitionName}
        action={disabled ? [] : ['click']}
        popupVisible={!disabled && this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        prefixCls={`${prefixCls}-menus`}
        popupClassName={popupClassName + emptyMenuClassName}
        popup={popup}
      >
        {React.cloneElement(children!, {
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? undefined : 0,
        })}
      </Trigger>
    );
  }
}

export default Cascader;