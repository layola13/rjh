import Vue, { VNode, CreateElement } from 'vue';
import { clamp, convertToUnit } from '../../util/helpers';
import { fromRGBA, fromHSVA } from './util';

/**
 * HSVA color model interface
 * Represents Hue, Saturation, Value, Alpha color space
 */
interface HSVA {
  /** Hue: 0-360 degrees */
  h: number;
  /** Saturation: 0-1 */
  s: number;
  /** Value (brightness): 0-1 */
  v: number;
  /** Alpha (opacity): 0-1 */
  a: number;
}

/**
 * RGBA color model interface
 * Represents Red, Green, Blue, Alpha color space
 */
interface RGBA {
  /** Red: 0-255 */
  r: number;
  /** Green: 0-255 */
  g: number;
  /** Blue: 0-255 */
  b: number;
  /** Alpha (opacity): 0-1 */
  a: number;
}

/**
 * Color object containing both HSVA and additional properties
 */
interface Color {
  /** HSVA color representation */
  hsva: HSVA;
  /** Hue value (0-360) */
  hue: number;
  /** Alpha value (0-1) */
  alpha: number;
}

/**
 * Bounding rectangle information
 */
interface BoundingRect {
  /** Width of the element in pixels */
  width: number;
  /** Height of the element in pixels */
  height: number;
  /** Left position relative to viewport */
  left: number;
  /** Top position relative to viewport */
  top: number;
}

/**
 * Dot position on canvas
 */
interface DotPosition {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}

/**
 * Component data interface
 */
interface ComponentData {
  /** Cached bounding rectangle for performance */
  boundingRect: BoundingRect;
}

/**
 * VColorPickerCanvas component
 * 
 * Interactive HSV color picker canvas that allows users to select
 * saturation and value by clicking or dragging on a 2D gradient surface.
 * 
 * @example
 * <v-color-picker-canvas
 *   :color="colorObject"
 *   :width="300"
 *   :height="150"
 *   :dot-size="10"
 *   :disabled="false"
 *   @update:color="handleColorChange"
 * />
 */
declare const VColorPickerCanvas: import('vue').ExtendedVue<
  Vue,
  ComponentData,
  {
    /**
     * Emit updated color based on mouse position
     * @param clientX - Mouse X position in viewport coordinates
     * @param clientY - Mouse Y position in viewport coordinates
     */
    emitColor(clientX: number, clientY: number): void;

    /**
     * Redraw the canvas gradient based on current hue
     * Creates a two-layer gradient: horizontal (white to hue) and vertical (transparent to black)
     */
    updateCanvas(): void;

    /**
     * Handle canvas click event
     * @param event - Mouse click event
     */
    handleClick(event: MouseEvent): void;

    /**
     * Handle mouse down event to start dragging
     * @param event - Mouse down event
     */
    handleMouseDown(event: MouseEvent): void;

    /**
     * Handle mouse move event during drag
     * @param event - Mouse move event
     */
    handleMouseMove(event: MouseEvent): void;

    /**
     * Handle mouse up event to stop dragging
     * Cleans up event listeners
     */
    handleMouseUp(): void;

    /**
     * Generate canvas VNode
     * @returns Canvas virtual node
     */
    genCanvas(): VNode;

    /**
     * Generate color picker dot VNode
     * @returns Dot virtual node positioned at current color coordinates
     */
    genDot(): VNode;
  },
  {
    /**
     * Current dot position on canvas
     * Calculated from color's saturation and value
     */
    dot: DotPosition;
  },
  {
    /**
     * Current color object
     * Contains HSVA values and helper properties
     */
    color: Color;

    /**
     * Whether the color picker is disabled
     * @default false
     */
    disabled: boolean;

    /**
     * Size of the selection dot in pixels
     * @default 10
     */
    dotSize: number | string;

    /**
     * Canvas height in pixels
     * @default 150
     */
    height: number | string;

    /**
     * Canvas width in pixels
     * @default 300
     */
    width: number | string;
  }
>;

export default VColorPickerCanvas;

/**
 * Events emitted by VColorPickerCanvas
 */
export interface VColorPickerCanvasEvents {
  /**
   * Emitted when color is updated via user interaction
   * @param color - Updated color object with new HSVA values
   */
  'update:color': (color: Color) => void;
}