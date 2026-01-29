import React from 'react';

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const UnfoldMoreIcon: React.FC<IconProps> = ({
  fill = 'currentColor',
  width = 24,
  height = 24,
  style = {},
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        fill,
        width,
        height,
        ...style
      }}
      {...rest}
    >
      <path d="M12, 18.17L8.83, 15L7.42, 16.41L12, 21L16.59, 16.41L15.17, 15M12, 5.83L15.17, 9L16.58, 7.59L12, 3L7.41, 7.59L8.83, 9L12, 5.83Z" />
    </svg>
  );
};

export default UnfoldMoreIcon;