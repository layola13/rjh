import { App } from 'HSApp/App';
import { Command } from 'HSApp/Cmd/Command';
import { SelectionManager } from 'HSApp/Selection/Manager';
import { ViewModeEnum } from 'HSApp/View';
import { HSCore } from 'HSCore';
import { Line3d, MathAlg } from './Line3d';

interface ProductMeta {
  // Define product metadata structure based on usage
  [key: string]: unknown;
}

interface PickResult {
  viewObject?: ViewObject;
  meshName?: string;
}

interface ViewObject {
  entity?: HSCore.Model.Face | HSCore.Model.Entity;
  meshEdgeMap?: Map<string, EdgeData>;
}

interface EdgeData {
  from: unknown;
  to: unknown;
}

interface EventData {
  entity?: HSCore.Model.Entity | null;
  event?: MouseEvent;
  pickResults?: PickResult[];
  icon?: string;
}

interface Position {
  x: number;
  y: number;
}

interface MiniImagePreviewOptions {
  canclose: boolean;
  append?: string;
}

declare class MiniImagePreviewCtrl {
  constructor(options: EventData);
  init(): void;
  destroy(): void;
  render(position: Position): void;
  title: string;
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    AddMiterMolding = 'AddMiterMolding'
  }
  enum PluginType {
    SingleRoom = 'SingleRoom',
    CustomizedPm = 'CustomizedPm',
    CustomizedFeatureModel = 'CustomizedFeatureModel',
    NCustomizedFeatureModel = 'NCustomizedFeatureModel'
  }
  enum Environment {
    CustomizedPlatform = 'CustomizedPlatform',
    NCustomizedPlatform = 'NCustomizedPlatform',
    CustomizedBackgroundWall = 'CustomizedBackgroundWall',
    NCustomizedBackgroundWall = 'NCustomizedBackgroundWall',
    CustomizedCeilingModel = 'CustomizedCeilingModel',
    NCustomizedCeilingModel = 'NCustomizedCeilingModel'
  }
  enum LogGroupTypes {
    FaceOperation = 'FaceOperation'
  }
}

declare namespace ResourceManager {
  function getString(key: string): string;
}

declare namespace LiveHint {
  function show(
    message: string,
    options: unknown,
    callback: () => void,
    config: MiniImagePreviewOptions
  ): void;
  function hide(): void;
}

/**
 * Command for adding mitre molding to face corners
 */
export class CmdAddMitreMolding extends Command {
  private app: App;
  private iconImg: string;
  private productMeta: ProductMeta;
  private miniImagePreviewCtrl: MiniImagePreviewCtrl | null;
  private lastHoveredEntity?: HSCore.Model.Entity;
  private lastClickEntity?: HSCore.Model.Entity;
  private addMoldingFaces?: HSCore.Model.Face[];
  private lastHighlightEdgeMeshName?: string;

  constructor(productMeta: ProductMeta, _unused: unknown, iconImg: string) {
    super();
    this.app = HSApp.App.getApp();
    this.productMeta = productMeta;
    this.iconImg = iconImg;
    this.lastHoveredEntity = undefined;
    this.lastClickEntity = undefined;
    this.miniImagePreviewCtrl = null;
    this.addMoldingFaces = undefined;
    this.lastHighlightEdgeMeshName = undefined;
  }

  onExecute(): void {
    this.app.selectionManager.unselectAll();
    if (!this.app.is3DViewActive()) {
      this.app.switchPrimaryViewMode(ViewModeEnum.OrbitView);
    }
  }

  onReceive(eventType: string, eventData: EventData): boolean {
    if (eventData?.entity == null) {
      return super.onReceive(eventType, eventData);
    }

    const entity = eventData.entity;
    const mouseEvent = eventData.event;
    const pickResults = eventData.pickResults ?? [];

    switch (eventType) {
      case 'mousemove': {
        const pickResult = pickResults[0] ?? {};
        this.addMoldingFaces = undefined;
        
        if (this.canAddMitreMolding(pickResult)) {
          this.highlightMeshes(pickResult);
        } else {
          this.clearHighlightMeshes(this.lastHoveredEntity);
        }
        
        return this.renderMiniImagePreview(eventData);
      }

      case 'mouseover':
        this.clearHighlightMeshes(this.lastHoveredEntity);
        this.lastHoveredEntity = entity;
        return true;

      case 'click':
        this.lastHoveredEntity = entity;
        this.lastClickEntity = entity;
        
        if (mouseEvent?.button === 0) {
          this.applyMolding();
        } else if (mouseEvent?.button === 2) {
          this.mgr.cancel(this);
          return true;
        }
        break;

      default:
        return super.onReceive(eventType, eventData);
    }

    return false;
  }

  private canAddMitreMolding(pickResult: PickResult): boolean {
    const viewObject = pickResult.viewObject;
    const meshName = pickResult.meshName;
    const edgeData = viewObject?.meshEdgeMap?.get(meshName ?? '');
    const entity = viewObject?.entity;

    if (!(entity instanceof HSCore.Model.Face) || !edgeData) {
      return false;
    }

    const edgeLine = new Line3d(edgeData.from, edgeData.to);
    const facePairs: [HSCore.Model.Face, HSCore.Model.Face][] = [];
    const master = entity.getMaster();

    if (master instanceof HSCore.Model.Opening) {
      return false;
    }

    if (master.auxFaceList?.find((face: HSCore.Model.Face) => face.id === entity.id)) {
      return false;
    }

    const excludedFaceTypes: string[] = [];

    if (
      master instanceof HSCore.Model.NCustomizedBeam ||
      ((master instanceof HSCore.Model.Wall || master instanceof HSCore.Model.NCustomizedStructure) &&
        master.height3d >= this.app.floorplan.scene.activeLayer.height)
    ) {
      excludedFaceTypes.push('top');
    }

    if (!(master instanceof HSCore.Model.NCustomizedBeam)) {
      excludedFaceTypes.push('bottom');
    }

    if (excludedFaceTypes.includes(master.getFaceType(entity))) {
      return false;
    }

    master.faceList?.forEach((face: HSCore.Model.Face) => {
      if (!excludedFaceTypes.includes(master.getFaceType(face)) && face.id !== entity.id) {
        facePairs.push([entity, face]);
      }
    });

    this.addMoldingFaces = facePairs.find((pair) => {
      const corners = HSCore.Util.Face.calcVertPositiveCorner(pair[0], pair[1]);
      return (
        corners.length === 1 &&
        MathAlg.CalculateOverlap.curve3ds(edgeLine, corners[0][0]).length === 1
      );
    });

    return !!this.addMoldingFaces;
  }

  private highlightMeshes(pickResult: PickResult): void {
    const viewObject = pickResult.viewObject;
    const meshName = pickResult.meshName;
    const entity = viewObject?.entity;

    if (
      entity instanceof HSCore.Model.Face &&
      meshName &&
      this.lastHighlightEdgeMeshName !== meshName
    ) {
      this.clearHighlightMeshes(entity);
      this.app.getActive3DView().displayList[entity.id].highlightEdge(meshName);
      this.lastHighlightEdgeMeshName = meshName;
    }
  }

  private applyMolding(): void {
    if (this.lastClickEntity instanceof HSCore.Model.Face && this.addMoldingFaces) {
      const faceIds: string[] = [];
      this.addMoldingFaces.forEach((face) => {
        faceIds.push(face.id);
      });

      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.AddMiterMolding,
        [this.productMeta, faceIds]
      );
      this.context.transManager.commit(request);
      this.clearHighlightMeshes(this.lastHoveredEntity);
    } else {
      this.showDialogMessageOpenOtherEnv();
    }
  }

  private showDialogMessageOpenOtherEnv(): void {
    let messageKey = '';
    let onAction = (): void => {};

    if (this.lastClickEntity instanceof HSCore.Model.CustomizedPMInstanceModel) {
      messageKey = 'plugin_walldecoration_add_face_corner_DIY';
      onAction = () => {
        SelectionManager.select(this.lastClickEntity, undefined);
        const singleRoomPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.SingleRoom);
        singleRoomPlugin?.cancelSingleRoom();
        this.app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedPm).onUIEditBtnClk();
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.CustomizedPlatform) {
      messageKey = 'plugin_walldecoration_add_face_corner_platform';
      onAction = () => {
        this.app.pluginManager
          .getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel)
          .selectTargetFace([this.lastClickEntity], null, HSFPConstants.Environment.CustomizedPlatform);
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.NCustomizedPlatform) {
      messageKey = 'plugin_walldecoration_add_face_corner_platform';
      onAction = () => {
        this.app.pluginManager
          .getPlugin(HSFPConstants.PluginType.NCustomizedFeatureModel)
          .selectTargetFace([this.lastClickEntity], null, HSFPConstants.Environment.NCustomizedPlatform);
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.NCustomizedBackgroundWall) {
      messageKey = 'plugin_walldecoration_add_face_corner_background_wall';
      onAction = () => {
        const hostedFace = HSCore.Util.Content.getHostedFace(this.lastClickEntity);
        const parent = hostedFace?.getUniqueParent();
        if (parent) {
          this.app.pluginManager
            .getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel)
            .enterCustomizedFeatureModelEnv(hostedFace, HSFPConstants.Environment.CustomizedBackgroundWall);
        }
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.NCustomizedBackgroundWall) {
      messageKey = 'plugin_walldecoration_add_face_corner_background_wall';
      onAction = () => {
        const hostedFace = HSCore.Util.Content.getHostedFace(this.lastClickEntity);
        const parent = hostedFace?.getUniqueParent();
        if (parent) {
          this.app.pluginManager
            .getPlugin(HSFPConstants.PluginType.NCustomizedFeatureModel)
            .enterNCustomizedFeatureModelEnv(hostedFace, HSFPConstants.Environment.NCustomizedBackgroundWall);
        }
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.NCustomizedCeilingModel) {
      messageKey = 'plugin_walldecoration_add_face_corner_ceiling';
      onAction = () => {
        this.app.pluginManager
          .getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel)
          .selectTargetFace([this.lastClickEntity], null, HSFPConstants.Environment.CustomizedCeilingModel);
      };
    }

    if (this.lastClickEntity instanceof HSCore.Model.NCustomizedCeilingModel) {
      messageKey = 'plugin_walldecoration_add_face_corner_ceiling';
      onAction = () => {
        this.app.pluginManager
          .getPlugin(HSFPConstants.PluginType.NCustomizedFeatureModel)
          .selectTargetFace([this.lastClickEntity], null, HSFPConstants.Environment.NCustomizedCeilingModel);
      };
    }

    if (messageKey !== '') {
      const message = ResourceManager.getString(messageKey);
      const appendHtml = `&nbsp;&nbsp;<span class='action add-face-corner-live-hint-button'>${ResourceManager.getString(
        'plugin_walldecoration_add_face_corner_btn'
      )}</span>`;

      LiveHint.show(
        message,
        undefined,
        () => {
          this.mgr.cancel(this);
          LiveHint.hide();
          onAction();
        },
        {
          canclose: true,
          append: appendHtml
        }
      );
    }
  }

  private createMiniImagePreview(eventData: EventData): void {
    this.destroyMiniImagePreview();
    this.miniImagePreviewCtrl = new MiniImagePreviewCtrl(eventData);
    this.miniImagePreviewCtrl.init();
  }

  private renderMiniImagePreview(eventData: EventData): boolean {
    if (!this.miniImagePreviewCtrl) {
      eventData.icon = eventData.icon ?? this.iconImg;
      this.createMiniImagePreview(eventData);
    }

    if (this.miniImagePreviewCtrl && eventData?.event) {
      this.miniImagePreviewCtrl.title = ResourceManager.getString(
        'plugin_walldecoration_add_face_corner_tip'
      );

      const mouseEvent = eventData.event;
      if (mouseEvent.clientX && mouseEvent.clientY) {
        const position: Position = {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY
        };
        this.miniImagePreviewCtrl.render(position);
      }
      return true;
    }

    return false;
  }

  private destroyMiniImagePreview(): void {
    if (this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl.destroy();
      this.miniImagePreviewCtrl = null;
    }
  }

  cancel(_reason: unknown): void {
    this.onCleanup();
  }

  complete(_result: unknown): void {
    this.onCleanup();
  }

  private onCleanup(): void {
    this.app.selectionManager.unselectAll();
    this.destroyMiniImagePreview();
    this.clearHighlightMeshes(this.lastHoveredEntity);
  }

  private clearHighlightMeshes(entity?: HSCore.Model.Entity): void {
    if (entity) {
      const displayObject = this.app.getActive3DView().displayList[entity.id];
      displayObject?.removeHighlightEdge?.(this.lastHighlightEdgeMeshName);
    }
  }

  getDescription(): string {
    return '添加阳角线';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}