interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface MeshData {
  obj_name: string;
  max_vertex: Vec3;
  min_vertex: Vec3;
  offsetcenter?: Vec3;
  geometry?: THREE.BufferGeometry;
  matrixWorld?: THREE.Matrix4;
  Matrixlocal?: THREE.Matrix4;
  MatrixdoorWorld?: THREE.Matrix4;
  repeaty?: number;
  repeatx?: number;
  offsety?: number;
  offsetx?: number;
}

interface ScaleRuleOptions {
  splitBy: number[];
}

interface ScaleRuleData {
  options: ScaleRuleOptions;
}

interface EntityMetadata {
  extension: {
    objInfo: {
      bounding?: Record<string, MeshData>;
      [key: string]: unknown;
    };
  };
  scaleRule?: {
    data: ScaleRuleData;
  };
}

interface Entity {
  seekId: string;
  XSize: number;
  ZSize: number;
  metadata: EntityMetadata;
  getParentsInPath(): Entity[];
  contentType?: {
    isTypeOf(type: unknown): boolean;
  };
}

function isParamSwingDoorAssembly(entity: Entity): boolean {
  return (
    entity instanceof HSCore.Model.PAssembly &&
    !!entity.contentType &&
    entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoor)
  );
}

export class ContentVsplitHandler {
  private entity: Entity;
  private meshes: MeshData[] = [];
  private meshBoundings: Map<string, THREE.Box3> = new Map();
  private boundingBoxData: Map<string, THREE.Box3> = new Map();
  private initializedMeshes?: boolean;
  private initializedMeshPositions?: boolean;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  private getMeshBounding(mesh: MeshData): THREE.Box3 | undefined {
    const key = `${this.entity.seekId}_${mesh.obj_name}`;

    if (!this.boundingBoxData.has(key)) {
      const box = new THREE.Box3();
      const maxVertex = new THREE.Vector3(
        mesh.max_vertex.x / 100,
        mesh.max_vertex.y / 100,
        mesh.max_vertex.z / 100
      );
      const minVertex = new THREE.Vector3(
        mesh.min_vertex.x / 100,
        mesh.min_vertex.y / 100,
        mesh.min_vertex.z / 100
      );

      box.expandByPoint(minVertex);
      box.expandByPoint(maxVertex);
      this.boundingBoxData.set(key, box);

      const center = maxVertex.add(minVertex);
      center.x = -center.x / 2;
      center.y = -center.y / 2;
      center.z = -center.z / 2;
      mesh.offsetcenter = center;
    }

    return this.boundingBoxData.get(key);
  }

  private initializeMeshes(meshData: MeshData[]): void {
    if (this.initializedMeshes) {
      return;
    }

    const sortedMeshes = meshData.sort((a, b) => {
      return parseInt(a.obj_name.substr(6, 2)) - parseInt(b.obj_name.substr(6, 2));
    });

    this.meshes = [];
    this.meshBoundings = new Map();

    const meshIndices = [0, 2, 1];
    meshIndices.forEach((index) => {
      const mesh = sortedMeshes[index];
      this.meshes.push(mesh);

      const bounding = this.getMeshBounding(mesh);
      if (bounding) {
        this.meshBoundings.set(mesh.obj_name, bounding);
      }
    });

    this.initializedMeshes = true;
  }

  private initializeMeshPosition(meshes: MeshData[]): void {
    if (this.initializedMeshPositions === undefined) {
      meshes.forEach((mesh) => {
        mesh.geometry?.getCenter();
      });
      this.initializedMeshPositions = true;
    }
  }

  private hasParamSwingDoorParent(): boolean {
    const parents = this.entity.getParentsInPath();
    for (let i = 0; i < parents.length; i++) {
      if (isParamSwingDoorAssembly(parents[i])) {
        return true;
      }
    }
    return false;
  }

  private rotOffset(
    point: Vec3,
    rotX: number,
    rotY: number,
    rotZ: number
  ): Vec3 {
    if (rotX !== 0) {
      const tempPoint = { x: point.y, y: point.z };
      const rotated = HSCore.Util.Math.rotatePointCW({ x: 0, y: 0 }, tempPoint, rotX);
      point.z = rotated.y;
      point.y = rotated.x;
    }

    if (rotY === 180) {
      point.z = -point.z;
      point.x = -point.x;
    }

    if (rotZ !== 0) {
      const rotated = HSCore.Util.Math.rotatePointCW({ x: 0, y: 0 }, point, rotZ);
      point.x = rotated.x;
      point.y = rotated.y;
    }

    return point;
  }

  public updateGraphicsData(applyRotation: boolean): void {
    const boundingInfo =
      this.entity.metadata.extension.objInfo.bounding ?? this.entity.metadata.extension.objInfo;
    const meshDataArray = Object.values(boundingInfo);
    const scaleRuleData = this.entity.metadata.scaleRule?.data;

    if (!(meshDataArray.length > 0 && scaleRuleData)) {
      return;
    }

    const filteredMeshes = meshDataArray.filter((mesh) => mesh.obj_name !== 'maxMinPoint');

    if (!(filteredMeshes.length > 0 && scaleRuleData)) {
      return;
    }

    if (filteredMeshes.length < 3) {
      assert(false, 'mesh count expected to be 3', 'HSCore.Geometrymanager.Fgi');
      return;
    }

    this.initializeMeshes(filteredMeshes);

    const { splitBy } = scaleRuleData.options;
    assert(
      splitBy.length > 0,
      'setting splitBy expected to be a non-empty array',
      'HSCore.Geometrymanager.Fgi'
    );

    let selectedSplitValue = splitBy[0];
    splitBy.forEach((splitValue) => {
      if ((1000 * this.entity.ZSize) % splitValue === 0) {
        selectedSplitValue = splitValue;
      }
    });

    let segmentCount = Math.floor((1000 * this.entity.ZSize) / selectedSplitValue);
    const entityWidth = this.entity.XSize;
    let currentZOffset = this.entity.ZSize / 2;

    const matrixData = HSCore.Util.Matrix3DHandler.getEntityMatrixData(this.entity);
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this.entity);
    const euler = matrixData.euler;
    const rotationX = -euler.x;
    const rotationY = euler.y;
    const rotationZ = -euler.z;

    let basePosition: THREE.Vector3;
    let quaternion = matrixData.quat;

    if (this.hasParamSwingDoorParent()) {
      basePosition = matrixData.pos;
      let offset = new THREE.Vector3(0, 0, -this.entity.ZSize / 2);
      if (applyRotation) {
        offset = this.rotOffset(offset, rotationX, rotationY, rotationZ);
      }
      basePosition.sub(offset);
    } else {
      let offset = new THREE.Vector3(0, 0, this.entity.ZSize / 2);
      if (applyRotation) {
        offset = this.rotOffset(offset, rotationX, rotationY, rotationZ);
      }
      offset.add(matrixData.pos);
      basePosition = offset;
    }

    if (segmentCount <= 2) {
      segmentCount = 2;
      const segmentHeight = this.entity.ZSize / 2;

      for (let i = 0; i < 2; ++i) {
        const mesh = this.meshes[i];
        const bounding = this.meshBoundings.get(mesh.obj_name);
        if (!bounding) {
          continue;
        }

        const boundingSize = bounding.getSize();
        const scale = new THREE.Vector3(
          entityWidth / boundingSize.x,
          segmentHeight / boundingSize.y,
          1
        );

        const localPosition = {
          x: 0,
          y: 0,
          z: currentZOffset - segmentHeight / 2,
        };

        const { offsetcenter } = mesh;
        if (offsetcenter) {
          localPosition.x += offsetcenter.x;
          localPosition.y += offsetcenter.z;
          localPosition.z += offsetcenter.y;
        }

        let worldPosition = new THREE.Vector3(localPosition.x, localPosition.y, localPosition.z);

        if (this.entity) {
          worldPosition = this.rotOffset(worldPosition, rotationX, rotationY, rotationZ);
          worldPosition.add(basePosition);
        }

        const matrix = new THREE.Matrix4();
        matrix.compose(worldPosition, quaternion, scale);
        mesh.matrixWorld = matrix;
        mesh.Matrixlocal = new THREE.Matrix4().getInverse(globalMatrix).multiply(matrix).clone();
        mesh.MatrixdoorWorld = globalMatrix.clone();
        mesh.repeaty = 1;
        mesh.repeatx = 1;
        mesh.offsety = 0;
        mesh.offsetx = 0;

        currentZOffset -= segmentHeight;
      }

      if (this.meshes.length === 3) {
        this.meshes.splice(2, 1);
      }
    } else {
      if (this.meshes.length > segmentCount) {
        this.meshes.length = segmentCount;
      } else {
        while (this.meshes.length < segmentCount) {
          const clonedMesh = { ...this.meshes[2] };
          this.meshes.push(clonedMesh);
        }
      }

      const segmentHeight = this.entity.ZSize / this.meshes.length;
      const meshIndices = [0];
      for (let i = 2; i < this.meshes.length; ++i) {
        meshIndices.push(i);
      }
      meshIndices.push(1);

      const middleMeshBounding = this.meshBoundings.get(this.meshes[2].obj_name);
      if (!middleMeshBounding) {
        return;
      }

      const middleMeshSize = middleMeshBounding.getSize();

      meshIndices.forEach((index) => {
        const mesh = this.meshes[index];
        let meshSize = middleMeshSize;

        if (this.meshBoundings.has(mesh.obj_name)) {
          const bounding = this.meshBoundings.get(mesh.obj_name);
          if (bounding) {
            meshSize = bounding.getSize();
          }
        }

        const scale = new THREE.Vector3(
          entityWidth / meshSize.x,
          segmentHeight / meshSize.y,
          1
        );

        const localPosition = {
          x: 0,
          y: 0,
          z: currentZOffset - segmentHeight / 2,
        };

        const offsetCenter = mesh.offsetcenter;
        if (offsetCenter) {
          localPosition.x += offsetCenter.x;
          localPosition.y += offsetCenter.z;
          localPosition.z += offsetCenter.y * scale.y;
        }

        let worldPosition = new THREE.Vector3(localPosition.x, localPosition.y, localPosition.z);

        if (this.entity) {
          worldPosition = this.rotOffset(worldPosition, rotationX, rotationY, rotationZ);
          worldPosition.add(basePosition);
        }

        const matrix = new THREE.Matrix4();
        matrix.compose(worldPosition, quaternion, scale);
        mesh.matrixWorld = matrix;
        mesh.Matrixlocal = new THREE.Matrix4().getInverse(globalMatrix).multiply(matrix).clone();
        mesh.MatrixdoorWorld = globalMatrix.clone();
        mesh.repeaty = 1;
        mesh.repeatx = 1;
        mesh.offsety = 0;
        mesh.offsetx = 0;

        currentZOffset -= segmentHeight;
      });
    }
  }
}