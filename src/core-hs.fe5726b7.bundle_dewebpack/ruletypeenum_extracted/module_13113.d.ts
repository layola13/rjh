import { default as BaseClass } from './module_42288';
import { LightContentGroup } from './module_3442';

/**
 * 灯光计算器类
 * 负责根据房间和模型参数计算灯光位置和属性
 */
export default class LightCalculator extends BaseClass {
  /**
   * 计算灯光配置
   * @param model - 灯光模型对象
   * @param room - 房间对象
   * @param renderConfig - 渲染配置
   * @param additionalParam - 额外参数
   * @returns 灯光配置数组
   */
  _compute(
    model: LightModel,
    room: Room,
    renderConfig: RenderConfig,
    additionalParam: unknown
  ): LightConfig[];
}

/**
 * 灯光模型接口
 */
interface LightModel {
  /**
   * 获取模型位置
   */
  getPosition(): Position3D;

  /**
   * 获取模型尺寸
   */
  getSize(): Size3D;

  /**
   * 获取模型旋转角度（度）
   */
  getRotation(): number;

  /**
   * 获取模型轮廓点集
   */
  getOutline(): Point2D[];

  /**
   * 获取子模型数组
   */
  getChildren(): LightModel[];
}

/**
 * 房间接口
 */
interface Room {
  /**
   * 判断天花板面是否隐藏
   */
  isCeilingFaceHidden(): boolean;

  /**
   * 获取天花板高度
   */
  getCeilingHeight(): number;
}

/**
 * 渲染配置接口
 */
interface RenderConfig {
  /**
   * 渲染模板键名
   */
  templateKey: string;
}

/**
 * 三维位置
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 三维尺寸
 */
interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 二维点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 灯光配置
 */
interface LightConfig {
  /**
   * 灯光类型
   */
  type: HSCore.Model.LightTypeEnum;

  /**
   * 色温
   */
  temperature: number;

  /**
   * 强度
   */
  intensity: number;

  /**
   * 位置
   */
  position: Position3D;

  /**
   * 高度
   */
  height: number;

  /**
   * IES光域网文件
   */
  ies?: string;
}

/**
 * 边缘距离结果
 */
interface EdgeDistanceResult {
  /**
   * 到最近边缘的距离
   */
  distance?: number;
}

declare global {
  namespace HSConstants {
    namespace Render {
      const TEMPLATE_NAME_V3: {
        NIGHT: string;
        CHILLY_3: string;
      };
    }

    namespace RenderLight {
      /**
       * 安全高度缩放系数
       */
      const SAFE_HEIGHT_SCALE: number;
    }
  }

  namespace HSCore.Model {
    /**
     * 灯光类型枚举
     */
    enum LightTypeEnum {
      SpotLight = 'SpotLight',
    }
  }

  namespace THREE {
    class Vector2 {
      x: number;
      y: number;
      constructor(x: number, y: number);
      rotateAround(center: Vector2, angle: number): Vector2;
      clone(): Vector2;
      add(v: Vector2): Vector2;
      sub(v: Vector2): Vector2;
      multiplyScalar(scalar: number): Vector2;
    }

    class Box2 {
      setFromPoints(points: Point2D[] | Vector2[]): void;
      getSize(): { x: number; y: number };
    }

    namespace Math {
      function degToRad(degrees: number): number;
    }
  }
}