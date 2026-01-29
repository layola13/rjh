import React from 'react';
import reactCSS from 'reactcss';
import { handleFocus } from './interaction';
import Checkboard from './Checkboard';

interface SwatchProps {
  color: string;
  style?: React.CSSProperties;
  onClick?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
  children?: React.ReactNode;
  focus?: boolean;
  focusStyle?: React.CSSProperties;
}

const Swatch: React.FC<SwatchProps> = ({
  color,
  style,
  onClick = () => {},
  onHover,
  title = color,
  children,
  focus,
  focusStyle = {},
}) => {
  const isTransparent = color === 'transparent';

  const styles = reactCSS({
    default: {
      swatch: {
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative' as const,
        outline: 'none',
        ...style,
        ...(focus ? focusStyle : {}),
      },
    },
  });

  const hoverHandlers: Partial<React.DOMAttributes<HTMLDivElement>> = {};

  if (onHover) {
    hoverHandlers.onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
      onHover(color, event);
    };
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    onClick(color, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.keyCode === 13) {
      onClick(color, event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...hoverHandlers}
    >
      {children}
      {isTransparent && (
        <Checkboard
          borderRadius={styles.swatch.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
        />
      )}
    </div>
  );
};

export default handleFocus(Swatch);
export { Swatch };