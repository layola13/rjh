import { ContentDisplay3D } from './contentDisplay3D';
import { TouchHolographicButton } from './touchHolographicButton';
import { AdvancedDynamicTexture } from '../../2D/advancedDynamicTexture';
import { Control } from '../../2D/controls/control';
import { TextBlock, TextWrapping } from '../../2D/controls/textBlock';
import { DefaultBehavior } from '../behaviors/defaultBehavior';
import { SlateGizmo } from '../gizmos/slateGizmo';
import { FluentMaterial } from '../materials/fluent/fluentMaterial';
import { FluentBackplateMaterial } from '../materials/fluentBackplate/fluentBackplateMaterial';
import {
  Observable,
  Vector2,
  Vector3,
  Vector4,
  Viewport,
  Mesh,
  Scene,
  CreateBox,
  CreatePlane,
  VertexData,
  Quaternion,
  Scalar,
  PointerDragBehavior,
  Observer,
  Epsilon
} from '@babylonjs/core';

/**
 * Represents a holographic slate control with title bar, content area, and interactive buttons.
 * Provides a 3D UI surface for displaying content with drag, follow, and close capabilities.
 */
export declare class HolographicSlate extends ContentDisplay3D {
  /**
   * Base URL for slate UI assets (icons, textures).
   */
  static readonly ASSETS_BASE_URL: string;

  /**
   * Filename for the close button icon.
   */
  static readonly CLOSE_ICON_FILENAME: string;

  /**
   * Filename for the follow button icon.
   */
  static readonly FOLLOW_ICON_FILENAME: string;

  /**
   * Default text resolution height in pixels.
   * @internal
   */
  private static readonly _DEFAULT_TEXT_RESOLUTION_Y: number;

  /**
   * Margin between title bar and content area in world units.
   */
  titleBarMargin: number;

  /**
   * Origin point of the slate in local space.
   */
  origin: Vector3;

  /**
   * Minimum allowed dimensions for the slate.
   */
  minDimensions: Vector2;

  /**
   * Default dimensions used when resetting the slate.
   */
  defaultDimensions: Vector2;

  /**
   * Gets the default behavior controller for the slate.
   * Manages drag, follow, and interaction behaviors.
   */
  get defaultBehavior(): DefaultBehavior;

  /**
   * Gets or sets the dimensions of the slate (width, height).
   * Automatically enforces minimum dimensions and updates layout.
   */
  get dimensions(): Vector2;
  set dimensions(value: Vector2);

  /**
   * Gets or sets the height of the title bar in world units.
   */
  get titleBarHeight(): number;
  set titleBarHeight(value: number);

  /**
   * Gets or sets the rendering group ID for all slate meshes.
   * Controls rendering order relative to other scene objects.
   */
  get renderingGroupId(): number;
  set renderingGroupId(value: number);

  /**
   * Gets or sets the title text displayed in the title bar.
   */
  get title(): string;
  set title(value: string);

  /**
   * @internal
   * Internal dimensions storage.
   */
  private _dimensions: Vector2;

  /**
   * @internal
   * Internal title bar height storage.
   */
  private _titleBarHeight: number;

  /**
   * @internal
   * Internal title text storage.
   */
  private _titleText: string;

  /**
   * @internal
   * Content zoom/scale ratio.
   */
  private _contentScaleRatio: number;

  /**
   * @internal
   * Button to toggle follow behavior.
   */
  private _followButton: TouchHolographicButton;

  /**
   * @internal
   * Button to close/dispose the slate.
   */
  private _closeButton: TouchHolographicButton;

  /**
   * @internal
   * Viewport defining visible content region (normalized coordinates).
   */
  private _contentViewport: Viewport;

  /**
   * @internal
   * Drag behavior for panning content within the slate.
   */
  private _contentDragBehavior: PointerDragBehavior;

  /**
   * @internal
   * Material for the title bar.
   */
  private _titleBarMaterial: FluentBackplateMaterial;

  /**
   * @internal
   * Material for the content display surface.
   */
  private _contentMaterial: FluentMaterial;

  /**
   * @internal
   * Material for the back plate.
   */
  private _backMaterial: FluentBackplateMaterial;

  /**
   * @internal
   * Mesh representing the title bar.
   */
  private _titleBar: Mesh;

  /**
   * @internal
   * Mesh plane for rendering title text.
   */
  private _titleBarTitle: Mesh;

  /**
   * @internal
   * Text block component for title text.
   */
  private _titleTextComponent: TextBlock;

  /**
   * @internal
   * Mesh plane for rendering content.
   */
  private _contentPlate: Mesh;

  /**
   * @internal
   * Mesh plane for back plate rendering.
   */
  private _backPlate: Mesh;

  /**
   * @internal
   * Default behavior controller instance.
   */
  private _defaultBehavior: DefaultBehavior;

  /**
   * @internal
   * Gizmo for visualizing and manipulating slate bounds.
   */
  private _gizmo: SlateGizmo;

  /**
   * @internal
   * Observer for picked point changes.
   */
  private _pickedPointObserver: Observer<Vector3> | null;

  /**
   * @internal
   * Observer for position changes during drag.
   */
  private _positionChangedObserver: Observer<unknown> | null;

  /**
   * Creates a new HolographicSlate instance.
   * @param name - Unique name for the slate control.
   */
  constructor(name: string);

  /**
   * Applies a texture facade to the content material.
   * @param texture - The texture to display on the content plate.
   * @internal
   */
  protected _applyFacade(texture: unknown): void;

  /**
   * Adds a control to the slate's host and prepares it for rendering.
   * @param control - The 3D control to add.
   * @internal
   */
  protected _addControl(control: unknown): void;

  /**
   * Gets the type name of this control.
   * @returns "HolographicSlate"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * Positions and scales all slate elements based on current dimensions.
   * Updates title bar, buttons, content plate, and back plate.
   * @internal
   */
  protected _positionElements(): void;

  /**
   * Applies the current content viewport to the content material's texture.
   * Updates UV scaling and offset for pan/zoom.
   * @internal
   */
  protected _applyContentViewport(): void;

  /**
   * Resets content pan and zoom to default state (centered, no zoom).
   * @internal
   */
  protected _resetContentPositionAndZoom(): void;

  /**
   * Updates the pivot point of the slate mesh based on current dimensions.
   * @internal
   */
  protected _updatePivot(): void;

  /**
   * Creates and initializes all mesh nodes for the slate.
   * @param scene - The scene to create nodes in.
   * @returns The root mesh node.
   * @internal
   */
  protected _createNode(scene: Scene): Mesh;

  /**
   * Attaches drag behavior to the content plate for panning.
   * @internal
   */
  protected _attachContentPlateBehavior(): void;

  /**
   * Assigns materials to all slate meshes.
   * @param mesh - The root mesh (unused in current implementation).
   * @internal
   */
  protected _affectMaterial(mesh: Mesh): void;

  /**
   * Prepares the slate node for rendering and attaches behaviors.
   * @param scene - The scene to prepare the node in.
   * @internal
   */
  protected _prepareNode(scene: Scene): void;

  /**
   * Resets the slate to default size and positions it in front of the active camera.
   * @param resetDimensions - Whether to reset dimensions to default. Default is true.
   */
  resetDefaultAspectAndPose(resetDimensions?: boolean): void;

  /**
   * Disposes of the slate and all associated resources.
   * Cleans up materials, meshes, behaviors, gizmos, and observers.
   */
  dispose(): void;
}