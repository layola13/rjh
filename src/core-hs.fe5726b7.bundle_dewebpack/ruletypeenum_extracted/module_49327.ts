import BaseClass from './BaseClass';
import { CommonOptions } from './CommonOptions';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  length: number;
}

interface LightConfig {
  type: string;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  size: Size;
  ies: undefined;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface LineSegment {
  p0: Position;
  p1: Position;
  length: number;
}

interface LineGroup {
  lines: LineSegment[];
  totalLength: number;
}

interface RenderOptions {
  templateKey: string;
  temperature: number;
}

interface Room {
  getSubPolygons(): Position[][];
  getCeilingHeight(): number;
  isCeilingFaceHidden(): boolean;
  getPhysicalLights(): PhysicalLight[];
}

interface PhysicalLight {
  contentType(): ContentType | null;
  getPosition(): Position;
  getSize(): Position;
}

interface ContentType {
  isTypeOf(types: string[]): boolean;
}

class CeilingLightCalculator extends BaseClass {
  init(): void {}

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

    if (
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3 &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      return this._computeCustomLayout(room, options);
    } else {
      return this._computeGridLayout(room, options);
    }
  }

  private _computeCustomLayout(room: Room, options: RenderOptions): LightConfig[] {
    const subPolygons = room.getSubPolygons();
    if (!subPolygons || subPolygons.length === 0) {
      return [];
    }

    const ceilingHeight = room.getCeilingHeight() - CommonOptions.defaultGapToCeiling;
    const results: LightConfig[] = [];

    subPolygons.forEach((polygon) => {
      const area = Math.abs(GeLib.PolygonUtils.getArea(polygon));
      const centerPosition = HSCore.Util.Room.getProperCenterPosition(polygon);
      const intensity = 100 * Math.round(4 * area);
      const segments = this._buildLineSegments(polygon);

      let totalXLength = 0;
      let totalYLength = 0;

      segments[0].lines.forEach((line) => {
        totalXLength += Math.abs(line.p1.x - line.p0.x);
        totalYLength += Math.abs(line.p1.y - line.p0.y);
      });

      const rotationAngle = new THREE.Vector2(totalXLength, totalYLength).normalize().angle();
      const rotatedPolygon = polygon.map((point) =>
        point.clone().rotateAround({ x: 0, y: 0 }, rotationAngle)
      );

      const bounds = HSCore.Util.Math.getBounds(rotatedPolygon);
      const lightSizeMultiplier = 0.15;

      const lightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: options.temperature,
        intensity,
        position: centerPosition,
        height: ceilingHeight,
        size: {
          width: lightSizeMultiplier * bounds[2],
          length: lightSizeMultiplier * bounds[3],
        },
        ies: undefined,
        XRotation: 0,
        YRotation: 0,
        ZRotation: rotationAngle,
      };

      results.push(lightConfig);
    });

    return results;
  }

  private _computeGridLayout(room: Room, options: RenderOptions): LightConfig[] {
    const subPolygons = room.getSubPolygons();
    if (!subPolygons || subPolygons.length === 0) {
      return [];
    }

    const ceilingHeight = room.getCeilingHeight() - CommonOptions.defaultGapToCeiling;
    const results: LightConfig[] = [];
    const defaultTemperature = 6500;

    subPolygons.forEach((polygon) => {
      let intensity = 2000;
      const bounds = HSCore.Util.Math.getBounds(polygon);
      const minX = bounds[0];
      const minY = bounds[1];
      const width = bounds[2];
      const height = bounds[3];

      const gridSpacing = 1.5;
      const minDimension = 0.6;
      const maxDimension = 1.5;

      let columnsCount = this._calculateGridCount(width, minDimension, maxDimension, gridSpacing, height);
      let rowsCount = this._calculateGridCount(height, minDimension, maxDimension, gridSpacing, width);
      let lightSize = 0.5;

      if (
        options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        intensity = 15000;
        lightSize = 0.3;
        columnsCount = width > 0.7 && width < 1.5 ? 1 : Math.floor(width / gridSpacing);
        rowsCount = height > 0.7 && height < 1.5 ? 1 : Math.floor(height / gridSpacing);
      }

      const columnSpacing = width / columnsCount;
      const rowSpacing = height / rowsCount;

      const baseLightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.FlatLight,
        temperature: defaultTemperature,
        intensity,
        position: { x: 0, y: 0 },
        height: ceilingHeight,
        size: { width: lightSize, length: lightSize },
        ies: undefined,
        XRotation: 0,
        YRotation: 0,
        ZRotation: 0,
      };

      for (let row = 0; row < rowsCount; row++) {
        const yPosition = minY + rowSpacing * (row + 0.5);

        for (let column = 0; column < columnsCount; column++) {
          const xPosition = minX + columnSpacing * (column + 0.5);
          const halfSize = lightSize / 2;

          const lightBoundingBox: Position[] = [
            { x: xPosition - halfSize, y: yPosition - halfSize },
            { x: xPosition + halfSize, y: yPosition - halfSize },
            { x: xPosition + halfSize, y: yPosition + halfSize },
            { x: xPosition - halfSize, y: yPosition + halfSize },
          ];

          if (HSCore.Util.Math.isPolygonInSidePolygon(lightBoundingBox, polygon, true)) {
            const lightConfig = _.cloneDeep(baseLightConfig);
            lightConfig.position = { x: xPosition, y: yPosition };
            results.push(lightConfig);
          }
        }
      }
    });

    return results;
  }

  private _calculateGridCount(
    dimension: number,
    minDimension: number,
    maxDimension: number,
    spacing: number,
    otherDimension: number
  ): number {
    if (dimension > minDimension && dimension < maxDimension && otherDimension > maxDimension) {
      return 1;
    }
    return Math.floor(dimension / spacing);
  }

  private _buildLineSegments(polygon: Position[]): LineGroup[] {
    const segments: LineSegment[] = [];
    const points = polygon.slice();

    const minDistance = 0.01;
    if (!HSCore.Util.Math.isSamePoint(points[0], points[points.length - 1], minDistance)) {
      points.push(points[0]);
    }

    for (let i = 0; i < points.length - 1; i++) {
      const startPoint = points[i];
      const endPoint = points[i + 1];
      const length = new THREE.Vector2(endPoint.x - startPoint.x, endPoint.y - startPoint.y).length();

      if (length >= minDistance) {
        segments.push({
          p0: startPoint,
          p1: endPoint,
          length,
        });
      }
    }

    const directionMap = new Map<THREE.Vector2, LineGroup>();
    const dotProductThreshold = 0.01;

    segments.forEach((segment) => {
      const direction = new THREE.Vector2(segment.p1.x - segment.p0.x, segment.p1.y - segment.p0.y);
      direction.normalize();

      const existingDirection = Array.from(directionMap.keys()).find(
        (key) => Math.abs(1 - Math.abs(key.dot(direction))) < dotProductThreshold
      );

      if (existingDirection) {
        const group = directionMap.get(existingDirection);
        if (group) {
          group.lines.push(segment);
        }
      } else {
        directionMap.set(direction, {
          lines: [segment],
          totalLength: 0,
        });
      }
    });

    const groups = Array.from(directionMap.values());

    groups.forEach((group) => {
      group.totalLength = group.lines.reduce((sum, line) => sum + line.length, 0);
    });

    groups.sort((a, b) => b.totalLength - a.totalLength);

    return groups;
  }

  protected _isValid(lightConfig: LightConfig, room: Room, options: RenderOptions): boolean {
    if (
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3 &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC &&
      options.templateKey !== HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      return super._isValid(lightConfig, room, options);
    }

    let existingLights = room.getPhysicalLights().filter((light) => {
      const contentType = light.contentType();
      return contentType?.isTypeOf(HSConstants.RenderLight.CELLING_LIGHTING_CONTENT_TYPES);
    });

    if (
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      existingLights = room.getPhysicalLights().filter((light) => {
        const contentType = light.contentType();
        return contentType?.isTypeOf(HSConstants.RenderLight.CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES);
      });
    }

    if (existingLights.length === 0) {
      return true;
    }

    const position = lightConfig.position;
    if (!position) {
      return true;
    }

    const newLightPosition = new THREE.Vector2(position.x, position.y);

    const hasCollision = existingLights.some((existingLight) => {
      const existingPosition = existingLight.getPosition();
      const existingSize = existingLight.getSize();
      const existingLightPosition = new THREE.Vector2(existingPosition.x, existingPosition.y);

      const distance = existingLightPosition.sub(newLightPosition).length();
      const minDistance =
        lightConfig.size.length / 2 + Math.max(existingSize.x, existingSize.y) / 2;

      return distance < minDistance;
    });

    return !hasCollision;
  }
}

export default CeilingLightCalculator;