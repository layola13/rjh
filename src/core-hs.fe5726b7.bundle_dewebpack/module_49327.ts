import BaseLight from './BaseLight';
import { CommonOptions } from './CommonOptions';

interface Point2D {
  x: number;
  y: number;
}

interface LineSegment {
  p0: Point2D;
  p1: Point2D;
  length: number;
}

interface LineGroup {
  lines: LineSegment[];
  totalLength: number;
}

interface LightSize {
  width: number;
  length: number;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Point2D;
  height: number;
  size: LightSize;
  ies: undefined;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface RenderOptions {
  templateKey: string;
  temperature: number;
}

interface Room {
  getSubPolygons(): Point2D[][] | null;
  getCeilingHeight(): number;
  isCeilingFaceHidden(): boolean;
  getPhysicalLights(): PhysicalLight[];
}

interface PhysicalLight {
  contentType(): ContentType | null;
  getPosition(): Point2D;
  getSize(): Point2D;
}

interface ContentType {
  isTypeOf(types: string[]): boolean;
}

const DEFAULT_TEMPERATURE = 6500;
const DEFAULT_INTENSITY = 2000;
const REALISTIC_INTENSITY = 15000;
const BASE_LIGHT_SIZE = 0.5;
const REALISTIC_LIGHT_SIZE = 0.3;
const MIN_DIMENSION_THRESHOLD = 0.6;
const MAX_DIMENSION_THRESHOLD = 1.5;
const REALISTIC_MIN_THRESHOLD = 0.7;
const GRID_SPACING = 1.5;
const AREA_MULTIPLIER = 400;
const SIZE_SCALE_FACTOR = 0.15;
const MIN_LENGTH_THRESHOLD = 0.01;
const VECTOR_SIMILARITY_THRESHOLD = 0.01;

export default class CeilingLightGenerator extends BaseLight {
  init(): void {
    // Initialization logic if needed
  }

  protected _interested(room: Room): boolean {
    return true;
  }

  protected _compute(
    scene: unknown,
    room: Room,
    options: RenderOptions,
    context: unknown
  ): LightConfig[] {
    if (options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      return [];
    }

    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const isNatureOrChilly =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3;

    const isRealisticOrGeneral =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

    if (!isNatureOrChilly && !isRealisticOrGeneral) {
      return this._computeLargeAreaLights(room, options);
    }

    return this._computeGridLights(room, options, isRealisticOrGeneral);
  }

  private _computeLargeAreaLights(room: Room, options: RenderOptions): LightConfig[] {
    const subPolygons = room.getSubPolygons();
    if (!subPolygons || subPolygons.length === 0) {
      return [];
    }

    const lightHeight = room.getCeilingHeight() - CommonOptions.defaultGapToCeiling;
    const lights: LightConfig[] = [];

    subPolygons.forEach((polygon) => {
      const area = Math.abs(GeLib.PolygonUtils.getArea(polygon));
      const centerPosition = HSCore.Util.Room.getProperCenterPosition(polygon);
      const intensity = Math.round(AREA_MULTIPLIER * area) * 100;
      const lineSegments = this._buildLineSegments(polygon);

      let totalXLength = 0;
      let totalYLength = 0;

      lineSegments[0].lines.forEach((line) => {
        totalXLength += Math.abs(line.p1.x - line.p0.x);
        totalYLength += Math.abs(line.p1.y - line.p0.y);
      });

      const rotation = new THREE.Vector2(totalXLength, totalYLength).normalize().angle();
      const rotatedPolygon = polygon.map((point) =>
        point.clone().rotateAround({ x: 0, y: 0 }, rotation)
      );
      const bounds = HSCore.Util.Math.getBounds(rotatedPolygon);
      const boundWidth = bounds[2];
      const boundLength = bounds[3];

      const light: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: options.temperature,
        intensity,
        position: centerPosition,
        height: lightHeight,
        size: {
          width: SIZE_SCALE_FACTOR * boundWidth,
          length: SIZE_SCALE_FACTOR * boundLength,
        },
        ies: undefined,
        XRotation: 0,
        YRotation: 0,
        ZRotation: rotation,
      };

      lights.push(light);
    });

    return lights;
  }

  private _computeGridLights(
    room: Room,
    options: RenderOptions,
    isRealisticOrGeneral: boolean
  ): LightConfig[] {
    const subPolygons = room.getSubPolygons();
    if (!subPolygons || subPolygons.length === 0) {
      return [];
    }

    const lightHeight = room.getCeilingHeight() - CommonOptions.defaultGapToCeiling;
    const lights: LightConfig[] = [];
    const temperature = DEFAULT_TEMPERATURE;

    subPolygons.forEach((polygon) => {
      let intensity = DEFAULT_INTENSITY;
      let lightSize = BASE_LIGHT_SIZE;

      const bounds = HSCore.Util.Math.getBounds(polygon);
      const minX = bounds[0];
      const minY = bounds[1];
      const boundWidth = bounds[2];
      const boundLength = bounds[3];

      let gridCountX = this._calculateGridCount(boundWidth, MIN_DIMENSION_THRESHOLD, MAX_DIMENSION_THRESHOLD, boundLength);
      let gridCountY = this._calculateGridCount(boundLength, MIN_DIMENSION_THRESHOLD, MAX_DIMENSION_THRESHOLD, boundWidth);

      if (isRealisticOrGeneral) {
        intensity = REALISTIC_INTENSITY;
        lightSize = REALISTIC_LIGHT_SIZE;
        gridCountX = this._calculateGridCount(boundWidth, REALISTIC_MIN_THRESHOLD, MAX_DIMENSION_THRESHOLD, boundLength);
        gridCountY = this._calculateGridCount(boundLength, REALISTIC_MIN_THRESHOLD, MAX_DIMENSION_THRESHOLD, boundLength);
      }

      const cellWidth = boundWidth / gridCountX;
      const cellLength = boundLength / gridCountY;

      const baseLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature,
        intensity,
        position: { x: 0, y: 0 },
        height: lightHeight,
        size: { width: lightSize, length: lightSize },
        ies: undefined,
        XRotation: 0,
        YRotation: 0,
        ZRotation: 0,
      };

      for (let row = 0; row < gridCountY; row++) {
        let rowLight = _.cloneDeep(baseLight);
        rowLight.position.y = minY + cellLength * (row + 0.5);

        for (let col = 0; col < gridCountX; col++) {
          const cellLight = _.cloneDeep(rowLight);
          cellLight.position.x = minX + cellWidth * (col + 0.5);

          const lightBoundary: Point2D[] = [
            { x: cellLight.position.x - lightSize / 2, y: cellLight.position.y - lightSize / 2 },
            { x: cellLight.position.x + lightSize / 2, y: cellLight.position.y - lightSize / 2 },
            { x: cellLight.position.x + lightSize / 2, y: cellLight.position.y + lightSize / 2 },
            { x: cellLight.position.x - lightSize / 2, y: cellLight.position.y + lightSize / 2 },
          ];

          if (HSCore.Util.Math.isPolygonInSidePolygon(lightBoundary, polygon, true)) {
            lights.push(cellLight);
          }
        }
      }
    });

    return lights;
  }

  private _calculateGridCount(
    dimension: number,
    minThreshold: number,
    maxThreshold: number,
    otherDimension: number
  ): number {
    if (dimension > minThreshold && dimension < maxThreshold && otherDimension > maxThreshold) {
      return 1;
    }
    return Math.floor(dimension / GRID_SPACING);
  }

  private _buildLineSegments(polygon: Point2D[]): LineGroup[] {
    const segments: LineSegment[] = [];
    const points = polygon.slice();

    if (!HSCore.Util.Math.isSamePoint(points[0], points[points.length - 1], MIN_LENGTH_THRESHOLD)) {
      points.push(points[0]);
    }

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const length = new THREE.Vector2(p1.x - p0.x, p1.y - p0.y).length();

      if (length >= MIN_LENGTH_THRESHOLD) {
        segments.push({ p0, p1, length });
      }
    }

    const directionMap = new Map<THREE.Vector2, LineGroup>();

    segments.forEach((segment) => {
      const direction = new THREE.Vector2(segment.p1.x - segment.p0.x, segment.p1.y - segment.p0.y);
      direction.normalize();

      const existingDirection = Array.from(directionMap.keys()).find(
        (dir) => Math.abs(1 - Math.abs(dir.dot(direction))) < VECTOR_SIMILARITY_THRESHOLD
      );

      if (existingDirection) {
        const group = directionMap.get(existingDirection);
        group?.lines.push(segment);
      } else {
        directionMap.set(direction, { lines: [segment], totalLength: 0 });
      }
    });

    const lineGroups = Array.from(directionMap.values());

    lineGroups.forEach((group) => {
      group.totalLength = group.lines.reduce((sum, line) => sum + line.length, 0);
    });

    lineGroups.sort((a, b) => b.totalLength - a.totalLength);

    return lineGroups;
  }

  protected _isValid(light: LightConfig, room: Room, options: RenderOptions): boolean {
    const isNatureOrChilly =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3;

    const isRealisticOrGeneral =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

    if (!isNatureOrChilly && !isRealisticOrGeneral) {
      return super._isValid(light, room, options);
    }

    let existingLights = room.getPhysicalLights().filter(
      (physicalLight) =>
        physicalLight.contentType()?.isTypeOf(HSConstants.RenderLight.CELLING_LIGHTING_CONTENT_TYPES) ?? false
    );

    if (isRealisticOrGeneral) {
      existingLights = room.getPhysicalLights().filter(
        (physicalLight) =>
          physicalLight.contentType()?.isTypeOf(HSConstants.RenderLight.CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES) ?? false
      );
    }

    if (existingLights.length === 0) {
      return true;
    }

    const position = light.position;
    if (!position) {
      return true;
    }

    const lightPosition = new THREE.Vector2(position.x, position.y);
    const hasOverlap = existingLights.some((existingLight) => {
      const existingPosition = existingLight.getPosition();
      const existingSize = existingLight.getSize();
      const distance = new THREE.Vector2(existingPosition.x, existingPosition.y)
        .sub(lightPosition)
        .length();
      const minDistance = light.size.length / 2 + Math.max(existingSize.x, existingSize.y) / 2;
      return distance < minDistance;
    });

    return !hasOverlap;
  }
}