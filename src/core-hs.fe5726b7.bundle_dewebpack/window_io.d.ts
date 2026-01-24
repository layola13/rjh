/**
 * Window_IO Module
 * Handles serialization and deserialization of Window entities
 * Original Module ID: 93413
 */

import { Opening_IO, Opening } from './Opening'; // Assuming module 85689
import { Entity } from './Entity'; // Assuming module 99338

/**
 * IO handler for Window entities
 * Manages loading and saving window-specific properties including indentation
 */
export class Window_IO extends Opening_IO {
  /**
   * Loads window data from serialized format
   * Ensures indent is initialized to half thickness if not present
   * 
   * @param data - Raw window data object to load
   * @param context - Loading context for resolving references
   * @param options - Additional loading options
   */
  load(
    data: unknown,
    context: unknown,
    options: unknown
  ): void {
    const windowData = data as WindowData;
    super.load(windowData, context, options);
    
    if (!windowData.__indent) {
      windowData.__indent = windowData.__thickness / 2;
    }
  }
}

/**
 * Window entity class
 * Represents an architectural window with thickness, indent, and elevation properties
 */
export class Window extends Opening {
  /**
   * Creates a new Window instance
   * Initializes with default top view symbol and elevation
   * 
   * @param id - Optional unique identifier for the window
   */
  constructor(id: string = "") {
    super(id);
    
    this.topView = HSConstants.Resources?.svgs.default_window_symbol;
    this.z = HSConstants.Constants.DEFAULT_WINDOW_ELEVATION;
  }

  /**
   * Calculates the indent vector for the window
   * Returns a vector pointing in the indent direction with appropriate length
   * 
   * @returns Vector representing the indent offset from the wall surface
   */
  getIndentVector(): Vector {
    return this.getIndentDirection().setLength(
      this.indent - this.thickness / 2
    );
  }

  /**
   * Sets the thickness of the window
   * Updates indent to half thickness when thickness changes
   * 
   * @param thickness - New thickness value in model units
   */
  protected _setThickness(thickness: number): void {
    if (this.__thickness !== thickness) {
      this.__indent = thickness / 2;
    }
    super._setThickness(thickness);
  }

  /**
   * Gets the IO handler for this window type
   * 
   * @returns Singleton instance of Window_IO
   */
  getIO(): Window_IO {
    return Window_IO.instance();
  }
}

// Register Window class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgWindow, Window);

/**
 * Internal interface for window serialization data
 */
interface WindowData {
  __indent?: number;
  __thickness: number;
  [key: string]: unknown;
}

/**
 * Vector type for geometric calculations
 */
interface Vector {
  setLength(length: number): Vector;
}

/**
 * Global constants namespace
 */
declare const HSConstants: {
  Resources?: {
    svgs: {
      default_window_symbol: unknown;
    };
  };
  Constants: {
    DEFAULT_WINDOW_ELEVATION: number;
  };
  ModelClass: {
    NgWindow: string;
  };
};