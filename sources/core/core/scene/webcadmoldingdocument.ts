import { Logger } from './Logger';

interface PlaneOption {
  independent: boolean;
}

interface PlaneData {
  paths: THREE.Vector3[][];
  plane: THREE.Plane;
  planeOption: PlaneOption;
  xRay: THREE.Vector3;
}

interface DirInfo {
  verticalLine: THREE.Vector3;
  dir: 'left' | 'right' | 'outer' | 'inner';
}

interface HostPathsWithDirInfo extends DirInfo {
  wholePaths: THREE.Vector3[][];
}

interface ProfileData {
  data?: {
    profile?: unknown;
    profileHigh?: unknown;
  };
  profile?: unknown;
  profileHigh?: unknown;
}

interface MoldingData {
  paths: THREE.Vector3[][];
  wholePaths: THREE.Vector3[][];
  verticalLine: THREE.Vector3;
  dir: 'left' | 'right' | 'outer' | 'inner';
  profileData?: ProfileData;
  bKeepProfileCordinate: boolean;
}

interface AddMoldingParams {
  name: string;
  paths: THREE.Vector3[][];
  wholePaths: THREE.Vector3[][];
  dirInfo: DirInfo;
  profileData?: ProfileData;
  bKeepProfileCordinate?: boolean;
}

interface DocumentJSON {
  isDuringFastComputation: boolean;
  customData?: {
    uvBasePoints: THREE.Vector3[];
  };
  cachedID?: string;
}

interface SketchModelData {
  type: string;
}

interface GraphicsFace {
  sketchModelData: SketchModelData;
}

interface GraphicsData {
  faces: GraphicsFace[];
}

declare const WebCADModelAPI: {
  addPaths(doc: DocumentJSON, paths: PlaneData[]): DocumentJSON;
  addPathsAsync(doc: DocumentJSON, paths: PlaneData[]): Promise<DocumentJSON>;
  addMolding(
    doc: DocumentJSON,
    path: THREE.Vector3[],
    wholePath: THREE.Vector3[],
    profileData: ProfileData | undefined,
    param4: boolean,
    param5: boolean,
    keepCoordinate: boolean
  ): DocumentJSON;
  addMoldingAsync(
    doc: DocumentJSON,
    path: THREE.Vector3[],
    wholePath: THREE.Vector3[],
    profileData: ProfileData | undefined,
    param4: boolean,
    param5: boolean,
    keepCoordinate: boolean
  ): Promise<DocumentJSON>;
  getGraphicsData(doc: DocumentJSON, highRes: boolean): GraphicsData;
  getGraphicsDataAsync(doc: DocumentJSON, highRes: boolean): Promise<GraphicsData>;
};

export class WebCadMoldingDocument {
  public dirty: boolean = true;
  private _moldings: Map<string, MoldingData> = new Map();
  private _documentJSON?: DocumentJSON = undefined;
  private _meshes?: GraphicsFace[] = undefined;
  private _highResolutionMeshes?: GraphicsFace[] = undefined;

  private _setPlane(
    paths: THREE.Vector3[][],
    planeDataArray: PlaneData[],
    direction: 'left' | 'right' | 'outer' | 'inner'
  ): void {
    if (THREE.ShapeUtils.isClockWise(paths) || paths.reverse(), paths[0].length >= 3) {
      const plane = new THREE.Plane().setFromCoplanarPoints(
        paths[0][0],
        paths[0][1],
        paths[0][2]
      );

      if (direction === 'right') {
        plane.normal = plane.normal.multiplyScalar(-1);
      }
      if (direction === 'outer') {
        plane.normal = plane.normal.multiplyScalar(-1);
      }
      if (direction === 'inner') {
        plane.normal = plane.normal.multiplyScalar(-1);
      }

      planeDataArray.push({
        paths,
        plane,
        planeOption: {
          independent: true
        },
        xRay: new THREE.Vector3().subVectors(paths[0][1], paths[0][0])
      });
    }
  }

  private _getHostPathsWithDirInfo(
    moldingData: HostPathsWithDirInfo,
    planeDataArray: PlaneData[]
  ): void {
    const pathInfo: Partial<HostPathsWithDirInfo> = {};
    pathInfo.verticalLine = moldingData.verticalLine;
    pathInfo.dir = moldingData.dir;

    moldingData.wholePaths.forEach((path) => {
      const offsetPoints: THREE.Vector3[] = [];
      let planePaths: THREE.Vector3[][] = [];

      for (let i = 1; i < path.length; i++) {
        let normalVector: THREE.Vector3 | undefined;
        let bisectorVector: THREE.Vector3 | undefined;
        planePaths = [];

        const startPoint = new THREE.Vector3().copy(path[i - 1]);
        const endPoint = new THREE.Vector3().copy(path[i]);
        const direction = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();

        switch (pathInfo.dir) {
          case 'left':
            normalVector = new THREE.Vector3()
              .crossVectors(direction.multiplyScalar(-1), pathInfo.verticalLine!)
              .normalize();
            break;

          case 'right':
            normalVector = new THREE.Vector3()
              .crossVectors(direction.multiplyScalar(-1), pathInfo.verticalLine!)
              .normalize()
              .multiplyScalar(-1);

            const prevPoint = i - 2 >= 0 ? new THREE.Vector3().copy(path[i - 2]) : undefined;
            if (prevPoint) {
              const currentDir = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
              const prevDir = new THREE.Vector3().subVectors(prevPoint, startPoint).normalize();
              bisectorVector = new THREE.Vector3().addVectors(currentDir, prevDir).normalize();
            }

            let offsetVector = bisectorVector ?? normalVector;
            offsetVector.multiplyScalar(0.05);

            if (i - 1 === 0) {
              offsetVector = normalVector.multiplyScalar(0.05);
            }

            offsetPoints.push(offsetVector.add(path[i - 1]));
            break;

          case 'outer':
            normalVector = new THREE.Vector3().copy(pathInfo.verticalLine!).multiplyScalar(-1);
            break;

          case 'inner':
            normalVector = new THREE.Vector3().copy(pathInfo.verticalLine!);
            break;
        }

        if (normalVector && pathInfo.dir !== 'right') {
          planePaths.push([
            new THREE.Vector3().add(path[i - 1]),
            new THREE.Vector3().add(path[i]),
            new THREE.Vector3(normalVector.x, normalVector.y, normalVector.z)
              .multiplyScalar(0.001)
              .add(path[i]),
            new THREE.Vector3(normalVector.x, normalVector.y, normalVector.z)
              .multiplyScalar(0.001)
              .add(path[i - 1])
          ]);
          this._setPlane(planePaths, planeDataArray, pathInfo.dir!);
        }
      }

      if (offsetPoints.length > 0) {
        offsetPoints.reverse();
        let modifiedPath = path.map((point) => new THREE.Vector3().copy(point));
        modifiedPath = modifiedPath.concat(offsetPoints);
        planePaths = [];
        planePaths.push(modifiedPath);
        this._setPlane(planePaths, planeDataArray, pathInfo.dir!);
      }
    });
  }

  private _getHostPaths(): PlaneData[] {
    const hostPaths: PlaneData[] = [];
    this._moldings.forEach((molding) => {
      this._getHostPathsWithDirInfo(molding, hostPaths);
    });
    return hostPaths;
  }

  public compute(): void {
    if (this.dirty) {
      let documentJSON: DocumentJSON = {
        isDuringFastComputation: true
      };

      const hostPaths = this._getHostPaths();
      const uvBasePoints: THREE.Vector3[] = [];

      hostPaths.forEach((planeData) => {
        planeData.paths.forEach((path) => {
          uvBasePoints.push(path[0]);
        });
      });

      if (hostPaths.length) {
        documentJSON = WebCADModelAPI.addPaths(documentJSON, hostPaths);

        if (documentJSON.customData) {
          documentJSON.customData.uvBasePoints = uvBasePoints;
          documentJSON.cachedID = undefined;
        }

        this._moldings.forEach((molding) => {
          const paths = molding.paths;
          const wholePaths = molding.wholePaths;

          for (let i = 0; i < paths.length; ++i) {
            documentJSON.isDuringFastComputation = true;
            documentJSON = WebCADModelAPI.addMolding(
              documentJSON,
              paths[i],
              wholePaths[i],
              molding.profileData,
              false,
              false,
              molding.bKeepProfileCordinate
            );
          }
        });
      }

      this._documentJSON = documentJSON;
      this._meshes = WebCADModelAPI.getGraphicsData(documentJSON, false).faces;
      this.dirty = false;
    }
  }

  public async computeAsync(highResolution: boolean): Promise<void> {
    if (this.dirty || highResolution) {
      let documentJSON: DocumentJSON = {
        isDuringFastComputation: true
      };

      let hostPaths: PlaneData[] = [];
      try {
        hostPaths = this._getHostPaths();
      } catch (error) {
        hostPaths = [];
        Logger.console.error('GeometryMolding Path Error.');
      }

      const uvBasePoints: THREE.Vector3[] = [];
      hostPaths.forEach((planeData) => {
        planeData.paths.forEach((path) => {
          uvBasePoints.push(path[0]);
        });
      });

      if (hostPaths.length) {
        documentJSON = await WebCADModelAPI.addPathsAsync(documentJSON, hostPaths);

        if (documentJSON.customData) {
          documentJSON.customData.uvBasePoints = uvBasePoints;
          documentJSON.cachedID = undefined;
        }

        const moldingsArray = Array.from(this._moldings.values());
        for (let moldingIndex = 0; moldingIndex < moldingsArray.length; ++moldingIndex) {
          const molding = moldingsArray[moldingIndex];
          const paths = molding.paths;
          const wholePaths = molding.wholePaths;

          for (let pathIndex = 0; pathIndex < paths.length; ++pathIndex) {
            documentJSON.isDuringFastComputation = true;

            let profileData = molding.profileData;
            if (highResolution && profileData) {
              profileData = { ...profileData };
              if (profileData.data) {
                profileData.data.profile = profileData.data.profileHigh ?? profileData.data.profile;
              } else {
                profileData.profile = profileData.profileHigh ?? profileData.profile;
              }
            }

            documentJSON = await WebCADModelAPI.addMoldingAsync(
              documentJSON,
              paths[pathIndex],
              wholePaths[pathIndex],
              profileData,
              false,
              false,
              molding.bKeepProfileCordinate
            );
          }
        }
      }

      if (highResolution) {
        const graphicsData = await WebCADModelAPI.getGraphicsDataAsync(documentJSON, false);
        this._highResolutionMeshes = graphicsData.faces;
      } else {
        this._documentJSON = documentJSON;
        const graphicsData = await WebCADModelAPI.getGraphicsDataAsync(documentJSON, false);
        this._meshes = graphicsData.faces;
        this.dirty = false;
      }
    }
  }

  public getGraphicsData(): GraphicsFace[] {
    this.compute();
    return (this._meshes ?? []).filter((face) => face.sketchModelData.type === 'MOLDING');
  }

  public async getGraphicsDataAsync(highResolution: boolean): Promise<GraphicsFace[]> {
    await this.computeAsync(highResolution);

    if (highResolution) {
      const highResFaces = (this._highResolutionMeshes ?? []).filter(
        (face) => face.sketchModelData.type === 'MOLDING'
      );
      this._highResolutionMeshes = undefined;
      return highResFaces;
    }

    return (this._meshes ?? []).filter((face) => face.sketchModelData.type === 'MOLDING');
  }

  public getDocumentJSON(): DocumentJSON | undefined {
    this.compute();
    return this._documentJSON;
  }

  public addMolding(params: AddMoldingParams): this {
    const moldingData: MoldingData = {
      paths: params.paths,
      wholePaths: params.wholePaths,
      verticalLine: params.dirInfo.verticalLine ?? new THREE.Vector3(0, 0, 1),
      dir: params.dirInfo.dir ?? 'inner',
      profileData: params.profileData,
      bKeepProfileCordinate: params.bKeepProfileCordinate ?? true
    };

    const existingMolding = this._moldings.get(params.name);

    if (JSON.stringify(moldingData) !== JSON.stringify(existingMolding)) {
      this._moldings.set(params.name, moldingData);
      this.dirty = true;
    }

    return this;
  }
}