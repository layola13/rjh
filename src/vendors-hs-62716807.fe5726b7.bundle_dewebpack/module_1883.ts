import React, { forwardRef, CSSProperties, KeyboardEvent, MouseEvent } from 'react';

interface KeyCode {
  ENTER: number;
}

const KeyCodeConstants: KeyCode = {
  ENTER: 13
};

interface ClickableButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  style?: CSSProperties;
  noStyle?: boolean;
  disabled?: boolean;
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
}

const defaultButtonStyles: CSSProperties = {
  border: 0,
  background: 'transparent',
  padding: 0,
  lineHeight: 'inherit',
  display: 'inline-block'
};

const ClickableButton = forwardRef<HTMLDivElement, ClickableButtonProps>(
  (props, ref) => {
    const { style, noStyle, disabled, onClick, ...restProps } = props;

    let computedStyles: CSSProperties = {};

    if (!noStyle) {
      computedStyles = { ...defaultButtonStyles };
    }

    if (disabled) {
      computedStyles.pointerEvents = 'none';
    }

    computedStyles = {
      ...computedStyles,
      ...style
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
      if (event.keyCode === KeyCodeConstants.ENTER) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>): void => {
      const { keyCode } = event;
      if (keyCode === KeyCodeConstants.ENTER && onClick) {
        onClick();
      }
    };

    return (
      <div
        role="button"
        tabIndex={0}
        ref={ref}
        {...restProps}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        style={computedStyles}
      />
    );
  }
);

ClickableButton.displayName = 'ClickableButton';

export default ClickableButton;