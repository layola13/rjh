import React from 'react';
import { Icons } from './Icons';
import { useTheme } from './hooks';
import './styles.css';

interface IconComponentProps {
  type: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

export default function IconComponent(props: IconComponentProps): React.ReactElement {
  const { type, style, onClick, className = '' } = props;
  const theme = useTheme();

  return React.createElement(Icons, {
    className: `teaching-iconfont ${className} ${theme}`,
    style,
    type,
    onClick
  });
}