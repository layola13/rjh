/**
 * Represents a setting item within a sash group
 */
interface SashSetting {
  /** The target object that can be highlighted */
  target: {
    /**
     * Highlight or unhighlight the target
     * @param highlighted - Whether to highlight the target
     */
    highlight(highlighted: boolean): void;
  };
}

/**
 * Represents a view with an active layer that can be redrawn
 */
interface SashView {
  /** The currently active layer */
  activeLayer: {
    /**
     * Batch draw operations for performance optimization
     */
    batchDraw(): void;
  };
}

/**
 * Manages a group of sash settings with an active selection
 * Handles highlighting of the active setting and view updates
 */
export declare class SashGroupSettings {
  private readonly _settings;
  private _activeIndex;
  private readonly view;

  /**
   * Creates a new SashGroupSettings instance
   * @param settings - Array of sash settings to manage
   * @param activeIndex - Initial index of the active setting
   * @param view - The view containing the layer to redraw
   */
  constructor(settings: SashSetting[], activeIndex: number, view: SashView);

  /**
   * Gets the array of sash settings
   */
  get settings(): SashSetting[];

  /**
   * Gets the current active index
   */
  get activeIndex(): number;

  /**
   * Sets the active index, unhighlights all settings, highlights the new active setting,
   * and triggers a batch redraw of the active layer
   * @param index - The index of the setting to activate
   */
  set activeIndex(index: number);
}