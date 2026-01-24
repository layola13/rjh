import { Scene, Engine, Canvas, ArcRotateCamera, Vector3, Viewport, HemisphericLight, StandardMaterial, Texture, Color3, Color4, MeshBuilder, PointerEventTypes, PickingInfo, Mesh, Material } from 'babylonjs';

/**
 * Configuration options for initializing HelperScene
 */
export interface HelperSceneConfig {
  /** Main Babylon.js engine instance */
  engine: Engine;
  /** HTML canvas element for rendering */
  canvas: HTMLCanvasElement;
}

/**
 * Axis face configuration for the helper scene
 */
export interface AxisFace {
  /** Unique identifier name for the face */
  name: string;
  /** Alpha rotation angle in radians */
  alpha: number;
  /** Beta rotation angle in radians */
  beta: number;
  /** Texture URL for the face (optional) */
  url?: string;
  /** Position vector for the face */
  pos: Vector3;
  /** Uniform size (if cube) */
  size?: number;
  /** Width dimension */
  width?: number;
  /** Height dimension */
  height?: number;
  /** Depth dimension */
  depth?: number;
  /** Whether the face is clickable */
  clickable: boolean;
  /** Associated mesh object */
  mesh?: Mesh;
}

/**
 * Enumeration of predefined camera positions for axis helper
 */
export enum AxisHelperCameraPos {
  /** Center position (default) */
  CenterCenterCenter = 'CenterCenterCenter',
  /** Front view */
  Front = 'front',
  /** Back view */
  Back = 'back',
  /** Left view */
  Left = 'left',
  /** Right view */
  Right = 'right',
  /** Top view */
  Top = 'top',
  /** Bottom view */
  Bottom = 'bottom'
}

/**
 * Helper scene for displaying 3D axis navigation widget.
 * Provides an interactive mini-viewport with axis orientation controls.
 */
export declare class HelperScene {
  /** Main rendering engine reference */
  private mainEngine: Engine;
  
  /** Main canvas element reference */
  private mainCanvas: HTMLCanvasElement;
  
  /** Dedicated scene for the helper widget */
  private scene: Scene;
  
  /** Camera for the helper scene viewport */
  private camera: ArcRotateCamera;
  
  /** Reference to the main scene camera */
  private mainCamera: ArcRotateCamera;

  /**
   * Creates a new HelperScene instance
   * @param config - Configuration object containing engine and canvas
   */
  constructor(config: HelperSceneConfig);

  /**
   * Initializes the helper scene with main camera reference
   * @param mainCamera - The main scene's camera to synchronize with
   */
  Init(mainCamera: ArcRotateCamera): void;

  /**
   * Renders the helper scene (called in render loop)
   */
  DoRender(): void;

  /**
   * Animates camera to a predefined position
   * @param position - Target camera position identifier
   */
  DoCameraPos(position: AxisHelperCameraPos | string): void;

  /**
   * Initializes the helper camera and creates axis visualization meshes
   * @private
   */
  private InitCamera(): void;

  /**
   * Sets up mouse hover listeners for axis face highlighting
   * @private
   */
  private DoLinsten(): void;

  /**
   * Registers click event handlers for axis face interactions
   * @private
   */
  private DoClickEvent(): void;
}