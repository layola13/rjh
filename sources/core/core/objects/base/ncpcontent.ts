import { Util } from './util';
import { Content } from './content';
import { ParametricModelContent } from './parametric-model-content';
import { Vector3, Plane } from './geometry';
import { TransUtil } from './trans-util';
import { EntityEventType } from './entity-event-type';

interface ClipperResult {
  clipMeshes?: THREE.Mesh[];
  cutPlanes?: THREE.Vector3[][];
  cutObstacles?: CutObstacle[];
  nodeMap?: Map<string, THREE.Object3D>;
}

interface CutObstacle {
  coord: number[];
  loop: {
    getAllPoints(): Array<{ x: number; y: number }>;
  };
}

interface MeshDef {
  meshKey: string;
  clipInfo?: {
    fillClip?: boolean;
    extrudeClip?: boolean;
    coordinate: number[];
    loop?: Array<[number, number]>;
  };
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDef[];
}

interface GraphicsObject {
  clipMeshes?: string[];
}

interface ContentBounding {
  min: THREE.Vector3;
  max: THREE.Vector3;
}

interface HostData {
  doorType: string;
}

interface ClipGraphicsOptions {
  bounding: ContentBounding;
  host: HostData;
}

interface ContentMetadata {
  extension?: unknown;
}

interface ContentClipper {
  getAllClipMeshes(bounds: THREE.Box3, matrix: THREE.Matrix4): ClipperResult | null;
  clipMeshesToMeshDefs(meshes: THREE.Mesh[], nodeMap?: Map<string, THREE.Object3D>): MeshDef[];
  cutPlanesToMeshDefs(
    planes: THREE.Vector3[][],
    param?: unknown,
    flag1?: boolean,
    flip?: boolean,
    entityId?: string
  ): MeshDef[];
  cutObstaclesToMeshDefs(obstacles: CutObstacle[], entity: ParametricModelContent): MeshDef[];
}

interface EventData {
  type?: EntityEventType;
}

interface DirtyEvent {
  data: EventData;
}

export class NCPContent extends Content {
  private clipper?: ContentClipper;
  private ncpcontent?: ParametricModelContent;

  constructor(
    entity: ParametricModelContent,
    param2: unknown,
    param3: unknown
  ) {
    super(entity, param2, param3);

    this.ncpcontent = entity;
    this.clipper = entity.doc.docMgr.geometryManager.getContentClipper(entity);

    const parent = this.getParent(entity);
    this.signalHook.listen(parent.signalDirty, this.dirtyCache);
  }

  private getParent(entity: ParametricModelContent): ParametricModelContent {
    let current = entity;
    while (
      current &&
      (current.parent instanceof HSCore.Model.ParametricModelContent ||
        current.parent instanceof HSCore.Model.ParametricModelArray ||
        current.parent instanceof HSCore.Model.NCustomizedParametricModel)
    ) {
      current = current.parent;
    }
    return current;
  }

  private dirtyCache(event: DirtyEvent): void {
    this.geometryDirty = true;

    if (
      this.ncpcontent &&
      event.data.type &&
      event.data.type === EntityEventType.Geometry &&
      this.getParent(this.ncpcontent).isFlagOff(HSCore.Model.StructureFlagEnum.dragOn)
    ) {
      this.update(true);
    }
  }

  private clipGraphicsData(
    entity: ParametricModelContent | null,
    options: ClipGraphicsOptions
  ): GraphicsData | null {
    if (!entity) {
      return null;
    }

    if (!(entity instanceof ParametricModelContent)) {
      return null;
    }

    const metadata = entity.metadata as ContentMetadata | undefined;
    if (!metadata?.extension) {
      return null;
    }

    const contentNode = HSCore.Geometry.Util.getContentNode(entity);
    const entityLayer = HSCore.Util.Layer.getEntityLayer(entity);

    let altitude = 0;
    if (entityLayer instanceof HSCore.Model.Layer) {
      altitude = HSCore.Util.Layer.getAltitude(entityLayer);
    }

    contentNode.position.y += altitude;
    contentNode.updateMatrixWorld();

    const worldMatrix = contentNode.matrixWorld.clone();
    const bounds = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(entity.XLength, entity.ZLength, entity.YLength)
    );
    bounds.applyMatrix4(worldMatrix);

    if (!this.clipper) {
      this.clipper = HSCore.Doc.getDocManager().geometryManager.getContentClipper(entity);
    }

    if (!this.clipper) {
      return null;
    }

    const clipperResult = this.clipper.getAllClipMeshes(bounds, worldMatrix);
    if (
      !clipperResult ||
      !(
        (clipperResult.clipMeshes?.length ?? 0) > 0 ||
        (clipperResult.cutPlanes?.length ?? 0) > 0 ||
        (clipperResult.cutObstacles?.length ?? 0) > 0
      )
    ) {
      return null;
    }

    const materialData = this._getContentMaterialData(entity, metadata, options.bounding, options.host);
    if (!materialData) {
      return null;
    }

    const { clipMeshes, cutPlanes, nodeMap, cutObstacles } = clipperResult;
    let { objects, meshDefs } = materialData;

    if (!objects.length) {
      return { objects, meshDefs };
    }

    if (!objects[0].clipMeshes) {
      objects[0].clipMeshes = [];
    }

    if (clipMeshes?.length) {
      const meshDefResults = this.clipper.clipMeshesToMeshDefs(clipMeshes, nodeMap);
      meshDefResults.forEach(meshDef => {
        objects[0].clipMeshes!.push(meshDef.meshKey);
      });
      meshDefs = meshDefs.concat(meshDefResults);
    }

    if (cutPlanes?.length) {
      const planeMeshDefs =
        this.clipper?.cutPlanesToMeshDefs(cutPlanes, undefined, true, !!this.entity.flip, entity.id) ?? [];

      cutPlanes.forEach((planePoints, index) => {
        const plane = Plane.makePlaneByPoints(
          planePoints.map(point => new Vector3(point.x, -point.z, point.y))
        );

        objects[0].clipMeshes!.push(planeMeshDefs[index].meshKey);
        planeMeshDefs[index].clipInfo = {
          fillClip: true,
          coordinate: TransUtil.convertCoordUnit(plane.getCoord())
        };
      });

      meshDefs = meshDefs.concat(planeMeshDefs);
    }

    if (cutObstacles?.length) {
      const obstacleMeshDefs = this.clipper?.cutObstaclesToMeshDefs(cutObstacles, entity) ?? [];

      cutObstacles.forEach((obstacle, index) => {
        objects[0].clipMeshes!.push(obstacleMeshDefs[index].meshKey);
        obstacleMeshDefs[index].clipInfo = {
          extrudeClip: true,
          coordinate: TransUtil.convertCoordUnit(obstacle.coord),
          loop: obstacle.loop.getAllPoints().map(point => [point.x, point.y])
        };
      });

      meshDefs = meshDefs.concat(obstacleMeshDefs);
    }

    return { objects, meshDefs };
  }

  toGraphicsData(forceUpdate = false): GraphicsData {
    const entity = this.entity as ParametricModelContent;

    if (
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
    ) {
      return { objects: [], meshDefs: [] };
    }

    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(entity);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    globalMatrix.decompose(position, quaternion, scale);

    const contentBound = Util.getContentBound(entity);

    return (
      this.clipGraphicsData(entity, {
        bounding: contentBound,
        host: { doorType: '' }
      }) ?? super.toGraphicsData(forceUpdate)
    );
  }
}