import React, { useEffect, forwardRef, CSSProperties, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import KeyCode from './KeyCode';

interface TabData {
  key: string;
  tab: ReactNode;
  disabled?: boolean;
  closeIcon?: ReactNode;
}

interface EditableConfig {
  onEdit: (action: 'remove', payload: { key: string; event: MouseEvent | KeyboardEvent }) => void;
  removeIcon?: ReactNode;
}

interface TabNodeProps {
  prefixCls: string;
  id?: string;
  active: boolean;
  rtl: boolean;
  tab: TabData;
  tabBarGutter?: number;
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
  closable?: boolean;
  renderWrapper?: (node: ReactNode) => ReactNode;
  removeAriaLabel?: string;
  editable: EditableConfig;
  onClick: (event: MouseEvent) => void;
  onRemove: () => void;
  onFocus: (event: React.FocusEvent) => void;
}

const TabNode = forwardRef<HTMLDivElement, TabNodeProps>((props, ref) => {
  const {
    prefixCls,
    id,
    active,
    rtl,
    tab,
    tabBarGutter,
    tabPosition,
    closable,
    renderWrapper,
    removeAriaLabel,
    editable,
    onClick,
    onRemove,
    onFocus
  } = props;

  const { key, tab: tabContent, disabled, closeIcon } = tab;

  const tabNodeCls = `${prefixCls}-tab`;

  useEffect(() => {
    return onRemove;
  }, [onRemove]);

  const style: CSSProperties = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    style[rtl ? 'marginLeft' : 'marginRight'] = tabBarGutter;
  } else {
    style.marginBottom = tabBarGutter;
  }

  const showClosable = editable && closable !== false && !disabled;

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (!disabled) {
      onClick(event);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    handleClick(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if ([KeyCode.SPACE, KeyCode.ENTER].includes(event.which)) {
      event.preventDefault();
      handleClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', {
      key,
      event
    });
  };

  let tabNode = (
    <div
      key={key}
      ref={ref}
      className={classNames(tabNodeCls, {
        [`${tabNodeCls}-with-remove`]: showClosable,
        [`${tabNodeCls}-active`]: active,
        [`${tabNodeCls}-disabled`]: disabled
      })}
      style={style}
      onClick={handleClick}
    >
      <div
        role="tab"
        aria-selected={active}
        id={id ? `${id}-tab-${key}` : undefined}
        className={`${tabNodeCls}-btn`}
        aria-controls={id ? `${id}-panel-${key}` : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? undefined : 0}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
      >
        {tabContent}
      </div>
      {showClosable && (
        <button
          type="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={0}
          className={`${tabNodeCls}-remove`}
          onClick={handleRemove}
        >
          {closeIcon ?? editable.removeIcon ?? '×'}
        </button>
      )}
    </div>
  );

  if (renderWrapper) {
    tabNode = renderWrapper(tabNode);
  }

  return tabNode;
});

export default TabNode;