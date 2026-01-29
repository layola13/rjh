import React from 'react';
import classNames from 'classnames';
import CSSMotionComponent from './CSSMotionComponent';

interface MaskProps {
  prefixCls: string;
  style?: React.CSSProperties;
  visible: boolean;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  motionName?: string;
}

interface MotionRenderProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a mask overlay with CSS motion animation support
 * @param props - Mask configuration properties
 * @returns React element representing the animated mask
 */
export default function Mask(props: MaskProps): React.ReactElement {
  const { prefixCls, style, visible, maskProps, motionName } = props;

  return (
    <CSSMotionComponent
      key="mask"
      visible={visible}
      motionName={motionName}
      leavedClassName={`${prefixCls}-mask-hidden`}
    >
      {(motionProps: MotionRenderProps) => {
        const { className: motionClassName, style: motionStyle } = motionProps;

        return (
          <div
            {...maskProps}
            style={{
              ...motionStyle,
              ...style
            }}
            className={classNames(`${prefixCls}-mask`, motionClassName)}
          />
        );
      }}
    </CSSMotionComponent>
  );
}