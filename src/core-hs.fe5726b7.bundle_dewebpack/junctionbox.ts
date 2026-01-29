import { Box3, Vector3, MathUtil } from './geometry';
import { BaseObject } from './BaseObject';
import { TubeMeshCreator, JunctionBoxParam } from './TubeMeshCreator';
import { Model, Util as CWUtil } from './CWModel';
import { TransUtil } from './TransUtil';

interface GraphicsObject {
  entityId: string;
  graphicsPath: string;
  type: string;
  bounding: Float32Array;
  material: Material;
  component: unknown;
  parentSeekId: string;
  mesh: string;
  seekId: string;
  instancedArraysEnabled: boolean;
  customAttrs: Record<string, unknown>;
}

interface MeshDefinition {
  meshKey: string;
  vertexPositions?: number[];
  [key: string]: unknown;
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDefinition[];
}

interface Material {
  color: number;
}

interface ChildAddedEvent {
  data: {
    entity: HSCore.Model.Entity;
  };
}

export class JunctionBox extends BaseObject {
  private _matrixLocal: THREE.Matrix4 = new THREE.Matrix4();

  onChildAdded(event: ChildAddedEvent): void {
    const entity = event.data.entity;
    if (entity) {
      this.createViewModel(entity);
    }
  }

  onUpdatePosition(): void {
    this._updateMatrix();
  }

  onUpdate(): void {
    this._updateMatrix();
  }

  toGraphicsData(param: boolean = false): GraphicsData {
    return this._genGraphicData();
  }

  async toGraphicsDataAsync(param: unknown): Promise<GraphicsData> {
    return this._genGraphicData();
  }

  private _genGraphicData(): GraphicsData {
    const entity = this.entity;
    const meshData = TubeMeshCreator.instance.getJunctionBoxMesh();
    const bounding = meshData ? this._getBounding(meshData) : [];
    const meshKey = 'junctionbox0';

    const graphicsObject: GraphicsObject = {
      entityId: entity.ID,
      graphicsPath: entity.ID + meshKey,
      type: HSConstants.GraphicsObjectType.Mesh,
      bounding: new Float32Array(bounding),
      material: this._getMaterial(),
      component: undefined,
      parentSeekId: entity.parentSeekId,
      mesh: meshKey,
      seekId: '',
      instancedArraysEnabled: true,
      customAttrs: {}
    };

    const meshDef: MeshDefinition = {
      meshKey: meshKey
    };

    if (meshData) {
      Object.assign(meshDef, meshData);
    }

    return {
      objects: [graphicsObject],
      meshDefs: [meshDef]
    };
  }

  private _getBounding(meshData: { vertexPositions: number[] }): number[] {
    const vertexPositions = meshData.vertexPositions;
    const transformedVertices: THREE.Vector3[] = [];

    for (let i = 0; i < vertexPositions.length - 2; i += 3) {
      const vertex = new THREE.Vector3(
        vertexPositions[i],
        vertexPositions[i + 1],
        vertexPositions[i + 2]
      );
      vertex.applyMatrix4(this._matrixLocal);
      transformedVertices.push(vertex);
    }

    const boundingBox = new Box3(transformedVertices);
    return [
      boundingBox.min.x,
      boundingBox.min.y,
      boundingBox.min.z,
      boundingBox.max.x,
      boundingBox.max.y,
      boundingBox.max.z
    ];
  }

  private _updateMatrix(): void {
    const entity = this.entity;
    const matrix = new THREE.Matrix4();
    const deviceComponent = entity.getComponent(Model.CWDeviceComp.Type);
    const content = deviceComponent?.content;

    if (!content) {
      return;
    }

    const hostFace = CWUtil.CWContentUtil.getHostFace(content);
    const globalPosition = this._getGlobalPosition(content);
    const orthogonalDistance = this._getContentOrthDisToHostFace(content, hostFace);
    globalPosition.add(orthogonalDistance);

    const position = new THREE.Vector3(globalPosition.x, globalPosition.y, globalPosition.z);

    if (hostFace instanceof HSCore.Model.Ceiling) {
      position.z = position.z + JunctionBoxParam.thickness / 2 - Model.CWTubeDiameterEnum.D25 / 2;
      matrix.setPosition(position);
    } else if (hostFace instanceof HSCore.Model.Floor) {
      position.z = position.z - JunctionBoxParam.thickness / 2 + Model.CWTubeDiameterEnum.D25 / 2;
      matrix.setPosition(position);
    } else if (hostFace instanceof HSCore.Model.Face && hostFace.getMaster() instanceof HSCore.Model.Wall) {
      const thickness = JunctionBoxParam.thickness;
      const offsetMatrix = new THREE.Matrix4().setPosition(new THREE.Vector3(0, 0, -thickness / 2));
      const rotationX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      const rotationZ = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        -Math.PI * content.rotation / 180
      ).multiply(rotationX);

      matrix.makeRotationFromQuaternion(rotationZ);
      matrix.multiply(offsetMatrix);
      position.z += content.ZSize / 2;

      const positionMatrix = new THREE.Matrix4().setPosition(position);
      matrix.premultiply(positionMatrix);
    } else {
      matrix.setPosition(position);
    }

    this._matrixLocal = matrix;
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }

  private _getMaterial(): Material {
    return {
      color: 0x6464FF
    };
  }

  private _getGlobalPosition(content: Model.CWContent): Vector3 {
    const parent = content.getUniqueParent();
    const position = new Vector3(content);

    if (parent) {
      const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(parent);
      if (baseHeight) {
        position.add(Vector3.Z(baseHeight));
      }
    }

    return position;
  }

  private _getContentOrthDisToHostFace(content: Model.CWContent, hostFace: HSCore.Model.Face | null): Vector3 {
    const parent = content.getUniqueParent();

    if (!hostFace || !parent) {
      return Vector3.O();
    }

    if (hostFace instanceof HSCore.Model.Ceiling || hostFace instanceof HSCore.Model.Floor) {
      const layerHeight = HSCore.Util.Layer.getLayerHeight(parent);
      let offset: Vector3;

      if (content.z < layerHeight / 3 && hostFace instanceof HSCore.Model.Floor) {
        offset = Vector3.Z(-content.z);
      } else {
        offset = Vector3.Z(layerHeight - content.z);
      }

      return offset;
    }

    if (hostFace instanceof HSCore.Model.Face && hostFace.getMaster() instanceof HSCore.Model.Wall) {
      const outerPath = hostFace.worldRawPath2d.outer.find(segment =>
        MathUtil.isNearlyBigger(segment.getLength(), 0)
      );

      let offset = Vector3.O();

      if (outerPath) {
        const projectedPoint = outerPath.getProjectedPtBy(content);
        offset = Vector3.XY(projectedPoint.subtract(content));
      }

      return offset;
    }

    return Vector3.O();
  }
}