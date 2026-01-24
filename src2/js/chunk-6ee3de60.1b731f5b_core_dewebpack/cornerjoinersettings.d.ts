import { CoupleSettings } from './CoupleSettings';
import { SkewPartEnum } from './enums';

/**
 * View interface representing the rendering context
 */
interface IView {
  /** Refresh the view display */
  refresh(): void;
  /** Memento manager for undo/redo operations */
  mometoManager: {
    /** Create a checkpoint for undo/redo */
    checkPoint(): void;
  };
}

/**
 * Corner joiner parameters configuration
 */
interface ICornerJoinerParams {
  cornerJoiner: number;
}

/**
 * Corner joiner component interface
 */
interface ICornerJoiner {
  /** Whether profile size text is hidden */
  profileSizeTextHidden: boolean;
  /** Skew angle in degrees (0-270) */
  skewAngle: number;
  /** Drawing mode for the corner joiner */
  drawMode: number;
  /** Whether to use square corner style */
  squareCorner: boolean;
  /** Whether to use panoramic corner style */
  panoramicCorner: boolean;
  /** Corner joiner configuration parameters */
  params: ICornerJoinerParams;
  
  /**
   * Draw the corner joiner on the view
   * @param view - The view to draw on
   */
  draw(view: IView): void;
  
  /**
   * Update the skew angle of the corner joiner
   * @param angle - New angle value (0-270 degrees)
   * @param view - The view context
   * @param skewPart - Which part to skew (TopView, etc.)
   */
  updateSkewAngle(angle: number, view: IView, skewPart: SkewPartEnum): void;
}

/**
 * Couple component interface
 */
interface ICouple {
  /** Profile size of the couple */
  profileSize: number;
  /** Current size of the couple */
  size: number;
  
  /**
   * Resize the couple to a new size
   * @param size - New size value
   */
  resize(size: number): void;
}

/**
 * Settings class for configuring corner joiner behavior and appearance.
 * Extends CoupleSettings to provide additional corner-specific configuration options.
 */
export class CornerJoinerSettings extends CoupleSettings {
  /** The corner joiner instance being configured */
  protected cornerJoiner: ICornerJoiner;

  /**
   * Creates a new CornerJoinerSettings instance
   * @param cornerJoiner - The corner joiner component to configure
   * @param view - The view context for rendering
   */
  constructor(cornerJoiner: ICornerJoiner, view: IView) {
    super(cornerJoiner as unknown as ICouple, view);
    this.cornerJoiner = cornerJoiner;
  }

  /**
   * Gets whether the size dimension text is hidden
   */
  get sizeDimHidden(): boolean {
    return this.cornerJoiner.profileSizeTextHidden;
  }

  /**
   * Sets whether the size dimension text should be hidden
   * Updates the view and creates a checkpoint when changed
   */
  set sizeDimHidden(value: boolean) {
    if (this.cornerJoiner.profileSizeTextHidden !== value) {
      this.cornerJoiner.profileSizeTextHidden = value;
      this.cornerJoiner.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets the current skew angle in degrees
   */
  get angle(): number {
    return this.cornerJoiner.skewAngle;
  }

  /**
   * Sets the skew angle for the corner joiner
   * Valid range: 0-270 degrees
   * Updates the view and creates a checkpoint when changed
   */
  set angle(value: number) {
    if (value >= 0 && value <= 270 && this.angle !== value) {
      this.cornerJoiner.updateSkewAngle(value, this.view, SkewPartEnum.TopView);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets the current profile size
   */
  get size(): number {
    return this.couple.profileSize;
  }

  /**
   * Sets the profile size
   * Must be a valid number >= 1
   * Resizes the couple and creates a checkpoint when changed
   */
  set size(value: number) {
    if (value && !isNaN(value) && value >= 1 && this.size !== value) {
      this.couple.profileSize = value;
      this.couple.resize(this.couple.size);
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets the current drawing mode
   */
  get drawMode(): number {
    return this.cornerJoiner.drawMode;
  }

  /**
   * Sets the drawing mode for the corner joiner
   * Resizes the couple and creates a checkpoint
   */
  set drawMode(value: number) {
    this.cornerJoiner.drawMode = value;
    this.couple.resize(this.couple.size);
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets whether square corner style is enabled
   */
  get squareCorner(): boolean {
    return this.cornerJoiner.squareCorner;
  }

  /**
   * Sets whether to use square corner style
   * Creates a checkpoint when changed
   */
  set squareCorner(value: boolean) {
    this.cornerJoiner.squareCorner = value;
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets whether panoramic corner style is enabled
   */
  get panoramicCorner(): boolean {
    return this.cornerJoiner.panoramicCorner;
  }

  /**
   * Sets whether to use panoramic corner style
   * When enabled, sets profile size to near-zero (1e-5) and hides size dimension
   * When disabled, restores normal size dimension visibility
   * Resizes the couple and creates a checkpoint
   */
  set panoramicCorner(value: boolean) {
    this.cornerJoiner.panoramicCorner = value;
    let profileSize = this.cornerJoiner.params.cornerJoiner;
    
    if (value) {
      profileSize = 0.00001; // 1e-5
      this.sizeDimHidden = true;
    } else {
      this.sizeDimHidden = false;
    }
    
    this.couple.profileSize = profileSize;
    this.couple.resize(this.couple.size);
    this.view.mometoManager.checkPoint();
  }
}