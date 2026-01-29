interface Vertex {
  x: number;
  y: number;
  z: number;
}

interface MeshBoundingInfo {
  obj_name: string;
  max_vertex?: Vertex;
  min_vertex?: Vertex;
  offsetcenter?: THREE.Vector3;
  textureMatrix?: THREE.Matrix4;
  scale?: THREE.Vector3;
  matrixWorld?: THREE.Matrix4;
  Matrixlocal?: THREE.Matrix4;
  MatrixdoorWorld?: THREE.Matrix4;
  repeatx?: number;
  repeaty?: number;
  offsetx?: number;
  offsety?: number;
}

interface CuttingValue {
  _value: number;
}

interface CuttingInfo {
  horizontal?: CuttingValue[];
  vertical?: CuttingValue[];
}

interface ObjInfo {
  bounding?: Record<string, MeshBoundingInfo>;
  [key: string]: unknown;
}

interface MetadataExtension {
  objInfo: ObjInfo;
}

interface Metadata {
  extension: MetadataExtension;
}

interface Material {
  tileSize_x?: number;
  tileSize_y?: number;
}

interface MaterialObject {
  textureRotation: number;
}

interface Entity {
  seekId: string;
  cuttingInfo: CuttingInfo;
  XLength: number;
  ZLength: number;
  XSize: number;
  ZSize: number;
  metadata: Metadata;
  getMaterial(materialName: string): Material | null;
}

interface SoulInfo {
  horizontal: number[];
  vertical: number[];
  width: number;
  height: number;
}

interface MeshMatrixCell {
  mesh: MeshBoundingInfo;
  oldSize: {
    x: number;
    y: number;
    z: number;
  };
  newSize: {
    x: number;
    y: number;
    z: number;
  };
}

const POSITION_SCALE_FACTOR = 100;
const MILLIMETER_TO_METER = 1000;
const HALF_PI_TOLERANCE = (typeof HSConstants !== 'undefined' && HSConstants.Constants?.TOLERANCE) || 0.0001;

export class ContentCustomizedHandler {
  private meshMatrix: MeshMatrixCell[][] = [];
  private boundingBoxData: Map<string, THREE.Box3> = new Map();
  private meshBoundings: Map<string, THREE.Box3> = new Map();
  private entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  /**
   * Get or create bounding box for a mesh
   */
  getMeshBounding(mesh: MeshBoundingInfo): THREE.Box3 | undefined {
    const boundingKey = `${this.entity.seekId}_${mesh.obj_name}`;
    
    if (!this.boundingBoxData.has(boundingKey) && mesh.max_vertex && mesh.min_vertex) {
      const boundingBox = new THREE.Box3();
      const maxPoint = new THREE.Vector3(
        mesh.max_vertex.x / POSITION_SCALE_FACTOR,
        mesh.max_vertex.y / POSITION_SCALE_FACTOR,
        mesh.max_vertex.z / POSITION_SCALE_FACTOR
      );
      const minPoint = new THREE.Vector3(
        mesh.min_vertex.x / POSITION_SCALE_FACTOR,
        mesh.min_vertex.y / POSITION_SCALE_FACTOR,
        mesh.min_vertex.z / POSITION_SCALE_FACTOR
      );
      
      boundingBox.expandByPoint(minPoint);
      boundingBox.expandByPoint(maxPoint);
      this.boundingBoxData.set(boundingKey, boundingBox);
      
      const centerOffset = maxPoint.add(minPoint);
      centerOffset.x = -centerOffset.x / 2;
      centerOffset.y = -centerOffset.y / 2;
      centerOffset.z = -centerOffset.z / 2;
      mesh.offsetcenter = centerOffset;
    }
    
    return this.boundingBoxData.get(boundingKey);
  }

  /**
   * Filter and return valid meshes based on cutting grid
   */
  getValidMeshes(meshes: MeshBoundingInfo[]): MeshBoundingInfo[] {
    const meshGroups = new Map<string, MeshBoundingInfo[]>();
    
    meshes.forEach((mesh) => {
      const lastUnderscoreIndex = mesh.obj_name.lastIndexOf('_');
      const groupKey = mesh.obj_name.substring(0, lastUnderscoreIndex);
      
      if (meshGroups.has(groupKey)) {
        meshGroups.get(groupKey)!.push(mesh);
      } else {
        meshGroups.set(groupKey, [mesh]);
      }
    });

    let largestGroup: MeshBoundingInfo[] = [];
    meshGroups.forEach((group) => {
      if (group.length > largestGroup.length) {
        largestGroup = group;
      }
    });

    const soulInfo = this.getSoulInfo();
    const expectedMeshCount = soulInfo.horizontal.length * soulInfo.vertical.length;
    
    if (largestGroup.length === expectedMeshCount) {
      largestGroup.sort((a, b) => (a.obj_name > b.obj_name ? 1 : -1));
      return largestGroup;
    }
    
    return [];
  }

  /**
   * Extract cutting information from entity
   */
  getSoulInfo(): SoulInfo {
    const horizontal = this.entity.cuttingInfo.horizontal ?? [];
    const vertical = this.entity.cuttingInfo.vertical ?? [];
    
    return {
      horizontal: horizontal.map((item) => item._value),
      vertical: vertical.map((item) => item._value),
      width: this.entity.XLength,
      height: this.entity.ZLength,
    };
  }

  /**
   * Apply rotation offset to vector based on entity transform
   */
  rotOffset(vector: THREE.Vector3, entity: Entity): THREE.Vector3 {
    const globalMatrix = (HSCore.Util.Matrix3DHandler as any).getGlobalMatrix4(entity);
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(globalMatrix);
    vector.applyMatrix4(rotationMatrix);
    return vector;
  }

  /**
   * Update graphics data for all meshes in the grid
   */
  updateGraphicsData(applyRotation?: boolean): void {
    const boundingData = this.entity.metadata.extension.objInfo.bounding ?? this.entity.metadata.extension.objInfo;
    const allMeshes = Object.values(boundingData) as MeshBoundingInfo[];
    const validMeshes = this.getValidMeshes(allMeshes);

    if (this.meshBoundings.size === 0) {
      validMeshes.forEach((mesh) => {
        const bounding = this.getMeshBounding(mesh);
        if (bounding) {
          this.meshBoundings.set(mesh.obj_name, bounding);
        }
      });
    }

    if (this.meshMatrix.length === 0) {
      this._buildMatrix(validMeshes);
    }

    let currentX = -this.entity.XSize / 2;
    let currentZ = this.entity.ZSize / 2;

    const entityMatrixData = (HSCore.Util.Matrix3DHandler as any).getEntityMatrixData(this.entity);
    const globalMatrix = (HSCore.Util.Matrix3DHandler as any).getGlobalMatrix4(this.entity);

    let basePosition = new THREE.Vector3(0, 0, this.entity.ZSize / 2);
    if (applyRotation) {
      basePosition = this.rotOffset(basePosition, this.entity);
    }
    basePosition.add(entityMatrixData.pos);

    const baseQuaternion: THREE.Quaternion = entityMatrixData.quat;

    this.meshMatrix.forEach((row) => {
      row.forEach((cell) => {
        const mesh = cell.mesh;
        const newSize = cell.newSize;
        const centerOffset = mesh.offsetcenter!;
        
        const scale = new THREE.Vector3(
          newSize.x / cell.oldSize.x,
          1,
          newSize.z / cell.oldSize.z
        );

        const localPosition = {
          x: currentX + newSize.x / 2,
          y: 0,
          z: currentZ - newSize.z / 2,
        };

        localPosition.x += centerOffset.x * scale.x;
        localPosition.y += centerOffset.z;
        localPosition.z += centerOffset.y * scale.z;

        const quaternion = new THREE.Quaternion();
        const textureMatrix = new THREE.Matrix4();
        const localPosVector = new THREE.Vector3(localPosition.x, localPosition.y, localPosition.z);
        
        textureMatrix.compose(localPosVector, quaternion, scale);
        mesh.textureMatrix = textureMatrix;
        mesh.scale = scale;

        let worldPosition = new THREE.Vector3(localPosition.x, localPosition.y, localPosition.z);
        if (this.entity) {
          worldPosition = this.rotOffset(worldPosition, this.entity);
          worldPosition.add(basePosition);
        }

        const worldMatrix = new THREE.Matrix4();
        worldMatrix.compose(worldPosition, baseQuaternion, scale);
        mesh.matrixWorld = worldMatrix;
        mesh.Matrixlocal = new THREE.Matrix4().copy(globalMatrix).invert().multiply(worldMatrix).clone();
        mesh.MatrixdoorWorld = globalMatrix.clone();

        currentX += newSize.x;
      });

      currentZ -= row[0].newSize.z;
    });

    this.updateTexture(validMeshes);
  }

  /**
   * Build matrix grid of mesh cells
   */
  private _buildMatrix(meshes: MeshBoundingInfo[]): void {
    this.meshMatrix = [];
    const soulInfo = this.getSoulInfo();
    let meshIndex = 0;

    for (let verticalIndex = 0; verticalIndex < soulInfo.vertical.length; ++verticalIndex) {
      const row: MeshMatrixCell[] = [];
      
      for (let horizontalIndex = 0; horizontalIndex < soulInfo.horizontal.length; ++horizontalIndex) {
        const mesh = meshes[meshIndex];
        const boundingBox = this.getMeshBounding(mesh);
        
        if (!boundingBox) {
          continue;
        }

        const size = boundingBox.getSize(new THREE.Vector3());
        const cell: MeshMatrixCell = {
          mesh,
          oldSize: {
            x: size.x,
            y: 1,
            z: size.y,
          },
          newSize: {
            x: soulInfo.horizontal[horizontalIndex] / MILLIMETER_TO_METER,
            y: 1,
            z: soulInfo.vertical[verticalIndex] / MILLIMETER_TO_METER,
          },
        };
        
        row.push(cell);
        ++meshIndex;
      }
      
      this.meshMatrix.push(row);
    }
  }

  /**
   * Update texture coordinates for a single mesh
   */
  private _updateTexture(mesh: MeshBoundingInfo, globalBounds: THREE.Box3): void {
    if (!mesh.max_vertex || !mesh.min_vertex || !mesh.textureMatrix) {
      return;
    }

    const maxPoint = new THREE.Vector3(
      mesh.max_vertex.x / POSITION_SCALE_FACTOR,
      -mesh.max_vertex.z / POSITION_SCALE_FACTOR,
      mesh.max_vertex.y / POSITION_SCALE_FACTOR
    );
    const minPoint = new THREE.Vector3(
      mesh.min_vertex.x / POSITION_SCALE_FACTOR,
      -mesh.min_vertex.z / POSITION_SCALE_FACTOR,
      mesh.min_vertex.y / POSITION_SCALE_FACTOR
    );

    const localBounds = new THREE.Box3();
    minPoint.applyMatrix4(mesh.textureMatrix);
    maxPoint.applyMatrix4(mesh.textureMatrix);
    localBounds.expandByPoint(minPoint);
    localBounds.expandByPoint(maxPoint);

    const material = this.entity.getMaterial('cbnt_body');
    const materialObject = (HSCore.Geometry.Util as any).getMaterialObject(material) as MaterialObject | null;

    if (materialObject) {
      const isRotated = Math.abs(materialObject.textureRotation - Math.PI / 2) < HALF_PI_TOLERANCE;
      
      if (isRotated) {
        mesh.repeaty = localBounds.max.x - localBounds.min.x;
        mesh.repeatx = localBounds.max.z - localBounds.min.z;
        mesh.offsety = globalBounds.min.x - localBounds.min.x;
        mesh.offsetx = localBounds.min.z - globalBounds.min.z;
      } else {
        mesh.repeatx = localBounds.max.x - localBounds.min.x;
        mesh.repeaty = localBounds.max.z - localBounds.min.z;
        mesh.offsetx = localBounds.min.x - globalBounds.min.x;
        mesh.offsety = localBounds.min.z - globalBounds.min.z;
      }

      if (material?.tileSize_x && material?.tileSize_y && mesh.scale) {
        mesh.repeatx *= 1 / material.tileSize_x / mesh.scale.x;
        mesh.repeaty *= 1 / material.tileSize_y / mesh.scale.z;
      }
    }
  }

  /**
   * Update texture coordinates for all meshes
   */
  updateTexture(meshes: MeshBoundingInfo[]): void {
    const globalBounds = new THREE.Box3();

    meshes.forEach((mesh) => {
      if (!mesh.max_vertex || !mesh.min_vertex || !mesh.textureMatrix) {
        return;
      }

      const maxPoint = new THREE.Vector3(
        mesh.max_vertex.x / POSITION_SCALE_FACTOR,
        -mesh.max_vertex.z / POSITION_SCALE_FACTOR,
        mesh.max_vertex.y / POSITION_SCALE_FACTOR
      );
      const minPoint = new THREE.Vector3(
        mesh.min_vertex.x / POSITION_SCALE_FACTOR,
        -mesh.min_vertex.z / POSITION_SCALE_FACTOR,
        mesh.min_vertex.y / POSITION_SCALE_FACTOR
      );

      minPoint.applyMatrix4(mesh.textureMatrix);
      maxPoint.applyMatrix4(mesh.textureMatrix);
      globalBounds.expandByPoint(minPoint);
      globalBounds.expandByPoint(maxPoint);
    });

    meshes.forEach((mesh) => {
      this._updateTexture(mesh, globalBounds);
    });
  }
}

export { ContentCustomizedHandler as Matrixlocal };
export { ContentCustomizedHandler as MatrixdoorWorld };