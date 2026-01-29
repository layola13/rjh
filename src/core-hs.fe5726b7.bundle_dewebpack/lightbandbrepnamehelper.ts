import { Logger } from './Logger';

interface UserData {
  id: string;
  tag?: string;
  faceIndex?: number;
}

interface GeometryObject {
  userData?: UserData;
  tag?: string;
}

interface CurveObject {
  userData: UserData;
}

interface PathSegment {
  userData?: {
    tag: string;
  };
}

interface SweepEntity {
  getSweepPath3D(): PathSegment[];
  getSweepProfile(): CurveObject[];
}

type CurveSweepFacesMap = Map<CurveObject, (GeometryObject | undefined)[]>;

export class LightBandBrepnameHelper {
  private static _instance: LightBandBrepnameHelper;
  private topoNameCaches: string[];

  constructor() {
    this.topoNameCaches = [];
  }

  static getInstance(): LightBandBrepnameHelper {
    if (!this._instance) {
      this._instance = new LightBandBrepnameHelper();
    }
    return this._instance;
  }

  reconstructBrepNames(entity: SweepEntity, facesMap: CurveSweepFacesMap): void {
    this.topoNameCaches = [];
    this.toponameFaces(entity, facesMap);
  }

  getCurveSweepFaces(
    curve: CurveObject,
    facesMap: CurveSweepFacesMap
  ): (GeometryObject | undefined)[] | undefined {
    for (const [mapCurve, faces] of facesMap) {
      if (mapCurve.userData && mapCurve.userData.id === curve.userData.id) {
        return faces.filter((face) => face !== undefined);
      }
    }
    return undefined;
  }

  toponameFaces(entity: SweepEntity, facesMap: CurveSweepFacesMap): void {
    const sweepPath = entity.getSweepPath3D();
    const sweepProfile = entity.getSweepProfile();

    for (const curve of sweepProfile) {
      const faces = this.getCurveSweepFaces(curve, facesMap);
      if (!faces) continue;

      for (let index = 0; index < sweepPath.length; index++) {
        const face = faces[index];
        if (!face) continue;

        const pathSegment = sweepPath[index];
        const topologyName = pathSegment.userData
          ? `${curve.userData.id}-${pathSegment.userData.tag}`
          : `${curve.userData.id}-`;

        face.tag = topologyName;
        face.userData = {
          faceIndex: index
        };

        this.checkTopoName(topologyName);
      }
    }
  }

  checkTopoName(name: string): boolean {
    if (this.topoNameCaches.includes(name)) {
      Logger.console.assert(false, '拓扑命名重复，请校核！');
      return false;
    }
    this.topoNameCaches.push(name);
    return true;
  }
}