/**
 * 吊灯光源计算器模块
 * 负责计算场景中吊灯类内容物的光源配置
 * Module ID: 79957
 */

import BaseComputer from './BaseComputer'; // 假设 42288 为基础计算器
import { CommonOptions } from './CommonOptions'; // 假设 22777 为通用配置
import { LightContentGroup } from './LightContentGroup'; // 假设 3442 为灯光内容组
import { isTemplateV3 } from './TemplateUtils'; // 假设 34991 为模板工具

/**
 * 3D坐标接口
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D坐标接口
 */
interface Position2D {
  x: number;
  y: number;
}

/**
 * 尺寸接口
 */
interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 旋转角度接口
 */
interface Rotation {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/**
 * 光源配置接口
 */
interface LightConfig extends Rotation {
  /** 光源类型 */
  type: HSCore.Model.LightTypeEnum;
  /** 色温（开尔文） */
  temperature: number;
  /** 光强度 */
  intensity: number;
  /** 光源平面位置 */
  position: THREE.Vector2;
  /** 光源高度 */
  height: number;
  /** IES光域网编号 */
  ies: string;
}

/**
 * 内容物接口
 */
interface ContentItem {
  getPosition(): Position3D;
  getSize(): Size3D;
  getHost(): HSCore.Model.Wall | null;
  /** 前方朝向向量 */
  frontForwardVec: THREE.Vector2;
}

/**
 * 房间接口
 */
interface Room {
  /** 判断天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
  /** 获取天花板高度 */
  getCeilingHeight(): number;
}

/**
 * 渲染选项接口
 */
interface RenderOptions {
  /** 渲染模板键名 */
  templateKey: string;
  /** 色温（开尔文） */
  temperature: number;
}

/**
 * 墙体接口
 */
interface Wall {
  from: Position2D;
  to: Position2D;
}

/**
 * 吊灯光源计算器
 * 根据场景中的吊灯内容物计算对应的聚光灯配置
 */
export default class ChandelierLightComputer extends BaseComputer {
  /**
   * 计算光源配置
   * @param contentGroup - 内容物组
   * @param room - 房间对象
   * @param renderOptions - 渲染选项
   * @param additionalParam - 额外参数（保留）
   * @returns 光源配置数组
   */
  _compute(
    contentGroup: LightContentGroup,
    room: Room,
    renderOptions: RenderOptions,
    additionalParam: unknown
  ): LightConfig[] {
    // 如果天花板隐藏，不生成光源
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const contents = this._getContents(contentGroup);
    const lights: LightConfig[] = [];

    contents.forEach((content) => {
      const position = content.getPosition();
      const forwardVector = content.frontForwardVec;
      const size = content.getSize();
      const host = content.getHost();

      // 如果内容物挂载在墙上，调整朝向向量方向
      if (host && host instanceof HSCore.Model.Wall) {
        const wallStart: Position2D = { x: host.from.x, y: host.from.y };
        const wallEnd: Position2D = { x: host.to.x, y: host.to.y };
        
        // 计算内容物到墙的垂直投影点
        const perpPoint = HSCore.Util.Math.getPerpendicularIntersect(
          position,
          wallStart,
          wallEnd
        );
        
        // 如果朝向向量指向墙内，则反转
        const toWallVec = new THREE.Vector2(
          position.x - perpPoint.x,
          position.y - perpPoint.y
        );
        if (toWallVec.dot(forwardVector) < 0) {
          forwardVector.negate();
        }
      }

      // 计算光源高度（内容物顶部 + 0.5米偏移）
      let lightHeight = position.z + size.z + 0.5;
      const ceilingHeight = room.getCeilingHeight();
      const minGapToCeiling = CommonOptions.defaultGapToCeiling;

      // 确保光源与天花板保持最小间距
      if (lightHeight > ceilingHeight - minGapToCeiling) {
        lightHeight = ceilingHeight - minGapToCeiling;
      }

      // 计算光源平面位置（沿朝向偏移0.3米）
      const lightPosition = new THREE.Vector2(position.x, position.y);
      lightPosition.add(forwardVector.clone().multiplyScalar(0.3));

      // V3模板使用新的光源配置
      if (isTemplateV3(renderOptions.templateKey)) {
        const contentCenterHeight = position.z + size.z / 2;
        
        // 只在内容物高于天花板2/3时生成光源
        if (contentCenterHeight < (ceilingHeight / 3) * 2) {
          return;
        }

        // 计算旋转角度
        const rotation: Position3D & Rotation = {
          x: 0,
          y: 0,
          z: 0,
          XRotation: 0,
          YRotation: 0,
          ZRotation: 0,
        };

        // X轴旋转：根据光源与内容物的垂直距离计算俯仰角
        const pitchAngleDeg = THREE.Math.radToDeg(
          Math.atan(0.3 / (lightHeight - contentCenterHeight))
        );
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(1, 0, 0),
          pitchAngleDeg
        );

        // Z轴旋转：与朝向向量对齐
        const yawAngleDeg = 90 - THREE.Math.radToDeg(forwardVector.angle());
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(0, 0, 1),
          yawAngleDeg
        );

        // 根据模板类型设置光强度
        const DEFAULT_INTENSITY = 1500;
        const REALISTIC_INTENSITY = HSConstants.RenderLight.REALISTIC_DECORATE_SPOT_INTENSITY;
        const COLOR_TEMPERATURE = 5500; // 5500K色温（日光白）

        const isRealisticTemplate =
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

        const intensity = isRealisticTemplate ? REALISTIC_INTENSITY : DEFAULT_INTENSITY;

        const lightConfig: LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: COLOR_TEMPERATURE,
          intensity,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
          XRotation: rotation.XRotation,
          YRotation: rotation.YRotation,
          ZRotation: rotation.ZRotation,
        };

        lights.push(lightConfig);
      } else {
        // 旧版模板使用简化的光源配置
        const zRotation = -forwardVector.angle();
        const CONE_ANGLE_DEG = 10;
        const xRotation = 2 * Math.PI - THREE.Math.degToRad(CONE_ANGLE_DEG);
        const LEGACY_INTENSITY = 1300;

        const lightConfig: LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: renderOptions.temperature,
          intensity: LEGACY_INTENSITY,
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
   * 获取并过滤内容物列表
   * 递归展开内容物组，去重重叠的内容物
   * @param contentGroup - 内容物组
   * @returns 过滤后的内容物列表
   */
  private _getContents(contentGroup: LightContentGroup): ContentItem[] {
    /**
     * 递归展开内容物组
     */
    const flattenContents = (item: LightContentGroup | ContentItem): ContentItem[] => {
      const result: ContentItem[] = [];

      if (item instanceof LightContentGroup) {
        const children = contentGroup.getChildren();
        if (children && Array.isArray(children)) {
          const flattened = children.map((child) => flattenContents(child)).flat(2);
          result.push(...flattened);
        }
      } else {
        result.push(item);
      }

      return result;
    };

    const allContents = flattenContents(contentGroup);

    // 少于2个内容物无需去重
    if (allContents.length < 2) {
      return allContents;
    }

    // 按Z坐标升序排序
    allContents.sort((a, b) => {
      const posA = a.getPosition();
      const posB = b.getPosition();
      return posB.z - posA.z;
    });

    // 去重：移除被其他内容物包含的项
    const uniqueContents: ContentItem[] = [allContents.shift()!];
    const OVERLAP_TOLERANCE = 0.2; // 重叠容差（米）

    allContents.forEach((content) => {
      const contentSize = content.getSize().x;
      const contentPos = content.getPosition();
      const contentPos2D = new THREE.Vector2(contentPos.x, contentPos.y);

      // 检查是否与已有内容物重叠
      const isOverlapping = uniqueContents.find((existing) => {
        const existingSize = existing.getSize().x;
        const existingPos = existing.getPosition();
        const existingPos2D = new THREE.Vector2(existingPos.x, existingPos.y);

        // 判断两个内容物是否重叠（基于半径和）
        const distance = existingPos2D.sub(contentPos2D).length();
        const radiusSum = (contentSize + existingSize) / 2;

        return 2 * distance + OVERLAP_TOLERANCE < radiusSum;
      });

      if (!isOverlapping) {
        uniqueContents.push(content);
      }
    });

    return uniqueContents;
  }
}