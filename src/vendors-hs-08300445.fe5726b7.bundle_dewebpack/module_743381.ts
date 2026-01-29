import React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { getMotion } from './utils';

interface MaskProps {
  prefixCls: string;
  visible: boolean;
  zIndex: number;
  mask: boolean;
  maskMotion?: object;
  maskAnimation?: string;
  maskTransitionName?: string;
}

interface MotionRenderProps {
  className?: string;
}

/**
 * Renders a mask overlay with animation support
 */
export default function Mask(props: MaskProps): React.ReactElement | null {
  const {
    prefixCls,
    visible,
    zIndex,
    mask,
    maskMotion,
    maskAnimation,
    maskTransitionName
  } = props;

  if (!mask) {
    return null;
  }

  let motionProps: object = {};

  if (maskMotion || maskTransitionName || maskAnimation) {
    motionProps = {
      motionAppear: true,
      ...getMotion({
        motion: maskMotion,
        prefixCls,
        transitionName: maskTransitionName,
        animation: maskAnimation
      })
    };
  }

  return (
    <CSSMotion
      {...motionProps}
      visible={visible}
      removeOnLeave={true}
    >
      {({ className }: MotionRenderProps) => (
        <div
          style={{ zIndex }}
          className={classNames(`${prefixCls}-mask`, className)}
        />
      )}
    </CSSMotion>
  );
}