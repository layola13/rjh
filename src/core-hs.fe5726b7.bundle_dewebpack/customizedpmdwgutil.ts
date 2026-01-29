import { Matrix4, Vector3 } from './math-library';
import { MixPaveApi, MixPaveDwgDecorator } from './pave-library';

interface BrepsWithPave {
  shell: {
    getFaceByTag(tag: string): Face | undefined;
  };
  faceTagToMixPave: Map<string, string>;
  matrix?: Matrix4;
}

interface Face {
  // Face structure - add specific properties as needed
}

interface PaveInfo {
  outer: unknown;
  holes: unknown;
  paveTo3dMatrix: Matrix4;
}

interface PaveDwgData {
  // DWG data structure - add specific properties as needed
}

interface DwgDataResult {
  paveDwgData: PaveDwgData;
  worldTransform: Matrix4;
}

interface Entity {
  getBrepsWithPave(): BrepsWithPave[] | undefined;
}

interface PaveInfoUtil {
  getFacePaveInfo(faces: Face[]): PaveInfo;
}

declare global {
  namespace DiySdk {
    const PaveInfoUtil: PaveInfoUtil;
  }
}

export class CustomizedPMDwgUtil {
  static getDwgData(
    entity: Entity,
    faceTag: string,
    decoratorOptions: unknown
  ): DwgDataResult | undefined {
    const brepsWithPave = entity.getBrepsWithPave();
    if (!brepsWithPave) return;

    let targetFace: Face | undefined;
    let mixPaveJson: string | undefined;

    const targetBrep = brepsWithPave.find((brep) => {
      mixPaveJson = brep.faceTagToMixPave.get(faceTag);
      targetFace = brep.shell.getFaceByTag(faceTag);
      return !!mixPaveJson;
    });

    if (!targetBrep || !targetFace || !mixPaveJson) return;

    const parsedMixPave = JSON.parse(mixPaveJson);
    if (!parsedMixPave) return;

    const mixPave = new MixPaveApi().loadMixPave(parsedMixPave);
    const facePaveInfo = DiySdk.PaveInfoUtil.getFacePaveInfo([targetFace]);

    const paveRegions = {
      outer: facePaveInfo.outer,
      holes: facePaveInfo.holes
    };

    const paveDwgData = new MixPaveDwgDecorator(mixPave, decoratorOptions).getDwgData([paveRegions]);
    let worldTransform = facePaveInfo.paveTo3dMatrix;

    if (targetBrep.matrix) {
      worldTransform.preMultiply(targetBrep.matrix);
    }

    const MILLIMETERS_TO_METERS = 0.001;
    const scaleMatrix = Matrix4.makeScale(Vector3.O(), MILLIMETERS_TO_METERS);
    worldTransform.preMultiply(scaleMatrix);

    if (!paveDwgData || !worldTransform) return;

    return {
      paveDwgData,
      worldTransform
    };
  }
}