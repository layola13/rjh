interface ExpandIconLabels {
  expand: string;
  collapse: string;
}

interface ExpandIconProps {
  prefixCls: string;
  onExpand: (record: any, event: React.MouseEvent<HTMLButtonElement>) => void;
  record: any;
  expanded: boolean;
  expandable: boolean;
}

export default function createExpandIcon(labels: ExpandIconLabels) {
  return function ExpandIcon(props: ExpandIconProps) {
    const { prefixCls, onExpand, record, expanded, expandable } = props;
    
    const iconClass = `${prefixCls}-row-expand-icon`;
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      onExpand(record, event);
      event.stopPropagation();
    };
    
    const classNames = [
      iconClass,
      !expandable && `${iconClass}-spaced`,
      expandable && expanded && `${iconClass}-expanded`,
      expandable && !expanded && `${iconClass}-collapsed`
    ].filter(Boolean).join(' ');
    
    const ariaLabel = expanded ? labels.collapse : labels.expand;
    
    return React.createElement('button', {
      type: 'button',
      onClick: handleClick,
      className: classNames,
      'aria-label': ariaLabel
    });
  };
}