/**
 * Represents a DXF line type definition with named pattern elements.
 * Line types control how lines are displayed (solid, dashed, dotted, etc.) in CAD drawings.
 */
export default class LineType {
  /**
   * The name identifier of the line type.
   * @example "DASHED", "CENTER", "HIDDEN"
   */
  readonly name: string;

  /**
   * Human-readable description of the line type pattern.
   * @example "Dashed __ __ __ __ __ __"
   */
  readonly description: string;

  /**
   * Array of numeric values defining the line pattern.
   * Positive values represent line segments (dashes), negative values represent gaps (spaces).
   * @example [0.5, -0.25, 0.5, -0.25] creates a dashed pattern
   */
  readonly elements: number[];

  /**
   * Creates a new DXF line type definition.
   * @param name - Unique identifier for the line type
   * @param description - Descriptive text explaining the pattern
   * @param elements - Pattern definition as alternating line/gap lengths
   */
  constructor(name: string, description: string, elements: number[]);

  /**
   * Converts the line type definition to DXF format string.
   * Generates the LTYPE entity representation following AutoCAD DXF specifications.
   * @returns Multi-line string containing DXF group codes and values
   */
  toDxfString(): string;

  /**
   * Calculates the total pattern length by summing absolute values of all elements.
   * Used by DXF format to define the complete pattern repeat distance (group code 40).
   * @returns Total length of one pattern repetition
   */
  getElementsSum(): number;
}