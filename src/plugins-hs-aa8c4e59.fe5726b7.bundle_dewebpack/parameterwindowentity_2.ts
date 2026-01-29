import { HSCore, HSConstants, HSCatalog } from './HSCore';
import { Loop } from './Loop';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genCategoryDataFromContent, checkBelongTwoRooms } from './EntityUtils';
import { Utils } from './Utils';
import { ParameterWindowPocketEntity } from './ParameterWindowPocketEntity';
import { ParameterWindowSillStoneEntity } from './ParameterWindowSillStoneEntity';
import { AcceptEntity } from './AcceptEntity';

export class ParameterWindowEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(content: HSCore.Model.Content): void {
    if (content.children) {
      const customizedMoldings = Object.values(content.children).filter(
        (child): child is HSCore.Model.NCustomizedModelMolding =>
          child instanceof HSCore.Model.NCustomizedModelMolding
      );

      for (const molding of customizedMoldings) {
        this.addChild(new ParameterWindowPocketEntity().accept(molding));
      }
    }

    if (content.properties.get("cstCZ")) {
      const sillId = HSCore.Util.IDGenerator.generate(
        undefined,
        HSCore.Util.IDGeneratorType.Entity
      );
      const windowSill = new HSCore.Model.Parametrization.WindowSill(sillId);
      this.addChild(new ParameterWindowSillStoneEntity(this, content).accept(windowSill));
    }
  }

  buildEntityData(content: HSCore.Model.Content): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  getInstanceData(content: HSCore.Model.Content): InstanceData {
    const instanceData = new InstanceData(content.id);
    const projectArea = Math.abs(new Loop(content.pathSegments).calcArea());
    const parameters: { distanceToFloor: number } = { distanceToFloor: 0 };

    const ordinaryWidth = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth
    )?.value || 0;
    
    const ordinaryHeight = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight
    )?.value || 0;
    
    const ordinaryDepth = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowDepth
    )?.value || 0;
    
    const groundClearance = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowGroundClearance
    )?.value || 0;

    const size = Utils.convertLengthToDatabaseUnit([ordinaryWidth, ordinaryHeight, ordinaryDepth]);
    parameters.distanceToFloor = Utils.convertLengthToDatabaseUnit([groundClearance])[0];

    if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerWindow) ||
      content.contentType.isTypeOf("corner window")
    ) {
      const cornerLeftWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerWindowLeftWidth
      )?.value || 0;
      
      const cornerRightWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerWindowRightWidth
      )?.value || 0;

      const [leftWidth, rightWidth] = Utils.convertLengthToDatabaseUnit([
        cornerLeftWidth,
        cornerRightWidth
      ]);
      size[0] = leftWidth + rightWidth;
    } else if (content.contentType.isTypeOf("corner bay window")) {
      const bayLeftWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowLeftWidth
      )?.value || 0;
      
      const bayRightWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowRightWidth
      )?.value || 0;

      const [leftWidth, rightWidth] = Utils.convertLengthToDatabaseUnit([
        bayLeftWidth,
        bayRightWidth
      ]);
      size[0] = leftWidth + rightWidth;

      const bayHeight = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowHeight
      )?.value || 0;
      size[1] = Utils.convertLengthToDatabaseUnit([bayHeight])[0];

      const bayLeftDepth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowLeftDepth
      )?.value || 0;
      size[2] = Utils.convertLengthToDatabaseUnit([bayLeftDepth])[0];

      const bayGroundClearance = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowGroundClearance
      )?.value || 0;
      parameters.distanceToFloor = Utils.convertLengthToDatabaseUnit([bayGroundClearance])[0];
    }

    instanceData.addParameter(
      new Parameter("parentId", content.parent?.id, DataType.String),
      new Parameter(
        "rotation",
        [content.XRotation, content.YRotation, content.ZRotation],
        DataType.ArrayPoint3D
      ),
      new Parameter("size", Utils.formatNumberPoints(size), DataType.ArrayPoint3D),
      new Parameter("area", Utils.formatNumberPoints(size[0] * size[1]), DataType.Number),
      new Parameter("projectArea", Utils.formatNumberPoints(projectArea), DataType.Number),
      new Parameter("parameters", parameters, DataType.Object),
      new Parameter("layerId", content.parent?.id, DataType.String),
      new Parameter("isBelongTwoRooms", checkBelongTwoRooms(content), DataType.Boolean),
      new Parameter(
        "realSize",
        Utils.formatNumberPoints([size[0], size[2], size[1]]),
        DataType.ArrayPoint3D
      )
    );

    const host = content.getHost();
    const room = HSCore.Util.Room.getRoomContentIn(content);

    instanceData.addParameter(new Parameter("roomId", room?.id, DataType.String));
    instanceData.addParameter(new Parameter("hostId", host?.id, DataType.String));

    return instanceData;
  }
}