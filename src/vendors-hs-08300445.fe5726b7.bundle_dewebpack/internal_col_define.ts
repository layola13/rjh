export const INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";

/**
 * Extract data-* and aria-* attributes from props object
 * @param props - Source props object
 * @returns Object containing only data-* and aria-* attributes
 */
export function getDataAndAriaProps<T extends Record<string, unknown>>(
  props: T
): Record<string, unknown> {
  return Object.keys(props).reduce((result, key) => {
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      result[key] = props[key];
    }
    return result;
  }, {} as Record<string, unknown>);
}

interface ExpandableConfig {
  [key: string]: unknown;
}

interface PropsWithExpandable {
  expandable?: ExpandableConfig;
  [key: string]: unknown;
}

/**
 * Merge expandable configuration into props
 * @param props - Props object that may contain expandable config
 * @returns Merged props with expandable properties flattened
 */
export function getExpandableProps<T extends PropsWithExpandable>(
  props: T
): Omit<T, "expandable"> & Partial<ExpandableConfig> {
  const { expandable, ...restProps } = props;
  
  if ("expandable" in props && expandable) {
    return {
      ...restProps,
      ...expandable
    };
  }
  
  return restProps as Omit<T, "expandable">;
}