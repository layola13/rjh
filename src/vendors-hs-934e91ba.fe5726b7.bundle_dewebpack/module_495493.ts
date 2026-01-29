interface Config {
  [key: string]: any;
}

interface BufferView {
  buffer: ArrayBuffer;
}

interface Point2D {
  x: number;
  y: number;
}

interface Int64 {
  low: number;
  high: number;
}

interface GeometryNode {
  points: Int64[];
  normals: Float64Array;
  offset: number;
  flag: number;
}

interface ProcessorState {
  scale: number;
  minSegmentLength: number;
  radius: number;
  stepAngle: number;
  angularFrequency: number;
  cosineValue: number;
  sineValue: number;
  segments: GeometryNode[];
  currentPoints: Int64[];
  outputBuffers: Int64[][];
  tempNormals: Float64Array[];
  workFlags: number[];
}

const INITIAL_STACK_POINTER = 5254848;
const EPSILON_POSITIVE = 1e-20;
const EPSILON_NEGATIVE = -1e-20;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const HALF_PI = PI / 2;
const RECIPROCAL_TWO_PI = 1 / TWO_PI;
const MAX_ANGLE = 2;
const DEFAULT_MIN_SEGMENT_RATIO = 0.25;
const VECTOR_GROWTH_FACTOR = 2;
const MAX_VECTOR_CAPACITY = 268435455;

function init(config: Config): void {
  const options: Config = {};
  Object.keys(config).forEach((key: string) => {
    options[key] = config[key];
  });

  const state: ProcessorState = initializeState(options);
  processGeometry(state);
}

function initializeState(options: Config): ProcessorState {
  return {
    scale: 0,
    minSegmentLength: 0,
    radius: 0,
    stepAngle: 0,
    angularFrequency: 0,
    cosineValue: 0,
    sineValue: 0,
    segments: [],
    currentPoints: [],
    outputBuffers: [],
    tempNormals: [],
    workFlags: []
  };
}

function processGeometry(state: ProcessorState): void {
  const radius = state.radius;
  
  if (radius <= EPSILON_NEGATIVE || radius >= EPSILON_POSITIVE) {
    return;
  }

  const absoluteRadius = Math.abs(radius);
  const scaleValue = state.scale > MAX_ANGLE ? MAX_ANGLE / (state.scale * state.scale) : 0.5;
  state.scale = scaleValue;

  let minSegment = DEFAULT_MIN_SEGMENT_RATIO;
  if (state.minSegmentLength > 0 && state.minSegmentLength <= DEFAULT_MIN_SEGMENT_RATIO * absoluteRadius) {
    minSegment = state.minSegmentLength;
  }

  const circumference = PI * absoluteRadius;
  const ratio = 1 - minSegment / absoluteRadius;
  const halfAngle = computeArcsin(ratio);
  const stepAngle = PI / halfAngle;
  const finalStepAngle = stepAngle > circumference ? circumference : stepAngle;
  
  state.angularFrequency = finalStepAngle / TWO_PI;
  
  const angularStep = TWO_PI / finalStepAngle;
  state.cosineValue = computeCosine(angularStep);
  state.sineValue = computeSine(angularStep);

  allocateBuffers(state);
  generateGeometry(state, radius);
}

function computeArcsin(value: number): number {
  const absValue = Math.abs(value);
  
  if (absValue >= 1) {
    return value > 0 ? 0 : PI;
  }
  
  if (absValue <= 0.5) {
    return HALF_PI;
  }
  
  const sqrtValue = Math.sqrt(0.5 * (1 - value));
  return 2 * sqrtValue;
}

function computeCosine(angle: number): number {
  const normalizedAngle = normalizeAngle(angle);
  return Math.cos(normalizedAngle);
}

function computeSine(angle: number): number {
  const normalizedAngle = normalizeAngle(angle);
  return Math.sin(normalizedAngle);
}

function normalizeAngle(angle: number): number {
  const quadrant = Math.floor(angle / HALF_PI) & 3;
  const reduced = angle % HALF_PI;
  
  switch (quadrant) {
    case 0:
      return reduced;
    case 1:
      return HALF_PI - reduced;
    case 2:
      return -reduced;
    case 3:
      return reduced - HALF_PI;
    default:
      return reduced;
  }
}

function allocateBuffers(state: ProcessorState): void {
  const segmentCount = state.segments.length;
  
  state.currentPoints = new Array(segmentCount * 4);
  state.tempNormals = new Array(segmentCount).fill(null).map(() => new Float64Array(2));
  state.outputBuffers = [];
}

function generateGeometry(state: ProcessorState, radius: number): void {
  const segments = state.segments;
  
  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
    const segment = segments[segmentIndex];
    const points = segment.points;
    
    state.currentPoints = [];
    
    if (points.length < 2) {
      continue;
    }

    processSegment(state, segment, radius, segmentIndex);
    
    const outputBuffer: Int64[] = [];
    for (const point of state.currentPoints) {
      outputBuffer.push(point);
    }
    state.outputBuffers.push(outputBuffer);
  }
}

function processSegment(
  state: ProcessorState,
  segment: GeometryNode,
  radius: number,
  segmentIndex: number
): void {
  const points = segment.points;
  const pointCount = points.length;
  
  computeNormals(state, points);
  
  if (segment.flag) {
    generateOffsetPoints(state, points, radius, true);
  } else {
    generateOffsetPoints(state, points, radius, false);
  }
}

function computeNormals(state: ProcessorState, points: Int64[]): void {
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    const dx = toFloat(p2) - toFloat(p1);
    const dy = toFloat(p2) - toFloat(p1);
    const length = Math.sqrt(dx * dx + dy * dy);
    const invLength = 1 / length;
    
    state.tempNormals[i][0] = -dy * invLength;
    state.tempNormals[i][1] = dx * invLength;
  }
}

function generateOffsetPoints(
  state: ProcessorState,
  points: Int64[],
  radius: number,
  isClosed: boolean
): void {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const normal = state.tempNormals[i] ?? state.tempNormals[0];
    
    const offsetX = toFloat(point) + normal[0] * radius;
    const offsetY = toFloat(point) + normal[1] * radius;
    
    state.currentPoints.push(toInt64(offsetX, offsetY));
  }
}

function toFloat(value: Int64): number {
  return value.low + value.high * 4294967296;
}

function toInt64(x: number, y: number): Int64 {
  const roundedX = x + (x < 0 ? -0.5 : 0.5);
  const roundedY = y + (y < 0 ? -0.5 : 0.5);
  
  return {
    low: Math.floor(roundedX) >>> 0,
    high: Math.floor(roundedY) >>> 0
  };
}

function expandBuffer<T>(buffer: T[], newCapacity: number): T[] {
  if (newCapacity > MAX_VECTOR_CAPACITY) {
    throw new Error('Buffer capacity exceeded');
  }
  
  const newBuffer = new Array<T>(newCapacity);
  for (let i = 0; i < buffer.length; i++) {
    newBuffer[i] = buffer[i];
  }
  return newBuffer;
}

export { init, ProcessorState, GeometryNode, Int64 };