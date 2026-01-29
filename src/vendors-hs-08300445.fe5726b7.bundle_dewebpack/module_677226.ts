interface OverflowConfig {
  adjustX: number;
  adjustY: number;
}

interface AlignConfig {
  points: [string, string];
  overflow: OverflowConfig;
  offset: [number, number];
  targetOffset: [number, number];
}

interface PopupAlignments {
  topLeft: AlignConfig;
  topCenter: AlignConfig;
  topRight: AlignConfig;
  bottomLeft: AlignConfig;
  bottomCenter: AlignConfig;
  bottomRight: AlignConfig;
}

const OVERFLOW_CONFIG: OverflowConfig = {
  adjustX: 1,
  adjustY: 1
};

const TARGET_OFFSET: [number, number] = [0, 0];

const VERTICAL_OFFSET_TOP = -4;
const VERTICAL_OFFSET_BOTTOM = 4;

const popupAlignments: PopupAlignments = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_TOP],
    targetOffset: TARGET_OFFSET
  },
  topCenter: {
    points: ["bc", "tc"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_TOP],
    targetOffset: TARGET_OFFSET
  },
  topRight: {
    points: ["br", "tr"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_TOP],
    targetOffset: TARGET_OFFSET
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_BOTTOM],
    targetOffset: TARGET_OFFSET
  },
  bottomCenter: {
    points: ["tc", "bc"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_BOTTOM],
    targetOffset: TARGET_OFFSET
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: OVERFLOW_CONFIG,
    offset: [0, VERTICAL_OFFSET_BOTTOM],
    targetOffset: TARGET_OFFSET
  }
};

export default popupAlignments;