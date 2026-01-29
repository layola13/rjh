interface CellProps {
  itemPrefixCls: string;
  component: React.ElementType;
  span?: number;
  className?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
}

function isNotNullOrUndefined(value: unknown): boolean {
  return value != null;
}

export default function Cell(props: CellProps): React.ReactElement {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon
  } = props;

  const Component = component;

  if (bordered) {
    const borderedClassNames: Record<string, boolean> = {
      [`${itemPrefixCls}-item-label`]: isNotNullOrUndefined(label),
      [`${itemPrefixCls}-item-content`]: isNotNullOrUndefined(content)
    };

    return (
      <Component
        className={classNames(borderedClassNames, className)}
        style={style}
        colSpan={span}
      >
        {isNotNullOrUndefined(label) ? label : content}
      </Component>
    );
  }

  const labelClassNames = classNames(
    `${itemPrefixCls}-item-label`,
    {
      [`${itemPrefixCls}-item-no-colon`]: !colon
    }
  );

  return (
    <Component
      className={classNames(`${itemPrefixCls}-item`, className)}
      style={style}
      colSpan={span}
    >
      <div className={`${itemPrefixCls}-item-container`}>
        {label && (
          <span className={labelClassNames} style={labelStyle}>
            {label}
          </span>
        )}
        {content && (
          <span className={`${itemPrefixCls}-item-content`} style={contentStyle}>
            {content}
          </span>
        )}
      </div>
    </Component>
  );
}

function classNames(...args: Array<string | Record<string, boolean> | undefined>): string {
  const classes: string[] = [];
  
  for (const arg of args) {
    if (!arg) continue;
    
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}