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

const overflowConfig: OverflowConfig = {
  adjustX: 1,
  adjustY: 1
};

const defaultTargetOffset: Offset = [0, 0];

const OFFSET_LEFT: Offset = [-4, 0];
const OFFSET_RIGHT: Offset = [4, 0];
const OFFSET_TOP: Offset = [0, -4];
const OFFSET_BOTTOM: Offset = [0, 4];

export const placements: Placements = {
  left: {
    points: ["cr", "cl"],
    overflow: overflowConfig,
    offset: OFFSET_LEFT,
    targetOffset: defaultTargetOffset
  },
  right: {
    points: ["cl", "cr"],
    overflow: overflowConfig,
    offset: OFFSET_RIGHT,
    targetOffset: defaultTargetOffset
  },
  top: {
    points: ["bc", "tc"],
    overflow: overflowConfig,
    offset: OFFSET_TOP,
    targetOffset: defaultTargetOffset
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: overflowConfig,
    offset: OFFSET_BOTTOM,
    targetOffset: defaultTargetOffset
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: overflowConfig,
    offset: OFFSET_TOP,
    targetOffset: defaultTargetOffset
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: overflowConfig,
    offset: OFFSET_LEFT,
    targetOffset: defaultTargetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: overflowConfig,
    offset: OFFSET_TOP,
    targetOffset: defaultTargetOffset
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: overflowConfig,
    offset: OFFSET_RIGHT,
    targetOffset: defaultTargetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: overflowConfig,
    offset: OFFSET_BOTTOM,
    targetOffset: defaultTargetOffset
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: overflowConfig,
    offset: OFFSET_RIGHT,
    targetOffset: defaultTargetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: overflowConfig,
    offset: OFFSET_BOTTOM,
    targetOffset: defaultTargetOffset
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: overflowConfig,
    offset: OFFSET_LEFT,
    targetOffset: defaultTargetOffset
  }
};

export default placements;