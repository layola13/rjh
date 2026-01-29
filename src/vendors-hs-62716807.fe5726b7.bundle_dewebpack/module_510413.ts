import React from 'react';
import { presetPrimaryColors } from './colors';
import { validProgress, getSuccessPercent } from './utils';

interface GradientColor {
  from?: string;
  to?: string;
  direction?: string;
  [key: string]: string | undefined;
}

interface SuccessConfig {
  strokeColor?: string;
  percent?: number;
}

interface ProgressProps {
  prefixCls: string;
  direction: 'ltr' | 'rtl';
  percent: number;
  strokeWidth?: number;
  size?: 'small' | 'default' | 'large';
  strokeColor?: string | GradientColor;
  strokeLinecap?: 'round' | 'square';
  children?: React.ReactNode;
  trailColor?: string;
  success?: SuccessConfig;
}

interface GradientStop {
  key: number;
  value: string;
}

export const sortGradient = (gradientStops: Record<string, string>): string => {
  const stops: GradientStop[] = [];
  
  Object.keys(gradientStops).forEach((key) => {
    const numericKey = parseFloat(key.replace(/%/g, ''));
    if (!isNaN(numericKey)) {
      stops.push({
        key: numericKey,
        value: gradientStops[key]
      });
    }
  });

  const sortedStops = stops.sort((a, b) => a.key - b.key);
  
  return sortedStops
    .map(({ key, value }) => `${value} ${key}%`)
    .join(', ');
};

export const handleGradient = (
  gradient: GradientColor,
  direction: 'ltr' | 'rtl'
): React.CSSProperties => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction: customDirection = direction === 'rtl' ? 'to left' : 'to right',
    ...restStops
  } = gradient;

  if (Object.keys(restStops).length !== 0) {
    const gradientString = sortGradient(restStops);
    return {
      backgroundImage: `linear-gradient(${customDirection}, ${gradientString})`
    };
  }

  return {
    backgroundImage: `linear-gradient(${customDirection}, ${from}, ${to})`
  };
};

const LineProgress: React.FC<ProgressProps> = (props) => {
  const {
    prefixCls,
    direction,
    percent,
    strokeWidth,
    size,
    strokeColor,
    strokeLinecap,
    children,
    trailColor,
    success
  } = props;

  const progressStyle = strokeColor && typeof strokeColor !== 'string'
    ? handleGradient(strokeColor, direction)
    : { background: strokeColor };

  const trailStyle = trailColor
    ? { backgroundColor: trailColor }
    : undefined;

  const defaultHeight = size === 'small' ? 6 : 8;
  const height = strokeWidth ?? defaultHeight;
  const borderRadius = strokeLinecap === 'square' ? 0 : '';

  const backgroundStyle: React.CSSProperties = {
    width: `${validProgress(percent)}%`,
    height,
    borderRadius,
    ...progressStyle
  };

  const successPercent = getSuccessPercent(props);

  const successStyle: React.CSSProperties = {
    width: `${validProgress(successPercent)}%`,
    height,
    borderRadius,
    backgroundColor: success?.strokeColor
  };

  const successElement = successPercent !== undefined ? (
    <div className={`${prefixCls}-success-bg`} style={successStyle} />
  ) : null;

  return (
    <>
      <div className={`${prefixCls}-outer`}>
        <div className={`${prefixCls}-inner`} style={trailStyle}>
          <div className={`${prefixCls}-bg`} style={backgroundStyle} />
          {successElement}
        </div>
      </div>
      {children}
    </>
  );
};

export default LineProgress;