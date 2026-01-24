/**
 * Cropper.js Type Definitions
 * @version 1.6.2
 * @description A simple jQuery image cropping plugin
 * @see https://fengyuanchen.github.io/cropperjs
 * @license MIT
 */

/**
 * View mode options for the cropper
 * - 0: No restrictions
 * - 1: Restrict the crop box to not exceed the size of the canvas
 * - 2: Restrict the minimum canvas size to fit within the container
 * - 3: Restrict the minimum canvas size to fill fit the container
 */
type ViewMode = 0 | 1 | 2 | 3;

/**
 * Drag mode for the cropper
 * - 'crop': Create a new crop box
 * - 'move': Move the canvas
 * - 'none': Do nothing
 */
type DragMode = 'crop' | 'move' | 'none';

/**
 * Cropper action types
 */
type CropperAction = 'all' | 'crop' | 'move' | 'zoom' | 'e' | 'w' | 's' | 'n' | 'ne' | 'nw' | 'se' | 'sw';

/**
 * Image data returned by getImageData()
 */
interface ImageData {
  /** The left offset of the image */
  left: number;
  /** The top offset of the image */
  top: number;
  /** The width of the image */
  width: number;
  /** The height of the image */
  height: number;
  /** The natural width of the image */
  naturalWidth: number;
  /** The natural height of the image */
  naturalHeight: number;
  /** The aspect ratio of the image */
  aspectRatio: number;
  /** The rotated degrees of the image */
  rotate: number;
  /** The scaling factor to apply on the abscissa of the image */
  scaleX: number;
  /** The scaling factor to apply on the ordinate of the image */
  scaleY: number;
}

/**
 * Canvas data returned by getCanvasData()
 */
interface CanvasData {
  /** The left offset of the canvas */
  left: number;
  /** The top offset of the canvas */
  top: number;
  /** The width of the canvas */
  width: number;
  /** The height of the canvas */
  height: number;
  /** The natural width of the canvas */
  naturalWidth: number;
  /** The natural height of the canvas */
  naturalHeight: number;
}

/**
 * Crop box data returned by getCropBoxData()
 */
interface CropBoxData {
  /** The left offset of the crop box */
  left: number;
  /** The top offset of the crop box */
  top: number;
  /** The width of the crop box */
  width: number;
  /** The height of the crop box */
  height: number;
}

/**
 * Container data returned by getContainerData()
 */
interface ContainerData {
  /** The current width of the container */
  width: number;
  /** The current height of the container */
  height: number;
}

/**
 * Cropped data returned by getData()
 */
interface CroppedData {
  /** The x-axis offset of the cropped area */
  x: number;
  /** The y-axis offset of the cropped area */
  y: number;
  /** The width of the cropped area */
  width: number;
  /** The height of the cropped area */
  height: number;
  /** The rotated degrees of the image */
  rotate: number;
  /** The scaling factor to apply on the abscissa of the image */
  scaleX: number;
  /** The scaling factor to apply on the ordinate of the image */
  scaleY: number;
}

/**
 * Set data options for setData()
 */
interface SetDataOptions {
  /** The x-axis offset of the cropped area */
  x?: number;
  /** The y-axis offset of the cropped area */
  y?: number;
  /** The width of the cropped area */
  width?: number;
  /** The height of the cropped area */
  height?: number;
  /** The rotated degrees of the image */
  rotate?: number;
  /** The scaling factor to apply on the abscissa of the image */
  scaleX?: number;
  /** The scaling factor to apply on the ordinate of the image */
  scaleY?: number;
}

/**
 * Options for getCroppedCanvas()
 */
interface GetCroppedCanvasOptions {
  /** The width of the output canvas */
  width?: number;
  /** The height of the output canvas */
  height?: number;
  /** The minimum width of the output canvas (default: 0) */
  minWidth?: number;
  /** The minimum height of the output canvas (default: 0) */
  minHeight?: number;
  /** The maximum width of the output canvas (default: Infinity) */
  maxWidth?: number;
  /** The maximum height of the output canvas (default: Infinity) */
  maxHeight?: number;
  /** A color to fill any alpha values in the output canvas (default: transparent) */
  fillColor?: string;
  /** Set to change if images are smoothed (default: true) */
  imageSmoothingEnabled?: boolean;
  /** Set the quality of image smoothing (default: 'low') */
  imageSmoothingQuality?: 'low' | 'medium' | 'high';
  /** Round the cropped data (default: false) */
  rounded?: boolean;
}

/**
 * Custom event detail for cropper events
 */
interface CropperEventDetail {
  /** The original event */
  originalEvent: Event;
  /** The current action */
  action: CropperAction;
}

/**
 * Zoom event detail
 */
interface ZoomEventDetail {
  /** The original event */
  originalEvent: Event;
  /** The old ratio */
  oldRatio: number;
  /** The new ratio */
  ratio: number;
}

/**
 * Cropper constructor options
 */
interface CropperOptions {
  /** Define the view mode of the cropper (default: 0) */
  viewMode?: ViewMode;
  
  /** Define the dragging mode of the cropper (default: 'crop') */
  dragMode?: DragMode;
  
  /** Define the initial aspect ratio of the crop box (default: NaN) */
  initialAspectRatio?: number;
  
  /** Define the fixed aspect ratio of the crop box (default: NaN) */
  aspectRatio?: number;
  
  /** The previous cropped data if you had stored */
  data?: SetDataOptions | null;
  
  /** A selector for adding extra containers to preview */
  preview?: string | Element | Element[] | NodeList;
  
  /** Re-render the cropper when resize the window (default: true) */
  responsive?: boolean;
  
  /** Restore the cropped area after resize the window (default: true) */
  restore?: boolean;
  
  /** Check if the current image is a cross-origin image (default: true) */
  checkCrossOrigin?: boolean;
  
  /** Check the current image's Exif Orientation information (default: true) */
  checkOrientation?: boolean;
  
  /** Show the black modal above the image and under the crop box (default: true) */
  modal?: boolean;
  
  /** Show the dashed lines above the crop box (default: true) */
  guides?: boolean;
  
  /** Show the center indicator above the crop box (default: true) */
  center?: boolean;
  
  /** Show the white modal above the crop box (default: true) */
  highlight?: boolean;
  
  /** Show the grid background of the container (default: true) */
  background?: boolean;
  
  /** Enable to crop the image automatically when initialized (default: true) */
  autoCrop?: boolean;
  
  /** Define the percentage of automatic cropping area when initializing (default: 0.8) */
  autoCropArea?: number;
  
  /** Enable to move the image (default: true) */
  movable?: boolean;
  
  /** Enable to rotate the image (default: true) */
  rotatable?: boolean;
  
  /** Enable to scale the image (default: true) */
  scalable?: boolean;
  
  /** Enable to zoom the image (default: true) */
  zoomable?: boolean;
  
  /** Enable to zoom the image by dragging touch (default: true) */
  zoomOnTouch?: boolean;
  
  /** Enable to zoom the image by mouse wheeling (default: true) */
  zoomOnWheel?: boolean;
  
  /** Define zoom ratio when zooming the image by mouse wheeling (default: 0.1) */
  wheelZoomRatio?: number;
  
  /** Enable to move the crop box by dragging (default: true) */
  cropBoxMovable?: boolean;
  
  /** Enable to resize the crop box by dragging (default: true) */
  cropBoxResizable?: boolean;
  
  /** Enable to toggle drag mode between "crop" and "move" (default: true) */
  toggleDragModeOnDblclick?: boolean;
  
  /** Define the minimum width of the canvas (default: 0) */
  minCanvasWidth?: number;
  
  /** Define the minimum height of the canvas (default: 0) */
  minCanvasHeight?: number;
  
  /** Define the minimum width of the crop box (default: 0) */
  minCropBoxWidth?: number;
  
  /** Define the minimum height of the crop box (default: 0) */
  minCropBoxHeight?: number;
  
  /** Define the minimum width of the container (default: 200) */
  minContainerWidth?: number;
  
  /** Define the minimum height of the container (default: 100) */
  minContainerHeight?: number;
  
  /** Event handler for ready event */
  ready?: (event: CustomEvent) => void;
  
  /** Event handler for cropstart event */
  cropstart?: (event: CustomEvent<CropperEventDetail>) => void;
  
  /** Event handler for cropmove event */
  cropmove?: (event: CustomEvent<CropperEventDetail>) => void;
  
  /** Event handler for cropend event */
  cropend?: (event: CustomEvent<CropperEventDetail>) => void;
  
  /** Event handler for crop event */
  crop?: (event: CustomEvent<CroppedData>) => void;
  
  /** Event handler for zoom event */
  zoom?: (event: CustomEvent<ZoomEventDetail>) => void;
}

/**
 * Cropper.js - A simple jQuery image cropping plugin
 */
declare class Cropper {
  /**
   * Create a new Cropper instance
   * @param element - The target image or canvas element
   * @param options - The cropper options
   */
  constructor(element: HTMLImageElement | HTMLCanvasElement, options?: CropperOptions);

  /** Indicate if the cropper has been initialized */
  ready: boolean;

  /** Indicate if the crop box is currently being cropped */
  cropping: boolean;

  /** Indicate if the cropper is disabled */
  disabled: boolean;

  /** The cropped state */
  cropped: boolean;

  /**
   * Show the crop box manually
   */
  crop(): Cropper;

  /**
   * Reset the image and crop box to their initial states
   */
  reset(): Cropper;

  /**
   * Clear the crop box
   */
  clear(): Cropper;

  /**
   * Replace the image's src and rebuild the cropper
   * @param url - The new URL
   * @param hasSameSize - If the new image has the same size as the old one
   */
  replace(url: string, hasSameSize?: boolean): Cropper;

  /**
   * Enable (unfreeze) the cropper
   */
  enable(): Cropper;

  /**
   * Disable (freeze) the cropper
   */
  disable(): Cropper;

  /**
   * Destroy the cropper and remove the instance from the image
   */
  destroy(): Cropper;

  /**
   * Move the canvas with relative offsets
   * @param offsetX - Moving size (px) in the horizontal direction
   * @param offsetY - Moving size (px) in the vertical direction
   */
  move(offsetX: number, offsetY?: number): Cropper;

  /**
   * Move the canvas to an absolute point
   * @param x - The left value of the canvas
   * @param y - The top value of the canvas
   */
  moveTo(x: number, y?: number): Cropper;

  /**
   * Zoom the canvas with a relative ratio
   * @param ratio - Zoom in: requires a positive number; Zoom out: requires a negative number
   * @param pivot - The coordinate of the center point for zooming
   */
  zoom(ratio: number, pivot?: { x: number; y: number }): Cropper;

  /**
   * Zoom the canvas to an absolute ratio
   * @param ratio - Requires a positive number
   * @param pivot - The coordinate of the center point for zooming
   * @param originalEvent - The original event if any
   */
  zoomTo(ratio: number, pivot?: { x: number; y: number }, originalEvent?: Event): Cropper;

  /**
   * Rotate the image with a relative degree
   * @param degree - Rotate right: requires a positive number; Rotate left: requires a negative number
   */
  rotate(degree: number): Cropper;

  /**
   * Rotate the image to an absolute degree
   * @param degree - The rotation degree
   */
  rotateTo(degree: number): Cropper;

  /**
   * Scale the image on the x-axis
   * @param scaleX - The scaling factor (default: 1)
   */
  scaleX(scaleX: number): Cropper;

  /**
   * Scale the image on the y-axis
   * @param scaleY - The scaling factor (default: 1)
   */
  scaleY(scaleY: number): Cropper;

  /**
   * Scale the image
   * @param scaleX - The scaling factor on the x-axis
   * @param scaleY - The scaling factor on the y-axis
   */
  scale(scaleX: number, scaleY?: number): Cropper;

  /**
   * Get the cropped area position and size data (based on the original image)
   * @param rounded - Round the data values (default: false)
   */
  getData(rounded?: boolean): CroppedData;

  /**
   * Set the cropped area position and size with new data
   * @param data - The new crop data
   */
  setData(data: SetDataOptions): Cropper;

  /**
   * Get the container size data
   */
  getContainerData(): ContainerData;

  /**
   * Get the image position and size data
   */
  getImageData(): ImageData;

  /**
   * Get the canvas position and size data
   */
  getCanvasData(): CanvasData;

  /**
   * Set the canvas position and size with new data
   * @param data - The new canvas data
   */
  setCanvasData(data: Partial<CanvasData>): Cropper;

  /**
   * Get the crop box position and size data
   */
  getCropBoxData(): CropBoxData;

  /**
   * Set the crop box position and size with new data
   * @param data - The new crop box data
   */
  setCropBoxData(data: Partial<CropBoxData>): Cropper;

  /**
   * Get a canvas drawn from the cropped image
   * @param options - The config options
   */
  getCroppedCanvas(options?: GetCroppedCanvasOptions): HTMLCanvasElement | null;

  /**
   * Change the aspect ratio of the crop box
   * @param aspectRatio - The new aspect ratio
   */
  setAspectRatio(aspectRatio: number): Cropper;

  /**
   * Change the drag mode
   * @param mode - The new drag mode
   */
  setDragMode(mode: DragMode): Cropper;

  /**
   * Return to the previous Cropper if there was one
   */
  static noConflict(): typeof Cropper;

  /**
   * Change the default options
   * @param options - The new default options
   */
  static setDefaults(options: CropperOptions): void;
}

export default Cropper;
export {
  Cropper,
  CropperOptions,
  ViewMode,
  DragMode,
  CropperAction,
  ImageData,
  CanvasData,
  CropBoxData,
  ContainerData,
  CroppedData,
  SetDataOptions,
  GetCroppedCanvasOptions,
  CropperEventDetail,
  ZoomEventDetail,
};