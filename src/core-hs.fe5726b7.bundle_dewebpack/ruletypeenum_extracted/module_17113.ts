import HeadLightRuleVisitor from './HeadLightRuleVisitor';
import WindowLightRuleVisitor from './WindowLightRuleVisitor';
import { RuleTypeEnum } from './RuleTypeEnum';
import { isTemplateV3 } from './TemplateUtils';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface LightData {
  position: Vector3;
  type: number;
  ies?: number;
  ruleType?: RuleTypeEnum;
  intensity?: number;
  color?: number;
}

interface RoomInfo {
  getGeometry(): Vector3[];
  getLightContents(): LightContent[];
}

interface LightContent {
  accept(visitor: unknown, roomInfo: RoomInfo, parameter: LayoutParameter): { lights: LightData[] } | null;
}

interface LayoutParameter {
  temperature?: number;
  templateKey?: string;
  [key: string]: unknown;
}

interface NeighborGroup {
  light: LightData;
  neighbors: LightData[];
}

const DEFAULT_TEMPERATURE = 4000;
const MIN_DISTANCE_THRESHOLD = 0.29;
const IES_CHANGE_THRESHOLD = 0.49;
const NEIGHBOR_DISTANCE_THRESHOLD = 0.4;
const HEADLIGHT_PROXIMITY_THRESHOLD = 0.5;

class BaseLayoutStrategy {
  protected _roomInfo: RoomInfo | undefined;
  protected _parameter: LayoutParameter | undefined;

  constructor() {
    this._roomInfo = undefined;
    this._parameter = undefined;
  }

  init(roomInfo: RoomInfo, parameter?: LayoutParameter): void {
    this._roomInfo = roomInfo;
    this._parameter = {
      temperature: DEFAULT_TEMPERATURE,
      ...parameter
    };
  }

  layout(visitor: unknown, templateData: unknown, parameter?: LayoutParameter): LightData[] | null {
    if (!this._roomInfo) return null;

    let lights: LightData[] = [];

    const headLights = new HeadLightRuleVisitor(undefined, RuleTypeEnum.HeadLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      templateData
    );
    if (headLights) lights.push(...headLights);

    const windowLights = new WindowLightRuleVisitor(undefined, RuleTypeEnum.WindowLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      templateData
    );
    if (windowLights) lights.push(...windowLights);

    this._roomInfo.getLightContents().forEach((content) => {
      const result = content.accept(visitor, this._roomInfo!, this._parameter!);
      if (result) lights.push(...result.lights);
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
    const geometry = this._roomInfo!.getGeometry();

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
        const distance = HSCore.Util.Math.closestDistanceToPolygon(position2D, geometry);

        if (distance < MIN_DISTANCE_THRESHOLD) return;

        if (distance < IES_CHANGE_THRESHOLD && ies === HSConstants.RenderLight.SPOT_LIGHT_NUM_5) {
          light.ies = HSConstants.RenderLight.SPOT_LIGHT_NUM_7;
        }
      }

      filteredLights.push(light);
    });

    return filteredLights;
  }

  protected _postProcess2(lights: LightData[]): LightData[] {
    const getIesValue = (ies?: number): number => {
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
    const neighborGroups: NeighborGroup[] = [];
    const isolatedSpotLights: LightData[] = [];

    spotLights.forEach((light, index, array) => {
      const lightPosition = new THREE.Vector2(light.position.x, light.position.y);
      const neighbors = array.filter((otherLight, otherIndex) => {
        if (index === otherIndex) return false;
        const otherPosition = new THREE.Vector2(otherLight.position.x, otherLight.position.y);
        return otherPosition.sub(lightPosition).length() < NEIGHBOR_DISTANCE_THRESHOLD;
      });

      if (neighbors.length !== 0) {
        neighborGroups.push({ light, neighbors });
      } else {
        isolatedSpotLights.push(light);
      }
    });

    if (neighborGroups.length !== 0) {
      neighborGroups.sort((a, b) => b.neighbors.length - a.neighbors.length);
      neighborGroups.sort((a, b) => getIesValue(a.light.ies) - getIesValue(b.light.ies));

      const processedNeighbors: LightData[] = [];
      neighborGroups.forEach((group) => {
        if (!processedNeighbors.includes(group.light)) {
          otherLights.push(group.light);
          processedNeighbors.push(...group.neighbors);
        }
      });

      otherLights.push(...isolatedSpotLights);
    } else {
      otherLights.push(...spotLights);
    }

    return otherLights;
  }

  protected _postProcess3(lights: LightData[]): LightData[] {
    const spotLights = lights.filter((light) => light.type === HSCore.Model.LightTypeEnum.SpotLight);
    const headLights = lights.filter((light) => light.ruleType === RuleTypeEnum.HeadLightRule);
    const otherLights = lights.filter((light) => !headLights.includes(light));

    const filteredHeadLights = headLights.filter((headLight) => {
      return !spotLights.some((spotLight) => {
        const spotPosition = new THREE.Vector2(spotLight.position.x, spotLight.position.y);
        const headPosition = new THREE.Vector2(headLight.position.x, headLight.position.y);
        return headPosition.sub(spotPosition).length() < HEADLIGHT_PROXIMITY_THRESHOLD;
      });
    });

    otherLights.push(...filteredHeadLights);
    return otherLights;
  }
}

class DefaultLayoutStrategy extends BaseLayoutStrategy {}

class BedroomLayoutStrategy extends BaseLayoutStrategy {}

class LivingRoomLayoutStrategy extends BaseLayoutStrategy {}

class DiningRoomLayoutStrategy extends BaseLayoutStrategy {}

class LivingDiningRoomLayoutStrategy extends BaseLayoutStrategy {}

class BathroomLayoutStrategy extends BaseLayoutStrategy {}

class KitchenLayoutStrategy extends BaseLayoutStrategy {
  layout(visitor: unknown, templateData: unknown, parameter?: LayoutParameter): LightData[] | null {
    if (parameter && isTemplateV3(parameter.templateKey)) {
      return super.layout(visitor, templateData, parameter);
    }

    if (!this._roomInfo) return null;

    const lights: LightData[] = [];
    const headLights = new HeadLightRuleVisitor(undefined, RuleTypeEnum.HeadLightRule).visit(
      undefined,
      this._roomInfo,
      this._parameter,
      undefined
    );

    if (headLights) lights.push(...headLights);

    return lights;
  }
}

export default class LayoutStrategyFactory {
  static createLayoutByType(roomType: number): BaseLayoutStrategy {
    switch (roomType) {
      case HSCore.Model.RoomTypeEnum.Bedroom:
      case HSCore.Model.RoomTypeEnum.MasterBedroom:
      case HSCore.Model.RoomTypeEnum.SecondBedroom:
      case HSCore.Model.RoomTypeEnum.KidsRoom:
      case HSCore.Model.RoomTypeEnum.ElderlyRoom:
      case HSCore.Model.RoomTypeEnum.NannyRoom:
        return new BedroomLayoutStrategy();
      case HSCore.Model.RoomTypeEnum.LivingRoom:
        return new LivingRoomLayoutStrategy();
      case HSCore.Model.RoomTypeEnum.DiningRoom:
        return new DiningRoomLayoutStrategy();
      case HSCore.Model.RoomTypeEnum.LivingDiningRoom:
        return new LivingDiningRoomLayoutStrategy();
      case HSCore.Model.RoomTypeEnum.Kitchen:
        return new KitchenLayoutStrategy();
      case HSCore.Model.RoomTypeEnum.Bathroom:
      case HSCore.Model.RoomTypeEnum.MasterBathroom:
      case HSCore.Model.RoomTypeEnum.SecondBathroom:
        return new BathroomLayoutStrategy();
      default:
        return new DefaultLayoutStrategy();
    }
  }
}