import { Node, Vector3, BoundingBox, LineDashedMaterial, LineMeshMaterial, MeshComponent, Quaternion } from './p3d';
import { BoxGizmo, GizmoBaseAgent } from './gizmo';
import { getMatrix4FromTransform } from './transform-utils';
import { HSCore } from './hs-core';

const CONTENT_LINEDIMENSION_ENDLINE_DASHSIZE = 0.1;
const CONTENT_LINEDIMENSION_ENDLINE_GAPSIZE = 0.05;

interface GizmoMaterialOptions {
  color: number;
  lineWidth?: number;
  polygonOffsetFactor?: number;
  dashSize?: number;
  gapSize?: number;
}

interface Transform {
  XSize?: number;
  YSize?: number;
  ZSize?: number;
}

interface DisplayListItem {
  node?: Node;
}

interface CommandManager {
  current?: {
    type: string;
  };
  signalCommandTerminated: unknown;
}

interface Application {
  cmdManager: CommandManager;
  floorplan: {
    scene: {
      getLayerAltitude(parent: unknown): number;
    };
  };
  designMetadata: Map<string, unknown>;
  signalCameraChangeStart: unknown;
  signalCameraChangeEnd: unknown;
  getActive3DView(): {
    displayList?: Record<string, DisplayListItem>;
  };
}

interface Context {
  application: Application;
  signalCameraChanged: unknown;
}

type ContentModel = HSCore.Model.Group | HSCore.Model.NCustomizedParametricModel | HSCore.Model.NCustomizedParametricStairs | HSCore.Model.NCPBackgroundWallBase;

class DashedBoxGizmo extends BoxGizmo {
  protected _isDashLine = true;
  protected _lineWidth = 1;
  protected _polygonOffsetFactor = 0;
  protected _node?: Node;
  protected _origin = new Vector3(0, 0, 0);
  protected _color = 0x327dff;
  protected _pickable = false;

  buildMesh(): void {
    const rootNode = new Node();
    const childNode = new Node();
    childNode.addChild(rootNode);
    this._node = childNode;
    childNode.setPickable(this._pickable);

    const minBound = new Vector3(
      this._origin.x - 0.5,
      this._origin.y - 0.5,
      this._origin.z - 0.5
    );
    const maxBound = new Vector3(
      this._origin.x + 0.5,
      this._origin.y + 0.5,
      this._origin.z + 0.5
    );
    const boundingBox = new BoundingBox(minBound, maxBound);

    if (this._isDashLine) {
      const boxHelper = HSApp.View.T3d.Util.createBoxHelper(boundingBox);
      const material = this.createGizmoMaterial(LineDashedMaterial, {
        color: this._color,
        dashSize: CONTENT_LINEDIMENSION_ENDLINE_DASHSIZE,
        gapSize: CONTENT_LINEDIMENSION_ENDLINE_GAPSIZE,
        lineWidth: this._lineWidth,
        polygonOffsetFactor: this._polygonOffsetFactor
      });

      const meshNode = T3Dx.Three2T3d.createMeshNode(boxHelper, material);
      meshNode.getComponent(MeshComponent).getMesh().setBoundingBox(boundingBox.clone());
      rootNode.addChild(meshNode);
    } else {
      const material = this.createGizmoMaterial(LineMeshMaterial, {
        color: this._color,
        lineWidth: this._lineWidth,
        polygonOffsetFactor: this._polygonOffsetFactor
      });

      const min = boundingBox.min;
      const max = boundingBox.max;
      const positions: number[] = [];

      // Front face edges
      positions.push(max.x, max.y, max.z, min.x, max.y, max.z);
      positions.push(min.x, max.y, max.z, min.x, min.y, max.z);
      positions.push(min.x, min.y, max.z, max.x, min.y, max.z);
      positions.push(max.x, min.y, max.z, max.x, max.y, max.z);

      // Back face edges
      positions.push(max.x, max.y, min.z, min.x, max.y, min.z);
      positions.push(min.x, max.y, min.z, min.x, min.y, min.z);
      positions.push(min.x, min.y, min.z, max.x, min.y, min.z);
      positions.push(max.x, min.y, min.z, max.x, max.y, min.z);

      // Connecting edges
      positions.push(max.x, max.y, max.z, max.x, max.y, min.z);
      positions.push(min.x, max.y, max.z, min.x, max.y, min.z);
      positions.push(min.x, min.y, max.z, min.x, min.y, min.z);
      positions.push(max.x, min.y, max.z, max.x, min.y, min.z);

      const lineMesh = T3Dx.Line2Mesh.setFromPositions(positions, [], 'boxgizmoseg');
      const meshNode = T3Dx.Three2T3d.createMeshNode(lineMesh, material);
      meshNode.getComponent(MeshComponent).getMesh().setBoundingBox(boundingBox.clone());
      rootNode.addChild(meshNode);
    }

    if (this._pickable) {
      const faceMesh = this._buildFaceMesh(minBound, maxBound);
      rootNode.addChild(faceMesh);
    }
  }

  protected createGizmoMaterial(materialClass: unknown, options: GizmoMaterialOptions): unknown {
    return new (materialClass as any)(options);
  }

  protected _buildFaceMesh(min: Vector3, max: Vector3): Node {
    throw new Error('Not implemented');
  }
}

export class ContentBox extends GizmoBaseAgent {
  boxGizmo: BoxGizmo | DashedBoxGizmo;
  transform?: Transform;
  contents: ContentModel[];
  hideFromCameraChanging: boolean;

  constructor(context: Context, gizmoManager: unknown, content: ContentModel | ContentModel[]) {
    const contentArray = Array.isArray(content) ? content : [content];
    const gizmo = content instanceof HSCore.Model.NCustomizedParametricModel
      ? new BoxGizmo()
      : new DashedBoxGizmo();

    super(context, gizmo, gizmoManager);

    this.contents = contentArray;
    this.boxGizmo = gizmo;
    this.hideFromCameraChanging = false;
    this.init();
  }

  protected hookEvents(): void {
    super.hookEvents();

    const application = this.context.application;
    
    if (this.signalHook) {
      this.signalHook
        .listen(this.context.signalCameraChanged, this.onContentFieldChange)
        .listen(application.cmdManager.signalCommandTerminated, this.onContentFieldChange)
        .listen(application.signalCameraChangeStart, this.onCameraChangeStart)
        .listen(application.signalCameraChangeEnd, this.onCameraChangeEnd);

      this.contents.forEach((content) => {
        this.signalHook
          .listen(content.signalFieldChanged, this.onContentFieldChange)
          .listen(content.signalDirty, this.onContentFieldChange);
      });
    }
  }

  protected onContentFieldChange = (): void => {
    this.dirty = true;
  };

  protected onCameraChangeStart = (): void => {
    this.setHideFromCameraChanging(true);
  };

  protected onCameraChangeEnd = (): void => {
    this.setHideFromCameraChanging(false);
  };

  protected setHideFromCameraChanging(hidden: boolean): void {
    if (this.hideFromCameraChanging !== hidden) {
      this.hideFromCameraChanging = hidden;
      this.dirty = true;
    }
  }

  protected init(): void {
    this.boxGizmo.color = this.boxGizmo.cssColorToNumber('rgb(50, 125, 255)');
    this.boxGizmo.opacity = 1;
    this.dirty = true;
  }

  protected draw(): void {
    if (this.couldShow()) {
      this.buildContentData();
      this.boxGizmo.show();
    } else {
      this.boxGizmo.hide();
    }
    super.draw();
  }

  protected buildContentData(): void {
    const flattenedContents: ContentModel[] = [];

    const flattenContent = (content: ContentModel): void => {
      if (content instanceof HSCore.Model.Group) {
        content.members.forEach((member) => {
          flattenContent(member);
        });
      } else {
        flattenedContents.push(content);
      }
    };

    this.contents.forEach((content) => {
      flattenContent(content);
    });

    if (flattenedContents.length <= 0) {
      return;
    }

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);

    this.transform = HSApp.Util.Entity.getEntityTransform(flattenedContents);
    const transformMatrix = this.transform && getMatrix4FromTransform(this.transform);
    transformMatrix?.decompose(position, quaternion, scale);

    let width = this.transform?.XSize ?? 0;
    let depth = this.transform?.YSize ?? 0;
    let height = this.transform?.ZSize ?? 0;

    const parentEntity = this.contents[0].getUniqueParent();
    const layerAltitude = this.context.application.floorplan.scene.getLayerAltitude(parentEntity);
    const zPosition = this.contents[0] instanceof HSCore.Model.NCustomizedParametricModel
      ? position.z + layerAltitude
      : position.z + layerAltitude + height / 2;

    this.boxGizmo.position = new Vector3(position.x, zPosition, -position.y);

    if (flattenedContents.length === 1 && flattenedContents[0] instanceof HSCore.Model.NCustomizedParametricStairs) {
      const stairs = flattenedContents[0];
      const mainBoxSize = stairs.getMainBox().getSize();
      width = mainBoxSize.x * stairs.XScale;
      depth = mainBoxSize.y * stairs.YScale;
      height = mainBoxSize.z * stairs.ZScale;
    }

    this.boxGizmo.scale = new Vector3(width, height, depth);
    this.boxGizmo.rotation = new Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w);

    const isSmartReplaceCommand = HSApp.App.getApp().cmdManager.current?.type === HSFPConstants.CommandType.SmartReplaceContent;

    if (this.contents[0] instanceof HSCore.Model.NCPBackgroundWallBase && !isSmartReplaceCommand) {
      const backgroundWall = this.contents[0];
      const dimensions = {
        W: 1000 * backgroundWall.XSize,
        H: 1000 * backgroundWall.ZSize,
        D: 1000 * backgroundWall.YSize
      };
      const isSizeOutOfRange = !backgroundWall.isSizeInRange(dimensions);
      const sizeLimitUnlocked = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock');

      if ((!sizeLimitUnlocked && isSizeOutOfRange) || this.contents[0].isCollision()) {
        this.boxGizmo.color = this.boxGizmo.cssColorToNumber('rgb(255, 0, 0)');
      } else {
        this.boxGizmo.color = this.boxGizmo.cssColorToNumber('rgb(50, 125, 255)');
      }
    }
  }

  protected couldShow(): boolean {
    const application = this.context.application;
    const displayList = application.getActive3DView().displayList ?? {};

    for (const content of this.contents) {
      const displayItem = displayList[content.id];
      if (displayItem?.node && !displayItem.node.getVisible()) {
        return false;
      }
    }

    const currentCommand = application.cmdManager.current;
    if (!currentCommand) {
      return true;
    }

    if (this.hideFromCameraChanging) {
      return false;
    }

    const restrictedCommands = [
      HSFPConstants.CommandType.MoveContent,
      HSFPConstants.CommandType.PlaceProduct,
      HSFPConstants.CommandType.RotateContent
    ];

    return !restrictedCommands.includes(currentCommand.type);
  }

  protected onCleanup(): void {
    this.signalHook?.unlistenAll();
    super.onCleanup();
  }
}