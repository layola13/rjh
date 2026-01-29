import React from 'react';

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  fill = 'currentColor',
  width = 24,
  height = 24,
  style = {},
  ...restProps
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
      {...restProps}
    >
      <path d="M21, 7L9, 19L3.5, 13.5L4.91, 12.09L9, 16.17L19.59, 5.59L21, 7Z" />
    </svg>
  );
};

export default CheckIcon;