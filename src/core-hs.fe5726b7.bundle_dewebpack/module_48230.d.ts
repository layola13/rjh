import BaseLight from './BaseLight';

/**
 * 吊顶灯光计算策略
 * 根据物体尺寸、位置和渲染模板自动计算吊顶射灯布局
 */
export default class CeilingLightStrategy extends BaseLight {
  /**
   * 计算吊顶灯光配置
   * @param object - 灯光相关的3D物体
   * @param room - 房间模型
   * @param renderTemplate - 渲染模板配置
   * @param additionalParams - 额外参数
   * @returns 灯光配置数组
   */
  _compute(
    object: HSCore.Model.Object3D,
    room: HSCore.Model.Room,
    renderTemplate: HSCore.Model.RenderTemplate,
    additionalParams: unknown
  ): HSCore.Model.LightConfig[] {
    // 如果天花板面隐藏，不生成灯光
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = object.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const lights: HSCore.Model.LightConfig[] = [];
    
    // 物体前向向量
    const frontForward = object.frontForwardVec;
    // 垂直于前向的侧向向量（旋转90度）
    const sideVector = frontForward.clone().rotateAround(
      { x: 0, y: 0 },
      THREE.Math.degToRad(90)
    );
    
    const size = object.getSize();
    const MIN_SIZE_THRESHOLD = 1.5;
    
    const {
      intensity,
      temperature,
      ies
    } = super.getDefaultLight(object, room, renderTemplate);

    // 特殊类别：三点布光（两侧+前方）
    if (this._isInCategory(['4909c460-b0f0-4cd1-af59-4898c310f3f5'], object)) {
      const center2D = new THREE.Vector2(position.x, position.y);
      
      // 右侧灯光位置
      let rightPosition = center2D.clone().add(
        sideVector.clone().multiplyScalar(size.x / 2)
      );
      
      // 左侧灯光位置
      let leftPosition = center2D.clone().sub(
        sideVector.clone().multiplyScalar(size.x / 2)
      );
      
      // 前方灯光位置
      const frontPosition = center2D.clone().add(
        frontForward.clone().multiplyScalar(size.y / 2)
      );

      // 检测右侧灯光与墙体距离，避免穿墙
      const {
        closestEdge: rightEdge,
        distance: rightDistance
      } = this.getClosestEdge(room, rightPosition, sideVector);
      
      const WALL_OFFSET_THRESHOLD = 0.6;
      const SAFETY_OFFSET = 0.65;
      
      if (rightEdge && rightDistance < WALL_OFFSET_THRESHOLD) {
        const offset = SAFETY_OFFSET - rightDistance;
        rightPosition = rightPosition.sub(sideVector.clone().multiplyScalar(offset));
      }

      // 真实感/通用模板需要更大的安全距离
      const isRealisticOrGeneral =
        renderTemplate.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        renderTemplate.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;
      
      const EXTENDED_THRESHOLD = 0.9;
      if (isRealisticOrGeneral && rightEdge && rightDistance < EXTENDED_THRESHOLD) {
        const offset = SAFETY_OFFSET - rightDistance;
        rightPosition = rightPosition.sub(sideVector.clone().multiplyScalar(offset));
      }

      // 检测左侧灯光与墙体距离
      const {
        closestEdge: leftEdge,
        distance: leftDistance
      } = this.getClosestEdge(room, leftPosition, sideVector);
      
      if (leftEdge && leftDistance < WALL_OFFSET_THRESHOLD) {
        const offset = SAFETY_OFFSET - leftDistance;
        leftPosition = leftPosition.add(sideVector.clone().multiplyScalar(offset));
      }

      if (isRealisticOrGeneral && leftEdge && leftDistance < EXTENDED_THRESHOLD) {
        const offset = SAFETY_OFFSET - leftDistance;
        leftPosition = leftPosition.add(sideVector.clone().multiplyScalar(offset));
      }

      // 创建三个射灯
      [rightPosition, leftPosition, frontPosition].forEach((lightPosition) => {
        const lightConfig: HSCore.Model.LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: lightPosition,
          height: defaultHeight,
          ies
        };
        lights.push(lightConfig);
      });
    }
    // 大型物体或特定类别：三点偏后布光
    else if (
      this._isInCategory(['41ac92b5-5f88-46d0-a59a-e1ed31739154'], object) ||
      (size.x >= MIN_SIZE_THRESHOLD && size.y >= MIN_SIZE_THRESHOLD)
    ) {
      const center2D = new THREE.Vector2(position.x, position.y);
      
      // 后方偏移位置（避免灯光直射物体顶部）
      let backPosition = center2D.clone().sub(
        frontForward.clone().multiplyScalar(size.y / 2 - 0.6)
      );
      
      if (isRealisticOrGeneral) {
        backPosition = center2D.clone().sub(
          frontForward.clone().multiplyScalar(size.y / 2 - 0.9)
        );
      }

      // 后方两侧+前方中央三点布光
      [
        backPosition.clone().add(sideVector.clone().multiplyScalar(size.x / 4)),
        backPosition.clone().sub(sideVector.clone().multiplyScalar(size.x / 4)),
        center2D.clone().add(frontForward.clone().multiplyScalar(size.y / 2))
      ].forEach((lightPosition) => {
        const lightConfig: HSCore.Model.LightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: lightPosition,
          height: defaultHeight,
          ies
        };
        lights.push(lightConfig);
      });
    }
    // 中型物体（单边超过阈值）：两点布光
    else if (size.x >= MIN_SIZE_THRESHOLD || size.y >= MIN_SIZE_THRESHOLD) {
      const center2D = new THREE.Vector2(position.x, position.y);
      let primaryPosition: THREE.Vector2;
      let secondaryPosition: THREE.Vector2;

      const SIZE_DIFFERENCE_THRESHOLD = 0.4;
      
      // 根据长宽比选择布光轴向
      if (size.x - size.y > SIZE_DIFFERENCE_THRESHOLD) {
        // 横向布光
        primaryPosition = center2D.clone().add(
          sideVector.clone().multiplyScalar(size.x / 2 - 0.6)
        );
        
        if (isRealisticOrGeneral) {
          primaryPosition = center2D.clone().add(
            sideVector.clone().multiplyScalar(size.x / 2 - 0.9)
          );
        }
        
        secondaryPosition = center2D.clone().sub(
          sideVector.clone().multiplyScalar(size.x / 2)
        );
      } else {
        // 纵向布光
        primaryPosition = center2D.clone().sub(
          frontForward.clone().multiplyScalar(size.y / 2 - 0.6)
        );
        
        if (isRealisticOrGeneral) {
          primaryPosition = center2D.clone().sub(
            frontForward.clone().multiplyScalar(size.y / 2 - 0.9)
          );
        }
        
        secondaryPosition = center2D.clone().add(
          frontForward.clone().multiplyScalar(size.y / 2)
        );
      }

      const primaryLight: HSCore.Model.LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: primaryPosition,
        height: defaultHeight,
        ies
      };

      const secondaryLight: HSCore.Model.LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: secondaryPosition,
        height: defaultHeight,
        ies
      };

      lights.push(primaryLight);
      lights.push(secondaryLight);
    }
    // 小型物体：单点中央布光
    else {
      lights.push({
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: position,
        height: defaultHeight,
        ies
      });
    }

    return lights;
  }
}

/**
 * 类型定义补充
 */
declare namespace HSCore.Model {
  interface Object3D {
    getPosition(): THREE.Vector3;
    getSize(): { x: number; y: number; z: number };
    frontForwardVec: THREE.Vector2;
  }

  interface Room {
    isCeilingFaceHidden(): boolean;
  }

  interface RenderTemplate {
    templateKey: string;
  }

  interface LightConfig {
    type: LightTypeEnum;
    temperature: number;
    intensity: number;
    position: THREE.Vector2 | THREE.Vector3;
    height: number;
    ies: string | null;
  }

  enum LightTypeEnum {
    SpotLight = 'SpotLight',
    PointLight = 'PointLight',
    DirectionalLight = 'DirectionalLight'
  }
}

declare namespace HSConstants.Render.TEMPLATE_NAME_V3 {
  const REALISTIC: string;
  const GENERAL: string;
}