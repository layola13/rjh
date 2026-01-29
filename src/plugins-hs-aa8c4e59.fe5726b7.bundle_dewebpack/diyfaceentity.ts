import { ModelClassName } from './ModelClassName';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { AcceptEntity } from './AcceptEntity';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

interface FaceBuildData {
  faceId: string | number;
  content: ContentObject;
}

interface ContentObject {
  id: string;
  getFaceMaterial(faceId: string | number): FaceMaterial | null | undefined;
  getNormalFaceMaterialData(faceId: string | number): NormalFaceMaterialData;
}

interface FaceMaterial {
  mixpaint?: {
    id: string;
  };
}

interface NormalFaceMaterialData {
  seekId: string;
}

interface BoundingSize {
  width: number;
  height: number;
}

interface CurvePath {
  outer: unknown;
  holes?: unknown[];
}

interface AreaData {
  fullArea: number;
  validArea: number;
}

interface TwoDimensionalData {
  paveId?: string;
  material?: unknown;
}

export class DIYFaceEntity extends AcceptEntity {
  protected buildChildren(data: unknown): void {
    // Implementation to be provided
  }

  protected buildEntityData(data: FaceBuildData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: ModelClassName.NgFace
    });
  }

  private getInstanceData(data: FaceBuildData): InstanceData {
    const instanceData = new InstanceData(data.faceId);
    
    const boundingSize: BoundingSize = HSCore.Paint.PaintsUtil.getPaintBoundingSize(
      data.content,
      data.faceId
    );
    const sizeArray: number[] = [boundingSize.width, boundingSize.height];
    instanceData.addParameter(
      new Parameter('size', Utils.formatNumberPoints(sizeArray), DataType.ArrayPoint2D)
    );

    const curvePath: CurvePath = HSCore.Util.BackgroundPath.getCurvePath(
      data.content,
      data.faceId
    );
    const areaData: AreaData = {
      fullArea: Utils.getAreaByCurve2D(curvePath.outer),
      validArea: Utils.getArea({
        outer: curvePath.outer,
        holes: curvePath.holes ?? []
      })
    };

    const twoDData: TwoDimensionalData = {};
    
    let faceMaterial = data.content.getFaceMaterial(data.faceId);
    if (faceMaterial?.mixpaint) {
      twoDData.paveId = Utils.isFaceGroupIndependentOutput()
        ? `${data.faceId}, ${faceMaterial.mixpaint.id}`
        : faceMaterial.mixpaint.id;
    } else {
      const normalMaterialData = data.content.getNormalFaceMaterialData(data.faceId);
      if (normalMaterialData.seekId !== 'local' && normalMaterialData.seekId !== 'generated') {
        twoDData.material = Utils.getCategoryData(normalMaterialData);
      }
    }

    instanceData.addParameter(
      new Parameter('area', areaData, DataType.Object),
      new Parameter('2D', twoDData, DataType.Object),
      new Parameter('parentId', data.content.id, DataType.String)
    );

    return instanceData;
  }
}