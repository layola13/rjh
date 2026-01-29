import { CSSProperties, SVGAttributes, useMemo, createElement } from 'react';
import classNames from 'classnames';
import { useTransitionDuration, defaultProps } from './utils';

interface GradientColor {
  [percent: string]: string;
}

type StrokeColor = string | string[] | GradientColor | (string | GradientColor)[];

interface CircleProps extends Omit<SVGAttributes<SVGElement>, 'percent'> {
  prefixCls: string;
  strokeWidth: number;
  trailWidth?: number;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  trailColor: string;
  strokeLinecap: 'butt' | 'round' | 'square';
  style?: CSSProperties;
  className?: string;
  strokeColor: StrokeColor;
  percent: number | number[];
}

interface PathConfig {
  pathString: string;
  pathStyle: CSSProperties;
}

let uniqueId = 0;

function parsePercentage(percentString: string): number {
  return Number(percentString.replace('%', ''));
}

function normalizeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function generatePath(
  startPercent: number,
  currentPercent: number,
  color: string | GradientColor,
  strokeWidth: number,
  gapDegree: number = 0,
  gapPosition?: 'top' | 'bottom' | 'left' | 'right'
): PathConfig {
  const CENTER = 50;
  const radius = CENTER - strokeWidth / 2;
  
  let startX = 0;
  let startY = -radius;
  let endX = 0;
  let endY = -2 * radius;

  switch (gapPosition) {
    case 'left':
      startX = -radius;
      startY = 0;
      endX = 2 * radius;
      endY = 0;
      break;
    case 'right':
      startX = radius;
      startY = 0;
      endX = -2 * radius;
      endY = 0;
      break;
    case 'bottom':
      startY = radius;
      endY = 2 * radius;
      break;
  }

  const pathString = `M 50, 50 m ${startX}, ${startY}
 a ${radius}, ${radius} 0 1 1 ${endX}, ${-endY}
 a ${radius}, ${radius} 0 1 1 ${-endX}, ${endY}`;

  const circumference = 2 * Math.PI * radius;
  const adjustedCircumference = circumference - gapDegree;
  const dashArray = (currentPercent / 100) * adjustedCircumference;
  const dashOffset = gapDegree / 2 + (startPercent / 100) * adjustedCircumference;

  const pathStyle: CSSProperties = {
    stroke: typeof color === 'string' ? color : undefined,
    strokeDasharray: `${dashArray}px ${circumference}px`,
    strokeDashoffset: `-${dashOffset}px`,
    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
  };

  return { pathString, pathStyle };
}

function isGradientColor(value: unknown): value is GradientColor {
  return Object.prototype.toString.call(value) === '[object Object]';
}

const Circle: React.FC<CircleProps> = (props) => {
  const {
    prefixCls,
    strokeWidth,
    trailWidth,
    gapDegree = 0,
    gapPosition,
    trailColor,
    strokeLinecap,
    style,
    className,
    strokeColor,
    percent,
    ...restProps
  } = props;

  const gradientId = useMemo(() => {
    uniqueId += 1;
    return uniqueId;
  }, []);

  const trailPath = generatePath(0, 100, trailColor, strokeWidth, gapDegree, gapPosition);
  const percentList = normalizeArray(percent);
  const strokeColorList = normalizeArray(strokeColor);
  
  const gradientColor = strokeColorList.find((color): color is GradientColor => 
    isGradientColor(color)
  );

  const pathRefs = useTransitionDuration(percentList);

  const renderGradient = () => {
    if (!gradientColor) return null;

    const sortedStops = Object.keys(gradientColor).sort(
      (a, b) => parsePercentage(a) - parsePercentage(b)
    );

    return (
      <defs>
        <linearGradient
          id={`${prefixCls}-gradient-${gradientId}`}
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
        >
          {sortedStops.map((offset, index) => (
            <stop
              key={index}
              offset={offset}
              stopColor={gradientColor[offset]}
            />
          ))}
        </linearGradient>
      </defs>
    );
  };

  const renderPaths = () => {
    let accumulatedPercent = 0;

    const paths = percentList.map((currentPercent, index) => {
      const color = strokeColorList[index] ?? strokeColorList[strokeColorList.length - 1];
      const stroke = isGradientColor(color)
        ? `url(#${prefixCls}-gradient-${gradientId})`
        : '';

      const pathConfig = generatePath(
        accumulatedPercent,
        currentPercent,
        color as string,
        strokeWidth,
        gapDegree,
        gapPosition
      );

      accumulatedPercent += currentPercent;

      return (
        <path
          key={index}
          className={`${prefixCls}-circle-path`}
          d={pathConfig.pathString}
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          opacity={currentPercent === 0 ? 0 : 1}
          fillOpacity="0"
          style={pathConfig.pathStyle}
          ref={pathRefs[index]}
        />
      );
    });

    return paths.reverse();
  };

  return (
    <svg
      className={classNames(`${prefixCls}-circle`, className)}
      viewBox="0 0 100 100"
      style={style}
      {...restProps}
    >
      {renderGradient()}
      <path
        className={`${prefixCls}-circle-trail`}
        d={trailPath.pathString}
        stroke={trailColor}
        strokeLinecap={strokeLinecap}
        strokeWidth={trailWidth ?? strokeWidth}
        fillOpacity="0"
        style={trailPath.pathStyle}
      />
      {renderPaths()}
    </svg>
  );
};

Circle.defaultProps = defaultProps;
Circle.displayName = 'Circle';

export default Circle;