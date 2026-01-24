/**
 * Content part material replacement environment for 3D model styling
 * Handles material selection and replacement on 3D model parts
 */

import { HSCore } from 'hscore';
import { HSApp } from 'hsapp';

/**
 * Configuration options for ContentPartMaterialReplaceEnvironment
 */
interface ContentPartMaterialReplaceConfig {
  /** Application instance */
  app: HSApp.App;
  /** Handler for material replacement operations */
  handler: IMaterialReplaceHandler;
}

/**
 * Handler interface for material replacement operations
 */
interface IMaterialReplaceHandler {
  /** Retrieves the list of product orders */
  getProductOrderList(): Promise<void>;
  
  /** Gets the IDs of content parts that can be styled */
  getContentPartIds(): string[];
  
  /** Gets the currently selected entity */
  getSelectedEntity(): HSCore.Model.Entity | undefined;
  
  /** Changes the currently selected part */
  changeSelectPart(meshName: string | undefined): void;
  
  /** Gets the name of the currently selected mesh */
  getSelectMeshName(): string | undefined;
  
  /** Retrieves the material list for the selected part */
  getMaterialList(options: Record<string, unknown>): void;
}

/**
 * UI controller for the material styler interface
 */
interface IStylerUI {
  /** Sets the currently selected entity in the UI */
  setSelectedEntity(entity: HSCore.Model.Entity | undefined): void;
  
  /** Enters the styler mode UI */
  enterStyler(): void;
  
  /** Exits the styler mode UI */
  exitStyler(): void;
}

/**
 * Options passed when deactivating the environment
 */
interface DeactivateOptions {
  /** Whether the document is being closed */
  closingDocument?: boolean;
}

/**
 * Mouse click event data
 */
interface MouseClickEvent {
  /** Results from raycasting/picking in the 3D scene */
  pickResults: unknown[];
}

/**
 * Environment for replacing materials on content part meshes in 3D view.
 * Provides an auxiliary canvas for isolated part viewing and material selection.
 */
export default class ContentPartMaterialReplaceEnvironment extends HSApp.Environment.CommonEnvironment {
  /** Main application instance */
  private app: HSApp.App;
  
  /** Camera for the auxiliary 3D view */
  private camera?: HSCore.Model.Camera;
  
  /** Transaction session for undo/redo support */
  private session?: HSApp.TransactionSession;
  
  /** Auxiliary canvas for isolated 3D rendering */
  private auxCanvas?: HSApp.View3D;
  
  /** Gizmo manager for transform controls */
  private gizmoManager?: HSApp.GizmoManager;
  
  /** Handler for material replacement logic */
  private handler: IMaterialReplaceHandler;
  
  /** The entity being styled */
  private selectedEntity?: HSCore.Model.Entity;
  
  /** Whether we entered from 3D view mode (vs 2D) */
  private from3DViewMode: boolean = false;
  
  /** UI controller instance */
  private ui: IStylerUI;
  
  /** List of mesh names that can be styled */
  private meshNames: string[] = [];

  constructor(config: ContentPartMaterialReplaceConfig) {
    super(config.app);
    
    this.app = config.app;
    this.handler = config.handler;
    this.ui = new StylerUI(config);
    this.disableHotkey();
  }

  /**
   * Called when this environment becomes active.
   * Initializes camera, canvas, and loads product data.
   */
  onActivate(): void {
    this.handler.getProductOrderList().then(() => {
      this.meshNames = this.handler.getContentPartIds();
      this.setCanHighlightMeshes();
      this.needSetDefaultMeshName();
    });

    this.selectedEntity = this.handler.getSelectedEntity();
    this.ui.setSelectedEntity(this.selectedEntity);
    this.ui.enterStyler();
    this.updateCamera();
    this.buildCanvas();
    this.startSession();
  }

  /**
   * Sets up the auxiliary 3D canvas for isolated part viewing.
   * Configures visibility to show only the selected entity and its hierarchy.
   */
  private buildCanvas(): void {
    this.from3DViewMode = this.app.is3DViewActive();
    
    if (!this.from3DViewMode) {
      this.app.switchTo3DView();
    }
    
    this.setGizmoValidator();
    this.app.switchToAuxView();
    this.auxCanvas = this.app.getAux3DView();
    this.auxCanvas.onSizeChange();

    const visibleEntities = new Set<HSCore.Model.Entity>();
    
    if (this.selectedEntity) {
      visibleEntities.add(this.selectedEntity);
      
      // Add all group members if selected entity is a group
      if (this.selectedEntity instanceof HSCore.Model.Group) {
        this.selectedEntity.toFlatMemberList(true).forEach((member) => {
          visibleEntities.add(member);
        });
        
        this.selectedEntity.toFlatGroupList().forEach((group) => {
          visibleEntities.add(group);
        });
      }
      
      visibleEntities.add(this.selectedEntity.getUniqueParent());
    }

    this.auxCanvas.context.environmentId = HSFPConstants.Environment.ContentPartMaterialReplace;
    this.auxCanvas.setupCanvas({
      canCreateEntity: (entity: HSCore.Model.Entity) => visibleEntities.has(entity),
      camera: this.camera
    });
  }

  /**
   * Called when this environment is being deactivated.
   * Restores previous view state and commits or discards changes.
   * 
   * @param options - Deactivation options
   */
  onDeactivate(options?: DeactivateOptions): void {
    this.ui.exitStyler();
    this.app.switchToMainView();
    
    if (!this.from3DViewMode) {
      this.app.switchTo2DView();
      this.app.getActive2DView().onResized();
    }
    
    if (!options?.closingDocument) {
      this.endSession();
    }
    
    this.resetData();
  }

  /**
   * Resets internal state and clears selections
   */
  private resetData(): void {
    if (this.selectedEntity) {
      this.app.getActive3DView()
        .displayList[this.selectedEntity.id]
        .clearSelectableMeshes();
    }
    
    this.camera = undefined;
    this.app.selectionManager.unselectAll();
    this.resetGizmoValidator();
    
    if (this.auxCanvas) {
      this.auxCanvas.context.environmentId = undefined;
    }
  }

  /**
   * Updates camera position to focus on the selected entity.
   * Positions camera to show the entity at its layer height with proper framing.
   */
  private updateCamera(): void {
    if (!this.selectedEntity) return;

    this.camera = HSCore.Model.Camera.create(HSCore.Model.CameraTypeEnum.OrbitView);
    
    const cam = this.camera;
    const layerHeight = this.getEntityLayerHeight();
    
    // Set camera target to entity center
    cam.target_x = this.selectedEntity.x;
    cam.target_y = this.selectedEntity.y;
    cam.target_z = this.selectedEntity.z + layerHeight + this.selectedEntity.ZSize / 2;

    // Calculate camera position based on pitch
    const cameraPos = new THREE.Vector3(cam.x, cam.y, cam.z + layerHeight);
    const targetPos = new THREE.Vector3(cam.target_x, cam.target_y, cam.target_z);
    
    cameraPos.sub(targetPos);
    
    const distance = cameraPos.length();
    const pitchRadians = THREE.Math.degToRad(cam.pitch);
    const zOffset = -Math.sin(pitchRadians) * distance;
    
    const horizontalOffset = new THREE.Vector2(
      cam.target_x - cam.x,
      cam.target_y - cam.y
    );
    
    cam.x = cam.target_x - horizontalOffset.x;
    cam.y = cam.target_y - horizontalOffset.y;
    cam.z = zOffset + cam.target_z;
  }

  /**
   * Sets a custom gizmo validator for this environment
   */
  private setGizmoValidator(): void {
    const validator = new GizmoValidator();
    const auxView = this.app.getAux3DView();
    
    this.gizmoManager = auxView.gizmoManager;
    this.gizmoManager.setValidator(validator);
    this.gizmoManager.updateGizmo();
  }

  /**
   * Restores default gizmo validator
   */
  private resetGizmoValidator(): void {
    if (this.gizmoManager) {
      this.gizmoManager.setValidator(null);
      this.gizmoManager.updateGizmo();
    }
  }

  /**
   * Starts a new transaction session for undo/redo
   */
  private startSession(): void {
    const transactionManager = this.app.transManager;
    this.session = transactionManager.startSession();
  }

  /**
   * Commits and ends the current transaction session
   */
  private endSession(): void {
    this.session?.commit({ mergeRequest: false });
    this.session = undefined;
  }

  /**
   * Disables hotkeys that should not work in this environment
   */
  private disableHotkey(): void {
    const hotkey = this.app.hotkey;
    const envId = HSFPConstants.Environment.ContentPartMaterialReplace;
    
    hotkey.disable('tab', envId);
    hotkey.disable('ctrl+d', envId);
    hotkey.disable('meta+d', envId);
  }

  /**
   * Gets the altitude/height of the layer containing the selected entity
   */
  private getEntityLayerHeight(): number {
    if (!this.selectedEntity) return 0;
    
    return this.app.floorplan.scene.getLayerAltitude(
      this.selectedEntity.getUniqueParent()
    );
  }

  /**
   * Receives and handles environment events
   * 
   * @param eventType - Type of event
   * @param eventData - Event data payload
   */
  onReceive(eventType: string, eventData: unknown): boolean {
    if (eventType === 'click') {
      return this.mouseOnClick(eventData as MouseClickEvent);
    }
    
    return false;
  }

  /**
   * Handles mouse click events in the 3D view
   * 
   * @param event - Click event data
   * @returns Whether the event was handled
   */
  private mouseOnClick(event: MouseClickEvent): boolean {
    // Deselect part if clicking on empty space
    if (event.pickResults.length <= 0 && this.handler.getSelectMeshName()) {
      this.handler.changeSelectPart(undefined);
    }
    
    return false;
  }

  /**
   * Sets default mesh selection if needed.
   * If a valid mesh is already selected, loads its materials.
   * Otherwise, selects the first available mesh.
   */
  private needSetDefaultMeshName(): void {
    const selectedMesh = this.app.selectionManager.selected(false)[0];
    const meshName = selectedMesh?.meshName;
    
    if (meshName && this.meshNames.includes(meshName)) {
      this.handler.getMaterialList({});
    } else {
      this.handler.changeSelectPart(this.meshNames[0]);
    }
  }

  /**
   * Marks meshes that can be highlighted/selected in the 3D view
   */
  private setCanHighlightMeshes(): void {
    if (!this.selectedEntity) return;
    
    HSApp.App.getApp()
      .getActive3DView()
      .displayList[this.selectedEntity.id]
      .setSelectableMeshes(this.meshNames);
  }
}