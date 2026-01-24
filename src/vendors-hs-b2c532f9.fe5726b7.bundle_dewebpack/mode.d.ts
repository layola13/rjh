/**
 * QR Code generation library TypeScript definitions
 * Provides Canvas and SVG rendering capabilities for QR codes
 */

/**
 * Error correction level for QR codes
 * Higher levels provide better error recovery but reduce data capacity
 */
export enum ErrorCorrectionLevel {
  /** Low - ~7% error recovery */
  L = 'L',
  /** Medium - ~15% error recovery */
  M = 'M',
  /** Quartile - ~25% error recovery */
  Q = 'Q',
  /** High - ~30% error recovery */
  H = 'H'
}

/**
 * Image settings for embedding an image in the QR code center
 */
export interface ImageSettings {
  /** Image source URL or data URI */
  src: string;
  /** Image height in pixels (defaults to 10% of QR code size) */
  height?: number;
  /** Image width in pixels (defaults to 10% of QR code size) */
  width?: number;
  /** X position offset from center (in modules) */
  x?: number;
  /** Y position offset from center (in modules) */
  y?: number;
  /** Whether to clear QR code modules behind the image */
  excavate?: boolean;
}

/**
 * Common properties for QR code components
 */
export interface QRCodeProps {
  /** Data to encode in the QR code */
  value: string;
  /** Size of the QR code in pixels */
  size?: number;
  /** Error correction level */
  level?: ErrorCorrectionLevel | 'L' | 'M' | 'Q' | 'H';
  /** Background color (any valid CSS color) */
  bgColor?: string;
  /** Foreground color (any valid CSS color) */
  fgColor?: string;
  /** Whether to include a quiet zone (margin) around the QR code */
  includeMargin?: boolean;
  /** Optional image to overlay on the QR code */
  imageSettings?: ImageSettings;
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** HTML title attribute */
  title?: string;
  /** Minimum version (1-40, controls size/capacity) */
  minVersion?: number;
  /** Maximum version (1-40) */
  maxVersion?: number;
  /** Mask pattern (0-7, -1 for auto) */
  maskPattern?: number;
}

/**
 * Props for the main QRCode component with render type selection
 */
export interface QRCodeComponentProps extends QRCodeProps {
  /** Rendering method: 'canvas' or 'svg' */
  renderAs?: 'canvas' | 'svg';
}

/**
 * QR Code component using Canvas rendering
 * Provides better performance for dynamic QR codes
 * 
 * @example
 *