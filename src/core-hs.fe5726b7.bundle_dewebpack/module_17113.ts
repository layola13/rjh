import HeadLightRule from './HeadLightRule';
import WindowLightRule from './WindowLightRule';
import { RuleTypeEnum } from './RuleTypeEnum';
import { isTemplateV3 } from './templateUtils';

interface RoomInfo {
  getGeometry(): THREE.Vector2[];
  getLightContents(): LightContent[];
}

interface LightContent {
  accept(visitor: any, roomInfo: RoomInfo, parameter: LayoutParameter): LightAcceptResult | null;
}

interface LightAcceptResult {
  lights: LightData[];
}

interface LayoutParameter {
  temperature?: number;
  templateKey?: string;
  [key: string]: any;
}

interface LightData {
  position: THREE.Vector3;
  type: number;
  ies?: number;
  ruleType?: RuleTypeEnum;
  [key: string]: any;
}

interface LightNeighbor {
  light: LightData;
  neighbors: LightData[];
}

const TEMPERATURE_DEFAULT = 4000;
const DISTANCE_THRESHOLD_MIN = 0.29;
const DISTANCE_THRESHOLD_MID = 0.49;
const NEIGHBOR_DISTANCE = 0.4;
const HEAD_LIGHT_DISTANCE = 0.5;

class BaseLayout {
  protected _roomInfo: RoomInfo | undefined;
  protected _parameter: LayoutParameter | undefined;

  constructor() {
    this._roomInfo = undefined;
    this._parameter = undefined;
  }

  init(roomInfo: RoomInfo, parameter?: LayoutParameter): void {
    this._roomInfo = roomInfo;
    this._parameter = Object.assign(
      {
        temperature: TEMPERATURE_DEFAULT
      },
      parameter
    );
  }

  layout(visitor: any, context: any, parameter?: LayoutParameter): LightData[] | null {
    if (!this._roomInfo) {
      return null;
    }

    let lights: LightData[] = [];

    const headLights = new HeadLightRule(undefined, RuleTypeEnum.HeadLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      context
    );
    if (headLights) {
      lights.push(...headLights);
    }

    const windowLights = new WindowLightRule(undefined, RuleTypeEnum.WindowLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      context
    );
    if (windowLights) {
      lights.push(...windowLights);
    }

    this._roomInfo.getLightContents().forEach((content) => {
      const result = content.accept(visitor, this._roomInfo!, this._parameter!);
      if (result) {
        lights.push(...result.lights);
      }
    });

    try {
      let processedLights = this._postProcess1(lights);
      if (processedLights && Array.isArray(processedLights)) {
        lights = processedLights;
      }

      processedLights = this._postProcess2(lights);
      if (processedLights && Array.isArray(processedLights)) {
        lights = processedLights;
      }

      if (
        this._parameter?.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        this._parameter?.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        processedLights = this._postProcess3(lights);
        if (processedLights && Array.isArray(processedLights)) {
          lights = processedLights;
        }
      }
    } catch (error) {
      HSCore.Logger.console.log(
        `Post process light data failed.\n${error instanceof Error ? error.stack : error}`
      );
    }

    return lights;
  }

  protected _postProcess1(lights: LightData[]): LightData[] {
    const filteredLights: LightData[] = [];
    const roomGeometry = this._roomInfo!.getGeometry();

    lights.forEach((light) => {
      const { position, type, ies, ruleType } = light;

      if (!position) {
        filteredLights.push(light);
        return;
      }

      if (
        type === HSCore.Model.LightTypeEnum.SpotLight &&
        ruleType !== RuleTypeEnum.DecorativePictureRule
      ) {
        const position2D = new THREE.Vector2(position.x, position.y);
        const distanceToWall = HSCore.Util.Math.closestDistanceToPolygon(position2D, roomGeometry);

        if (distanceToWall < DISTANCE_THRESHOLD_MIN) {
          return;
        }

        if (
          distanceToWall < DISTANCE_THRESHOLD_MID &&
          ies === HSConstants.RenderLight.SPOT_LIGHT_NUM_5
        ) {
          light.ies = HSConstants.RenderLight.SPOT_LIGHT_NUM_7;
        }
      }

      filteredLights.push(light);
    });

    return filteredLights;
  }

  protected _postProcess2(lights: LightData[]): LightData[] {
    const getIesValue = (ies: number): number => {
      switch (ies) {
        case HSConstants.RenderLight.SPOT_LIGHT_NUM_5:
          return 5;
        case HSConstants.RenderLight.SPOT_LIGHT_NUM_7:
          return 7;
        default:
          return 0;
      }
    };

    const spotLights = lights.filter((light) => light.type === HSCore.Model.LightTypeEnum.SpotLight);
    const otherLights = lights.filter((light) => !spotLights.includes(light));
    const lightsWithNeighbors: LightNeighbor[] = [];
    const isolatedLights: LightData[] = [];

    spotLights.forEach((light, index, array) => {
      const lightPosition = new THREE.Vector2(light.position.x, light.position.y);
      const neighbors = array.filter((otherLight, otherIndex) => {
        if (index === otherIndex) {
          return false;
        }
        const otherPosition = new THREE.Vector2(otherLight.position.x, otherLight.position.y);
        return otherPosition.sub(lightPosition).length() < NEIGHBOR_DISTANCE;
      });

      if (neighbors.length !== 0) {
        lightsWithNeighbors.push({
          light,
          neighbors
        });
      } else {
        isolatedLights.push(light);
      }
    });

    if (lightsWithNeighbors.length !== 0) {
      lightsWithNeighbors.sort((a, b) => b.neighbors.length - a.neighbors.length);
      lightsWithNeighbors.sort((a, b) => getIesValue(a.light.ies!) - getIesValue(b.light.ies!));

      const excludedLights: LightData[] = [];
      lightsWithNeighbors.forEach((item) => {
        if (!excludedLights.includes(item.light)) {
          otherLights.push(item.light);
          excludedLights.push(...item.neighbors);
        }
      });

      otherLights.push(...isolatedLights);
    } else {
      otherLights.push(...spotLights);
    }

    return otherLights;
  }

  protected _postProcess3(lights: LightData[]): LightData[] {
    const spotLights = lights.filter((light) => light.type === HSCore.Model.LightTypeEnum.SpotLight);
    const headLights = lights.filter((light) => light.ruleType === RuleTypeEnum.HeadLightRule);
    const otherLights = lights.filter((light) => !headLights.includes(light));

    const validHeadLights = headLights.filter((headLight) => {
      return !spotLights.some((spotLight) => {
        const spotPosition = new THREE.Vector2(spotLight.position.x, spotLight.position.y);
        const headPosition = new THREE.Vector2(headLight.position.x, headLight.position.y);
        return headPosition.sub(spotPosition).length() < HEAD_LIGHT_DISTANCE;
      });
    });

    otherLights.push(...validHeadLights);
    return otherLights;
  }
}

class DefaultLayout extends BaseLayout {}

class BedroomLayout extends BaseLayout {}

class LivingRoomLayout extends BaseLayout {}

class DiningRoomLayout extends BaseLayout {}

class LivingDiningRoomLayout extends BaseLayout {}

class BathroomLayout extends BaseLayout {}

class KitchenLayout extends BaseLayout {
  layout(visitor: any, context: any, parameter?: LayoutParameter): LightData[] | null {
    if (parameter && isTemplateV3(parameter.templateKey)) {
      return super.layout(visitor, context, parameter);
    }

    if (!this._roomInfo) {
      return null;
    }

    const lights: LightData[] = [];
    const headLights = new HeadLightRule(undefined, RuleTypeEnum.HeadLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      undefined
    );

    if (headLights) {
      lights.push(...headLights);
    }

    return lights;
  }
}

export default class LayoutFactory {
  static createLayoutByType(roomType: number): BaseLayout {
    switch (roomType) {
      case HSCore.Model.RoomTypeEnum.Bedroom:
      case HSCore.Model.RoomTypeEnum.MasterBedroom:
      case HSCore.Model.RoomTypeEnum.SecondBedroom:
      case HSCore.Model.RoomTypeEnum.KidsRoom:
      case HSCore.Model.RoomTypeEnum.ElderlyRoom:
      case HSCore.Model.RoomTypeEnum.NannyRoom:
        return new BedroomLayout();
      case HSCore.Model.RoomTypeEnum.LivingRoom:
        return new LivingRoomLayout();
      case HSCore.Model.RoomTypeEnum.DiningRoom:
        return new DiningRoomLayout();
      case HSCore.Model.RoomTypeEnum.LivingDiningRoom:
        return new LivingDiningRoomLayout();
      case HSCore.Model.RoomTypeEnum.Kitchen:
        return new KitchenLayout();
      case HSCore.Model.RoomTypeEnum.Bathroom:
      case HSCore.Model.RoomTypeEnum.MasterBathroom:
      case HSCore.Model.RoomTypeEnum.SecondBathroom:
        return new BathroomLayout();
      default:
        return new DefaultLayout();
    }
  }
}