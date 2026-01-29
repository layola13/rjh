export interface MotionConfig {
  motionName?: string;
  [key: string]: unknown;
}

export interface GetMotionParams {
  prefixCls: string;
  motion?: MotionConfig;
  defaultMotions?: Record<string, MotionConfig>;
  openAnimation?: string | Record<string, unknown>;
  openTransitionName?: string;
}

export interface MotionContext {
  switchingModeFromInline: boolean;
}

export function getMotion(
  params: GetMotionParams,
  context: MotionContext,
  mode: string
): MotionConfig | null {
  const {
    prefixCls,
    motion,
    defaultMotions = {},
    openAnimation,
    openTransitionName
  } = params;

  const { switchingModeFromInline } = context;

  if (motion) {
    return motion;
  }

  if (typeof openAnimation === 'object' && openAnimation) {
    console.warn('Object type of `openAnimation` is removed. Please use `motion` instead.');
  } else if (typeof openAnimation === 'string') {
    return {
      motionName: `${prefixCls}-open-${openAnimation}`
    };
  }

  if (openTransitionName) {
    return {
      motionName: openTransitionName
    };
  }

  const modeMotion = defaultMotions[mode];
  if (modeMotion) {
    return modeMotion;
  }

  return switchingModeFromInline ? null : defaultMotions.other;
}