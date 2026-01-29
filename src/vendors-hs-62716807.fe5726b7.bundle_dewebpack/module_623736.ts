interface DropIndicatorProps {
  dropPosition: number;
  dropLevelOffset: number;
  prefixCls: string;
  indent: number;
  direction?: 'ltr' | 'rtl';
}

interface DropIndicatorStyle {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

const OFFSET = 4;

function DropIndicator(props: DropIndicatorProps): JSX.Element {
  const {
    dropPosition,
    dropLevelOffset,
    prefixCls,
    indent,
    direction = 'ltr'
  } = props;

  const startDirection = direction === 'ltr' ? 'left' : 'right';
  const endDirection = direction === 'ltr' ? 'right' : 'left';

  const style: DropIndicatorStyle = {
    [startDirection]: -dropLevelOffset * indent + OFFSET,
    [endDirection]: 0
  };

  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      style.bottom = -3;
      style[startDirection] = indent + OFFSET;
  }

  return (
    <div
      style={style}
      className={`${prefixCls}-drop-indicator`}
    />
  );
}

export { OFFSET as offset };
export default DropIndicator;