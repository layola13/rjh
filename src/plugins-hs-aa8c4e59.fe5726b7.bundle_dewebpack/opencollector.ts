import { HSCore } from './HSCore';
import { PaveEntity } from './PaveEntity';

interface MixPaint {
  [key: string]: unknown;
}

interface Material {
  mixpaint?: MixPaint;
}

interface Face {
  id: string;
  material: Material;
}

interface Opening {
  faceList: Face[];
  sideFaces: Face[];
  isDoorStoneMaterialEnabled(): boolean;
  getBottomFace(): Face | null;
}

interface CollectionContext {
  forEachOpening(callback: (opening: Opening) => void): void;
}

interface PaveEntityData {
  mixPaint: MixPaint;
  srcEntity: Face;
  faceType: string;
}

export class OpenCollector {
  static collect(context: CollectionContext, config: unknown): PaveEntity[] {
    const results: PaveEntity[] = [];

    context.forEachOpening((opening: Opening) => {
      if (
        HSCore.Util.Content.isSlabNiche(opening) ||
        HSCore.Util.Content.isWallNiche(opening) ||
        HSCore.Util.Content.isSlabHole(opening)
      ) {
        opening.faceList.forEach((face: Face) => {
          if (face.material.mixpaint) {
            const data: PaveEntityData = {
              mixPaint: face.material.mixpaint,
              srcEntity: face,
              faceType: face.id
            };
            results.push(new PaveEntity().accept(data, config));
          }
        });
      } else if (
        HSCore.Util.Content.isWallOpening(opening) &&
        opening instanceof HSCore.Model.Opening
      ) {
        const isDoorStoneEnabled = opening.isDoorStoneMaterialEnabled();
        const bottomFace = opening.getBottomFace();

        opening.sideFaces.forEach((face: Face) => {
          if (face.material.mixpaint) {
            const data: PaveEntityData = {
              mixPaint: face.material.mixpaint,
              srcEntity: face,
              faceType: face.id
            };

            if (bottomFace && bottomFace.id === face.id) {
              if (isDoorStoneEnabled && bottomFace) {
                results.push(new PaveEntity().accept(data, config));
              }
            } else {
              results.push(new PaveEntity().accept(data, config));
            }
          }
        });
      }
    });

    return results;
  }
}