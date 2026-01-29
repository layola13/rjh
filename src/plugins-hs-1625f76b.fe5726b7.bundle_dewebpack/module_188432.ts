import { HSCore } from '../635589';
import { HSApp } from '../518193';

interface StylerEnvironmentOptions {
  app: HSApp.App;
  handler: StylerHandler;
}

interface StylerHandler {
  getProductOrderList(): Promise<void>;
  getContentPartIds(): string[];
  getSelectedEntity(): HSCore.Model.Entity | undefined;
  getSelectMeshName(): string | undefined;
  changeSelectPart(partId: string | undefined): void;
  getMaterialList(options: Record<string, unknown>): void;
}

interface SessionCommitOptions {
  mergeRequest: boolean;
}

interface Session {
  commit(options: SessionCommitOptions): void;
}

interface DeactivateOptions {
  closingDocument?: boolean;
}

interface CanvasSetupOptions {
  canCreateEntity: (entity: HSCore.Model.Entity) => boolean;
  camera: HSCore.Model.Camera;
}

interface MouseClickEvent {
  pickResults: unknown[];
}

interface UIController {
  setSelectedEntity(entity: HSCore.Model.Entity | undefined): void;
  enterStyler(): void;
  exitStyler(): void;
}

class GizmoValidator {}

class UI implements UIController {
  constructor(options: StylerEnvironmentOptions) {}
  
  setSelectedEntity(entity: HSCore.Model.Entity | undefined): void {}
  
  enterStyler(): void {}
  
  exitStyler(): void {}
}

export default class StylerEnvironment extends HSApp.Environment.CommonEnvironment {
  private app: HSApp.App;
  private camera?: HSCore.Model.Camera;
  private session?: Session;
  private auxCanvas?: any;
  private gizmoManager?: any;
  private handler: StylerHandler;
  private selectedEntity?: HSCore.Model.Entity;
  private from3DViewMode: boolean = false;
  private ui: UIController;
  private meshNames: string[] = [];

  constructor(options: StylerEnvironmentOptions) {
    super(options.app);
    this.app = options.app;
    this.handler = options.handler;
    this.ui = new UI(options);
    this.disableHotkey();
  }

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

  buildCanvas(): void {
    this.from3DViewMode = this.app.is3DViewActive();
    
    if (!this.from3DViewMode) {
      this.app.switchTo3DView();
    }

    this.setGizmoValidator();
    this.app.switchToAuxView();
    this.auxCanvas = this.app.getAux3DView();
    this.auxCanvas.onSizeChange();

    const entitySet = new Set<HSCore.Model.Entity>();

    if (this.selectedEntity) {
      entitySet.add(this.selectedEntity);

      if (this.selectedEntity instanceof HSCore.Model.Group) {
        this.selectedEntity.toFlatMemberList(true).forEach((member) => {
          entitySet.add(member);
        });

        this.selectedEntity.toFlatGroupList().forEach((group) => {
          entitySet.add(group);
        });
      }

      entitySet.add(this.selectedEntity.getUniqueParent());
    }

    this.auxCanvas.context.environmentId = HSFPConstants.Environment.ContentPartMaterialReplace;
    this.auxCanvas.setupCanvas({
      canCreateEntity: (entity: HSCore.Model.Entity) => entitySet.has(entity),
      camera: this.camera
    } as CanvasSetupOptions);
  }

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

  resetData(): void {
    if (this.selectedEntity) {
      this.app.getActive3DView().displayList[this.selectedEntity.id].clearSelectableMeshes();
    }

    this.camera = undefined;
    this.app.selectionManager.unselectAll();
    this.resetGizmoValidator();
    this.auxCanvas.context.environmentId = undefined;
  }

  updateCamera(): void {
    if (!this.selectedEntity) return;

    this.camera = HSCore.Model.Camera.create(HSCore.Model.CameraTypeEnum.OrbitView);
    const camera = this.camera;

    camera.target_x = this.selectedEntity.x;
    camera.target_y = this.selectedEntity.y;
    camera.target_z = this.selectedEntity.z + this.getEntityLayerHeight() + this.selectedEntity.ZSize / 2;

    const cameraPosition = new THREE.Vector3(
      camera.x,
      camera.y,
      camera.z + this.getEntityLayerHeight()
    );
    const targetPosition = new THREE.Vector3(camera.target_x, camera.target_y, camera.target_z);

    cameraPosition.sub(targetPosition);

    const distance = cameraPosition.length();
    const pitchRadians = THREE.Math.degToRad(camera.pitch);
    const zOffset = -Math.sin(pitchRadians) * distance;
    const horizontalOffset = new THREE.Vector2(
      camera.target_x - camera.x,
      camera.target_y - camera.y
    );

    camera.x = camera.target_x - horizontalOffset.x;
    camera.y = camera.target_y - horizontalOffset.y;
    camera.z = zOffset + camera.target_z;
  }

  setGizmoValidator(): void {
    const validator = new GizmoValidator();
    const auxView = this.app.getAux3DView();
    this.gizmoManager = auxView.gizmoManager;
    this.gizmoManager.setValidator(validator);
    this.gizmoManager.updateGizmo();
  }

  resetGizmoValidator(): void {
    this.gizmoManager.setValidator(null);
    this.gizmoManager.updateGizmo();
  }

  startSession(): void {
    const transactionManager = this.app.transManager;
    this.session = transactionManager.startSession();
  }

  endSession(): void {
    this.session?.commit({ mergeRequest: false });
    this.session = undefined;
  }

  disableHotkey(): void {
    const hotkey = this.app.hotkey;
    const environment = HSFPConstants.Environment.ContentPartMaterialReplace;
    
    hotkey.disable('tab', environment);
    hotkey.disable('ctrl+d', environment);
    hotkey.disable('meta+d', environment);
  }

  getEntityLayerHeight(): number {
    if (!this.selectedEntity) return 0;
    return this.app.floorplan.scene.getLayerAltitude(this.selectedEntity.getUniqueParent());
  }

  onReceive(eventType: string, eventData: unknown): boolean | void {
    if (eventType === 'click') {
      return this.mouseOnClick(eventData as MouseClickEvent);
    }
  }

  mouseOnClick(event: MouseClickEvent): boolean {
    if (event.pickResults.length <= 0 && this.handler.getSelectMeshName()) {
      this.handler.changeSelectPart(undefined);
    }
    return false;
  }

  needSetDefaultMeshName(): void {
    const selectedMeshName = this.app.selectionManager.selected(false)[0]?.meshName;

    if (selectedMeshName && this.meshNames.includes(selectedMeshName)) {
      this.handler.getMaterialList({});
    } else {
      this.handler.changeSelectPart(this.meshNames[0]);
    }
  }

  setCanHighlightMeshes(): void {
    if (!this.selectedEntity) return;
    
    HSApp.App.getApp()
      .getActive3DView()
      .displayList[this.selectedEntity.id]
      .setSelectableMeshes(this.meshNames);
  }
}