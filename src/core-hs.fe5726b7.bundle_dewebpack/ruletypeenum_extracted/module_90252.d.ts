import BaseLight from './BaseLight';
import * as THREE from 'three';

/**
 * 顶部灯光计算器
 * 根据物体尺寸和位置自动计算并布置射灯
 */
export default class CeilingLightComputer extends BaseLight {
  /**
   * 计算灯光配置
   * @param entity - 实体对象，包含位置、尺寸、旋转等信息
   * @param room - 房间对象，用于判断天花板状态和边界检测
   * @param param2 - 第三个参数（用途待确认）
   * @param param3 - 第四个参数（用途待确认）
   * @returns 灯光配置数组
   */
  _compute(
    entity: EntityWithTransform,
    room: RoomModel,
    param2: unknown,
    param3: unknown
  ): LightConfig[] {
    // 如果天花板被隐藏，不计算灯光
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const size = entity.getSize();
    const maxSize = Math.max(size.x, size.y);
    const rotation = entity.getRotation();

    // 获取默认灯光属性
    const { intensity, temperature, ies } = super.getDefaultLight(
      entity,
      room,
      param2
    );

    const lights: LightConfig[] = [];

    // 小型物体（≤2m）：单灯布局
    if (maxSize <= 2) {
      const adjustedPos = this._adjustPosition(position, room, -0.75) || {};
      const finalPosition = { ...position, ...adjustedPos };
      const lightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPosition,
        height: defaultHeight,
        ies,
      };
      lights.push(lightConfig);
    }
    // 中小型物体（2m < size < 3m）：双灯布局
    else if (maxSize < 3) {
      const offset = maxSize / 4;
      const direction = this._getDirectionVector(size, rotation);
      const center = new THREE.Vector2(position.x, position.y);

      // 检查边界距离并调整偏移
      const { distance: distanceToEdge } = this.getClosestEdge(
        room,
        center,
        direction
      );
      const safeOffset =
        distanceToEdge !== undefined && distanceToEdge < 0.5 + offset
          ? distanceToEdge - 0.5
          : offset;

      // 计算两个灯光位置
      const pos1 = center.clone().add(direction.clone().multiplyScalar(safeOffset));
      const adjustedPos1 = this._adjustPosition(pos1, room, -0.75) || pos1;
      const finalPos1 = { ...position, ...adjustedPos1 };

      const pos2 = center.clone().sub(direction.clone().multiplyScalar(safeOffset));
      const adjustedPos2 = this._adjustPosition(pos2, room, -0.75) || pos2;
      const finalPos2 = { ...position, ...adjustedPos2 };

      lights.push(
        this._createLightConfig(finalPos1, temperature, intensity, defaultHeight, ies),
        this._createLightConfig(finalPos2, temperature, intensity, defaultHeight, ies)
      );
    }
    // 中型物体（3m ≤ size < 3.8m）：三灯布局
    else if (maxSize < 3.8) {
      // 中心灯
      const centerAdjusted = this._adjustPosition(position, room, 0.75) || {};
      const centerPos = { ...position, ...centerAdjusted };
      lights.push(
        this._createLightConfig(centerPos, temperature, intensity, defaultHeight, ies)
      );

      // 两侧灯
      const sideOffset = maxSize / 2 - 0.35;
      const direction = this._getDirectionVector(size, rotation);
      const center = new THREE.Vector2(position.x, position.y);

      const { distance: distanceToEdge } = this.getClosestEdge(room, center, direction);
      const safeSideOffset =
        distanceToEdge !== undefined && distanceToEdge < 0.5 + sideOffset
          ? distanceToEdge - 0.5
          : sideOffset;

      const sidePos1 = center.clone().add(direction.clone().multiplyScalar(safeSideOffset));
      const adjustedSide1 = this._adjustPosition(sidePos1, room, -0.75) || sidePos1;
      const finalSide1 = { ...position, ...adjustedSide1 };

      const sidePos2 = center.clone().sub(direction.clone().multiplyScalar(safeSideOffset));
      const adjustedSide2 = this._adjustPosition(sidePos2, room, -0.75) || sidePos2;
      const finalSide2 = { ...position, ...adjustedSide2 };

      lights.push(
        this._createLightConfig(finalSide1, temperature, intensity, defaultHeight, ies),
        this._createLightConfig(finalSide2, temperature, intensity, defaultHeight, ies)
      );
    }
    // 大型物体（≥3.8m）：四灯布局
    else {
      const direction = this._getDirectionVector(size, rotation);
      const positions: THREE.Vector2[] = [];
      const innerOffset = (maxSize - 0.7) / 6;
      const center = new THREE.Vector2(position.x, position.y);

      // 内侧两个灯位置
      positions.push(center.clone().add(direction.clone().multiplyScalar(innerOffset)));

      // 外侧灯位置（需检查边界）
      const { distance: distanceToEdge } = this.getClosestEdge(room, center, direction);
      const outerOffset = 3 * innerOffset;
      const safeOuterOffset =
        distanceToEdge !== undefined && distanceToEdge < 0.5 + outerOffset
          ? distanceToEdge - 0.5
          : outerOffset;

      positions.push(center.clone().add(direction.clone().multiplyScalar(safeOuterOffset)));
      positions.push(center.clone().sub(direction.clone().multiplyScalar(innerOffset)));
      positions.push(center.clone().sub(direction.clone().multiplyScalar(safeOuterOffset)));

      positions.forEach((pos) => {
        const finalPos = { ...position, ...pos };
        lights.push(
          this._createLightConfig(finalPos, temperature, intensity, defaultHeight, ies)
        );
      });
    }

    return lights;
  }

  /**
   * 根据尺寸和旋转角度计算方向向量
   */
  private _getDirectionVector(
    size: { x: number; y: number },
    rotation: number
  ): THREE.Vector2 {
    const direction =
      size.x > size.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);

    if (Math.abs(rotation % 180) > 5) {
      direction.rotateAround(
        new THREE.Vector2(0, 0),
        (Math.PI * (rotation % 180)) / 180
      );
    }

    return direction;
  }

  /**
   * 创建灯光配置对象
   */
  private _createLightConfig(
    position: Position3D,
    temperature: number,
    intensity: number,
    height: number,
    ies: unknown
  ): LightConfig {
    return {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position,
      height,
      ies,
    };
  }
}

/**
 * 三维位置坐标
 */
interface Position3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 带变换信息的实体对象
 */
interface EntityWithTransform {
  getPosition(): Position3D;
  getSize(): { x: number; y: number };
  getRotation(): number;
}

/**
 * 房间模型
 */
interface RoomModel {
  isCeilingFaceHidden(): boolean;
}

/**
 * 灯光配置
 */
interface LightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: Position3D;
  height: number;
  ies: unknown;
}

/**
 * 边界检测结果
 */
interface EdgeDetectionResult {
  distance?: number;
}

/**
 * 基类中需要实现的方法声明
 */
declare abstract class BaseLight {
  protected getDefaultHeight(room: RoomModel): number;
  protected getDefaultLight(
    entity: EntityWithTransform,
    room: RoomModel,
    param: unknown
  ): {
    intensity: number;
    temperature: number;
    ies: unknown;
  };
  protected _adjustPosition(
    position: Position3D | THREE.Vector2,
    room: RoomModel,
    offset: number
  ): Partial<Position3D> | null;
  protected getClosestEdge(
    room: RoomModel,
    center: THREE.Vector2,
    direction: THREE.Vector2
  ): EdgeDetectionResult;
}

declare namespace HSCore.Model {
  enum LightTypeEnum {
    SpotLight = 'SpotLight',
  }
}