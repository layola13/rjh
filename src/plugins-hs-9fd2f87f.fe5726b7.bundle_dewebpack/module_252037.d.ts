/**
 * State object representing a computational parameter or coordinate
 */
interface State {
  /** Description of the state */
  _des?: string;
  /** Description of the state (alternative spelling) */
  _desc?: string;
  /** Unique local identifier */
  localId: string;
  /** Whether this is a control parameter */
  isCtlParam?: boolean;
  /** The value of the state (number or point coordinate reference) */
  value: number | PointValue;
  /** Type of the state (e.g., 'point') */
  type?: string;
}

/**
 * Point value with x, y, z coordinate references
 */
interface PointValue {
  /** Reference to x coordinate state */
  x: string;
  /** Reference to y coordinate state */
  y: string;
  /** Reference to z coordinate state */
  z: string;
}

/**
 * Constraint equation for geometric calculations
 */
interface Constraint {
  /** Description of the constraint */
  _des: string;
  /** Unique local identifier */
  localId: string;
  /** Type of constraint (e.g., 'position') */
  type: string;
  /** Mathematical equation as a string */
  equation: string;
}

/**
 * Auxiliary point configuration for path interpolation
 */
interface AuxiliaryPoint {
  /** Point identifier */
  id: string;
  /** Tangent length for curve smoothing */
  tangent: number;
  /** Number of interpolation segments */
  segment: number;
}

/**
 * Parameters for path interpolation
 */
interface PathParameters {
  /** Array of auxiliary points for interpolation */
  auxiliary: AuxiliaryPoint[];
  /** Array of point ID paths */
  paths: string[][];
  /** Whether to reverse the path direction */
  auxreverse?: boolean;
  /** Whether to use offset interpolation mode */
  auxoffset?: boolean;
}

/**
 * Element with parameters to be processed
 */
interface ProcessableElement {
  /** Parameters containing path and auxiliary data */
  parameters: PathParameters;
  /** Flag indicating if element has been processed */
  processed?: boolean;
}

/**
 * Configuration object containing states and constraints
 */
interface Configuration {
  /** Array of state definitions */
  states: State[];
  /** Array of constraint equations */
  constraints: Constraint[];
  /** Child elements to process */
  children?: ProcessableElement[];
  /** Shelf board configuration (optional) */
  shelfBoards?: PathParameters;
  /** JSON representation of configuration */
  json?: Configuration;
}

/**
 * Creates interpolation point states and constraints
 * @param pointId - The identifier for the interpolation point
 * @param config - Configuration object to add states and constraints to
 */
declare function createInterpolationPoint(
  pointId: string,
  config: Configuration
): void;

/**
 * Processes path with offset interpolation mode
 * Creates smooth curves between path points using circular arc interpolation
 * @param element - Element containing path parameters
 * @param config - Configuration object to modify
 */
declare function processPathWithOffset(
  element: ProcessableElement,
  config: Configuration
): void;

/**
 * Processes path without offset (standard interpolation mode)
 * Creates smooth curves along a fixed axis (x-axis constant)
 * @param element - Element containing path parameters
 * @param config - Configuration object to modify
 */
declare function processPathWithoutOffset(
  element: ProcessableElement,
  config: Configuration
): void;

/**
 * Main processing function for path interpolation
 * Iterates through child elements and applies appropriate interpolation
 * @param element - Root element (unused in current implementation)
 * @param config - Configuration object containing children to process
 */
export default function processInterpolation(
  element: unknown,
  config?: Configuration
): void;