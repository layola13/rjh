import { Vector3, MathUtil } from './math';
import { BaseObject } from './base-object';
import { TransUtil } from './trans-util';
import { Model } from './model';
import { TubeMeshCreator, TubeMeshTypeEnum, elecPathR, waterPathR } from './tube-mesh-creator';

enum TubeMaterialColor {
  strongElec = 16735045,
  weakElec = 3763966,
  hotWater = 4653276,
  coldWater = 4694913
}

interface TubeMaterial {
  color: TubeMaterialColor;
}

interface BoundingBox extends Float32Array {}

interface GraphicsObject {
  entityId: string;
  graphicsPath: string;
  type: string;
  bounding: Float32Array;
  material: TubeMaterial;
  component: unknown;
  parentSeekId: string;
  mesh: string;
  seekId: string;
  instancedArraysEnabled: boolean;
  customAttrs: Record<string, unknown>;
}

interface MeshDefinition {
  meshKey: string;
  [key: string]: unknown;
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDefinition[];
}

interface TubeData {
  dia: number;
  sidePoints: Vector3[];
  nodePos?: Vector3;
}

interface FieldChangedEvent {
  data: {
    fieldName: string;
  };
}

interface Entity {
  ID: string;
  route: Array<{
    isArc3d: () => boolean;
    getRadius: () => number;
    getOrigin: () => Vector3;
    getEndPt: () => Vector3;
  }>;
  diameter: number;
  nodeIds: string[];
  nodes: unknown[];
  tree?: EntityTree;
  parentSeekId: string;
  startNode?: Node;
  isFlagOn: (flag: number, checkMoving?: boolean) => boolean;
}

interface EntityTree {
  getComponent: (type: string) => unknown;
}

interface Node {
  position: Vector3;
  worldPos: Vector3;
  getParentNode: () => Node | null;
  getChildNodes: () => Node[];
}

interface Context {
  dirtyObjectMap: Map<string, ConcealedWorkTube>;
}

export class ConcealedWorkTube extends BaseObject {
  private hasArcTube: boolean = false;
  protected entity?: Entity;
  protected context!: Context;
  protected geometryDirty: boolean = false;
  protected needUpdateMatrix: boolean = false;
  protected positionDirty: boolean = false;
  protected _matrixLocal?: THREE.Matrix4;
  protected signalHook: any;

  constructor(entity: Entity, context: Context, options: unknown) {
    super(entity, context, options);

    if (this.entity) {
      this.signalHook.listen(context.signalFieldChanged, this.OnFieldChanged);
    }
  }

  private OnFieldChanged(event: FieldChangedEvent): void {
    if (event.data.fieldName === 'route') {
      const entityId = this.getEntityID();
      this.geometryDirty = true;
      this.needUpdateMatrix = true;
      this.context.dirtyObjectMap.set(entityId, this);
      this.onEntityDirty(event);
    }
  }

  protected onUpdatePosition(): void {
    this.updateMatrix();
  }

  protected onUpdate(): void {
    this.updateMatrix();
  }

  public toGraphicsData(forceUpdate: boolean = false): GraphicsData {
    return this.genGraphicData();
  }

  public async toGraphicsDataAsync(forceUpdate: boolean): Promise<GraphicsData> {
    return this.genGraphicData();
  }

  private genGraphicData(): GraphicsData {
    const entity = this.entity!;

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
      return {
        objects: [],
        meshDefs: []
      };
    }

    const boundingBox = this.getBounding();
    const meshType = this.getTubeMeshType();
    const firstRoute = entity.route[0];
    const arcRadius = firstRoute?.isArc3d() ? firstRoute.getRadius() : undefined;

    this.hasArcTube = false;

    let meshKey = this.getMeshKey(entity, meshType, arcRadius, this.hasArcTube);
    const instanceEnabled = this.needInstance(meshType, this.hasArcTube);

    const graphicsObject: GraphicsObject = {
      entityId: entity.ID,
      graphicsPath: entity.ID + meshKey,
      type: HSConstants.GraphicsObjectType.Mesh,
      bounding: new Float32Array(boundingBox),
      material: this.getTubeMaterial(),
      component: undefined,
      parentSeekId: entity.parentSeekId,
      mesh: meshKey,
      seekId: '',
      instancedArraysEnabled: instanceEnabled,
      customAttrs: {}
    };

    const meshDefinition: MeshDefinition = {
      meshKey
    };

    let diameter = entity.diameter;
    let meshData = TubeMeshCreator.instance.getDefaultMesh(meshType, diameter, arcRadius);

    if (!meshData) {
      if (entity.nodeIds.length === 1 &&
          (entity.tree?.getComponent(Model.CWHotWaterComp.Type) ||
           entity.tree?.getComponent(Model.CWColdWaterComp.Type))) {
        diameter += 0.005;
      }
      meshData = TubeMeshCreator.instance.createTube(entity.route, diameter);
    }

    Object.assign(meshDefinition, meshData);

    if (meshType === TubeMeshTypeEnum.straight) {
      const isNotMoving = !entity.isFlagOn(Model.CWFlagEnum.Moving, true);
      const crossArc = isNotMoving && TubeMeshCreator.instance.calculateCrossArc(entity);

      if (crossArc && crossArc.length !== 1) {
        this.hasArcTube = true;
        const arcMeshData = TubeMeshCreator.instance.createTube(crossArc, diameter, true);
        meshKey = this.getMeshKey(entity, meshType, arcRadius, this.hasArcTube);
        const newGraphicsPath = entity.ID + meshKey;

        const updatedGraphicsProps = {
          mesh: meshKey,
          instancedArraysEnabled: this.needInstance(meshType, this.hasArcTube),
          graphicsPath: newGraphicsPath
        };

        Object.assign(meshDefinition, arcMeshData, { meshKey });
        Object.assign(graphicsObject, updatedGraphicsProps);
      }
    }

    this.updateMatrix();

    return {
      objects: [graphicsObject],
      meshDefs: meshData ? [meshDefinition] : []
    };
  }

  private getBounding(): BoundingBox {
    return TubeMeshCreator.instance.getBoundBox(this.getData(), this.getTubeMeshType());
  }

  private getTubeMaterial(): TubeMaterial {
    let color = TubeMaterialColor.strongElec;
    const tree = this.entity?.tree;

    if (tree) {
      if (tree.getComponent(HSCore.Model.CWStrongElecComp.Type)) {
        color = TubeMaterialColor.strongElec;
      } else if (tree.getComponent(HSCore.Model.CWWeakElecComp.Type)) {
        color = TubeMaterialColor.weakElec;
      } else if (tree.getComponent(HSCore.Model.CWHotWaterComp.Type)) {
        color = TubeMaterialColor.hotWater;
      } else if (tree.getComponent(HSCore.Model.CWColdWaterComp.Type)) {
        color = TubeMaterialColor.coldWater;
      }
    }

    return { color };
  }

  private updateMatrix(): void {
    if (!this.entity!.nodes.length) {
      const className = HSConstants.ClassLNameToSName.get(HSConstants.ModelClass.ConcealedWorkTube);
      HSCore.Logger.logger(className).error('fgi error');
    }

    if (this.hasArcTube) {
      this._matrixLocal = new THREE.Matrix4();
    } else {
      this._matrixLocal = TubeMeshCreator.instance.getTransform(this.getData(), this.getTubeMeshType());
    }

    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
    this.positionDirty = false;
  }

  private getTubeMeshType(): TubeMeshTypeEnum {
    if (this.entity!.nodes.length === 2) {
      return TubeMeshTypeEnum.straight;
    }

    const directionPoints = this.getDirsWithWeight();

    if (this.entity!.tree) {
      const startWorldPos = this.entity!.startNode?.worldPos || new Vector3();

      if (directionPoints.length !== 2) {
        return TubeMeshTypeEnum.other;
      }

      const direction1 = directionPoints[0].subtracted(startWorldPos);
      const direction2 = directionPoints[1].subtracted(startWorldPos);

      if (MathUtil.isNearlyEqual(direction1.dot(direction2), 0)) {
        const tree = this.entity!.tree;
        const isElectric = tree.getComponent(Model.CWStrongElecComp.Type) ||
                          tree.getComponent(Model.CWWeakElecComp.Type);
        const isWater = tree.getComponent(Model.CWHotWaterComp.Type) ||
                       tree.getComponent(Model.CWColdWaterComp.Type);

        if (isElectric) {
          return TubeMeshTypeEnum.elecVertical;
        }
        if (isWater) {
          return TubeMeshTypeEnum.waterVertical;
        }
      }
    }

    return TubeMeshTypeEnum.other;
  }

  private getData(): TubeData {
    const meshType = this.getTubeMeshType();
    const diameter = this.entity!.diameter;

    if (meshType === TubeMeshTypeEnum.straight) {
      const firstRoute = this.entity!.route[0];
      return {
        dia: diameter,
        sidePoints: [firstRoute.getOrigin(), firstRoute.getEndPt()]
      };
    }

    return {
      nodePos: this.entity!.startNode?.position || new Vector3(),
      dia: diameter,
      sidePoints: this.getDirsWithWeight()
    };
  }

  protected isValid(): boolean {
    const entity = this.entity;
    if (!entity) {
      return false;
    }

    const hiddenOrRemovedFlags = HSCore.Model.EntityFlagEnum.hidden | HSCore.Model.EntityFlagEnum.removed;
    return !entity.isFlagOn(hiddenOrRemovedFlags);
  }

  private getDirsWithWeight(): Vector3[] {
    const directions: Vector3[] = [];

    if (this.entity!.nodeIds.length !== 1) {
      return directions;
    }

    const startNode = this.entity!.startNode!;
    const startWorldPos = startNode.worldPos;
    const parentNode = startNode.getParentNode();
    const parentDirection = parentNode?.worldPos.subtracted(startWorldPos);

    if (parentDirection) {
      directions.push(parentDirection);
    }

    startNode.getChildNodes().forEach((childNode) => {
      const childDirection = childNode.worldPos.subtracted(startWorldPos);
      directions.push(childDirection);
    });

    let contentRadius = this.getTubeContentR();

    directions.forEach((direction) => {
      const halfLength = direction.getLength() / 2;
      if (contentRadius > halfLength) {
        contentRadius = halfLength;
      }
    });

    return directions.map((direction) =>
      startWorldPos.added(direction.normalize().multiply(contentRadius))
    );
  }

  private getTubeContentR(): number {
    if (!this.entity!.tree) {
      return elecPathR;
    }

    const tree = this.entity!.tree;
    const isElectric = tree.getComponent(Model.CWStrongElecComp.Type) ||
                      tree.getComponent(Model.CWWeakElecComp.Type);

    return isElectric ? elecPathR : waterPathR;
  }

  private needInstance(meshType: TubeMeshTypeEnum, hasArcTube: boolean): boolean {
    const instanceableTypes = [
      TubeMeshTypeEnum.straight,
      TubeMeshTypeEnum.elecVertical,
      TubeMeshTypeEnum.waterVertical
    ];

    return (meshType !== TubeMeshTypeEnum.straight || !hasArcTube) &&
           instanceableTypes.includes(meshType);
  }

  private getMeshKey(entity: Entity, meshType: TubeMeshTypeEnum, arcRadius: number | undefined, hasArcTube: boolean): string {
    const materialColor = this.getTubeMaterial().color;
    const prefix = 'tube';

    if (this.needInstance(meshType, hasArcTube)) {
      if (meshType === TubeMeshTypeEnum.elecVertical) {
        return `${prefix}${meshType}${materialColor}${arcRadius}`;
      }
      return `${prefix}${meshType}${materialColor}`;
    }

    return `${entity.ID}${HSCore.Util.Math.random(13)}`;
  }

  protected getEntityID(): string {
    return this.entity!.ID;
  }

  protected onEntityDirty(event: FieldChangedEvent): void {
    // Override in subclass if needed
  }
}