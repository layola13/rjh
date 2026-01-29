/**
 * Position enumeration for UI element placement
 * Defines standard positions for positioning elements in 2D space
 */
export declare const Position: {
  /** Center position (horizontal and vertical) */
  readonly Center: "center";
  
  /** Left edge position */
  readonly Left: "left";
  
  /** Right edge position */
  readonly Right: "right";
  
  /** Middle position (vertical center) */
  readonly Middle: "middle";
  
  /** Top edge position */
  readonly Top: "top";
  
  /** Bottom edge position */
  readonly Bottom: "bottom";
  
  /** Top-left corner position */
  readonly TopLeft: "topLeft";
  
  /** Top-right corner position */
  readonly TopRight: "topRight";
  
  /** Bottom-left corner position */
  readonly BottomLeft: "bottomLeft";
  
  /** Bottom-right corner position */
  readonly BottomRight: "bottomRight";
  
  /** Top-center position (horizontally centered at top) */
  readonly TopCenter: "topCenter";
  
  /** Bottom-center position (horizontally centered at bottom) */
  readonly BottomCenter: "bottomCenter";
  
  /** Left-middle position (vertically centered at left) */
  readonly LeftMiddle: "leftMiddle";
  
  /** Center-middle position (horizontally and vertically centered) */
  readonly CenterMiddle: "centerMiddle";
  
  /** Right-middle position (vertically centered at right) */
  readonly RightMiddle: "rightMiddle";
};

/**
 * Type representing all possible position values
 */
export type PositionValue = typeof Position[keyof typeof Position];