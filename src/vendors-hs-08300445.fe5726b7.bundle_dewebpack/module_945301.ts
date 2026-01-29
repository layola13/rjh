import { toArray } from './utils';

interface TreeSelectValue {
  label: string;
  value: string | number;
}

interface TreeSelectProps {
  searchPlaceholder?: string;
  treeCheckStrictly?: boolean;
  treeCheckable?: boolean;
  labelInValue?: boolean;
  value?: TreeSelectValue | TreeSelectValue[] | string | number | null;
  multiple?: boolean;
}

function warning(condition: boolean, message: string): void {
  if (!condition) {
    console.warn(`Warning: ${message}`);
  }
}

function getType(obj: unknown): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export default function validateTreeSelectProps(props: TreeSelectProps): void {
  const {
    searchPlaceholder,
    treeCheckStrictly,
    treeCheckable,
    labelInValue,
    value,
    multiple,
  } = props;

  warning(
    !searchPlaceholder,
    '`searchPlaceholder` has been removed.'
  );

  if (treeCheckStrictly && labelInValue === false) {
    warning(
      false,
      '`treeCheckStrictly` will force set `labelInValue` to `true`.'
    );
  }

  if (labelInValue || treeCheckStrictly) {
    warning(
      toArray(value).every((item): boolean => {
        return item && getType(item) === 'object' && 'value' in (item as object);
      }),
      'Invalid prop `value` supplied to `TreeSelect`. You should use { label: string, value: string | number } or [{ label: string, value: string | number }] instead.'
    );
  }

  if (treeCheckStrictly || multiple || treeCheckable) {
    warning(
      !value || Array.isArray(value),
      '`value` should be an array when `TreeSelect` is checkable or multiple.'
    );
  } else {
    warning(
      !Array.isArray(value),
      '`value` should not be array when `TreeSelect` is single mode.'
    );
  }
}