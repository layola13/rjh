export interface ExpandIconProps<T = any> {
  prefixCls: string;
  record: T;
  onExpand: (record: T, event: React.MouseEvent<HTMLSpanElement>) => void;
  expanded: boolean;
  expandable: boolean;
}

export function findAllChildrenKeys<T extends Record<string, any>>(
  data: T[],
  getKey: (item: T, index: number) => string,
  childrenPropName: string
): string[] {
  const keys: string[] = [];

  function traverse(items: T[] | undefined): void {
    (items || []).forEach((item, index) => {
      keys.push(getKey(item, index));
      traverse(item[childrenPropName] as T[] | undefined);
    });
  }

  traverse(data);
  return keys;
}

export function renderExpandIcon<T = any>(props: ExpandIconProps<T>): React.ReactElement {
  const { prefixCls, record, onExpand, expanded, expandable } = props;
  const iconClassName = `${prefixCls}-row-expand-icon`;

  if (!expandable) {
    return React.createElement('span', {
      className: classNames(iconClassName, `${prefixCls}-row-spaced`)
    });
  }

  return React.createElement('span', {
    className: classNames(iconClassName, {
      [`${prefixCls}-row-expanded`]: expanded,
      [`${prefixCls}-row-collapsed`]: !expanded
    }),
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => {
      onExpand(record, event);
      event.stopPropagation();
    }
  });
}