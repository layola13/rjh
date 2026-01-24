import { CornerJoiner, ShapeType } from './module-1';

/**
 * Panoramic corner joiner component for handling corner connections in panoramic views.
 * Extends the base CornerJoiner class with specific configurations for panoramic scenarios.
 */
export class PanoramicCornerJoiner extends CornerJoiner {
  /**
   * The associated view component.
   */
  view: unknown;

  /**
   * Flag indicating whether the profile size text should be hidden in the UI.
   */
  profileSizeTextHidden: boolean;

  /**
   * The size of the profile in units. Set to a minimal value (0.00001) for panoramic views.
   */
  profileSize: number;

  /**
   * Creates a new PanoramicCornerJoiner instance.
   * 
   * @param element - The DOM element or configuration object for the joiner
   * @param view - The view component this joiner is associated with
   */
  constructor(element: unknown, view: unknown) {
    super(element, view, ShapeType.PanoramicCornerJoiner);
    
    this.view = view;
    this.profileSizeTextHidden = true;
    this.profileSize = 0.00001; // Minimal profile size for panoramic corners
  }
}