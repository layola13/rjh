import { Circle } from './Circle';
import { presetPrimaryColors } from './colors';
import classNames from 'classnames';
import { getSuccessPercent, validProgress } from './utils';

interface ProgressProps {
  prefixCls: string;
  width?: number;
  strokeWidth?: number;
  trailColor?: string;
  strokeLinecap?: 'round' | 'butt' | 'square';
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  gapDegree?: number;
  type?: 'circle' | 'dashboard';
  children?: React.ReactNode;
  percent?: number;
  success?: {
    percent?: number;
    strokeColor?: string;
  };
  successPercent?: number;
  strokeColor?: string | string[] | Record<string, string>;
}

interface SuccessConfig {
  success?: {
    percent?: number;
    strokeColor?: string;
  };
  successPercent?: number;
}

function getStrokeColor(props: ProgressProps): string | string[] | Record<string, string> | null {
  const { success, strokeColor, successPercent } = props;
  const baseColor = strokeColor ?? null;
  
  const successValue = getSuccessPercent({ success, successPercent });
  
  return successValue ? [presetPrimaryColors.green, baseColor] : baseColor;
}

function getPercent(props: ProgressProps): number | number[] {
  const { percent, success, successPercent } = props;
  
  const validatedPercent = validProgress(percent);
  const successValue = getSuccessPercent({ success, successPercent });
  
  if (successValue) {
    const validatedSuccess = validProgress(successValue);
    return [validatedSuccess, validProgress(validatedPercent - validatedSuccess)];
  }
  
  return validatedPercent;
}

export default function CircleProgress(props: ProgressProps): JSX.Element {
  const {
    prefixCls,
    width,
    strokeWidth,
    trailColor,
    strokeLinecap,
    gapPosition,
    gapDegree,
    type,
    children
  } = props;
  
  const size = width ?? 120;
  const containerStyle = {
    width: size,
    height: size,
    fontSize: size * 0.15 + 6
  };
  
  const effectiveStrokeWidth = strokeWidth ?? 6;
  const effectiveGapPosition = gapPosition ?? (type === 'dashboard' ? 'bottom' : 'top');
  const computedStrokeColor = getStrokeColor(props);
  const isGradient = Object.prototype.toString.call(computedStrokeColor) === '[object Object]';
  
  const className = classNames(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient
  });
  
  const effectiveGapDegree = gapDegree ?? gapDegree === 0 
    ? gapDegree 
    : (type === 'dashboard' ? 75 : undefined);
  
  return (
    <div className={className} style={containerStyle}>
      <Circle
        percent={getPercent(props)}
        strokeWidth={effectiveStrokeWidth}
        trailWidth={effectiveStrokeWidth}
        strokeColor={computedStrokeColor}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        prefixCls={prefixCls}
        gapDegree={effectiveGapDegree}
        gapPosition={effectiveGapPosition}
      />
      {children}
    </div>
  );
}