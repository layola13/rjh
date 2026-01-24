/**
 * 射灯内容光源计算器
 * 负责计算装饰性射灯的光源位置、方向和参数
 */

import BaseContentLightComputer from './BaseContentLightComputer';
import { CommonOptions } from './CommonOptions';
import { LightContentGroup } from './LightContentGroup';
import { isTemplateV3 } from './templateUtils';

/**
 * 光源配置接口
 */
interface LightConfig {
  /** 光源类型 */
  type: HSCore.Model.LightTypeEnum;
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 平面位置（XY坐标） */
  position: THREE.Vector2;
  /** 高度（Z坐标） */
  height: number;
  /** IES光域文件编号 */
  ies: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
}

/**
 * 旋转变换数据结构
 */
interface RotationTransform {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/**
 * 平面坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 模板配置接口
 */
interface TemplateConfig {
  /** 模板标识 */
  templateKey: string;
  /** 色温 */
  temperature: number;
}

/**
 * 内容对象接口
 */
interface Content {
  /** 获取3D位置 */
  getPosition(): THREE.Vector3;
  /** 获取尺寸 */
  getSize(): THREE.Vector3;
  /** 获取宿主对象（墙体等） */
  getHost(): HSCore.Model.Wall | null;
  /** 前向量 */
  frontForwardVec: THREE.Vector2;
}

/**
 * 房间接口
 */
interface Room {
  /** 判断是否隐藏天花板 */
  isCeilingFaceHidden(): boolean;
  /** 获取天花板高度 */
  getCeilingHeight(): number;
}

/**
 * 装饰射灯光源计算器
 * 根据灯具位置、朝向和房间参数计算射灯的光源配置
 */
export default class SpotLightComputer extends BaseContentLightComputer {
  /**
   * 计算射灯光源配置
   * @param content - 灯具内容对象
   * @param room - 房间对象
   * @param template - 渲染模板配置
   * @param context - 计算上下文
   * @returns 光源配置数组
   */
  _compute(
    content: Content | LightContentGroup,
    room: Room,
    template: TemplateConfig,
    context: unknown
  ): LightConfig[] {
    // 天花板隐藏时不生成光源
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const contents = this._getContents(content);
    const lights: LightConfig[] = [];

    contents.forEach((item) => {
      const position = item.getPosition();
      const forwardVec = item.frontForwardVec;
      const size = item.getSize();
      const host = item.getHost();

      // 处理安装在墙体上的灯具，调整前向量方向
      if (host && host instanceof HSCore.Model.Wall) {
        const wallFrom: Point2D = { x: host.from.x, y: host.from.y };
        const wallTo: Point2D = { x: host.to.x, y: host.to.y };

        // 计算灯具到墙体的垂直投影点
        const projection = HSCore.Util.Math.getPerpendicularIntersect(
          position,
          wallFrom,
          wallTo
        );

        // 确保前向量指向房间内部
        const toProjection = new THREE.Vector2(
          position.x - projection.x,
          position.y - projection.y
        );
        if (toProjection.dot(forwardVec) < 0) {
          forwardVec.negate();
        }
      }

      // 计算光源高度，默认位于灯具顶部上方0.5单位
      let lightHeight = position.z + size.z + 0.5;
      const ceilingHeight = room.getCeilingHeight();
      const minGapToCeiling = CommonOptions.defaultGapToCeiling;

      // 限制光源不超过天花板
      if (lightHeight > ceilingHeight - minGapToCeiling) {
        lightHeight = ceilingHeight - minGapToCeiling;
      }

      // 计算光源平面位置（沿前向量偏移0.3单位）
      const lightPosition = new THREE.Vector2(position.x, position.y);
      lightPosition.add(forwardVec.clone().multiplyScalar(0.3));

      // V3模板使用写实射灯配置
      if (isTemplateV3(template.templateKey)) {
        const itemCenterHeight = position.z + size.z / 2;

        // 仅在灯具位于房间上三分之二高度时生成光源
        if (itemCenterHeight < (ceilingHeight / 3) * 2) {
          return;
        }

        // 初始化旋转变换
        const rotation: RotationTransform = {
          x: 0,
          y: 0,
          z: 0,
          XRotation: 0,
          YRotation: 0,
          ZRotation: 0,
        };

        // 计算向下倾斜角度（根据水平偏移0.3和垂直距离）
        const tiltAngleDeg = THREE.Math.radToDeg(
          Math.atan(0.3 / (lightHeight - itemCenterHeight))
        );
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(1, 0, 0),
          tiltAngleDeg
        );

        // 计算水平旋转角度
        const horizontalAngleDeg = 90 - THREE.Math.radToDeg(forwardVec.angle());
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(0, 0, 1),
          horizontalAngleDeg
        );

        // 设置光照强度（写实模板使用特定值）
        let intensity = 1500;
        const temperature = 5500;

        if (
          template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
          template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
        ) {
          intensity = HSConstants.RenderLight.REALISTIC_DECORATE_SPOT_INTENSITY;
        }

        const lightConfig: LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: temperature,
          intensity: intensity,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
          XRotation: rotation.XRotation,
          YRotation: rotation.YRotation,
          ZRotation: rotation.ZRotation,
        };

        lights.push(lightConfig);
      } else {
        // 非V3模板使用简化射灯配置
        const zRotation = -forwardVec.angle();
        const xRotation = 2 * Math.PI - THREE.Math.degToRad(10);

        const lightConfig: LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: template.temperature,
          intensity: 1300,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_5,
          XRotation: 0,
          YRotation: xRotation,
          ZRotation: zRotation,
        };

        lights.push(lightConfig);
      }
    });

    return lights;
  }

  /**
   * 获取并过滤内容对象
   * 展开分组，去除重叠灯具，按高度排序
   * @param content - 内容对象或分组
   * @returns 过滤后的内容数组
   */
  private _getContents(content: Content | LightContentGroup): Content[] {
    /**
     * 递归展开内容分组
     */
    const flatten = (item: Content | LightContentGroup): Content[] => {
      const result: Content[] = [];

      if (item instanceof LightContentGroup) {
        const children = item.getChildren();
        if (children && Array.isArray(children)) {
          const flattenedChildren = children.map((child) => flatten(child)).flat(2);
          result.push(...flattenedChildren);
        }
      } else {
        result.push(item);
      }

      return result;
    };

    const allContents = flatten(content);

    // 单个或无内容时直接返回
    if (allContents.length < 2) {
      return allContents;
    }

    // 按高度降序排序
    allContents.sort((a, b) => {
      const posA = a.getPosition();
      const posB = b.getPosition();
      return posB.z - posA.z;
    });

    // 去重：移除在平面上重叠的灯具
    const uniqueContents: Content[] = [allContents.shift()!];

    allContents.forEach((candidate) => {
      const candidateSize = candidate.getSize().x;
      const candidatePos = candidate.getPosition();
      const candidatePosXY = new THREE.Vector2(candidatePos.x, candidatePos.y);

      // 检查是否与已选灯具重叠
      const isOverlapping = uniqueContents.find((existing) => {
        const existingSize = existing.getSize().x;
        const { x: existingX, y: existingY } = existing.getPosition();
        const existingPosXY = new THREE.Vector2(existingX, existingY);

        // 计算平面距离
        const distance = existingPosXY.sub(candidatePosXY).length();

        // 判断是否重叠（考虑0.2的容差）
        return 2 * distance + 0.2 < candidateSize + existingSize;
      });

      if (!isOverlapping) {
        uniqueContents.push(candidate);
      }
    });

    return uniqueContents;
  }
}