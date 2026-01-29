import { useMemo } from 'react';
import { getRawValueLabeled } from './raw-value-labeled';
import { formatStrategyKeys } from './strategy-formatter';

interface Entity<T = any> {
  key: string | number;
  data: {
    value: T;
    [key: string]: any;
  };
  [key: string]: any;
}

type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

interface UseFormattedValueOptions<T> {
  value: T[];
  getEntityByValue: (value: T) => Entity<T> | null | undefined;
  getEntityByKey: (key: string | number) => Entity<T> | null | undefined;
  treeConduction: boolean;
  showCheckedStrategy: ShowCheckedStrategy;
  conductKeyEntities: Map<string | number, Entity<T>>;
  getLabelProp: (entity: Entity<T>) => React.ReactNode;
}

interface FormattedValue<T> {
  value: T;
  label: React.ReactNode;
}

export default function useFormattedValue<T = any>(
  selectedValues: T[],
  options: UseFormattedValueOptions<T>
): FormattedValue<T>[] {
  const {
    value,
    getEntityByValue,
    getEntityByKey,
    treeConduction,
    showCheckedStrategy,
    conductKeyEntities,
    getLabelProp
  } = options;

  return useMemo(() => {
    let processedValues = selectedValues;

    if (treeConduction) {
      const keys = selectedValues.map((val) => {
        const entity = getEntityByValue(val);
        return entity ? entity.key : val;
      });

      const formattedKeys = formatStrategyKeys(
        keys,
        showCheckedStrategy,
        conductKeyEntities
      );

      processedValues = formattedKeys.map((key) => {
        const entity = getEntityByKey(key);
        return entity ? entity.data.value : (key as T);
      });
    }

    return getRawValueLabeled(
      processedValues,
      value,
      getEntityByValue,
      getLabelProp
    );
  }, [selectedValues, value, treeConduction, showCheckedStrategy, getEntityByValue]);
}