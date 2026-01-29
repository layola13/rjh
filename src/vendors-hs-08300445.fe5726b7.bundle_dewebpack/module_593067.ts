import React from 'react';
import classNames from 'classnames';

interface LineProps {
  className?: string;
  percent: number | number[];
  prefixCls: string;
  strokeColor?: string | string[];
  strokeLinecap?: 'round' | 'square' | 'butt';
  strokeWidth: number;
  style?: React.CSSProperties;
  trailColor?: string;
  trailWidth?: number;
  transition?: string;
  gapPosition?: string;
  [key: string]: unknown;
}

const DEFAULT_PROPS = {
  strokeLinecap: 'round' as const,
  strokeWidth: 1,
  trailWidth: 1,
  prefixCls: 'rc-progress'
};

const useTransitionDuration = (percentArray: number[]): React.RefObject<SVGPathElement>[][] => {
  return [percentArray.map(() => React.createRef<SVGPathElement>())];
};

const Line: React.FC<LineProps> = (props) => {
  const {
    className,
    percent,
    prefixCls,
    strokeColor,
    strokeLinecap = 'round',
    strokeWidth,
    style,
    trailColor,
    trailWidth,
    transition,
    gapPosition,
    ...restProps
  } = props;

  const percentArray = Array.isArray(percent) ? percent : [percent];
  const strokeColorArray = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

  const transitionRefs = useTransitionDuration(percentArray);
  const pathRefs = transitionRefs[0];

  const halfStrokeWidth = strokeWidth / 2;
  const endPosition = 100 - strokeWidth / 2;

  const pathString = `M ${strokeLinecap === 'round' ? halfStrokeWidth : 0}, ${halfStrokeWidth}
 L ${strokeLinecap === 'round' ? endPosition : 100}, ${halfStrokeWidth}`;

  const viewBoxString = `0 0 100 ${strokeWidth}`;

  let cumulativeOffset = 0;

  return React.createElement(
    'svg',
    {
      className: classNames(`${prefixCls}-line`, className),
      viewBox: viewBoxString,
      preserveAspectRatio: 'none',
      style,
      ...restProps
    },
    React.createElement('path', {
      className: `${prefixCls}-line-trail`,
      d: pathString,
      strokeLinecap,
      stroke: trailColor,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: '0'
    }),
    percentArray.map((currentPercent, index) => {
      let strokeDashFactor = 1;

      switch (strokeLinecap) {
        case 'round':
          strokeDashFactor = 1 - strokeWidth / 100;
          break;
        case 'square':
          strokeDashFactor = 1 - strokeWidth / 2 / 100;
          break;
        default:
          strokeDashFactor = 1;
      }

      const pathStyle: React.CSSProperties = {
        strokeDasharray: `${currentPercent * strokeDashFactor}px, 100px`,
        strokeDashoffset: `-${cumulativeOffset}px`,
        transition: transition || 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
      };

      const currentStrokeColor = strokeColorArray[index] || strokeColorArray[strokeColorArray.length - 1];

      cumulativeOffset += currentPercent;

      return React.createElement('path', {
        key: index,
        className: `${prefixCls}-line-path`,
        d: pathString,
        strokeLinecap,
        stroke: currentStrokeColor,
        strokeWidth,
        fillOpacity: '0',
        ref: pathRefs[index],
        style: pathStyle
      });
    })
  );
};

Line.defaultProps = DEFAULT_PROPS;
Line.displayName = 'Line';

export default Line;