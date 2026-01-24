import type { Vector2, Loop } from './geometry';
import type { WallMode } from './model';
import type { DrawPolygonRoomSnapHelper } from './snap-helper';
import type { PathItem } from './svg-elements';
import type { Layer, Document } from './document';
import type { Command } from './command';

/**
 * Gizmo for creating polygon-based tangent walls in the editor.
 * Handles wall path creation, snapping, rotation, and preview rendering.
 */
export declare class CreatePolygonTgWallGizmo extends HSApp.View.SVG.Temp {
  /**
   * Current mouse position in model coordinates
   * @private
   */
  private _pos: Vector2 | undefined;

  /**
   * Helper utility for snapping wall geometry to existing elements
   * @private
   */
  private _snapHelper: DrawPolygonRoomSnapHelper | undefined;

  /**
   * Active layer where the wall will be created
   * @private
   */
  private _layer: Layer | undefined;

  /**
   * Current rotation angle in radians for the wall path
   * @private
   */
  private _rotation: number;

  /**
   * SVG path element representing the wall preview
   * @private
   */
  private _roomItem: PathItem | undefined;

  /**
   * Cached wall path vertices after rotation transformation
   * @private
   */
  private _wallPath: Vector2[] | undefined;

  /**
   * Offset applied to mouse position for wall placement
   * @private
   */
  private _mouseOffset: Vector2 | undefined;

  /**
   * Gets the wall mode setting from the command (Inner/Middle/Outer)
   * @private
   */
  private get _wallMode(): WallMode;

  /**
   * Gets the wall thickness setting from the command
   * @private
   */
  private get _wallWidth(): number;

  /**
   * Calculates the total offset by combining mouse position and fixed offset
   * @private
   */
  private get _offset(): Vector2;

  /**
   * Creates a new polygon tangent wall gizmo
   * @param editor - The editor context
   * @param layer - The target layer
   * @param command - The command instance controlling this gizmo
   */
  constructor(editor: unknown, layer: Layer, command: Command);

  /**
   * Retrieves the wall path vertices, optionally applying rotation
   * @param applyRotation - If true, returns the original unrotated polygon from command
   * @returns Array of vertices defining the wall path
   */
  getWallPath(applyRotation?: boolean): Vector2[];

  /**
   * Updates the snap helper with current wall and outdoor path data
   * @private
   */
  private _updateSnapHelper(): void;

  /**
   * Initializes the visual elements for the gizmo
   */
  initElements(): void;

  /**
   * Generates wall curves adjusted for the specified wall mode
   * @param mode - Target wall mode (Inner/Middle/Outer)
   * @param useOriginal - If true, uses the original polygon without rotation
   * @returns Array of offset curve vertices based on wall width and mode
   */
  getModeCurves(mode: WallMode, useOriginal?: boolean): Vector2[];

  /**
   * Creates the SVG path element representing inner and outer wall boundaries
   * @private
   */
  private createWallPathElement(): void;

  /**
   * Called when wall settings (width, mode) change to rebuild the preview
   */
  onWallSettingChanged(): void;

  /**
   * Render callback to update the wall preview
   */
  onDraw(): void;

  /**
   * Updates the visual preview path with current position and rotation
   * @private
   */
  private _updatePreviewPath(): void;

  /**
   * Handles mouse move events for wall positioning and snapping
   * @param event - Mouse event
   * @param screenX - Screen X coordinate
   * @param screenY - Screen Y coordinate
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * Handles mouse down events to place the wall or cancel operation
   * @param event - Mouse event (right-click cancels)
   */
  onMouseDown(event: MouseEvent): void;

  /**
   * Rotates the wall path by 90 degrees counter-clockwise
   */
  rotate(): void;

  /**
   * Handles ESC key press to cancel the gizmo operation
   */
  onESC(): void;

  /**
   * Cleanup callback to dispose resources and unregister hotkeys
   */
  onCleanup(): void;
}