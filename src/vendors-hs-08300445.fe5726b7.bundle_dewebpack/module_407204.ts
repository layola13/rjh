export interface OverflowConfig {
  adjustX: 1;
  adjustY: 1;
}

export interface PlacementConfig {
  points: [string, string];
  overflow: OverflowConfig;
  offset: [number, number];
}

export interface Placements {
  topLeft: PlacementConfig;
  bottomLeft: PlacementConfig;
  leftTop: PlacementConfig;
  rightTop: PlacementConfig;
}

const OVERFLOW_CONFIG: OverflowConfig = {
  adjustX: 1,
  adjustY: 1
};

const OFFSET_VERTICAL = 7;
const OFFSET_HORIZONTAL = 4;

export const placements: Placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, -OFFSET_VERTICAL]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, OFFSET_VERTICAL]
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [-OFFSET_HORIZONTAL, 0]
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: OVERFLOW_CONFIG,
    offset: [OFFSET_HORIZONTAL, 0]
  }
};

export const placementsRtl: Placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, -OFFSET_VERTICAL]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, OFFSET_VERTICAL]
  },
  rightTop: {
    points: ["tr", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [-OFFSET_HORIZONTAL, 0]
  },
  leftTop: {
    points: ["tl", "tr"],
    overflow: OVERFLOW_CONFIG,
    offset: [OFFSET_HORIZONTAL, 0]
  }
};

export default placements;