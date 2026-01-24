/**
 * Note settings configuration interface
 * Manages font size and color properties for note objects
 */
export interface INoteSettings {
  /**
   * Font size of the note
   */
  fontSize: number;
  
  /**
   * Color of the note
   */
  color: string;
}

/**
 * View interface with active layer and memento manager
 */
export interface IView {
  /**
   * Currently active layer for rendering
   */
  activeLayer: {
    /**
     * Batch draw operation for performance optimization
     */
    batchDraw(): void;
  };
  
  /**
   * Memento manager for undo/redo functionality
   */
  mometoManager: {
    /**
     * Create a checkpoint for state management
     */
    checkPoint(): void;
  };
}

/**
 * Note interface representing a drawable note entity
 */
export interface INote {
  /**
   * Font size of the note
   */
  fontSize: number;
  
  /**
   * Color of the note
   */
  color: string;
  
  /**
   * Update the polygon representation of the note
   */
  updatePoly(): void;
  
  /**
   * Draw the note on the view
   * @param view - The view to draw on
   */
  draw(view: IView): void;
}

/**
 * NoteSettings class
 * Manages and synchronizes note properties with view rendering
 */
export declare class NoteSettings implements INoteSettings {
  /**
   * The note instance being configured
   */
  private readonly note: INote;
  
  /**
   * The view instance for rendering
   */
  private readonly view: IView;
  
  /**
   * Creates a new NoteSettings instance
   * @param note - The note object to configure
   * @param view - The view for rendering operations
   */
  constructor(note: INote, view: IView);
  
  /**
   * Gets the current font size of the note
   * @returns The font size value
   */
  get fontSize(): number;
  
  /**
   * Sets the font size of the note
   * Updates the note's polygon, redraws it, performs batch draw, and creates a checkpoint
   * @param value - The new font size value
   */
  set fontSize(value: number);
  
  /**
   * Gets the current color of the note
   * @returns The color value
   */
  get color(): string;
  
  /**
   * Sets the color of the note
   * Updates the note's polygon, redraws it, performs batch draw, and creates a checkpoint
   * @param value - The new color value
   */
  set color(value: string);
}