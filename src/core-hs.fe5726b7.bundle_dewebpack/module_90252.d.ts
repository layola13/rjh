import BaseLight from './BaseLight';
import * as THREE from 'three';

/**
 * 灯具配置接口
 */
interface LightConfiguration {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum;
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光位置 */
  position: THREE.Vector3 | { x?: number; y?: number; z?: number };
  /** 安装高度 */
  height: number;
  /** IES光域文件 */
  ies?: string;
}

/**
 * 实体接口
 */
interface Entity {
  /** 获取实体位置 */
  getPosition(): THREE.Vector3;
  /** 获取实体尺寸 */
  getSize(): THREE.Vector2;
  /** 获取实体旋转角度 */
  getRotation(): number;
}

/**
 * 房间接口
 */
interface Room {
  /** 判断天花板是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 边缘距离结果接口
 */
interface EdgeDistanceResult {
  /** 到边缘的距离 */
  distance?: number;
}

/**
 * 默认光照属性接口
 */
interface DefaultLightProperties {
  /** 光照强度 */
  intensity: number;
  /** 色温 */
  temperature: number;
  /** IES光域文件 */
  ies?: string;
}

/**
 * 筒灯光源计算类
 * 根据实体尺寸自动计算合适的灯光布局方案
 */
export default class CeilingLightComputer extends BaseLight {
  
  /**
   * 计算实体的光照配置
   * @param entity - 灯具实体对象
   * @param room - 所在房间对象
   * @param param2 - 额外参数（未使用）
   * @param param3 - 额外参数（未使用）
   * @returns 灯光配置数组
   */
  protected _compute(
    entity: Entity,
    room: Room,
    param2: unknown,
    param3: unknown
  ): LightConfiguration[] {
    // 如果天花板隐藏则不计算灯光
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const size = entity.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const rotation = entity.getRotation();
    
    const { intensity, temperature, ies } = super.getDefaultLight(entity, room, param2);
    
    const lights: LightConfiguration[] = [];

    // 小型灯具：单灯布局（最大尺寸 <= 2m）
    if (maxDimension <= 2) {
      const adjustedPos = this._adjustPosition(position, room, -0.75) || {};
      const finalPosition = Object.assign({}, position, adjustedPos);
      
      const lightConfig: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPosition,
        height: defaultHeight,
        ies
      };
      
      lights.push(lightConfig);
      
    // 中型灯具：双灯布局（2m < 尺寸 < 3m）
    } else if (maxDimension < 3) {
      const EDGE_SAFETY_MARGIN = 0.5;
      const QUARTER_SIZE_OFFSET = maxDimension / 4;
      
      // 确定主轴方向（沿长边方向）
      let direction = size.x > size.y 
        ? new THREE.Vector2(1, 0) 
        : new THREE.Vector2(0, 1);
      
      // 应用旋转
      const ROTATION_THRESHOLD = 5;
      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        direction.rotateAround(
          new THREE.Vector2(0, 0),
          Math.PI * (rotation % 180) / 180
        );
      }
      
      const center2D = new THREE.Vector2(position.x, position.y);
      const { distance } = this.getClosestEdge(room, center2D, direction);
      
      // 调整偏移量避免超出边界
      let offset = QUARTER_SIZE_OFFSET;
      if (distance !== undefined && distance < EDGE_SAFETY_MARGIN + offset) {
        offset = distance - EDGE_SAFETY_MARGIN;
      }
      
      // 计算两个灯光位置
      const pos1_2D = center2D.clone().add(direction.clone().multiplyScalar(offset));
      let adjusted1 = this._adjustPosition(pos1_2D, room, -0.75) || pos1_2D;
      const finalPos1 = Object.assign({}, position, adjusted1);
      
      const pos2_2D = center2D.clone().sub(direction.clone().multiplyScalar(offset));
      const adjusted2 = this._adjustPosition(pos2_2D, room, -0.75) || pos2_2D;
      const finalPos2 = Object.assign({}, position, adjusted2);
      
      const light1: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPos1,
        height: defaultHeight,
        ies
      };
      
      const light2: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalPos2,
        height: defaultHeight,
        ies
      };
      
      lights.push(light1, light2);
      
    // 中大型灯具：三灯布局（3m <= 尺寸 < 3.8m）
    } else if (maxDimension < 3.8) {
      const CENTER_OFFSET = 0.75;
      const SIDE_CLEARANCE = 0.35;
      const EDGE_SAFETY_MARGIN = 0.5;
      
      // 添加中心灯
      let adjustedCenter = this._adjustPosition(position, room, CENTER_OFFSET) || {};
      const centerPosition = Object.assign({}, position, adjustedCenter);
      
      const centerLight: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: centerPosition,
        height: defaultHeight,
        ies
      };
      lights.push(centerLight);
      
      // 计算两侧灯光
      let sideOffset = maxDimension / 2 - SIDE_CLEARANCE;
      
      let direction = size.x > size.y 
        ? new THREE.Vector2(1, 0) 
        : new THREE.Vector2(0, 1);
      
      const ROTATION_THRESHOLD = 5;
      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        direction.rotateAround(
          new THREE.Vector2(0, 0),
          Math.PI * (rotation % 180) / 180
        );
      }
      
      const center2D = new THREE.Vector2(position.x, position.y);
      const { distance } = this.getClosestEdge(room, center2D, direction);
      
      if (distance !== undefined && distance < EDGE_SAFETY_MARGIN + sideOffset) {
        sideOffset = distance - EDGE_SAFETY_MARGIN;
      }
      
      // 侧边灯光1
      const side1_2D = center2D.clone().add(direction.clone().multiplyScalar(sideOffset));
      let adjustedSide1 = this._adjustPosition(side1_2D, room, -CENTER_OFFSET) || side1_2D;
      const finalSide1 = Object.assign({}, position, adjustedSide1);
      
      // 侧边灯光2
      const side2_2D = center2D.clone().sub(direction.clone().multiplyScalar(sideOffset));
      const adjustedSide2 = this._adjustPosition(side2_2D, room, -CENTER_OFFSET) || side2_2D;
      const finalSide2 = Object.assign({}, position, adjustedSide2);
      
      const sideLight1: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalSide1,
        height: defaultHeight,
        ies
      };
      
      const sideLight2: LightConfiguration = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: finalSide2,
        height: defaultHeight,
        ies
      };
      
      lights.push(sideLight1, sideLight2);
      
    // 大型灯具：四灯布局（尺寸 >= 3.8m）
    } else {
      const INNER_SPACING_DIVISOR = 6;
      const EDGE_CLEARANCE = 0.7;
      const EDGE_SAFETY_MARGIN = 0.5;
      
      // 确定主轴方向
      let direction = size.x > size.y 
        ? new THREE.Vector2(1, 0) 
        : new THREE.Vector2(0, 1);
      
      const ROTATION_THRESHOLD = 5;
      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        direction.rotateAround(
          new THREE.Vector2(0, 0),
          Math.PI * (rotation % 180) / 180
        );
      }
      
      const positions2D: THREE.Vector2[] = [];
      const innerOffset = (maxDimension - EDGE_CLEARANCE) / INNER_SPACING_DIVISOR;
      const center2D = new THREE.Vector2(position.x, position.y);
      
      // 内侧灯光1
      const innerPos1 = center2D.clone().add(direction.clone().multiplyScalar(innerOffset));
      positions2D.push(innerPos1);
      
      // 外侧灯光（考虑边界限制）
      const { distance } = this.getClosestEdge(room, center2D, direction);
      let outerOffset = 3 * innerOffset;
      
      if (distance !== undefined && distance < EDGE_SAFETY_MARGIN + outerOffset) {
        outerOffset = distance - EDGE_SAFETY_MARGIN;
      }
      
      const outerPos1 = center2D.clone().add(direction.clone().multiplyScalar(outerOffset));
      positions2D.push(outerPos1);
      
      // 内侧灯光2（对称）
      const innerPos2 = center2D.clone().sub(direction.clone().multiplyScalar(innerOffset));
      positions2D.push(innerPos2);
      
      // 外侧灯光2（对称）
      const outerPos2 = center2D.clone().sub(direction.clone().multiplyScalar(outerOffset));
      positions2D.push(outerPos2);
      
      // 为每个位置创建灯光配置
      positions2D.forEach((pos2D) => {
        const finalPosition = Object.assign({}, position, pos2D);
        
        const lightConfig: LightConfiguration = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: finalPosition,
          height: defaultHeight,
          ies
        };
        
        lights.push(lightConfig);
      });
    }
    
    return lights;
  }

  /**
   * 调整位置以避免碰撞或边界问题（继承自基类）
   * @param position - 原始位置
   * @param room - 房间对象
   * @param offset - 偏移量
   * @returns 调整后的位置或undefined
   */
  protected _adjustPosition(
    position: THREE.Vector2 | THREE.Vector3,
    room: Room,
    offset: number
  ): { x?: number; y?: number } | undefined {
    // 实现由基类提供
    return undefined;
  }

  /**
   * 获取默认安装高度（继承自基类）
   * @param room - 房间对象
   * @returns 默认高度值
   */
  protected getDefaultHeight(room: Room): number {
    // 实现由基类提供
    return 0;
  }

  /**
   * 获取最近边缘的距离（继承自基类）
   * @param room - 房间对象
   * @param position - 当前位置
   * @param direction - 检测方向
   * @returns 边缘距离结果
   */
  protected getClosestEdge(
    room: Room,
    position: THREE.Vector2,
    direction: THREE.Vector2
  ): EdgeDistanceResult {
    // 实现由基类提供
    return {};
  }
}