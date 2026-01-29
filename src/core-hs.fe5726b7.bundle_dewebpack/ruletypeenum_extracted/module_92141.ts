import BaseComputer from './BaseComputer';
import { getOpeningLine } from './OpeningUtils';
import { isTemplateV3 } from './TemplateUtils';

interface LightSize {
  width: number;
  length: number;
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

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface Content {
  contentType: HSCatalog.ContentType;
  YSize: number;
  x: number;
  y: number;
  z: number;
}

interface ContentMap {
  [key: string]: Content;
}

interface ComputeContext {
  templateKey: string;
}

interface ComputeState {
  openingLightMap: Map<HSCore.Model.Opening, LightConfig>;
}

const LIGHT_INTENSITY_DEFAULT = 4000;
const LIGHT_INTENSITY_REALISTIC = 6000;
const LIGHT_INTENSITY_NIGHT_INDOOR = 500;
const LIGHT_INTENSITY_NIGHT_DOOR = 2000;
const LIGHT_TEMPERATURE_DEFAULT = 6500;
const LIGHT_TEMPERATURE_NIGHT_OUTDOOR = 8500;
const LIGHT_TEMPERATURE_CHILLY_OUTDOOR = 7500;

const SIZE_OFFSET_DEFAULT = 0.5;
const SIZE_OFFSET_DOOR = 0.2;
const POSITION_OFFSET = 0.01;
const ROTATION_X = 90;
const ROTATION_OFFSET = 90;
const ROTATION_MAX = 180;
const ROTATION_FULL = 360;

class OpeningLightComputer extends BaseComputer {
  init(): void {}

  _interested(entity: HSCore.Model.Entity): boolean {
    return true;
  }

  _compute(
    entity: HSCore.Model.Entity,
    room: HSCore.Model.Room,
    context: ComputeContext,
    state: ComputeState
  ): LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    if (!isTemplateV3(context.templateKey)) {
      return [];
    }

    const openings = room.getRoomOpenings();
    if (!openings || openings.length === 0) {
      return [];
    }

    const lights: LightConfig[] = [];

    openings.forEach((opening: HSCore.Model.Opening) => {
      if (state.openingLightMap.has(opening)) {
        return;
      }

      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
        return;
      }

      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        return;
      }

      const width = opening.XLength * opening.XScale;
      const depth = opening.YLength * opening.YScale;
      const height = opening.ZLength * opening.ZScale;

      const lightSize: LightSize = {
        width: width - SIZE_OFFSET_DEFAULT,
        length: height - SIZE_OFFSET_DEFAULT
      };

      let depthOffset = 0;

      if (opening instanceof HSCore.Model.Door) {
        lightSize.width = width - SIZE_OFFSET_DOOR;
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
          const contents: ContentMap = host.contents || {};
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

            const lineFrom = openingLine.from;
            const lineTo = openingLine.to;
            const intersect = HSCore.Util.Math.getPerpendicularIntersect(
              curtainPosition,
              lineFrom,
              lineTo
            );

            const directionVector = new THREE.Vector2(
              curtainPosition.x - intersect.x,
              curtainPosition.y - intersect.y
            );

            if (directionVector.dot(perpendicular) < 0) {
              perpendicular.negate();
            }
          }
        }
      }

      let lightIntensity = LIGHT_INTENSITY_DEFAULT;
      let lightTemperature = LIGHT_TEMPERATURE_DEFAULT;

      const isDoorOrHole =
        opening instanceof HSCore.Model.Door ||
        opening instanceof HSCore.Model.Hole;

      const position = new THREE.Vector2(opening.x, opening.y);
      position.add(perpendicular.setLength(depth / 2 + depthOffset + POSITION_OFFSET));

      let rotationY = THREE.Math.radToDeg(perpendicular.angle());
      rotationY += ROTATION_OFFSET;

      if (rotationY > ROTATION_MAX) {
        rotationY -= ROTATION_FULL;
      }

      if (width * height < 1) {
        return;
      }

      if (
        context.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        context.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        lightIntensity = LIGHT_INTENSITY_REALISTIC;
      }

      if (context.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
        lightIntensity = LIGHT_INTENSITY_NIGHT_INDOOR;
        lightTemperature = LIGHT_TEMPERATURE_DEFAULT;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          lightTemperature = LIGHT_TEMPERATURE_NIGHT_OUTDOOR;
        }

        if (isDoorOrHole) {
          lightIntensity = LIGHT_INTENSITY_NIGHT_DOOR;
        }
      }

      if (context.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) {
        lightTemperature = LIGHT_TEMPERATURE_DEFAULT;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          lightTemperature = LIGHT_TEMPERATURE_CHILLY_OUTDOOR;
        }
      }

      const lightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: lightTemperature,
        intensity: lightIntensity,
        position: position,
        height: opening.z + height / 2,
        size: lightSize,
        XRotation: ROTATION_X,
        YRotation: rotationY,
        ZRotation: 0,
        double_flat: isDoorOrHole
      };

      state.openingLightMap.set(opening, lightConfig);
      lights.push(lightConfig);
    });

    return lights;
  }

  _isValid(
    entity: HSCore.Model.Entity,
    room: HSCore.Model.Room,
    context: ComputeContext
  ): boolean {
    return true;
  }
}

export default OpeningLightComputer;