import BaseComputer from './BaseComputer';
import { getOpeningLine } from './openingUtils';
import { isTemplateV3 } from './templateUtils';

/**
 * Light configuration for room openings (doors, windows, holes)
 */
interface OpeningLightConfig {
  /** Light type identifier */
  type: HSCore.Model.LightTypeEnum.FlatLight;
  /** Color temperature in Kelvin */
  temperature: number;
  /** Light intensity in lumens */
  intensity: number;
  /** 2D position in floor plan */
  position: THREE.Vector2;
  /** Height from floor level */
  height: number;
  /** Light dimensions */
  size: {
    width: number;
    length: number;
  };
  /** Rotation around X axis in degrees */
  XRotation: number;
  /** Rotation around Y axis in degrees */
  YRotation: number;
  /** Rotation around Z axis in degrees */
  ZRotation: number;
  /** Whether to emit light from both sides */
  double_flat: boolean;
}

/**
 * Opening entity types from HSCore
 */
type OpeningEntity =
  | HSCore.Model.Door
  | HSCore.Model.Window
  | HSCore.Model.Hole
  | HSCore.Model.Parametrization.WindowHole;

/**
 * Computation context with opening light tracking
 */
interface ComputationContext {
  /** Map tracking lights already created for openings */
  openingLightMap: Map<OpeningEntity, OpeningLightConfig>;
}

/**
 * Room model interface
 */
interface RoomModel {
  isCeilingFaceHidden(): boolean;
  getRoomOpenings(): OpeningEntity[] | undefined;
}

/**
 * Template configuration
 */
interface TemplateConfig {
  templateKey: string;
}

/** Default intensity for most templates (lumens) */
const DEFAULT_LIGHT_INTENSITY = 4000;

/** Default color temperature (Kelvin) */
const DEFAULT_COLOR_TEMPERATURE = 6500;

/** Realistic template intensity */
const REALISTIC_LIGHT_INTENSITY = 6000;

/** Night mode interior intensity */
const NIGHT_INTERIOR_INTENSITY = 500;

/** Night mode door/hole intensity */
const NIGHT_DOOR_INTENSITY = 2000;

/** Night mode interior temperature */
const NIGHT_INTERIOR_TEMPERATURE = 6500;

/** Night mode exterior temperature */
const NIGHT_EXTERIOR_TEMPERATURE = 8500;

/** Chilly template interior temperature */
const CHILLY_INTERIOR_TEMPERATURE = 6500;

/** Chilly template exterior temperature */
const CHILLY_EXTERIOR_TEMPERATURE = 7500;

/** Safety margin for light size */
const LIGHT_SIZE_MARGIN = 0.5;

/** Reduced margin for doors */
const DOOR_SIZE_MARGIN = 0.2;

/** Offset from opening surface */
const SURFACE_OFFSET = 0.01;

/** Right angle in degrees */
const RIGHT_ANGLE = 90;

/** Full circle in degrees */
const FULL_CIRCLE = 360;

/** Half circle in degrees */
const HALF_CIRCLE = 180;

/** Minimum opening area threshold */
const MIN_OPENING_AREA = 1;

/**
 * Computes lighting for room openings (doors, windows, holes).
 * Automatically generates appropriate light fixtures based on template and opening type.
 */
export default class OpeningLightComputer extends BaseComputer {
  /**
   * Initialize the computer
   */
  init(): void {
    // No initialization required
  }

  /**
   * Check if this computer is interested in the given entity
   */
  protected _interested(entity: unknown): boolean {
    return true;
  }

  /**
   * Compute lighting configurations for all openings in the room
   * 
   * @param entity - The entity being processed
   * @param room - The room model containing openings
   * @param template - Template configuration affecting light properties
   * @param context - Computation context with opening light tracking
   * @returns Array of light configurations to be added
   */
  protected _compute(
    entity: unknown,
    room: RoomModel,
    template: TemplateConfig,
    context: ComputationContext
  ): OpeningLightConfig[] {
    // Skip if ceiling is hidden
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    // Only process V3 templates
    if (!isTemplateV3(template.templateKey)) {
      return [];
    }

    const openings = room.getRoomOpenings();
    if (!openings || openings.length === 0) {
      return [];
    }

    const lightConfigs: OpeningLightConfig[] = [];

    openings.forEach((opening) => {
      // Skip if light already exists for this opening
      if (context.openingLightMap.has(opening)) {
        return;
      }

      // Skip hidden or removed entities
      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
        return;
      }
      if (opening.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        return;
      }

      // Calculate actual dimensions with scaling
      const actualWidth = opening.XLength * opening.XScale;
      const actualDepth = opening.YLength * opening.YScale;
      const actualHeight = opening.ZLength * opening.ZScale;

      // Initialize light size with margins
      const lightSize = {
        width: actualWidth - LIGHT_SIZE_MARGIN,
        length: actualHeight - LIGHT_SIZE_MARGIN,
      };

      let offsetFromSurface = 0;

      // Apply smaller margin for doors
      if (opening instanceof HSCore.Model.Door) {
        lightSize.width = actualWidth - DOOR_SIZE_MARGIN;
      }

      // Get the opening's orientation line
      const openingLine = getOpeningLine(opening);
      if (!openingLine) {
        return;
      }

      const perpendicularDirection = openingLine.pdir;

      // Handle curtain offset for windows
      if (
        opening instanceof HSCore.Model.Window ||
        opening instanceof HSCore.Model.Parametrization.WindowHole
      ) {
        const hostWall = opening.getHost();
        if (hostWall && hostWall instanceof HSCore.Model.Wall) {
          const wallContents = hostWall.contents || {};
          const curtain = Object.values(wallContents).find(
            (content) =>
              content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Curtain)
          );

          if (curtain) {
            offsetFromSurface += curtain.YSize;

            // Determine correct direction relative to curtain
            const curtainPosition = {
              x: curtain.x,
              y: curtain.y,
              z: curtain.z,
            };
            const lineStart = openingLine.from;
            const lineEnd = openingLine.to;
            const projectionPoint = HSCore.Util.Math.getPerpendicularIntersect(
              curtainPosition,
              lineStart,
              lineEnd
            );

            const curtainOffset = new THREE.Vector2(
              curtainPosition.x - projectionPoint.x,
              curtainPosition.y - projectionPoint.y
            );

            // Flip direction if curtain is on the opposite side
            if (curtainOffset.dot(perpendicularDirection) < 0) {
              perpendicularDirection.negate();
            }
          }
        }
      }

      // Determine light intensity and temperature based on template
      let lightIntensity = DEFAULT_LIGHT_INTENSITY;
      let colorTemperature = DEFAULT_COLOR_TEMPERATURE;

      const isDoorOrHole =
        opening instanceof HSCore.Model.Door ||
        opening instanceof HSCore.Model.Hole;

      // Calculate light position offset from opening center
      const lightPosition = new THREE.Vector2(opening.x, opening.y);
      lightPosition.add(
        perpendicularDirection.setLength(
          actualDepth / 2 + offsetFromSurface + SURFACE_OFFSET
        )
      );

      // Calculate rotation angle
      let rotationAngle = THREE.Math.radToDeg(perpendicularDirection.angle());
      rotationAngle += RIGHT_ANGLE;

      // Normalize angle to [-180, 180] range
      if (rotationAngle > HALF_CIRCLE) {
        rotationAngle -= FULL_CIRCLE;
      }

      // Skip very small openings
      if (actualWidth * actualHeight < MIN_OPENING_AREA) {
        return;
      }

      // Apply template-specific lighting settings
      if (
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        lightIntensity = REALISTIC_LIGHT_INTENSITY;
      }

      if (template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
        lightIntensity = NIGHT_INTERIOR_INTENSITY;
        colorTemperature = NIGHT_INTERIOR_TEMPERATURE;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          colorTemperature = NIGHT_EXTERIOR_TEMPERATURE;
        }

        if (isDoorOrHole) {
          lightIntensity = NIGHT_DOOR_INTENSITY;
        }
      }

      if (template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) {
        colorTemperature = CHILLY_INTERIOR_TEMPERATURE;

        if (HSCore.Util.Opening.isOutsideOpening(opening)) {
          colorTemperature = CHILLY_EXTERIOR_TEMPERATURE;
        }
      }

      // Create light configuration
      const lightConfig: OpeningLightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: colorTemperature,
        intensity: lightIntensity,
        position: lightPosition,
        height: opening.z + actualHeight / 2,
        size: lightSize,
        XRotation: RIGHT_ANGLE,
        YRotation: rotationAngle,
        ZRotation: 0,
        double_flat: isDoorOrHole,
      };

      // Register light in context and add to results
      context.openingLightMap.set(opening, lightConfig);
      lightConfigs.push(lightConfig);
    });

    return lightConfigs;
  }

  /**
   * Validate the computed result
   */
  protected _isValid(
    entity: unknown,
    room: RoomModel,
    template: TemplateConfig
  ): boolean {
    return true;
  }
}