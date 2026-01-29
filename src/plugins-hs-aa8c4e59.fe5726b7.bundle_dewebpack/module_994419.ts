import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { wrapPromiseEntities } from './wrapPromiseEntities';
import { registerProvider } from './registerProvider';
import { DIYCollector } from './DIYCollector';
import { OpenCollector } from './OpenCollector';
import { PaveEntity } from './PaveEntity';
import { Utils } from './Utils';

interface MixPaint {
  faceGroup: {
    getFaceIds(): string[];
  };
}

interface Material {
  mixpaint?: MixPaint;
}

interface Face {
  id: string;
  material?: Material;
}

interface SpaceInfo {
  floors?: Face[];
  ceilings?: Face[];
  structureFaces?: Face[];
  beamFaces?: Face[];
}

interface LayerInfo {
  getSpaceInfos(): SpaceInfo[];
}

interface Layer {
  layerInfo: LayerInfo;
}

interface Scene {
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface PaveEntityConfig {
  mixPaint: MixPaint;
  srcEntity: Face;
  faceType: string;
  outline?: unknown[];
}

interface CollectContext {
  // Define based on actual usage in collectors
  [key: string]: unknown;
}

function collectPaveEntities(context: CollectContext): Promise<PaveEntity[]> {
  const entities: PaveEntity[] = [];

  const app: App = HSApp.App.getApp();

  app.floorplan.scene.forEachLayer((layer: Layer) => {
    entities.push(...collectLayerPaveEntities(layer, context));
  });

  app.floorplan.scene.forEachLayer((layer: Layer) => {
    entities.push(...DIYCollector.collect(layer, context));
  });

  app.floorplan.scene.forEachLayer((layer: Layer) => {
    entities.push(...OpenCollector.collect(layer, context));
  });

  return wrapPromiseEntities(entities);
}

function collectLayerPaveEntities(layer: Layer, context: CollectContext): PaveEntity[] {
  const paveEntities: PaveEntity[] = [];
  const processedFaceIds: string[] = [];

  const processFace = (face: Face): void => {
    if (!face.material?.mixpaint || processedFaceIds.includes(face.id)) {
      return;
    }

    if (!Utils.isFaceGroupIndependentOutput()) {
      const faceIds = face.material.mixpaint.faceGroup.getFaceIds();
      if (faceIds && faceIds.length > 1 && faceIds[0] !== face.id) {
        return;
      }
    }

    let outline: unknown[] | undefined;
    if (HSCore.Util.FaceGroup.isFaceGroup(face)) {
      const needClearRCP = HSCore.Util.FaceGroup.faceGroupNeedClearRCP(face);
      outline = [HSCore.Util.FaceGroup.getPaveOutline(face, needClearRCP)];
    }

    const config: PaveEntityConfig = {
      mixPaint: face.material.mixpaint,
      srcEntity: face,
      faceType: face.id,
      outline
    };

    paveEntities.push(new PaveEntity().accept(config, context));
    processedFaceIds.push(face.id);
  };

  layer.layerInfo.getSpaceInfos().forEach((spaceInfo: SpaceInfo) => {
    spaceInfo.floors?.forEach(processFace);
    spaceInfo.ceilings?.forEach(processFace);
    spaceInfo.structureFaces?.forEach(processFace);
    spaceInfo.beamFaces?.forEach((beamFace: Face) => {
      if (Utils.isNotOverlappingBeamFaces(beamFace)) {
        processFace(beamFace);
      }
    });
  });

  return paveEntities;
}

registerProvider(
  {
    type: 'Pave'
  },
  {
    collectEntity: collectPaveEntities
  }
);