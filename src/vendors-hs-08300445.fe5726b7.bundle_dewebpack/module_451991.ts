import type { ReactNode, ReactElement } from 'react';
import { isValidElement } from 'react';
import { convertChildrenToData } from './convertChildrenToData';
import { toArray } from './toArray';

type SelectMode = 'multiple' | 'tags' | 'combobox' | undefined;

interface LabelValueType {
  value: string | number;
  label?: ReactNode;
}

interface OptionData {
  value?: string | number;
  key?: string | number;
  disabled?: boolean;
  options?: OptionData[];
}

interface SelectProps {
  mode?: SelectMode;
  options?: OptionData[];
  children?: ReactNode;
  backfill?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  getInputElement?: () => ReactElement;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  defaultOpen?: boolean;
  autoFocus?: boolean;
  labelInValue?: boolean;
  value?: string | number | LabelValueType | Array<string | number | LabelValueType>;
  inputValue?: string;
  optionLabelProp?: string;
}

function warning(condition: boolean, message: string): void {
  if (!condition && process.env.NODE_ENV !== 'production') {
    console.error(`Warning: ${message}`);
  }
}

function noteOnce(condition: boolean, message: string): void {
  if (!condition && process.env.NODE_ENV !== 'production') {
    console.warn(`Note: ${message}`);
  }
}

function toArrayChildren(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = [];
  
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (isValidElement(child)) {
        result.push(child);
      }
    });
  } else if (isValidElement(children)) {
    result.push(children);
  }
  
  return result;
}

function hasOptionValue(option: OptionData): string | number | undefined {
  return 'value' in option ? option.value : option.key;
}

function validateSelect(props: SelectProps): void {
  const {
    mode,
    options,
    children,
    backfill,
    allowClear,
    placeholder,
    getInputElement,
    showSearch,
    onSearch,
    defaultOpen,
    autoFocus,
    labelInValue,
    value,
    inputValue,
    optionLabelProp
  } = props;

  const isMultiple = mode === 'multiple' || mode === 'tags';
  const computedShowSearch = showSearch !== undefined ? showSearch : isMultiple || mode === 'combobox';
  const optionsData = options ?? convertChildrenToData(children);

  warning(
    mode !== 'tags' || optionsData.every(option => !option.disabled),
    'Please avoid setting option to disabled in tags mode since user can always type text as tag.'
  );

  if (mode === 'tags' || mode === 'combobox') {
    const hasNumberValue = optionsData.some(option => {
      if (option.options) {
        return option.options.some(opt => typeof hasOptionValue(opt) === 'number');
      }
      return typeof hasOptionValue(option) === 'number';
    });

    warning(
      !hasNumberValue,
      '`value` of Option should not use number type when `mode` is `tags` or `combobox`.'
    );
  }

  warning(
    mode !== 'combobox' || !optionLabelProp,
    '`combobox` mode not support `optionLabelProp`. Please set `value` on Option directly.'
  );

  warning(
    mode === 'combobox' || !backfill,
    '`backfill` only works with `combobox` mode.'
  );

  warning(
    mode === 'combobox' || !getInputElement,
    '`getInputElement` only work with `combobox` mode.'
  );

  noteOnce(
    mode !== 'combobox' || !getInputElement || !allowClear || !placeholder,
    'Customize `getInputElement` should customize clear and placeholder logic instead of configuring `allowClear` and `placeholder`.'
  );

  if (onSearch && !computedShowSearch && mode !== 'combobox' && mode !== 'tags') {
    warning(
      false,
      '`onSearch` should work with `showSearch` instead of use alone.'
    );
  }

  noteOnce(
    !defaultOpen || autoFocus,
    '`defaultOpen` makes Select open without focus which means it will not close by click outside. You can set `autoFocus` if needed.'
  );

  if (value != null) {
    const values = toArray(value);
    
    warning(
      !labelInValue || values.every(val => typeof val === 'object' && ('key' in val || 'value' in val)),
      '`value` should in shape of `{ value: string | number, label?: ReactNode }` when you set `labelInValue` to `true`'
    );

    warning(
      !isMultiple || Array.isArray(value),
      '`value` should be array when `mode` is `multiple` or `tags`'
    );
  }

  if (children) {
    let invalidType: unknown = null;
    
    const hasInvalidChild = toArrayChildren(children).some(element => {
      if (!isValidElement(element) || !element.type) {
        return false;
      }

      const elementType = element.type as any;

      if (!elementType.isSelectOption) {
        if (elementType.isSelectOptGroup) {
          const hasInvalidGroupChild = !toArrayChildren(element.props.children).every(child => {
            if (!(isValidElement(child) && child.type && !(child.type as any).isSelectOption)) {
              return true;
            }
            invalidType = child.type;
            return false;
          });
          
          return hasInvalidGroupChild;
        }
        
        invalidType = elementType;
        return true;
      }
      
      return false;
    });

    if (invalidType) {
      const typeName = (invalidType as any).displayName ?? (invalidType as any).name ?? invalidType;
      warning(
        false,
        `\`children\` should be \`Select.Option\` or \`Select.OptGroup\` instead of \`${typeName}\`.`
      );
    }

    warning(
      inputValue === undefined,
      '`inputValue` is deprecated, please use `searchValue` instead.'
    );
  }
}

export default validateSelect;