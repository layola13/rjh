import { PModel } from './PModel';
import { WebCadMoldingDocument } from './WebCadMoldingDocument';

interface ProfileData {
  seekId: string;
  contentType: string;
  profile: unknown;
  profileSizeX: number;
  profileSizeY: number;
}

interface PathPoint {
  x: number;
  y: number;
  z: number;
}

interface MoldingEntity {
  ID: string;
  seekId: string;
  contentType: string;
  profile: unknown;
  XSize: number;
  YSize: number;
  pathVertLine?: PathPoint;
  profileDir?: unknown;
  bKeepProfileCordinate?: boolean;
  getPaths(): PathPoint[][];
}

interface CacheData {
  profileData: ProfileData;
  paths: PathPoint[][];
}

interface DirectionInfo {
  verticalLine?: THREE.Vector3;
  dir?: unknown;
}

interface MoldingConfig {
  name: string;
  paths: PathPoint[][];
  wholePaths: PathPoint[][];
  profileData: {
    data: ProfileData;
  };
  dirInfo: DirectionInfo;
  bKeepProfileCordinate?: boolean;
}

export class PMolding extends PModel {
  private _webCadDocument: WebCadMoldingDocument;
  private _cache?: string;
  protected entity!: MoldingEntity;

  constructor(entity: MoldingEntity, parameter2: unknown, parameter3: unknown) {
    super(entity, parameter2, parameter3);
    this._webCadDocument = new WebCadMoldingDocument();
  }

  onUpdate(): void {
    const entity = this.entity;
    const paths = entity.getPaths();
    
    let profileDirection: unknown;
    let verticalLine: THREE.Vector3 | undefined;

    if (entity.pathVertLine) {
      verticalLine = new THREE.Vector3(
        entity.pathVertLine.x,
        entity.pathVertLine.y,
        entity.pathVertLine.z
      );
    }

    if (entity.profileDir) {
      profileDirection = entity.profileDir;
    }

    const profileData: ProfileData = {
      seekId: entity.seekId,
      contentType: entity.contentType,
      profile: entity.profile,
      profileSizeX: entity.XSize,
      profileSizeY: entity.YSize
    };

    const cacheData: CacheData = {
      profileData,
      paths
    };

    if (this._cache && this._cache === JSON.stringify(cacheData)) {
      return;
    }

    this._cache = JSON.stringify(cacheData);

    const processedPaths = cacheData.paths;

    for (let i = 0, length = processedPaths.length; i < length; i++) {
      const lastIndex = processedPaths[i].length - 1;
      const firstPoint = processedPaths[i][0];
      const lastPoint = processedPaths[i][lastIndex];
      
      const isClosedPath =
        firstPoint.x === lastPoint.x &&
        firstPoint.y === lastPoint.y &&
        firstPoint.z === lastPoint.z;

      processedPaths[i] = HSCore.Util.Math.removeDuplicatePoints(processedPaths[i]);

      if (isClosedPath) {
        processedPaths[i].push(processedPaths[i][0]);
      }
    }

    const moldingConfig: MoldingConfig = {
      name: this.entity.ID,
      paths: processedPaths,
      wholePaths: processedPaths,
      profileData: {
        data: profileData
      },
      dirInfo: {
        verticalLine,
        dir: profileDirection
      },
      bKeepProfileCordinate: this.entity.bKeepProfileCordinate
    };

    this._webCadDocument.addMolding(moldingConfig);
  }
}