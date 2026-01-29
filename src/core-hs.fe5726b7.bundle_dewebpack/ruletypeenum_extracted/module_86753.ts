import BaseClass from './BaseClass';
import { isTemplateV3, getLightInfo } from './TemplateUtils';

interface LightSize {
  width: number;
  length: number;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Vector3;
  height: number;
  size: LightSize;
  ies: string | undefined;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface EntityMetadata {
  extension: Record<string, unknown>;
}

interface EntityContent {
  metadata: EntityMetadata;
}

interface Entity {
  getContents(): EntityContent[];
  getPosition(): Vector3;
  getRotation(): number;
  getSize(): Vector3;
}

interface Scene {
  getCeilingHeight(): number;
  isCeilingFaceHidden(): boolean;
}

interface TemplateConfig {
  templateKey: string;
  temperature: number;
}

const DEFAULT_LIGHT_INTENSITY = 4500;
const NIGHT_TEMPLATE_TEMPERATURE = 5500;
const CEILING_OFFSET = 0.1;

export default class LightComputer extends BaseClass {
  _compute(
    entity: Entity,
    scene: Scene,
    templateConfig: TemplateConfig,
    _unused: unknown
  ): LightConfig[] {
    if (scene.isCeilingFaceHidden()) {
      return [];
    }

    if (!isTemplateV3(templateConfig.templateKey)) {
      return [];
    }

    const lightInfo = getLightInfo(entity.getContents()[0].metadata.extension);
    let temperature = lightInfo?.temperature ?? templateConfig.temperature;

    if (templateConfig.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      temperature = NIGHT_TEMPLATE_TEMPERATURE;
    }

    const lights: LightConfig[] = [];
    const position = entity.getPosition();
    const rotation = entity.getRotation();
    const height = position.z - CEILING_OFFSET;

    if (height < scene.getCeilingHeight() / 2) {
      return [];
    }

    const size: LightSize = {
      width: entity.getSize().x / 2,
      length: entity.getSize().y / 2
    };

    const lightConfig: LightConfig = {
      type: HSCore.Model.LightTypeEnum.FlatLight,
      temperature,
      intensity: DEFAULT_LIGHT_INTENSITY,
      position,
      height,
      size,
      ies: undefined,
      XRotation: 0,
      YRotation: 0,
      ZRotation: rotation
    };

    lights.push(lightConfig);
    return lights;
  }

  _isValid(_entity: Entity, _scene: Scene, _templateConfig: TemplateConfig): boolean {
    return true;
  }
}