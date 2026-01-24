import { CornerJoiner, ShapeType } from './CornerJoiner';

/**
 * View interface representing the view component
 */
interface IView {
  // Add specific view properties based on your application context
  [key: string]: unknown;
}

/**
 * WallCornerJoiner class
 * 
 * A specialized corner joiner implementation for wall corners.
 * Extends the base CornerJoiner class with wall-specific functionality.
 * 
 * @extends CornerJoiner
 */
export declare class WallCornerJoiner extends CornerJoiner {
  /**
   * The view component associated with this wall corner joiner
   */
  view: IView;

  /**
   * Creates a new WallCornerJoiner instance
   * 
   * @param element - The primary element parameter for corner joining
   * @param view - The view component to be associated with this joiner
   */
  constructor(element: unknown, view: IView);
}