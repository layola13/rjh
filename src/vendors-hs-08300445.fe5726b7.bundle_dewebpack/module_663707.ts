export interface MotionConfig {
  prefixCls?: string;
  motion?: MotionResult;
  animation?: string;
  transitionName?: string;
}

export interface MotionResult {
  motionName: string;
}

export function getMotion(config: MotionConfig): MotionResult | null {
  const { prefixCls, motion, animation, transitionName } = config;

  if (motion) {
    return motion;
  }

  if (animation) {
    return {
      motionName: `${prefixCls}-${animation}`
    };
  }

  if (transitionName) {
    return {
      motionName: transitionName
    };
  }

  return null;
}