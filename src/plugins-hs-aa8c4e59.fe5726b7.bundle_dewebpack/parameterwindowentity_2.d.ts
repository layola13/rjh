import { AcceptEntity } from './AcceptEntity';
import { HSCore, HSConstants, HSCatalog } from './HSCore';
import { Loop } from './Loop';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { Utils } from './Utils';
import { ParameterWindowPocketEntity } from './ParameterWindowPocketEntity';
import { ParameterWindowSillStoneEntity } from './ParameterWindowSillStoneEntity';
import { genEntityTypeFromContent, genCategoryDataFromContent, checkBelongTwoRooms } from './EntityUtils';

/**
 * Window parameters configuration
 */
interface WindowParameters {
  /** Distance from window bottom to floor (in database units) */
  distanceToFloor: number;
}

/**
 * Window dimension data
 */
interface WindowDimensions {
  /** Window width */
  width: number;
  /** Window height */
  height: number;
  /** Window depth/thickness */
  depth: number;
  /** Ground clearance height */
  groundClearance: number;
}

/**
 * ParameterWindowEntity - Represents a parametric window entity in the 3D model
 * 
 * This entity handles various window types including:
 * - Ordinary windows
 * - Corner windows
 * - Corner bay windows
 * 
 * It processes geometric data, dimensions, and relationships with parent elements.
 */
export class ParameterWindowEntity extends AcceptEntity {
  /**
   * Builds child entities for the window, including pockets and window sills
   * 
   * @param content - The model content containing children and properties
   */
  protected buildChildren(content: HSCore.Model.NCustomizedModelMolding): void {
    // Process customized model molding children
    if (content.children) {
      const moldingChildren = Object.values(content.children).filter(
        (child): child is HSCore.Model.NCustomizedModelMolding => 
          child instanceof HSCore.Model.NCustomizedModelMolding
      );

      for (const child of moldingChildren) {
        const pocketEntity = new ParameterWindowPocketEntity().accept(child);
        this.addChild(pocketEntity);
      }
    }

    // Add window sill if property exists
    const hasWindowSill = content.properties.get('cstCZ');
    if (hasWindowSill) {
      const windowSillId = HSCore.Util.IDGenerator.generate(
        undefined,
        HSCore.Util.IDGeneratorType.Entity
      );
      const windowSill = new HSCore.Model.Parametrization.WindowSill(windowSillId);
      const sillEntity = new ParameterWindowSillStoneEntity(this, content).accept(windowSill);
      this.addChild(sillEntity);
    }
  }

  /**
   * Builds entity metadata including type and category
   * 
   * @param content - The model content to extract data from
   */
  protected buildEntityData(content: HSCore.Model.NCustomizedModelMolding): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  /**
   * Extracts and constructs instance data for the window entity
   * 
   * Handles different window types:
   * - Ordinary windows: Uses standard width/height/depth
   * - Corner windows: Combines left and right widths
   * - Corner bay windows: Uses specific bay window dimensions
   * 
   * @param content - The model content containing window properties
   * @returns Instance data with all parameters
   */
  protected getInstanceData(content: HSCore.Model.NCustomizedModelMolding): InstanceData {
    const instanceData = new InstanceData(content.id);

    // Calculate projected area from path segments
    const loop = new Loop(content.pathSegments);
    const projectedArea = Math.abs(loop.calcArea());

    // Initialize window parameters
    const parameters: WindowParameters = {
      distanceToFloor: 0
    };

    // Extract basic window dimensions
    const ordinaryWidth = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth
    )?.value ?? 0;

    const ordinaryHeight = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight
    )?.value ?? 0;

    const ordinaryDepth = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowDepth
    )?.value ?? 0;

    const ordinaryGroundClearance = content.getPropertiesNode(
      HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowGroundClearance
    )?.value ?? 0;

    // Convert dimensions to database units
    let [width, height, depth] = Utils.convertLengthToDatabaseUnit([
      ordinaryWidth,
      ordinaryHeight,
      ordinaryDepth
    ]);

    parameters.distanceToFloor = Utils.convertLengthToDatabaseUnit([ordinaryGroundClearance])[0];

    // Handle corner window dimensions
    if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerWindow) ||
      content.contentType.isTypeOf('corner window')
    ) {
      const leftWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerWindowLeftWidth
      )?.value ?? 0;

      const rightWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerWindowRightWidth
      )?.value ?? 0;

      const [convertedLeftWidth, convertedRightWidth] = Utils.convertLengthToDatabaseUnit([
        leftWidth,
        rightWidth
      ]);

      width = convertedLeftWidth + convertedRightWidth;
    }
    // Handle corner bay window dimensions
    else if (content.contentType.isTypeOf('corner bay window')) {
      const bayLeftWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowLeftWidth
      )?.value ?? 0;

      const bayRightWidth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowRightWidth
      )?.value ?? 0;

      const [convertedBayLeftWidth, convertedBayRightWidth] = Utils.convertLengthToDatabaseUnit([
        bayLeftWidth,
        bayRightWidth
      ]);

      width = convertedBayLeftWidth + convertedBayRightWidth;

      const bayHeight = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowHeight
      )?.value ?? 0;
      height = Utils.convertLengthToDatabaseUnit([bayHeight])[0];

      const bayLeftDepth = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowLeftDepth
      )?.value ?? 0;
      depth = Utils.convertLengthToDatabaseUnit([bayLeftDepth])[0];

      const bayGroundClearance = content.getPropertiesNode(
        HSConstants.ParametricDoorWindowSystemVariablesName.CornerBayWindowGroundClearance
      )?.value ?? 0;
      parameters.distanceToFloor = Utils.convertLengthToDatabaseUnit([bayGroundClearance])[0];
    }

    // Calculate area
    const calculatedArea = width * height;

    // Get parent layer ID
    const parentId = content.parent?.id;
    const layerId = content.parent?.id;

    // Get rotation values
    const rotation: [number, number, number] = [
      content.XRotation,
      content.YRotation,
      content.ZRotation
    ];

    // Get host and room information
    const host = content.getHost();
    const room = HSCore.Util.Room.getRoomContentIn(content);

    // Add all parameters to instance data
    instanceData.addParameter(
      new Parameter('parentId', parentId, DataType.String),
      new Parameter('rotation', rotation, DataType.ArrayPoint3D),
      new Parameter('size', Utils.formatNumberPoints([width, height, depth]), DataType.ArrayPoint3D),
      new Parameter('area', Utils.formatNumberPoints(calculatedArea), DataType.Number),
      new Parameter('projectArea', Utils.formatNumberPoints(projectedArea), DataType.Number),
      new Parameter('parameters', parameters, DataType.Object),
      new Parameter('layerId', layerId, DataType.String),
      new Parameter('isBelongTwoRooms', checkBelongTwoRooms(content), DataType.Boolean),
      new Parameter('realSize', Utils.formatNumberPoints([width, depth, height]), DataType.ArrayPoint3D),
      new Parameter('roomId', room?.id, DataType.String),
      new Parameter('hostId', host?.id, DataType.String)
    );

    return instanceData;
  }
}