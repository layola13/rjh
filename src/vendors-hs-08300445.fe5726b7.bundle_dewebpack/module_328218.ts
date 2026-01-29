interface Mark {
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

type MarkValue = React.ReactNode | Mark;

interface MarksProps {
  className: string;
  vertical: boolean;
  reverse: boolean;
  marks: Record<string, MarkValue>;
  included: boolean;
  upperBound: number;
  lowerBound: number;
  max: number;
  min: number;
  onClickLabel: (event: React.MouseEvent | React.TouchEvent, value: number) => void;
}

const Marks: React.FC<MarksProps> = (props) => {
  const {
    className,
    vertical,
    reverse,
    marks,
    included,
    upperBound,
    lowerBound,
    max,
    min,
    onClickLabel,
  } = props;

  const markKeys = Object.keys(marks);
  const range = max - min;

  const markElements = markKeys
    .map(parseFloat)
    .sort((a, b) => a - b)
    .map((markValue) => {
      const markConfig = marks[markValue];
      const isMarkObject =
        typeof markConfig === 'object' && !React.isValidElement(markConfig);
      const label = isMarkObject ? (markConfig as Mark).label : markConfig;

      if (!label && label !== 0) {
        return null;
      }

      const isActive =
        (!included && markValue === upperBound) ||
        (included && markValue <= upperBound && markValue >= lowerBound);

      const textClassName = `${className}-text${isActive ? ` ${className}-text-active` : ''}`;

      const verticalStyle: React.CSSProperties = {
        marginBottom: '-50%',
        [reverse ? 'top' : 'bottom']: `${((markValue - min) / range) * 100}%`,
      };

      const horizontalStyle: React.CSSProperties = {
        transform: `translateX(${reverse ? '50%' : '-50%'})`,
        msTransform: `translateX(${reverse ? '50%' : '-50%'})`,
        [reverse ? 'right' : 'left']: `${((markValue - min) / range) * 100}%`,
      };

      const positionStyle = vertical ? verticalStyle : horizontalStyle;

      const finalStyle = isMarkObject
        ? { ...positionStyle, ...(markConfig as Mark).style }
        : positionStyle;

      return (
        <span
          className={textClassName}
          style={finalStyle}
          key={markValue}
          onMouseDown={(event) => onClickLabel(event, markValue)}
          onTouchStart={(event) => onClickLabel(event, markValue)}
        >
          {label}
        </span>
      );
    });

  return <div className={className}>{markElements}</div>;
};

export default Marks;