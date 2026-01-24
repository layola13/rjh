import BaseLight from './BaseLight';
import type { Furniture } from '../models/Furniture';
import type { Room } from '../models/Room';
import type { RenderConfig } from '../models/RenderConfig';
import type { LightConfig } from '../models/LightConfig';

/**
 * 吊灯光源计算器
 * 根据家具尺寸和房间配置计算射灯光源的位置和属性
 */
export default class CeilingLightComputer extends BaseLight {
  /**
   * 计算吊灯光源配置
   * @param furniture - 家具对象（吊灯）
   * @param room - 所在房间
   * @param renderConfig - 渲染配置
   * @param context - 渲染上下文
   * @returns 光源配置数组
   */
  protected _compute(
    furniture: Furniture,
    room: Room,
    renderConfig: RenderConfig,
    context: unknown
  ): LightConfig[] {
    // 如果天花板面被隐藏，不生成光源
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    // 获取家具基本属性
    const position = furniture.getPosition();
    const forwardVector = furniture.frontForwardVec;
    const size = furniture.getSize();
    const maxSize = Math.max(size.x, size.y);
    const lightHeight = this.getDefaultHeight(room);

    // 获取默认光源属性
    const { intensity, temperature, ies } = super.getDefaultLight(
      furniture,
      room,
      renderConfig
    );

    // 计算光源基准位置（沿前向偏移）
    const basePosition = new THREE.Vector2(position.x, position.y);
    const offsetDistance = size.y / 2 + 0.16; // 160mm偏移
    basePosition.add(forwardVector.clone().multiplyScalar(offsetDistance));

    const lights: LightConfig[] = [];

    // 小尺寸吊灯：单光源
    if (maxSize < 2) {
      const light: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: basePosition,
        height: lightHeight,
        ies,
      };
      lights.push(light);
    } 
    // 大尺寸吊灯：双光源对称布局
    else {
      // 计算垂直于前向的侧向向量
      const sideVector = forwardVector
        .clone()
        .rotateAround({ x: 0, y: 0 }, THREE.Math.degToRad(90));

      const lateralOffset = 1; // 1米侧向间距

      // 计算左右两侧光源位置
      let leftPosition = basePosition
        .clone()
        .add(sideVector.clone().multiplyScalar(lateralOffset));
      let rightPosition = basePosition
        .clone()
        .sub(sideVector.clone().multiplyScalar(lateralOffset));

      // 调整位置以避免遮挡（默认偏移-0.5米）
      leftPosition = this._adjustPosition(leftPosition, room, -0.5) ?? leftPosition;
      rightPosition = this._adjustPosition(rightPosition, room, -0.5) ?? rightPosition;

      // 真实感/通用模板使用更大的偏移量
      const isHighQualityTemplate =
        renderConfig.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        renderConfig.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

      if (isHighQualityTemplate) {
        leftPosition = this._adjustPosition(leftPosition, room, -0.65) ?? leftPosition;
        rightPosition = this._adjustPosition(rightPosition, room, -0.65) ?? rightPosition;
      }

      // 创建左侧光源
      const leftLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: { ...basePosition, ...leftPosition },
        height: lightHeight,
        ies,
      };

      // 创建右侧光源
      const rightLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: { ...basePosition, ...rightPosition },
        height: lightHeight,
        ies,
      };

      lights.push(leftLight, rightLight);
    }

    return lights;
  }

  /**
   * 调整光源位置以避免与房间结构冲突
   * @param position - 原始位置
   * @param room - 房间对象
   * @param offset - 偏移量（米）
   * @returns 调整后的位置，如果无法调整则返回null
   */
  private _adjustPosition(
    position: THREE.Vector2,
    room: Room,
    offset: number
  ): THREE.Vector2 | null {
    // 实现位置调整逻辑（原代码中未提供具体实现）
    // 此处为方法签名声明
    throw new Error('Method not implemented');
  }
}