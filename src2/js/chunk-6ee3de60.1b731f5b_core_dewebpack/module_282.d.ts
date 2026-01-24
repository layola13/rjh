/**
 * Represents a layer in a DXF (Drawing Exchange Format) file.
 * Layers are used to organize and group shapes with common properties like color and line type.
 */
export default class Layer {
  /**
   * The name of the layer
   */
  name: string;

  /**
   * The AutoCAD color index number (ACI) for the layer.
   * Valid range is typically 1-255.
   */
  colorNumber: number;

  /**
   * The name of the line type to be used for this layer (e.g., "CONTINUOUS", "DASHED")
   */
  lineTypeName: string;

  /**
   * Collection of shapes assigned to this layer
   */
  shapes: Shape[];

  /**
   * True color value in RGB format.
   * -1 indicates true color is not set, and colorNumber should be used instead.
   */
  trueColor: number;

  /**
   * Creates a new Layer instance
   * @param name - The layer name
   * @param colorNumber - The AutoCAD color index (ACI) number
   * @param lineTypeName - The line type name for the layer
   */
  constructor(name: string, colorNumber: number, lineTypeName: string) {
    this.name = name;
    this.colorNumber = colorNumber;
    this.lineTypeName = lineTypeName;
    this.shapes = [];
    this.trueColor = -1;
  }

  /**
   * Converts the layer definition to DXF format string.
   * Generates the layer table entry with properties like color and line type.
   * @returns DXF formatted string representation of the layer
   */
  toDxfString(): string;

  /**
   * Sets the true color value for the layer using RGB format.
   * When set, this takes precedence over the colorNumber.
   * @param color - RGB color value (typically a 24-bit integer)
   */
  setTrueColor(color: number): void;

  /**
   * Adds a shape to this layer and establishes the bidirectional relationship.
   * @param shape - The shape to add to this layer
   */
  addShape(shape: Shape): void;

  /**
   * Retrieves all shapes currently assigned to this layer.
   * @returns Array of shapes belonging to this layer
   */
  getShapes(): Shape[];

  /**
   * Converts all shapes in this layer to their DXF string representations.
   * @returns Concatenated DXF string of all shapes in the layer
   */
  shapesToDxf(): string;
}

/**
 * Interface representing a shape that can be added to a layer.
 * Shapes must be able to convert themselves to DXF format and maintain a reference to their layer.
 */
interface Shape {
  /**
   * The layer this shape belongs to
   */
  layer?: Layer;

  /**
   * Converts the shape to its DXF string representation
   * @returns DXF formatted string for this shape
   */
  toDxfString(): string;
}