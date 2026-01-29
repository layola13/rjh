import React, { forwardRef, CSSProperties, MouseEvent, RefObject } from 'react';

interface Locale {
  addAriaLabel?: string;
}

interface EditableConfig {
  showAdd?: boolean;
  onEdit: (action: 'add' | 'remove', options: { event: MouseEvent<HTMLButtonElement> }) => void;
  addIcon?: React.ReactNode;
}

interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig | boolean;
  locale?: Locale;
  style?: CSSProperties;
}

function AddButton(
  props: AddButtonProps,
  ref: RefObject<HTMLButtonElement>
): React.ReactElement | null {
  const { prefixCls, editable, locale, style } = props;

  if (!editable || editable === false) {
    return null;
  }

  if (typeof editable === 'object' && editable.showAdd === false) {
    return null;
  }

  const editableConfig = editable as EditableConfig;
  const ariaLabel = locale?.addAriaLabel ?? 'Add tab';
  const buttonClassName = `${prefixCls}-nav-add`;
  const iconContent = editableConfig.addIcon ?? '+';

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    editableConfig.onEdit('add', { event });
  };

  return (
    <button
      ref={ref}
      type="button"
      className={buttonClassName}
      style={style}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {iconContent}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, AddButtonProps>(AddButton);