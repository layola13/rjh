/**
 * Symbol polyfill and related utilities for ES5 environments
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Property descriptor for object properties
 */
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: unknown;
  writable?: boolean;
  get?(): unknown;
  set?(v: unknown): void;
}

/**
 * Symbol registry internal structure
 */
interface SymbolRegistry {
  [key: string]: symbol;
}

/**
 * Symbol metadata storage
 */
interface SymbolMetadata {
  /** Symbol identifier */
  i: string;
  /** Weak references storage */
  w: Record<string, unknown>;
}

/**
 * Object with hidden symbol metadata
 */
interface ObjectWithMeta {
  [HIDDEN_KEY]?: Record<string, boolean>;
}

/**
 * Color picker component props
 */
interface ColorPickerProps {
  /** Initial color value */
  initialColor: string;
  /** Large size mode */
  big: boolean;
  /** Color mode (rgba, hex, etc.) */
  mode: string;
  /** Show menu above the button */
  top: boolean;
  /** Show color swatches */
  showSwatches: boolean;
  /** Custom color swatches array */
  swatches: string[][];
}

/**
 * Image upload component props
 */
interface ImageUploadProps {
  /** List of uploaded files */
  fileList: File[];
  /** Show label text */
  showLabel: boolean;
  /** Initial image source URL */
  initialSrc: string;
  /** Preview image width in pixels */
  width: number;
  /** Preview image height in pixels */
  height: number;
  /** Allow multiple file selection */
  multiple: boolean;
}

/**
 * Image viewer component props
 */
interface ImageViewerProps {
  /** Image URL to display */
  imgs: string;
  /** Background overlay color */
  background: string;
}

/**
 * Touch event with changedTouches
 */
interface TouchEventWithChanges extends Event {
  changedTouches: Touch[];
}

/**
 * Gesture delta event
 */
interface GestureDeltaEvent {
  deltaX: number;
  deltaY: number;
  deltaDistance?: number;
}

// ============================================================================
// Symbol Polyfill Module
// ============================================================================

declare namespace SymbolPolyfill {
  /**
   * Creates a new symbol with optional key
   * @param key - Optional symbol description
   * @returns Symbol instance
   */
  function createSymbol(key?: string): symbol;

  /**
   * Checks if value is a symbol
   * @param value - Value to check
   * @returns True if value is a symbol
   */
  function isSymbol(value: unknown): value is symbol;

  /**
   * Gets symbol for given key from global registry
   * @param key - Symbol key
   * @returns Symbol for the key
   */
  function getSymbolFor(key: string): symbol;

  /**
   * Gets key for given symbol from global registry
   * @param symbol - Symbol instance
   * @returns Key string or undefined
   */
  function getKeyFor(symbol: symbol): string | undefined;

  /**
   * Defines property on object with symbol key
   * @param target - Target object
   * @param key - Property key (string or symbol)
   * @param descriptor - Property descriptor
   * @returns Modified target object
   */
  function defineProperty<T extends object>(
    target: T,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): T;

  /**
   * Defines multiple properties on object
   * @param target - Target object
   * @param properties - Properties to define
   * @returns Modified target object
   */
  function defineProperties<T extends object>(
    target: T,
    properties: Record<string, PropertyDescriptor>
  ): T;

  /**
   * Gets own property descriptor
   * @param target - Target object
   * @param key - Property key
   * @returns Property descriptor or undefined
   */
  function getOwnPropertyDescriptor(
    target: object,
    key: string | symbol
  ): PropertyDescriptor | undefined;

  /**
   * Gets all own property symbols
   * @param target - Target object
   * @returns Array of symbol keys
   */
  function getOwnPropertySymbols(target: object): symbol[];

  /**
   * Well-known symbols
   */
  const wellKnownSymbols: {
    iterator: symbol;
    asyncIterator: symbol;
    hasInstance: symbol;
    isConcatSpreadable: symbol;
    match: symbol;
    replace: symbol;
    search: symbol;
    species: symbol;
    split: symbol;
    toPrimitive: symbol;
    toStringTag: symbol;
    unscopables: symbol;
  };
}

// ============================================================================
// Array Utilities
// ============================================================================

declare namespace ArrayUtils {
  /**
   * Checks if value is an array
   * @param value - Value to check
   * @returns True if value is an array
   */
  function isArray(value: unknown): value is unknown[];

  /**
   * Creates array from array-like or iterable object
   * @param arrayLike - Array-like or iterable object
   * @param mapFn - Optional mapping function
   * @param thisArg - Optional this context for mapFn
   * @returns New array
   */
  function from<T, U>(
    arrayLike: ArrayLike<T> | Iterable<T>,
    mapFn?: (item: T, index: number) => U,
    thisArg?: unknown
  ): U[];

  /**
   * Spreads iterable into array
   * @param iterable - Iterable to spread
   * @returns Array of elements
   */
  function toConsumableArray<T>(iterable: Iterable<T>): T[];
}

// ============================================================================
// String Utilities
// ============================================================================

declare namespace StringUtils {
  /**
   * Wraps string in HTML tag
   * @param str - String to wrap
   * @param tag - HTML tag name
   * @param attr - Optional attribute name
   * @param value - Optional attribute value
   * @returns HTML string
   */
  function wrapInTag(
    str: string,
    tag: string,
    attr?: string,
    value?: string
  ): string;

  /**
   * Adds big tag wrapper to string
   * @param str - String to wrap
   * @returns String wrapped in <big> tag
   */
  function big(str: string): string;
}

// ============================================================================
// Object Utilities
// ============================================================================

declare namespace ObjectUtils {
  /**
   * Gets own property names including symbols
   * @param obj - Target object
   * @returns Array of property keys
   */
  function getOwnPropertyNames(obj: object): string[];

  /**
   * Gets own property names for window object (special case)
   * @param obj - Window object
   * @returns Array of property names
   */
  function getOwnPropertyNamesForWindow(obj: Window): string[];

  /**
   * Checks if property is enumerable
   * @param obj - Target object
   * @param key - Property key
   * @returns True if property is enumerable
   */
  function propertyIsEnumerable(obj: object, key: string | symbol): boolean;
}

// ============================================================================
// Component: Color Picker
// ============================================================================

declare const ColorPicker: {
  props: ColorPickerProps;
  
  data(): {
    /** Show color picker menu */
    show_color: boolean;
    /** Currently selected color */
    color: string;
  };

  computed: {
    /** Computed style for color preview block */
    color_block_style(): {
      backgroundColor: string;
      height: string;
    };
  };

  methods: {
    /**
     * Handles color selection
     * @param color - Selected color value
     */
    pickColor(color: string): void;
  };

  mounted(): void;

  watch: {
    /**
     * Watches for initial color changes
     * @param newColor - New color value
     * @param oldColor - Previous color value
     */
    initialColor(newColor: string, oldColor: string): void;
  };
};

// ============================================================================
// Component: Image Upload
// ============================================================================

declare const ImageUpload: {
  props: ImageUploadProps;

  data(): {
    /** Array of image source URLs */
    src: string[];
    /** Show image viewer */
    viewImg: boolean;
    /** Currently selected image for viewing */
    choosedImg: string;
  };

  methods: {
    /**
     * Handles file input change event
     * @param event - File input change event
     */
    inputChange(event: Event): Promise<void>;

    /**
     * Reads image file and converts to data URL
     * @param file - File object to read
     * @param index - Current file index
     * @param lastIndex - Last file index in batch
     */
    readImg(file: File, index: number, lastIndex: number): Promise<void>;

    /**
     * Deletes image at specified index
     * @param index - Image index to delete
     */
    deletePic(index: number): void;

    /**
     * Removes all files from input element
     */
    removeFiles(): void;
  };

  watch: {
    /**
     * Watches for initial source changes
     * @param newSrc - New image source URL
     * @param oldSrc - Previous image source URL
     */
    initialSrc(newSrc: string, oldSrc: string): void;
  };

  mounted(): void;
};

// ============================================================================
// Component: Image Viewer
// ============================================================================

declare const ImageViewer: {
  props: ImageViewerProps;

  data(): {
    /** Zoom percentage (100 = original size) */
    percent: number;
    /** Image X position in pixels */
    positionX: number;
    /** Image Y position in pixels */
    positionY: number;
    /** Drag start X coordinate */
    startX: number;
    /** Drag start Y coordinate */
    startY: number;
    /** Fixed Y coordinate for calculations */
    fixedY: number;
    /** Last pinch distance for zoom calculation */
    lastDistance: number | null;
    /** Delta distance change for pinch zoom */
    deltaDistance: number | null;
  };

  computed: {
    /** Can zoom in (max 500%) */
    magnifyAble(): boolean;
    /** Can zoom out (min 80%) */
    narrowAble(): boolean;
    /** Is mobile device */
    isMobileDevice(): boolean;
  };

  methods: {
    /**
     * Handles viewer background click
     */
    viewerClick(): void;

    /**
     * Scales image by percentage delta
     * @param delta - Percentage change (positive = zoom in, negative = zoom out)
     */
    scaleImg(delta: number): void;

    /**
     * Resets image position and zoom to defaults
     */
    resetPosition(): void;

    /**
     * Handles image load complete event
     * @param event - Image load event
     */
    imgLoaded(event: Event): void;

    /**
     * Prevents outer touch events
     * @param event - Touch event
     * @returns False to prevent default
     */
    outerTouch(event: TouchEvent): boolean;

    /**
     * Handles drag start
     * @param event - Mouse or touch event
     * @param mode - 1 for touch, 2 for mouse
     */
    dragStart(event: MouseEvent | TouchEventWithChanges, mode: 1 | 2): void;

    /**
     * Handles drag move
     * @param event - Mouse or touch event
     * @param mode - 1 for touch, 2 for mouse
     */
    dragMove(event: MouseEvent | TouchEventWithChanges, mode: 1 | 2): void;

    /**
     * Handles mouse wheel zoom
     * @param event - Wheel event
     */
    mousewheel(event: WheelEvent): void;

    /**
     * Calculates distance change between two touch points
     * @param touches - Array of touch points
     */
    changeDistance(touches: Touch[]): void;

    /**
     * Handles pinch zoom gesture
     * @param event - Touch event with multiple touches
     */
    pinchHandler(event: TouchEventWithChanges): void;

    /**
     * Handles pan/move gesture
     * @param event - Gesture event with delta values
     */
    moveHandler(event: GestureDeltaEvent): void;

    /**
     * Loads AlloyFinger gesture library script
     */
    loadScript(): void;
  };

  mounted(): void;

  watch: {
    /**
     * Watches for image source changes
     * @param newSrc - New image URL
     * @param oldSrc - Previous image URL
     */
    imgs(newSrc: string, oldSrc: string): void;
  };
};

// ============================================================================
// Module Exports
// ============================================================================

export {
  SymbolPolyfill,
  ArrayUtils,
  StringUtils,
  ObjectUtils,
  ColorPicker,
  ImageUpload,
  ImageViewer,
  PropertyDescriptor,
  SymbolRegistry,
  SymbolMetadata,
  ColorPickerProps,
  ImageUploadProps,
  ImageViewerProps,
  TouchEventWithChanges,
  GestureDeltaEvent,
};