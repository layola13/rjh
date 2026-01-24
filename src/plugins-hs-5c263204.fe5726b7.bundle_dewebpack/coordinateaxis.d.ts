import type { Node, Vector3 } from './Node';
import type { SignalHook } from './SignalHook';
import type { Entity, Group } from './Entity';
import type { Camera, CameraTypeEnum } from './Camera';
import type { ActiveContext } from './ActiveContext';
import type { CommandManager } from './CommandManager';
import type { Gizmo } from './Gizmo';

/**
 * Rotation angles for each axis of the coordinate system
 */
interface GizmoRotation {
  /** X-axis rotation in radians */
  x: number;
  /** Y-axis rotation in radians */
  y: number;
  /** Z-axis rotation in radians */
  z: number;
}

/**
 * 3D position coordinates
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Material configuration options for gizmo lines
 */
interface GizmoLineMaterialOptions {
  /** Polygon offset factor for depth rendering */
  polygonOffsetFactor: number;
}

/**
 * CoordinateAxis - A visual gizmo that displays X, Y, Z coordinate axes
 * for selected 3D entities in the scene. The axes automatically hide/show
 * based on camera movement, entity visibility, and active command state.
 * 
 * @extends Gizmo
 */
export class CoordinateAxis extends Gizmo {
  /** Root node containing all axis line meshes */
  node: Node | null;
  
  /** X-axis line mesh (red, color: 0xF7483C) */
  lineX: Node;
  
  /** Y-axis line mesh (green, color: 0x327E9F) */
  lineY: Node;
  
  /** Z-axis line mesh (blue, color: 0x50C418) */
  lineZ: Node;
  
  /** Active context for tracking selection state */
  activeContext: ActiveContext;
  
  /** Signal hook manager for event subscriptions */
  signalHook: SignalHook;
  
  /** Flag indicating if axis is hidden due to camera movement */
  private _hideFromCameraChanging: boolean;

  /**
   * Creates a new CoordinateAxis gizmo
   * 
   * @param entity - The 3D entity to attach the coordinate axis to
   * @param layer - The rendering layer to add this gizmo to
   * @param context - The rendering context
   * @param activeContext - Context for tracking active/selected state
   */
  constructor(
    entity: Entity,
    layer: unknown,
    context: unknown,
    activeContext: ActiveContext
  ) {
    super(entity, layer, context);
    this.init();
    this.activeContext = activeContext;
    
    // Subscribe to entity and application events
    this.signalHook.listen(this.entity.signalFieldChanged, this.hide);
    this.signalHook.listen(this.entity.signalDirty, this.hide);
    this.signalHook.listen(
      HSApp.App.getApp().cmdManager.signalCommandTerminated,
      this.show
    );
    this.signalHook.listen(
      this.activeContext.signalChange,
      this._onActiveChange
    );
    this.signalHook.listen(
      HSApp.App.getApp().signalCameraChangeStart,
      this._onCameraChangeStart
    );
    this.signalHook.listen(
      HSApp.App.getApp().signalCameraChangeEnd,
      this._onCameraChangeEnd
    );
  }

  /**
   * Called when camera movement starts - hides the axis during camera transitions
   * @private
   */
  private _onCameraChangeStart(): void {
    this.setHideFromCameraChanging(true);
  }

  /**
   * Called when camera movement ends - shows the axis after camera transitions
   * @private
   */
  private _onCameraChangeEnd(): void {
    this.setHideFromCameraChanging(false);
  }

  /**
   * Controls axis visibility during camera changes
   * 
   * @param shouldHide - True to hide axis during camera movement, false to show
   */
  setHideFromCameraChanging(shouldHide: boolean): void {
    if (this._hideFromCameraChanging !== shouldHide) {
      this.node?.setVisible(!shouldHide);
      this.context.needsRendering = true;
    }
  }

  /**
   * Shows the coordinate axis if conditions allow, otherwise hides it
   */
  show(): void {
    if (this.canShow()) {
      super.show();
    } else {
      this.hide();
    }
  }

  /**
   * Determines if the coordinate axis should be visible based on:
   * - Entity or its children visibility in the display list
   * - Current command type (hidden during SmartReplaceContent)
   * 
   * @returns True if axis can be shown, false otherwise
   */
  canShow(): boolean {
    const app = HSApp.App.getApp();
    const displayItem = app.getActive3DView().displayList[this.entity.id];
    let isVisible = displayItem?.node?.getVisible() ?? false;
    
    const isValidCommand =
      app.cmdManager.current?.type !== HSFPConstants.CommandType.SmartReplaceContent;

    // Check visibility of child entities for Group types
    if (this.entity instanceof HSCore.Model.Group) {
      HSCore.Util.Entity.traverseApplyFuncForEntity(
        this.entity,
        (childEntity: Entity) => {
          const childDisplayItem = app.getActive3DView().displayList[childEntity.id];
          isVisible = isVisible || (childDisplayItem?.node?.getVisible() ?? false);
        }
      );
    }

    return isVisible && !isValidCommand;
  }

  /**
   * Handles changes to active context (selection state)
   * - Hides axis when entity becomes active (selected)
   * - Shows axis when entity becomes inactive
   * 
   * @param isActive - Whether the entity is now active/selected
   * @private
   */
  private _onActiveChange(isActive: boolean): void {
    this.node?.setVisible(!this.activeContext.active);
    this.context.needsRendering = true;
  }

  /**
   * Initializes the coordinate axis geometry and materials
   * Creates three colored lines for X (red), Y (green), Z (blue) axes
   */
  init(): void {
    this.node = new Node();
    
    const origin: Position3D = { x: 0, y: 0, z: 0 };
    
    // X-axis (red: 0xF7483C)
    const materialX = this._createGizmoLineMaterial(0xF7483C, 2, {
      polygonOffsetFactor: -2
    });
    this.lineX = this._createLine(origin, { x: 0.5, y: 0, z: 0 }, materialX);
    this.node.addChild(this.lineX);

    // Y-axis (green: 0x327E9F)
    const materialY = this._createGizmoLineMaterial(0x327E9F, 2, {
      polygonOffsetFactor: -2
    });
    this.lineY = this._createLine(origin, { x: 0, y: 0.5, z: 0 }, materialY);
    this.node.addChild(this.lineY);

    // Z-axis (blue: 0x50C418)
    const materialZ = this._createGizmoLineMaterial(0x50C418, 2, {
      polygonOffsetFactor: -2
    });
    this.lineZ = this._createLine(origin, { x: 0, y: 0, z: 0.5 }, materialZ);
    this.node.addChild(this.lineZ);

    this.layer.addChild(this);
  }

  /**
   * Creates a line mesh between two points
   * 
   * @param start - Starting position of the line
   * @param end - Ending position of the line
   * @param material - Material to apply to the line mesh
   * @returns Node containing the line mesh
   * @private
   */
  private _createLine(start: Position3D, end: Position3D, material: unknown): Node {
    const positions: number[] = [];
    [start, end].forEach((pos) => {
      positions.push(...Object.values(pos));
    });
    
    return T3Dx.Three2T3d.createMeshNode(
      T3Dx.Line2Mesh.setFromPositions(positions, [], 'CoordinateAxis'),
      material
    );
  }

  /**
   * Helper method to create gizmo line material
   * @private
   */
  private _createGizmoLineMaterial(
    color: number,
    lineWidth: number,
    options: GizmoLineMaterialOptions
  ): unknown {
    return (window as any).HSApp.View.T3d.Util.createGizmoLineMaterial(
      color,
      lineWidth,
      options
    );
  }

  /**
   * Updates the coordinate axis position, rotation, and scale based on camera view
   * Called during rendering loop to keep axis synchronized with entity and camera
   */
  draw(): void {
    if (!this.canShow()) {
      this.node?.setVisible(false);
      return;
    }

    this.node?.setVisible(this.visible);

    const camera = HSApp.App.getApp().floorplan.active_camera;
    const rotation = this.getGizmoRotation(camera);

    // Apply rotations to each axis line
    this.lineX.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(
        new THREE.Euler(0, 0, rotation.x)
      )
    );
    this.lineY.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(
        new THREE.Euler(0, 0, rotation.y)
      )
    );
    this.lineZ.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(
        new THREE.Euler(rotation.z, 0, 0)
      )
    );

    // Position at entity location with layer altitude offset
    const position = this.contentPosition;
    let altitude = position.z;
    const parentEntity = this.entity.getUniqueParent();
    altitude += HSApp.App.getApp().floorplan.scene.getLayerAltitude(parentEntity);
    
    this.node?.setTranslation(new Vector3(position.x, altitude, -position.y));

    // Scale based on camera distance and type
    const scale = this._getGizmoScale(camera, this.entity);
    this.node?.setScale(scale);
  }

  /**
   * Calculates rotation angles to keep axis lines facing the camera
   * Each axis flips 180° when viewed from behind to maintain visibility
   * 
   * @param camera - The active camera
   * @returns Rotation angles for x, y, z axes in radians
   */
  getGizmoRotation(camera: Camera): GizmoRotation {
    const position = this.contentPosition;
    const TWO_PI = 2 * Math.PI;

    // X-axis rotation (based on XY plane view angle)
    const upVector = new THREE.Vector3(0, 1, 0);
    const xyVector = new THREE.Vector3(
      position.x - camera.x,
      position.y - camera.y,
      0
    );
    const xyAngle = GeLib.VectorUtils.angleToIn2PI(
      upVector,
      xyVector,
      new THREE.Vector3(0, 0, -1)
    );

    // Z-axis rotation (based on YZ plane view angle)
    const forwardVector = new THREE.Vector3(0, 0, 1);
    const yzVector = new THREE.Vector3(
      0,
      position.y - camera.y,
      position.z - camera.z
    );
    const yzAngle = GeLib.VectorUtils.angleToIn2PI(
      forwardVector,
      yzVector,
      new THREE.Vector3(1, 0, 0)
    );

    // Y-axis rotation (based on XZ plane view angle)
    const rightVector = new THREE.Vector3(1, 0, 0);
    const xzVector = new THREE.Vector3(
      position.x - camera.x,
      0,
      position.z - camera.z
    );
    const xzAngle = GeLib.VectorUtils.angleToIn2PI(
      rightVector,
      xzVector,
      new THREE.Vector3(0, -1, 0)
    );

    return {
      x: Math.abs(xyAngle % TWO_PI) > Math.PI ? 0 : Math.PI,
      y: Math.abs(xzAngle % TWO_PI) > Math.PI ? 0 : Math.PI,
      z: Math.abs(yzAngle % TWO_PI) > Math.PI ? 0 : Math.PI
    };
  }

  /**
   * Calculates appropriate scale for the gizmo based on camera type and distance
   * Ensures consistent visual size regardless of camera distance
   * 
   * @param camera - The active camera
   * @param entity - The entity being visualized
   * @returns Scale vector to apply to the gizmo
   * @private
   */
  private _getGizmoScale(camera: Camera, entity: Entity): Vector3 {
    const position = this.contentPosition;
    const distance = new Vector3(position.x, position.y, position.z).distance(
      new Vector3(camera.x, camera.y, camera.z)
    );

    const ROTATION_INDICATOR_SIZE =
      HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE;

    let scale: Vector3;

    if (camera.type === HSCore.Model.CameraTypeEnum.FirstPerson) {
      scale = new Vector3(1, 1, 1).scaleInPlace(distance * ROTATION_INDICATOR_SIZE / 5);
    } else if (camera.type === HSCore.Model.CameraTypeEnum.OrbitView) {
      scale = new Vector3(1, 1, 1).scaleInPlace(distance * ROTATION_INDICATOR_SIZE / 10);
    } else if (camera.type === HSCore.Model.CameraTypeEnum.OrthView) {
      scale = new Vector3(1, 1, 1).scaleInPlace(ROTATION_INDICATOR_SIZE);
    }

    return scale!;
  }

  /**
   * Cleanup method called when gizmo is destroyed
   * Removes nodes, disposes signal hooks, and cleans up geometry
   */
  onCleanup(): void {
    this.hide();
    this.layer.removeChild(this);
    this.signalHook.dispose();
    this.signalHook = undefined!;
    
    if (this.node) {
      HSApp.View.T3d.Util.cleanupMeshGeometry(this.node);
      this.node = null;
    }
    
    super.onCleanup();
  }

  /**
   * Gets the 3D position of the associated entity
   * @returns Position in world coordinates
   */
  get contentPosition(): Position3D {
    return new THREE.Vector3(this.entity.x, this.entity.y, this.entity.z);
  }
}