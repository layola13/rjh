/**
 * Horizontal alignment options for text entities
 */
type HorizontalAlign = "left" | "center" | "right";

/**
 * Vertical alignment options for text entities
 */
type VerticalAlign = "baseline" | "bottom" | "middle" | "top";

/**
 * Layer interface for DXF text entities
 */
interface DxfLayer {
  /** Layer name */
  name: string;
}

/**
 * Represents a text entity in DXF format.
 * 
 * This class encapsulates the properties and methods needed to create
 * a TEXT entity in AutoCAD DXF file format, including position, alignment,
 * rotation, and the text content itself.
 */
declare class DxfText {
  /** X-coordinate of the text insertion point */
  x1: number;
  
  /** Y-coordinate of the text insertion point */
  y1: number;
  
  /** Text height in drawing units */
  height: number;
  
  /** Rotation angle in degrees */
  rotation: number;
  
  /** Text content to display */
  value: string;
  
  /** Horizontal text alignment */
  hAlign: HorizontalAlign;
  
  /** Vertical text alignment */
  vAlign: VerticalAlign;
  
  /** Layer to which this text entity belongs */
  layer: DxfLayer;

  /**
   * Creates a new DXF text entity.
   * 
   * @param x1 - X-coordinate of the text insertion point
   * @param y1 - Y-coordinate of the text insertion point
   * @param height - Text height in drawing units
   * @param rotation - Rotation angle in degrees
   * @param value - Text content to display
   * @param hAlign - Horizontal alignment (default: "left")
   * @param vAlign - Vertical alignment (default: "baseline")
   */
  constructor(
    x1: number,
    y1: number,
    height: number,
    rotation: number,
    value: string,
    hAlign?: HorizontalAlign,
    vAlign?: VerticalAlign
  );

  /**
   * Converts the text entity to DXF format string representation.
   * 
   * Generates a DXF-formatted string containing all necessary group codes
   * and values to define a TEXT entity in an AutoCAD DXF file.
   * 
   * @returns DXF format string representation of the text entity
   */
  toDxfString(): string;
}

export = DxfText;