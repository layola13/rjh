/**
 * Position enumeration defining all possible positioning values for UI elements.
 * This object is frozen to prevent modifications at runtime.
 */
export declare const Position: {
  /** Center alignment (horizontal or vertical) */
  readonly Center: "center";
  
  /** Left horizontal alignment */
  readonly Left: "left";
  
  /** Right horizontal alignment */
  readonly Right: "right";
  
  /** Middle vertical alignment */
  readonly Middle: "middle";
  
  /** Top vertical alignment */
  readonly Top: "top";
  
  /** Bottom vertical alignment */
  readonly Bottom: "bottom";
  
  /** Top-left corner positioning */
  readonly TopLeft: "topLeft";
  
  /** Top-right corner positioning */
  readonly TopRight: "topRight";
  
  /** Bottom-left corner positioning */
  readonly BottomLeft: "bottomLeft";
  
  /** Bottom-right corner positioning */
  readonly BottomRight: "bottomRight";
  
  /** Top-center positioning (horizontally centered at top) */
  readonly TopCenter: "topCenter";
  
  /** Bottom-center positioning (horizontally centered at bottom) */
  readonly BottomCenter: "bottomCenter";
  
  /** Left-middle positioning (vertically centered at left) */
  readonly LeftMiddle: "leftMiddle";
  
  /** Center-middle positioning (both horizontally and vertically centered) */
  readonly CenterMiddle: "centerMiddle";
  
  /** Right-middle positioning (vertically centered at right) */
  readonly RightMiddle: "rightMiddle";
};

/**
 * Type representing all possible position values.
 * Can be used for type-safe position assignments.
 */
export type PositionValue = typeof Position[keyof typeof Position];