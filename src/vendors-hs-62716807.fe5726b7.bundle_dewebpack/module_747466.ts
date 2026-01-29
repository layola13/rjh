import React from 'react';
import LeftOutlined from './LeftOutlined';
import RightOutlined from './RightOutlined';
import Button from './Button';

interface TransferOperationProps {
  disabled?: boolean;
  moveToLeft?: () => void;
  moveToRight?: () => void;
  leftArrowText?: string;
  rightArrowText?: string;
  leftActive?: boolean;
  rightActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'ltr' | 'rtl';
  oneWay?: boolean;
}

export default function TransferOperation(props: TransferOperationProps): JSX.Element {
  const {
    disabled,
    moveToLeft,
    moveToRight,
    leftArrowText = '',
    rightArrowText = '',
    leftActive,
    rightActive,
    className,
    style,
    direction,
    oneWay
  } = props;

  return (
    <div className={className} style={style}>
      <Button
        type="primary"
        size="small"
        disabled={disabled || !rightActive}
        onClick={moveToRight}
        icon={direction !== 'rtl' ? <RightOutlined /> : <LeftOutlined />}
      >
        {rightArrowText}
      </Button>
      {!oneWay && (
        <Button
          type="primary"
          size="small"
          disabled={disabled || !leftActive}
          onClick={moveToLeft}
          icon={direction !== 'rtl' ? <LeftOutlined /> : <RightOutlined />}
        >
          {leftArrowText}
        </Button>
      )}
    </div>
  );
}