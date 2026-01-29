import { MixPaveApi, RegionApi } from './path/to/857121';

abstract class StateRequest {
  abstract onCommit(): void;
}

interface Face {
  material: Material;
  roomInfos: RoomInfo[];
  rawPath2d: unknown;
}

interface RoomInfo {
  beamFaces: Face[];
}

interface Material {
  cloneDeep(): Material;
  clone(): Material;
  mixpaint?: MixPaint;
}

interface MixPaint {
  mixPave: MixPave;
  faceEntity?: Face;
}

interface MixPave {
  regions: unknown[];
  backgroundMaterial: {
    seekId: unknown;
  };
}

declare global {
  namespace HSApp {
    class App {
      floorplan: unknown;
      static getApp(): App;
    }
  }

  namespace HSCore {
    namespace Paint {
      class MaterialUtil {
        static isMixPaintMaterial(material: Material): boolean;
      }
    }

    namespace Model {
      class MixPaint {
        mixPave?: MixPave;
        faceEntity?: Face;
      }
    }
  }
}

export class ApplyToAllBeamFacePaperRequest extends StateRequest {
  private sourceFace: Face;
  private fp: unknown;

  constructor(sourceFace: Face, _n?: unknown) {
    super();
    this.sourceFace = sourceFace;
    this.fp = HSApp.App.getApp().floorplan;
  }

  onCommit(): void {
    const clonedMaterial = this.sourceFace.material.cloneDeep();
    const allBeamFaces: Face[] = [];

    this.sourceFace.roomInfos.forEach((roomInfo) => {
      allBeamFaces.push(...roomInfo.beamFaces);
    });

    if (clonedMaterial.mixpaint) {
      allBeamFaces.forEach((face) => {
        this._setFaceMixpaintMaterial(face, clonedMaterial);
      });
    } else {
      allBeamFaces.forEach((face) => {
        face.material = clonedMaterial.clone();
      });
    }
  }

  private _setFaceMixpaintMaterial(face: Face, material: Material): void {
    const facePath2d = face.rawPath2d;
    const mixPaveApi = new MixPaveApi();
    let mixPave: MixPave;

    if (HSCore.Paint.MaterialUtil.isMixPaintMaterial(material)) {
      mixPave = material.mixpaint!.mixPave;
      new RegionApi().setPath(mixPave.regions[0], facePath2d);
    } else {
      mixPave = mixPaveApi.createMixPave();
      const backgroundMaterialSeekId = mixPave.backgroundMaterial.seekId;
      mixPaveApi.addRegion(mixPave, facePath2d, undefined, backgroundMaterialSeekId);
    }

    material.mixpaint = new HSCore.Model.MixPaint();
    material.mixpaint.mixPave = mixPave;
    face.material = material.clone();
    face.material.mixpaint!.faceEntity = face;
  }
}