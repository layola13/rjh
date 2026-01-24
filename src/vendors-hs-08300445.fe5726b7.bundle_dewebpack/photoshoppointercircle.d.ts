/**
 * PhotoshopPointerCircle Component
 * 
 * A React component that renders a Photoshop-style pointer circle with left and right triangular arrows.
 * The arrows are created using CSS borders and positioned absolutely within the pointer container.
 * 
 * @module PhotoshopPointerCircle
 */

import React from 'react';

/**
 * CSS properties for a single triangle arrow
 */
interface TriangleStyle {
  /** Width of the triangle element (0 for border-based triangles) */
  width: number;
  /** Height of the triangle element (0 for border-based triangles) */
  height: number;
  /** Border style property */
  borderStyle: 'solid';
  /** Border width in CSS format (top right bottom left) */
  borderWidth: string;
  /** Border color in CSS format (top right bottom left) */
  borderColor: string;
  /** Positioning type */
  position?: 'absolute';
  /** Top position offset */
  top?: string;
  /** Left position offset */
  left?: string;
  /** CSS transform property for rotation and translation */
  transform?: string;
}

/**
 * Style collection for all pointer elements
 */
interface PointerStyles {
  /** Main pointer container styles */
  pointer?: React.CSSProperties;
  /** Default triangle styles */
  triangle: TriangleStyle;
  /** Triangle border/outline styles */
  triangleBorder: Omit<TriangleStyle, 'position' | 'top' | 'left'>;
  /** Left arrow outer border styles */
  left: Pick<TriangleStyle, 'transform'> & { Extend: string };
  /** Left arrow inner triangle styles */
  leftInside: Pick<TriangleStyle, 'transform'> & { Extend: string };
  /** Right arrow outer border styles */
  right: Pick<TriangleStyle, 'transform'> & { Extend: string };
  /** Right arrow inner triangle styles */
  rightInside: Pick<TriangleStyle, 'transform'> & { Extend: string };
}

/**
 * Photoshop-style pointer circle component with directional arrows
 * 
 * Renders a pointer indicator with left and right triangular arrows,
 * commonly used in color picker interfaces to indicate current selection.
 * 
 * @returns React element containing the styled pointer with arrows
 * 
 * @example
 *