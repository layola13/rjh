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
  ies: undefined;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface ContentMetadata {
  extension: unknown;
}

interface Content {
  metadata: {
    extension: unknown;
  };
}

interface Entity {
  getContents(): Content[];
  getPosition(): Vector3;
  getRotation(): number;
  getSize(): Vector3;
}

interface Scene {
  isCeilingFaceHidden(): boolean;
  getCeilingHeight(): number;
}

interface Template {
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
    template: Template,
    _options: unknown
  ): LightConfig[] {
    if (scene.isCeilingFaceHidden()) {
      return [];
    }

    if (!isTemplateV3(template.templateKey)) {
      return [];
    }

    const contentMetadata = entity.getContents()[0]?.metadata?.extension;
    const lightInfo = getLightInfo(contentMetadata);
    let temperature = lightInfo?.temperature ?? template.temperature;

    if (template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      temperature = NIGHT_TEMPLATE_TEMPERATURE;
    }

    const position = entity.getPosition();
    const rotation = entity.getRotation();
    const height = position.z - CEILING_OFFSET;

    if (height < scene.getCeilingHeight() / 2) {
      return [];
    }

    const entitySize = entity.getSize();
    const size: LightSize = {
      width: entitySize.x / 2,
      length: entitySize.y / 2
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

    return [lightConfig];
  }

  _isValid(_entity: Entity, _scene: Scene, _template: Template): boolean {
    return true;
  }
}