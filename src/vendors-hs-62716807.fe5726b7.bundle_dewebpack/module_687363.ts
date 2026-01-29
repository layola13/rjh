interface ArrowConfig {
  arrowWidth?: number;
  horizontalArrowShift?: number;
  verticalArrowShift?: number;
  autoAdjustOverflow?: boolean | OverflowOptions;
  arrowPointAtCenter?: boolean;
}

interface AlignPoint {
  points: [string, string];
  offset: [number, number];
  overflow?: OverflowOptions;
  targetOffset?: [number, number];
  ignoreShake?: boolean;
}

interface AlignConfig {
  [key: string]: AlignPoint;
}

interface OverflowOptions {
  adjustX: number;
  adjustY: number;
}

const DEFAULT_OVERFLOW_ENABLED: OverflowOptions = {
  adjustX: 1,
  adjustY: 1
};

const DEFAULT_OVERFLOW_DISABLED: OverflowOptions = {
  adjustX: 0,
  adjustY: 0
};

const DEFAULT_TARGET_OFFSET: [number, number] = [0, 0];

export function getOverflowOptions(
  autoAdjustOverflow: boolean | OverflowOptions | undefined
): OverflowOptions {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? DEFAULT_OVERFLOW_ENABLED : DEFAULT_OVERFLOW_DISABLED;
  }
  return {
    ...DEFAULT_OVERFLOW_DISABLED,
    ...autoAdjustOverflow
  };
}

export default function getAlignConfig(config: ArrowConfig): AlignConfig {
  const arrowWidth = config.arrowWidth ?? 5;
  const horizontalArrowShift = config.horizontalArrowShift ?? 16;
  const verticalArrowShift = config.verticalArrowShift ?? 8;
  const { autoAdjustOverflow, arrowPointAtCenter } = config;

  const alignConfig: AlignConfig = {
    left: {
      points: ['cr', 'cl'],
      offset: [-4, 0]
    },
    right: {
      points: ['cl', 'cr'],
      offset: [4, 0]
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4]
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4]
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };

  Object.keys(alignConfig).forEach((position: string) => {
    if (arrowPointAtCenter) {
      alignConfig[position] = {
        ...alignConfig[position],
        overflow: getOverflowOptions(autoAdjustOverflow),
        targetOffset: DEFAULT_TARGET_OFFSET
      };
    } else {
      alignConfig[position] = {
        ...alignConfig[position],
        overflow: getOverflowOptions(autoAdjustOverflow)
      };
    }
    alignConfig[position].ignoreShake = true;
  });

  return alignConfig;
}