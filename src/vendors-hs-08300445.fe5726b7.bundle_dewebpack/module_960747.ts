interface SliderStepProps {
  prefixCls: string;
  vertical: boolean;
  reverse: boolean;
  marks: Record<number, React.ReactNode>;
  dots: boolean;
  step: number | null;
  included: boolean;
  lowerBound: number;
  upperBound: number;
  max: number;
  min: number;
  dotStyle?: React.CSSProperties;
  activeDotStyle?: React.CSSProperties;
}

const PERCENT_MULTIPLIER = 100;

function validateStepWithDots(dots: boolean, step: number | null): void {
  if (dots && (!step || step <= 0)) {
    console.warn(
      "`Slider[step]` should be a positive number in order to make Slider[dots] work."
    );
  }
}

function generateDotPositions(
  marks: Record<number, React.ReactNode>,
  dots: boolean,
  step: number | null,
  min: number,
  max: number
): number[] {
  const markPositions = Object.keys(marks)
    .map(parseFloat)
    .sort((a, b) => a - b);

  if (dots && step) {
    for (let position = min; position <= max; position += step) {
      if (markPositions.indexOf(position) === -1) {
        markPositions.push(position);
      }
    }
  }

  return markPositions;
}

function SliderStep(props: SliderStepProps): JSX.Element {
  const {
    prefixCls,
    vertical,
    reverse,
    marks,
    dots,
    step,
    included,
    lowerBound,
    upperBound,
    max,
    min,
    dotStyle = {},
    activeDotStyle = {}
  } = props;

  validateStepWithDots(dots, step);

  const range = max - min;
  const positions = generateDotPositions(marks, dots, step, min, max);

  const dotElements = positions.map((position) => {
    const percentage = `${(Math.abs(position - min) / range) * PERCENT_MULTIPLIER}%`;
    const isActive =
      (!included && position === upperBound) ||
      (included && position <= upperBound && position >= lowerBound);

    const positionKey = vertical
      ? reverse ? "top" : "bottom"
      : reverse ? "right" : "left";

    let style: React.CSSProperties = {
      ...dotStyle,
      [positionKey]: percentage
    };

    if (isActive) {
      style = {
        ...style,
        ...activeDotStyle
      };
    }

    const className = [
      `${prefixCls}-dot`,
      isActive ? `${prefixCls}-dot-active` : '',
      reverse ? `${prefixCls}-dot-reverse` : ''
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span className={className} style={style} key={position} />
    );
  });

  return <div className={`${prefixCls}-step`}>{dotElements}</div>;
}

export default SliderStep;