import { useState } from 'react';

export const DEFAULT_PAGE_SIZE = 10;

interface PaginationState {
  current: number;
  pageSize: number;
}

interface PaginationConfig extends PaginationState {
  total?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  onChange?: (current: number, pageSize: number) => void;
  [key: string]: unknown;
}

interface PaginationResult extends PaginationConfig {
  onChange: (current: number, pageSize: number) => void;
}

type SetPagination = (current?: number, pageSize?: number) => void;

function mergeObjects(...sources: Array<Record<string, unknown> | undefined>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  sources.forEach((source) => {
    if (source) {
      Object.keys(source).forEach((key) => {
        const value = source[key];
        if (value !== undefined) {
          result[key] = value;
        }
      });
    }
  });
  
  return result;
}

function omit<T extends Record<string, unknown>>(
  obj: T,
  keys: string[]
): Omit<T, typeof keys[number]> {
  const result: Record<string, unknown> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keys.indexOf(symbol as unknown as string) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as unknown as string] = obj[symbol as unknown as string];
      }
    }
  }
  
  return result as Omit<T, typeof keys[number]>;
}

export function getPaginationParam(
  config: PaginationConfig | false,
  pagination: PaginationConfig
): PaginationState {
  const result: PaginationState = {
    current: pagination.current,
    pageSize: pagination.pageSize,
  };
  
  const configObj = config && typeof config === 'object' ? config : {};
  
  Object.keys(configObj).forEach((key) => {
    const value = pagination[key];
    if (typeof value !== 'function') {
      (result as Record<string, unknown>)[key] = value;
    }
  });
  
  return result;
}

export default function usePagination(
  dataLength: number,
  paginationConfig: PaginationConfig | false,
  onChange: (current: number, pageSize: number) => void
): [PaginationResult | Record<string, never>, SetPagination] {
  const config = paginationConfig && typeof paginationConfig === 'object' ? paginationConfig : {};
  const { total = 0, ...restConfig } = config;
  
  const [state, setState] = useState<PaginationState>(() => {
    return {
      current: 'defaultCurrent' in restConfig ? restConfig.defaultCurrent! : 1,
      pageSize: 'defaultPageSize' in restConfig ? restConfig.defaultPageSize! : DEFAULT_PAGE_SIZE,
    };
  });
  
  const mergedPagination = mergeObjects(state, restConfig, {
    total: total > 0 ? total : dataLength,
  }) as PaginationConfig;
  
  if (!total) {
    const totalPages = Math.ceil(dataLength / mergedPagination.pageSize!);
    if (totalPages < mergedPagination.current!) {
      mergedPagination.current = 1;
    }
  }
  
  const changePagination: SetPagination = (current = 1, pageSize) => {
    setState({
      current,
      pageSize: pageSize ?? mergedPagination.pageSize!,
    });
  };
  
  if (paginationConfig === false) {
    return [{}, () => {}];
  }
  
  return [
    {
      ...mergedPagination,
      onChange: (current: number, pageSize: number) => {
        const currentPageSize = mergedPagination.pageSize;
        let newCurrent = current;
        
        if (pageSize && pageSize !== currentPageSize) {
          newCurrent = 1;
        }
        
        if (paginationConfig && paginationConfig.onChange) {
          paginationConfig.onChange(newCurrent, pageSize);
        }
        
        changePagination(newCurrent, pageSize);
        onChange(newCurrent, pageSize ?? currentPageSize!);
      },
    } as PaginationResult,
    changePagination,
  ];
}