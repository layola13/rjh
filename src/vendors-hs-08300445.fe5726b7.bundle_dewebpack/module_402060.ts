export interface OptionCore {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  key?: string | number;
}

export interface OptionData extends OptionCore {
  [key: string]: unknown;
}

export interface OptionGroup {
  label?: React.ReactNode;
  options: OptionData[];
  key?: string | number;
}

export type OptionsType = (OptionData | OptionGroup)[];

export interface FlattenOptionData<T = OptionData | OptionGroup> {
  key: string | number;
  data: T;
  group?: boolean;
  groupOption?: boolean;
}

export interface LabeledValue {
  value: string | number;
  label?: React.ReactNode;
  key: string | number;
  isCacheable?: boolean;
}

export interface FilterConfig {
  optionFilterProp: string;
  filterOption?: boolean | ((inputValue: string, option: OptionData | OptionGroup) => boolean);
}

interface FillOptionsConfig {
  prevValueOptions?: OptionData[];
}

function getOptionKey(option: OptionData | OptionGroup, index: number): string | number {
  const { key } = option;
  let value: string | number | undefined;
  
  if ('value' in option) {
    value = option.value;
  }
  
  if (key != null) {
    return key;
  }
  
  if (value !== undefined) {
    return value;
  }
  
  return `rc-index-key-${index}`;
}

function wrapOption(option: OptionData): OptionData {
  const wrapped = { ...option };
  
  if (!('props' in wrapped)) {
    Object.defineProperty(wrapped, 'props', {
      get() {
        console.warn(
          'Return type is option instead of Option instance. Please read value directly instead of reading from `props`.'
        );
        return wrapped;
      }
    });
  }
  
  return wrapped;
}

function toArrayValue<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : (value != null ? [value] : []);
}

function toTextValue(value: React.ReactNode): string {
  return toArrayValue(value).join('');
}

export function findValueOption(
  values: (string | number)[],
  options: FlattenOptionData[],
  config: FillOptionsConfig = {}
): OptionData[] {
  const { prevValueOptions = [] } = config;
  const optionMap = new Map<string | number, OptionData>();
  
  options.forEach(option => {
    if (!option.group) {
      const data = option.data as OptionData;
      optionMap.set(data.value, data);
    }
  });
  
  return values.map(value => {
    let foundOption = optionMap.get(value);
    
    if (!foundOption) {
      const prevOption = prevValueOptions.find(
        opt => (opt as any)._INTERNAL_OPTION_VALUE_ === value
      );
      foundOption = { ...prevOption };
    }
    
    return wrapOption(foundOption);
  });
}

export function flattenOptions(options: OptionsType): FlattenOptionData[] {
  const result: FlattenOptionData[] = [];
  
  function flatten(opts: OptionsType, isGroupOption: boolean): void {
    opts.forEach(option => {
      if (isGroupOption || !('options' in option)) {
        result.push({
          key: getOptionKey(option, result.length),
          groupOption: isGroupOption,
          data: option
        });
      } else {
        result.push({
          key: getOptionKey(option, result.length),
          group: true,
          data: option
        });
        flatten(option.options, true);
      }
    });
  }
  
  flatten(options, false);
  return result;
}

export function fillOptionsWithMissingValue(
  options: OptionsType,
  values: (string | number | LabeledValue)[] | string | number | LabeledValue,
  labelProp: string,
  isLabeledValue: boolean
): OptionsType {
  const sortedValues = toArrayValue(values).slice().sort();
  const clonedOptions = [...options];
  const existingValues = new Set<string | number>();
  
  options.forEach(option => {
    if ('options' in option) {
      option.options.forEach(opt => {
        existingValues.add(opt.value);
      });
    } else {
      existingValues.add(option.value);
    }
  });
  
  sortedValues.forEach(valueItem => {
    const actualValue = isLabeledValue ? (valueItem as LabeledValue).value : (valueItem as string | number);
    
    if (!existingValues.has(actualValue)) {
      if (isLabeledValue) {
        const labeled = valueItem as LabeledValue;
        clonedOptions.push({
          [labelProp]: labeled.label,
          value: actualValue
        });
      } else {
        clonedOptions.push({
          value: actualValue
        });
      }
    }
  });
  
  return clonedOptions;
}

export function filterOptions(
  searchValue: string,
  options: OptionsType,
  config: FilterConfig
): OptionsType {
  const { optionFilterProp, filterOption } = config;
  
  if (filterOption === false) {
    return [...options];
  }
  
  const filterFunc: (inputValue: string, option: OptionData | OptionGroup) => boolean =
    typeof filterOption === 'function'
      ? filterOption
      : (inputValue, option) => {
          const lowerInput = inputValue.toLowerCase();
          
          if ('options' in option) {
            return toTextValue(option.label).toLowerCase().includes(lowerInput);
          }
          
          return toTextValue(option[optionFilterProp]).toLowerCase().includes(lowerInput);
        };
  
  const filtered: OptionsType = [];
  
  options.forEach(option => {
    if ('options' in option) {
      if (filterFunc(searchValue, option)) {
        filtered.push(option);
      } else {
        const matchedChildren = option.options.filter(child =>
          filterFunc(searchValue, child)
        );
        
        if (matchedChildren.length > 0) {
          filtered.push({
            ...option,
            options: matchedChildren
          });
        }
      }
    } else {
      if (filterFunc(searchValue, wrapOption(option))) {
        filtered.push(option);
      }
    }
  });
  
  return filtered;
}

export function getLabeledValue(
  value: string | number,
  config: {
    options: FlattenOptionData[];
    prevValueMap: Map<string | number, LabeledValue>;
    labelInValue: boolean;
    optionLabelProp: string;
  }
): LabeledValue {
  const { options, prevValueMap, labelInValue, optionLabelProp } = config;
  const foundOption = findValueOption([value], options)[0];
  const labeledValue: LabeledValue = { value, key: value };
  const prevLabeledValue = labelInValue ? prevValueMap.get(value) : undefined;
  
  if (
    prevLabeledValue &&
    typeof prevLabeledValue === 'object' &&
    'label' in prevLabeledValue
  ) {
    labeledValue.label = prevLabeledValue.label;
    
    if (
      foundOption &&
      typeof prevLabeledValue.label === 'string' &&
      typeof foundOption[optionLabelProp] === 'string' &&
      prevLabeledValue.label.trim() !== (foundOption[optionLabelProp] as string).trim()
    ) {
      console.warn(
        '`label` of `value` is not same as `label` in Select options.'
      );
    }
  } else if (foundOption && optionLabelProp in foundOption) {
    labeledValue.label = foundOption[optionLabelProp];
  } else {
    labeledValue.label = value;
    labeledValue.isCacheable = true;
  }
  
  return labeledValue;
}

export function getSeparatedContent(
  text: string,
  separators: string[]
): string[] | null {
  if (!separators || separators.length === 0) {
    return null;
  }
  
  let hasSeparated = false;
  
  function split(str: string, seps: string[]): string[] {
    const [firstSep, ...restSeps] = seps;
    
    if (!firstSep) {
      return [str];
    }
    
    const parts = str.split(firstSep);
    hasSeparated = hasSeparated || parts.length > 1;
    
    return parts
      .reduce<string[]>(
        (acc, part) => [...acc, ...split(part, restSeps)],
        []
      )
      .filter(part => part);
  }
  
  const result = split(text, separators);
  return hasSeparated ? result : null;
}

export function isValueDisabled(
  value: string | number,
  options: FlattenOptionData[]
): boolean {
  return findValueOption([value], options)[0].disabled;
}