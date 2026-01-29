import { HSCore } from './HSCore';
import { PaveEntity } from './PaveEntity';
import { Utils } from './Utils';

interface MixPaintData {
  mixPaint: any;
  srcEntity: HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel;
  faceType: number;
  outline?: any[];
  faceOwnerId?: string;
}

export class DIYCollector {
  static collect(
    content: any,
    context: any
  ): PaveEntity[] {
    const results: PaveEntity[] = [];

    content.forEachContent((entity: any) => {
      if (
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed) ||
        (!(entity instanceof HSCore.Model.CustomizedModel) &&
          !(entity instanceof HSCore.Model.NCustomizedFeatureModel))
      ) {
        return;
      }

      const processFace = (
        faceType: number,
        includeFaceOwnerId: boolean
      ): PaveEntity | null => {
        const faceMaterial = entity.getFaceMaterial(faceType);

        if (!faceMaterial?.mixpaint) {
          return null;
        }

        if (!Utils.isFaceGroupIndependentOutput()) {
          const faceGroupIds = faceMaterial.mixpaint.faceGroup.getFaceIds();
          if (faceGroupIds && faceGroupIds.length > 1 && faceGroupIds[0] !== faceType) {
            return null;
          }
        }

        let outline: any[] | undefined;

        if (
          entity instanceof HSCore.Model.NCustomizedFeatureModel &&
          HSCore.Util.NCustomizedFaceGroup.isFaceGroup(entity, faceType)
        ) {
          const needClearRCP = HSCore.Util.NCustomizedFaceGroup.faceGroupNeedClearRCP(
            entity,
            faceType
          );
          outline = [HSCore.Util.NCustomizedFaceGroup.getPaveOutline(entity, faceType, needClearRCP)];
        }

        const mixPaintData: MixPaintData = includeFaceOwnerId
          ? {
              mixPaint: faceMaterial.mixpaint,
              srcEntity: entity,
              faceType,
              outline,
              faceOwnerId: entity.getHost().id
            }
          : {
              mixPaint: faceMaterial.mixpaint,
              srcEntity: entity,
              faceType,
              outline
            };

        return new PaveEntity().accept(mixPaintData, context);
      };

      Utils.getExportDIYFaces(entity).forEach((faceType: number) => {
        const paveEntity = processFace(faceType, false);
        if (paveEntity) {
          results.push(paveEntity);
        }
      });

      Utils.getExportDIYFaces(entity, true).forEach((faceType: number) => {
        const paveEntity = processFace(faceType, true);
        if (paveEntity) {
          results.push(paveEntity);
        }
      });
    });

    return results;
  }
}