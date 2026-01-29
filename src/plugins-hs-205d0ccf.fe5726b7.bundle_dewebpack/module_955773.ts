import React from 'react';
import { Icons } from './Icons';
import { useTheme } from './ThemeProvider';

interface RoundIconProps {
  onClick?: () => void;
  className?: string;
  text?: string;
  type: string;
}

export default function RoundIcon(props: RoundIconProps): JSX.Element {
  const { onClick = () => {}, className, text, type } = props;
  const theme = useTheme();

  return (
    <div
      className={`${className ?? ''} round-icon ${theme}`}
      onClick={onClick}
    >
      <Icons className="icon" type={type} />
      {text && <span className="text">{text}</span>}
    </div>
  );
}