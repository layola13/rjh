import BaseClass from './module_42288';

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Size {
  x: number;
  y: number;
}

interface LightProperties {
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies: string | null;
}

interface ClosestEdgeResult {
  distance?: number;
}

interface Entity {
  getPosition(): Position;
  getSize(): Size;
  getRotation(): number;
}

interface Face {
  isCeilingFaceHidden(): boolean;
}

const POSITION_OFFSET_SMALL = -0.75;
const POSITION_OFFSET_MEDIUM = 0.75;
const SIZE_THRESHOLD_SMALL = 2;
const SIZE_THRESHOLD_MEDIUM = 3;
const SIZE_THRESHOLD_LARGE = 3.8;
const EDGE_MARGIN = 0.5;
const GRID_SPACING = 0.7;
const ROTATION_THRESHOLD = 5;

export default class LightComputer extends BaseClass {
  _compute(
    entity: Entity,
    face: Face,
    context: unknown,
    additionalParam: unknown
  ): LightConfig[] {
    if (face.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const defaultHeight = this.getDefaultHeight(face);
    const size = entity.getSize();
    const maxSize = Math.max(size.x, size.y);
    const rotation = entity.getRotation();
    const { intensity, temperature, ies } = super.getDefaultLight(entity, face, context);

    const lights: LightConfig[] = [];

    if (maxSize <= SIZE_THRESHOLD_SMALL) {
      lights.push(...this._computeSmallLight(position, face, defaultHeight, temperature, intensity, ies));
    } else if (maxSize < SIZE_THRESHOLD_MEDIUM) {
      lights.push(...this._computeMediumLight(position, size, rotation, face, defaultHeight, temperature, intensity, ies));
    } else if (maxSize < SIZE_THRESHOLD_LARGE) {
      lights.push(...this._computeLargeLight(position, size, rotation, face, defaultHeight, temperature, intensity, ies));
    } else {
      lights.push(...this._computeExtraLargeLight(position, size, rotation, face, defaultHeight, temperature, intensity, ies));
    }

    return lights;
  }

  private _computeSmallLight(
    position: Position,
    face: Face,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null
  ): LightConfig[] {
    const adjustedPos = this._adjustPosition(position, face, POSITION_OFFSET_SMALL) ?? {};
    const finalPosition = { ...position, ...adjustedPos };

    return [{
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: finalPosition,
      height,
      ies
    }];
  }

  private _computeMediumLight(
    position: Position,
    size: Size,
    rotation: number,
    face: Face,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null
  ): LightConfig[] {
    const maxSize = Math.max(size.x, size.y);
    let offset = maxSize / 4;

    const direction = size.x > size.y 
      ? new THREE.Vector2(1, 0) 
      : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), Math.PI * (rotation % 180) / 180);
    }

    const centerPoint = new THREE.Vector2(position.x, position.y);
    const { distance } = this.getClosestEdge(face, centerPoint, direction);

    if (distance !== undefined && distance < EDGE_MARGIN + offset) {
      offset = distance - EDGE_MARGIN;
    }

    const point1 = centerPoint.clone().add(direction.clone().multiplyScalar(offset));
    const adjusted1 = this._adjustPosition(point1, face, POSITION_OFFSET_SMALL) ?? point1;
    const position1 = { ...position, ...adjusted1 };

    const point2 = centerPoint.clone().sub(direction.clone().multiplyScalar(offset));
    const adjusted2 = this._adjustPosition(point2, face, POSITION_OFFSET_SMALL) ?? point2;
    const position2 = { ...position, ...adjusted2 };

    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: position1,
        height,
        ies
      },
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: position2,
        height,
        ies
      }
    ];
  }

  private _computeLargeLight(
    position: Position,
    size: Size,
    rotation: number,
    face: Face,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null
  ): LightConfig[] {
    const lights: LightConfig[] = [];

    const centerAdjusted = this._adjustPosition(position, face, POSITION_OFFSET_MEDIUM) ?? {};
    const centerPosition = { ...position, ...centerAdjusted };

    lights.push({
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: centerPosition,
      height,
      ies
    });

    const maxSize = Math.max(size.x, size.y);
    let sideOffset = maxSize / 2 - 0.35;

    const direction = size.x > size.y 
      ? new THREE.Vector2(1, 0) 
      : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), Math.PI * (rotation % 180) / 180);
    }

    const centerPoint = new THREE.Vector2(position.x, position.y);
    const { distance } = this.getClosestEdge(face, centerPoint, direction);

    if (distance !== undefined && distance < EDGE_MARGIN + sideOffset) {
      sideOffset = distance - EDGE_MARGIN;
    }

    const point1 = centerPoint.clone().add(direction.clone().multiplyScalar(sideOffset));
    const adjusted1 = this._adjustPosition(point1, face, POSITION_OFFSET_SMALL) ?? point1;
    const position1 = { ...position, ...adjusted1 };

    const point2 = centerPoint.clone().sub(direction.clone().multiplyScalar(sideOffset));
    const adjusted2 = this._adjustPosition(point2, face, POSITION_OFFSET_SMALL) ?? point2;
    const position2 = { ...position, ...adjusted2 };

    lights.push(
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: position1,
        height,
        ies
      },
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: position2,
        height,
        ies
      }
    );

    return lights;
  }

  private _computeExtraLargeLight(
    position: Position,
    size: Size,
    rotation: number,
    face: Face,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null
  ): LightConfig[] {
    const maxSize = Math.max(size.x, size.y);
    const direction = size.x > size.y 
      ? new THREE.Vector2(1, 0) 
      : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), Math.PI * (rotation % 180) / 180);
    }

    const points: THREE.Vector2[] = [];
    const innerOffset = (maxSize - GRID_SPACING) / 6;
    const centerPoint = new THREE.Vector2(position.x, position.y);

    const innerPoint1 = centerPoint.clone().add(direction.clone().multiplyScalar(innerOffset));
    points.push(innerPoint1);

    const { distance } = this.getClosestEdge(face, centerPoint, direction);
    let outerOffset = 3 * innerOffset;

    if (distance !== undefined && distance < EDGE_MARGIN + outerOffset) {
      outerOffset = distance - EDGE_MARGIN;
    }

    const outerPoint1 = centerPoint.clone().add(direction.clone().multiplyScalar(outerOffset));
    points.push(outerPoint1);

    const innerPoint2 = centerPoint.clone().sub(direction.clone().multiplyScalar(innerOffset));
    points.push(innerPoint2);

    const outerPoint2 = centerPoint.clone().sub(direction.clone().multiplyScalar(outerOffset));
    points.push(outerPoint2);

    return points.map(point => {
      const finalPosition = { ...position, ...point };
      return {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPosition,
        height,
        ies
      };
    });
  }
}