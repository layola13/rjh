interface StepsProgressProps {
  size?: 'small' | 'default';
  steps: number;
  percent?: number;
  strokeWidth?: number;
  strokeColor?: string;
  trailColor?: string;
  prefixCls: string;
  children?: React.ReactNode;
}

const DEFAULT_PERCENT = 0;
const DEFAULT_STROKE_WIDTH = 8;
const SMALL_SIZE_STEP_WIDTH = 2;
const DEFAULT_SIZE_STEP_WIDTH = 14;

export default function StepsProgress(props: StepsProgressProps): JSX.Element {
  const {
    size,
    steps,
    percent = DEFAULT_PERCENT,
    strokeWidth = DEFAULT_STROKE_WIDTH,
    strokeColor,
    trailColor,
    prefixCls,
    children
  } = props;

  const completedSteps = Math.round(steps * (percent / 100));
  const stepWidth = size === 'small' ? SMALL_SIZE_STEP_WIDTH : DEFAULT_SIZE_STEP_WIDTH;

  const stepElements: JSX.Element[] = [];

  for (let index = 0; index < steps; index += 1) {
    const isActive = index <= completedSteps - 1;
    const activeClass = `${prefixCls}-steps-item-active`;

    stepElements.push(
      <div
        key={index}
        className={`${prefixCls}-steps-item${isActive ? ` ${activeClass}` : ''}`}
        style={{
          backgroundColor: isActive ? strokeColor : trailColor,
          width: stepWidth,
          height: strokeWidth
        }}
      />
    );
  }

  return (
    <div className={`${prefixCls}-steps-outer`}>
      {stepElements}
      {children}
    </div>
  );
}