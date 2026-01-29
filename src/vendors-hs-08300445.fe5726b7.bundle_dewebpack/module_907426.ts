interface OverflowConfig {
  adjustX: 1;
  adjustY: 1;
}

type Point = string;
type Offset = [number, number];

interface PlacementConfig {
  points: [Point, Point];
  overflow: OverflowConfig;
  offset: Offset;
  targetOffset: Offset;
}

interface Placements {
  left: PlacementConfig;
  right: PlacementConfig;
  top: PlacementConfig;
  bottom: PlacementConfig;
  topLeft: PlacementConfig;
  leftTop: PlacementConfig;
  topRight: PlacementConfig;
  rightTop: PlacementConfig;
  bottomRight: PlacementConfig;
  rightBottom: PlacementConfig;
  bottomLeft: PlacementConfig;
  leftBottom: PlacementConfig;
}

const OVERFLOW_CONFIG: OverflowConfig = {
  adjustX: 1,
  adjustY: 1
};

const ZERO_OFFSET: Offset = [0, 0];

const OFFSET_SMALL = 4;

export const placements: Placements = {
  left: {
    points: ["cr", "cl"],
    overflow: OVERFLOW_CONFIG,
    offset: [-OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  },
  right: {
    points: ["cl", "cr"],
    overflow: OVERFLOW_CONFIG,
    offset: [OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  },
  top: {
    points: ["bc", "tc"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, -OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, -OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [-OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  },
  topRight: {
    points: ["br", "tr"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, -OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: OVERFLOW_CONFIG,
    offset: [OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: OVERFLOW_CONFIG,
    offset: [OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, OFFSET_SMALL],
    targetOffset: ZERO_OFFSET
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: OVERFLOW_CONFIG,
    offset: [-OFFSET_SMALL, 0],
    targetOffset: ZERO_OFFSET
  }
};

export default placements;