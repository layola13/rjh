import BaseLight from './BaseLight';

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Size {
  x: number;
  y: number;
}

interface LightConfig {
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface LightResult {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies: string | null;
}

interface Room {
  isCeilingFaceHidden(): boolean;
}

interface LightEntity {
  getPosition(): Position;
  getSize(): Size;
  getRotation(): number;
}

interface EdgeDistance {
  distance?: number;
}

const ROTATION_THRESHOLD = 5;
const POSITION_OFFSET_SMALL = -0.75;
const POSITION_OFFSET_LARGE = 0.75;
const SIZE_THRESHOLD_SMALL = 2;
const SIZE_THRESHOLD_MEDIUM = 3;
const SIZE_THRESHOLD_LARGE = 3.8;
const EDGE_BUFFER = 0.5;
const MEDIUM_OFFSET = 0.35;
const LARGE_LAYOUT_OFFSET = 0.7;

export default class CeilingLightComputer extends BaseLight {
  _compute(
    entity: LightEntity,
    room: Room,
    scene: unknown,
    options: unknown
  ): LightResult[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const size = entity.getSize();
    const maxSize = Math.max(size.x, size.y);
    const rotation = entity.getRotation();
    const { intensity, temperature, ies } = super.getDefaultLight(entity, room, scene);

    const lights: LightResult[] = [];

    if (maxSize <= SIZE_THRESHOLD_SMALL) {
      this.computeSingleLight(position, room, defaultHeight, temperature, intensity, ies, lights);
    } else if (maxSize < SIZE_THRESHOLD_MEDIUM) {
      this.computeDualLights(position, size, rotation, room, defaultHeight, temperature, intensity, ies, lights);
    } else if (maxSize < SIZE_THRESHOLD_LARGE) {
      this.computeTripleLights(position, size, rotation, room, defaultHeight, temperature, intensity, ies, lights);
    } else {
      this.computeQuadLights(position, size, rotation, room, defaultHeight, temperature, intensity, ies, lights);
    }

    return lights;
  }

  private computeSingleLight(
    position: Position,
    room: Room,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null,
    lights: LightResult[]
  ): void {
    const adjustedPos = this._adjustPosition(position, room, POSITION_OFFSET_SMALL) ?? {};
    const finalPosition = { ...position, ...adjustedPos };

    lights.push({
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: finalPosition,
      height,
      ies
    });
  }

  private computeDualLights(
    position: Position,
    size: Size,
    rotation: number,
    room: Room,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null,
    lights: LightResult[]
  ): void {
    const maxSize = Math.max(size.x, size.y);
    let offset = maxSize / 4;
    let direction = size.x > size.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), (Math.PI * (rotation % 180)) / 180);
    }

    const centerPos = new THREE.Vector2(position.x, position.y);
    const { distance } = this.getClosestEdge(room, centerPos, direction);

    if (distance !== undefined && distance < EDGE_BUFFER + offset) {
      offset = distance - EDGE_BUFFER;
    }

    const pos1Vec = centerPos.clone().add(direction.clone().multiplyScalar(offset));
    const adjusted1 = this._adjustPosition(pos1Vec, room, POSITION_OFFSET_SMALL) ?? pos1Vec;
    const position1 = { ...position, ...adjusted1 };

    const pos2Vec = centerPos.clone().sub(direction.clone().multiplyScalar(offset));
    const adjusted2 = this._adjustPosition(pos2Vec, room, POSITION_OFFSET_SMALL) ?? pos2Vec;
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
  }

  private computeTripleLights(
    position: Position,
    size: Size,
    rotation: number,
    room: Room,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null,
    lights: LightResult[]
  ): void {
    const maxSize = Math.max(size.x, size.y);
    const centerAdjusted = this._adjustPosition(position, room, POSITION_OFFSET_LARGE) ?? {};
    const centerPosition = { ...position, ...centerAdjusted };

    lights.push({
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: centerPosition,
      height,
      ies
    });

    let sideOffset = maxSize / 2 - MEDIUM_OFFSET;
    let direction = size.x > size.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), (Math.PI * (rotation % 180)) / 180);
    }

    const centerPos = new THREE.Vector2(position.x, position.y);
    const { distance } = this.getClosestEdge(room, centerPos, direction);

    if (distance !== undefined && distance < EDGE_BUFFER + sideOffset) {
      sideOffset = distance - EDGE_BUFFER;
    }

    const pos1Vec = centerPos.clone().add(direction.clone().multiplyScalar(sideOffset));
    const adjusted1 = this._adjustPosition(pos1Vec, room, POSITION_OFFSET_SMALL) ?? pos1Vec;
    const position1 = { ...position, ...adjusted1 };

    const pos2Vec = centerPos.clone().sub(direction.clone().multiplyScalar(sideOffset));
    const adjusted2 = this._adjustPosition(pos2Vec, room, POSITION_OFFSET_SMALL) ?? pos2Vec;
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
  }

  private computeQuadLights(
    position: Position,
    size: Size,
    rotation: number,
    room: Room,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | null,
    lights: LightResult[]
  ): void {
    const maxSize = Math.max(size.x, size.y);
    let direction = size.x > size.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
      direction.rotateAround(new THREE.Vector2(0, 0), (Math.PI * (rotation % 180)) / 180);
    }

    const positions: THREE.Vector2[] = [];
    const innerOffset = (maxSize - LARGE_LAYOUT_OFFSET) / 6;
    const centerPos = new THREE.Vector2(position.x, position.y);

    const innerPos1 = centerPos.clone().add(direction.clone().multiplyScalar(innerOffset));
    positions.push(innerPos1);

    const { distance } = this.getClosestEdge(room, centerPos, direction);
    let outerOffset = 3 * innerOffset;

    if (distance !== undefined && distance < EDGE_BUFFER + outerOffset) {
      outerOffset = distance - EDGE_BUFFER;
    }

    const outerPos1 = centerPos.clone().add(direction.clone().multiplyScalar(outerOffset));
    positions.push(outerPos1);

    const innerPos2 = centerPos.clone().sub(direction.clone().multiplyScalar(innerOffset));
    positions.push(innerPos2);

    const outerPos2 = centerPos.clone().sub(direction.clone().multiplyScalar(outerOffset));
    positions.push(outerPos2);

    positions.forEach((pos) => {
      const finalPosition = { ...position, ...pos };
      lights.push({
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPosition,
        height,
        ies
      });
    });
  }
}