import React from 'react';
import CSSMotion from 'rc-motion';
import LoadingIcon from './LoadingIcon';

interface LoadingIconWrapperProps {
  prefixCls: string;
  loading?: boolean;
  existIcon?: boolean;
}

interface MotionState {
  width: number | string;
  opacity: number;
  transform: string;
}

interface MotionRenderProps {
  className?: string;
  style?: React.CSSProperties;
}

type MotionRenderFunction = (
  props: MotionRenderProps,
  ref: React.Ref<HTMLSpanElement>
) => React.ReactElement;

const getAppearStart = (): MotionState => {
  return {
    width: 0,
    opacity: 0,
    transform: 'scale(0)'
  };
};

const getAppearActive = (element: HTMLElement): MotionState => {
  return {
    width: element.scrollWidth,
    opacity: 1,
    transform: 'scale(1)'
  };
};

const LoadingIconWrapper: React.FC<LoadingIconWrapperProps> = (props) => {
  const { prefixCls, loading, existIcon } = props;
  const isLoading = !!loading;

  if (existIcon) {
    return (
      <span className={`${prefixCls}-loading-icon`}>
        <LoadingIcon />
      </span>
    );
  }

  return (
    <CSSMotion
      visible={isLoading}
      motionName={`${prefixCls}-loading-icon-motion`}
      removeOnLeave={true}
      onAppearStart={getAppearStart}
      onAppearActive={getAppearActive}
      onEnterStart={getAppearStart}
      onEnterActive={getAppearActive}
      onLeaveStart={getAppearActive}
      onLeaveActive={getAppearStart}
    >
      {(motionProps: MotionRenderProps, ref: React.Ref<HTMLSpanElement>) => {
        const { className, style } = motionProps;
        return (
          <span
            className={`${prefixCls}-loading-icon`}
            style={style}
            ref={ref}
          >
            <LoadingIcon className={className} />
          </span>
        );
      }}
    </CSSMotion>
  );
};

export default LoadingIconWrapper;