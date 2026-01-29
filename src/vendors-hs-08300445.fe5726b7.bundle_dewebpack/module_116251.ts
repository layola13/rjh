import React, { createRef, Component, RefObject } from 'react';
import type { ReactElement } from 'react';

interface OptionData {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}

interface SelectProps {
  prefixCls?: string;
  value?: unknown;
  defaultValue?: unknown;
  options?: OptionData[];
  children?: React.ReactNode;
  onChange?: (value: unknown, option: OptionData | OptionData[]) => void;
  onSelect?: (value: unknown, option: OptionData) => void;
  onDeselect?: (value: unknown, option: OptionData) => void;
  onSearch?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
  filterOption?: boolean | ((inputValue: string, option: OptionData) => boolean);
  [key: string]: unknown;
}

interface InternalSelectProps extends SelectProps {
  components?: {
    optionList?: React.ComponentType<unknown>;
  };
  convertChildrenToData?: (children: React.ReactNode) => OptionData[];
  flattenOptions?: (options: OptionData[]) => OptionData[];
  getLabeledValue?: (value: unknown, options: OptionData[]) => OptionData;
  filterOptions?: (inputValue: string, options: OptionData[]) => OptionData[];
  isValueDisabled?: (value: unknown, options: OptionData[]) => boolean;
  findValueOption?: (value: unknown, options: OptionData[]) => OptionData | null;
  warningProps?: (props: SelectProps) => void;
  fillOptionsWithMissingValue?: (options: OptionData[], value: unknown) => OptionData[];
}

interface InternalSelectRef {
  focus: () => void;
  blur: () => void;
}

const DEFAULT_PREFIX_CLS = 'rc-select';

const InternalSelect = React.forwardRef<InternalSelectRef, InternalSelectProps>((props, ref) => {
  return React.createElement('div', props);
});

class Select extends Component<SelectProps> {
  static Option: React.ComponentType<OptionData>;
  static OptGroup: React.ComponentType<{ label?: React.ReactNode; children?: React.ReactNode }>;

  private selectRef: RefObject<InternalSelectRef>;

  constructor(props: SelectProps) {
    super(props);
    this.selectRef = createRef<InternalSelectRef>();
  }

  focus = (): void => {
    this.selectRef.current?.focus();
  };

  blur = (): void => {
    this.selectRef.current?.blur();
  };

  render(): ReactElement {
    return React.createElement(InternalSelect, {
      ref: this.selectRef,
      ...this.props
    });
  }
}

export default Select;