import BaseComputer from './BaseComputer';
import { getOpeningLine } from './OpeningUtils';
import { isTemplateV3 } from './TemplateUtils';

interface LightSize {
  width: number;
  length: number;
}

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: THREE.Vector2;
  height: number;
  size: LightSize;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  double_flat: boolean;
}

interface ComputeContext {
  openingLightMap: Map<HSCore.Model.Opening, LightConfig>;
}

interface Content {
  contentType: HSCatalog.ContentType;
  YSize: number;
  x: number;
  y: number;
  z: number;
}

interface Wall extends HSCore.Model.Wall {
  contents?: Record<string, Content>;
}

interface TemplateConfig {
  templateKey: string;
}

const DEFAULT_LIGHT_INTENSITY = 4000;
const DEFAULT_LIGHT_TEMPERATURE = 6500;
const REALISTIC_LIGHT_INTENSITY = 6000;
const NIGHT_LIGHT_INTENSITY = 500;
const NIGHT_DOOR_LIGHT_INTENSITY = 2000;
const NIGHT_LIGHT_TEMPERATURE = 6500;
const NIGHT_OUTSIDE_LIGHT_TEMPERATURE = 8500;
const CHILLY_LIGHT_TEMPERATURE = 6500;
const CHILLY_OUTSIDE_LIGHT_TEMPERATURE = 7500;

const STANDARD_WIDTH_OFFSET = 0.5;
const DOOR_WIDTH_OFFSET = 0.2;
const POSITION_OFFSET = 0.01;
const ROTATION_X = 90;
const ROTATION_Z = 0;
const ROTATION_ADJUSTMENT = 90;
const ROTATION_NORMALIZATION = 360;
const ROTATION_THRESHOLD = 180;
const MIN_AREA_THRESHOLD = 1;

export default class OpeningLightComputer extends BaseComputer {
  init(): void {}

  protected _interested(entity: unknown): boolean {
    return true;
  }

  protected _compute(
    entity: unknown,
    room: HSCore.Model.Room,
    template: TemplateConfig,
    context: ComputeContext
  ): LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    if (!isTemplateV3(template.templateKey)) {
      return [];
    }

    const openings = room.getRoomOpenings();
    if (!openings || openings.length === 0) {
      return [];
    }

    const lights: LightConfig[] = [];

    openings.forEach((opening: HSCore.Model.Opening) => {
      if (context.openingLightMap.has(opening)) {
        return;
      }

      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
        return;
      }

      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        return;
      }

      const actualWidth = opening.XLength * opening.XScale;
      const actualDepth = opening.YLength * opening.YScale;
      const actualHeight = opening.ZLength * opening.ZScale;

      const lightSize: LightSize = {
        width: actualWidth - STANDARD_WIDTH_OFFSET,
        length: actualHeight - STANDARD_WIDTH_OFFSET
      };

      let depthOffset = 0;

      if (opening instanceof HSCore.Model.Door) {
        lightSize.width = actualWidth - DOOR_WIDTH_OFFSET;
      }

      const openingLine = getOpeningLine(opening);
      if (!openingLine) {
        return;
      }

      const perpendicular = openingLine.pdir;

      if (
        opening instanceof HSCore.Model.Window ||
        opening instanceof HSCore.Model.Parametrization.WindowHole
      ) {
        const host = opening.getHost();
        if (host && host instanceof HSCore.Model.Wall) {
          const wall = host as Wall;
          const contents = wall.contents || {};
          const curtain = Object.values(contents).find((content: Content) =>
            content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Curtain)
          );

          if (curtain) {
            depthOffset += curtain.YSize;

            const curtainPosition: Position3D = {
              x: curtain.x,
              y: curtain.y,
              z: curtain.z
            };

            const lineStart = openingLine.from;
            const lineEnd = openingLine.to;
            const intersection = HSCore.Util.Math.getPerpendicularIntersect(
              curtainPosition,
              lineStart,
              lineEnd
            );

            const direction = new THREE.Vector2(
              curtainPosition.x - intersection.x,
              curtainPosition.y - intersection.y
            );

            if (direction.dot(perpendicular) < 0) {
              perpendicular.negate();
            }
          }
        }
      }

      let lightIntensity = DEFAULT_LIGHT_INTENSITY;
      let lightTemperature = DEFAULT_LIGHT_TEMPERATURE;

      const isDoorOrHole =
        opening instanceof HSCore.Model.Door ||
        opening instanceof HSCore.Model.Hole;

      const lightPosition = new THREE.Vector2(opening.x, opening.y);
      lightPosition.add(
        perpendicular.setLength(actualDepth / 2 + depthOffset + POSITION_OFFSET)
      );

      let rotationY = THREE.Math.radToDeg(perpendicular.angle());
      rotationY += ROTATION_ADJUSTMENT;

      if (rotationY > ROTATION_THRESHOLD) {
        rotationY -= ROTATION_NORMALIZATION;
      }

      const lightArea = actualWidth * actualHeight;
      if (lightArea < MIN_AREA_THRESHOLD) {
        return;
      }

      if (
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        lightIntensity = REALISTIC_LIGHT_INTENSITY;
      }

      if (template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
        lightIntensity = NIGHT_LIGHT_INTENSITY;
        lightTemperature = NIGHT_LIGHT_TEMPERATURE;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          lightTemperature = NIGHT_OUTSIDE_LIGHT_TEMPERATURE;
        }

        if (
          opening instanceof HSCore.Model.Door ||
          opening instanceof HSCore.Model.Hole
        ) {
          lightIntensity = NIGHT_DOOR_LIGHT_INTENSITY;
        }
      }

      if (template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) {
        lightTemperature = CHILLY_LIGHT_TEMPERATURE;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          lightTemperature = CHILLY_OUTSIDE_LIGHT_TEMPERATURE;
        }
      }

      const lightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: lightTemperature,
        intensity: lightIntensity,
        position: lightPosition,
        height: opening.z + actualHeight / 2,
        size: lightSize,
        XRotation: ROTATION_X,
        YRotation: rotationY,
        ZRotation: ROTATION_Z,
        double_flat: isDoorOrHole
      };

      context.openingLightMap.set(opening, lightConfig);
      lights.push(lightConfig);
    });

    return lights;
  }

  protected _isValid(
    entity: unknown,
    result: unknown,
    context: unknown
  ): boolean {
    return true;
  }
}