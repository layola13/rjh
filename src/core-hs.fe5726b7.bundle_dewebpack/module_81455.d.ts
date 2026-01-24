import BaseLight from './module_42288';

/**
 * 灯光配置接口
 */
interface LightConfig {
    /** 灯光类型 */
    type: HSCore.Model.LightTypeEnum.SpotLight;
    /** 色温 */
    temperature: number;
    /** 光强度 */
    intensity: number;
    /** 灯光位置 */
    position: THREE.Vector3 | { x: number; y: number; z: number };
    /** 灯光高度 */
    height: number;
    /** IES光域文件 */
    ies?: string;
}

/**
 * 实体对象接口
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
 * 场景/房间接口
 */
interface Scene {
    /** 判断天花板是否隐藏 */
    isCeilingFaceHidden(): boolean;
}

/**
 * 默认灯光属性
 */
interface DefaultLightProperties {
    /** 光强度 */
    intensity: number;
    /** 色温 */
    temperature: number;
    /** IES光域文件 */
    ies?: string;
}

/**
 * 智能灯光布局计算器
 * 根据实体尺寸和旋转角度自动计算多点位聚光灯布局
 */
export default class SmartLightComputer extends BaseLight {
    /**
     * 计算灯光布局
     * @param entity - 目标实体对象
     * @param scene - 场景对象
     * @param param2 - 额外参数
     * @param param3 - 额外参数
     * @returns 灯光配置数组
     */
    _compute(
        entity: Entity,
        scene: Scene,
        param2: unknown,
        param3: unknown
    ): LightConfig[] {
        // 天花板隐藏时不计算灯光
        if (scene.isCeilingFaceHidden()) {
            return [];
        }

        const position = entity.getPosition();
        const defaultHeight = this.getDefaultHeight(scene);
        const size = entity.getSize();
        const maxDimension = Math.max(size.x, size.y);
        const rotation = entity.getRotation();

        const { intensity, temperature, ies } = super.getDefaultLight(entity, scene, param2);

        // 中心主灯光
        const lights: LightConfig[] = [{
            type: HSCore.Model.LightTypeEnum.SpotLight,
            temperature,
            intensity,
            position,
            height: defaultHeight,
            ies
        }];

        // 中等尺寸（>= 2m）：添加两侧辅助灯光
        if (maxDimension >= 2) {
            const SMALL_OFFSET = 0.35;
            const MEDIUM_THRESHOLD = 3.8;
            
            let directionVector: THREE.Vector2;
            let offset = maxDimension / 2 - SMALL_OFFSET;

            // 根据尺寸调整偏移量
            offset = maxDimension <= MEDIUM_THRESHOLD 
                ? maxDimension / 2 - SMALL_OFFSET 
                : (maxDimension - 0.7) / 4;

            // 确定方向向量（沿长边方向）
            directionVector = size.x > size.y 
                ? new THREE.Vector2(1, 0) 
                : new THREE.Vector2(0, 1);

            // 应用旋转
            const ROTATION_THRESHOLD = 5;
            if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
                directionVector.rotateAround(
                    new THREE.Vector2(0, 0),
                    Math.PI * (rotation % 180) / 180
                );
            }

            const centerPosition2D = new THREE.Vector2(position.x, position.y);

            // 正向偏移位置
            const positiveOffset = centerPosition2D.clone().add(
                directionVector.clone().multiplyScalar(offset)
            );
            let adjustedPositivePosition = this._adjustPosition(positiveOffset, scene, -0.75) || positiveOffset;
            const lightPosition1 = { ...position, ...adjustedPositivePosition };

            // 负向偏移位置
            const negativeOffset = centerPosition2D.clone().sub(
                directionVector.clone().multiplyScalar(offset)
            );
            let adjustedNegativePosition = this._adjustPosition(negativeOffset, scene, -0.75) || negativeOffset;
            const lightPosition2 = { ...position, ...adjustedNegativePosition };

            const light1: LightConfig = {
                type: HSCore.Model.LightTypeEnum.SpotLight,
                temperature,
                intensity,
                position: lightPosition1,
                height: defaultHeight,
                ies
            };

            const light2: LightConfig = {
                type: HSCore.Model.LightTypeEnum.SpotLight,
                temperature,
                intensity,
                position: lightPosition2,
                height: defaultHeight,
                ies
            };

            lights.push(light1, light2);
        }

        // 大尺寸（> 3.8m）：添加额外的两侧边缘灯光
        if (maxDimension > 3.8) {
            const EDGE_MARGIN = 0.7;
            const edgeOffset = (maxDimension - EDGE_MARGIN) / 2;

            let directionVector: THREE.Vector2;
            directionVector = size.x > size.y 
                ? new THREE.Vector2(1, 0) 
                : new THREE.Vector2(0, 1);

            // 应用旋转
            const ROTATION_THRESHOLD = 5;
            if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
                directionVector.rotateAround(
                    new THREE.Vector2(0, 0),
                    Math.PI * (rotation % 180) / 180
                );
            }

            const centerPosition2D = new THREE.Vector2(position.x, position.y);

            // 正向边缘位置
            const positiveEdge = centerPosition2D.clone().add(
                directionVector.clone().multiplyScalar(edgeOffset)
            );
            let adjustedPositiveEdge = this._adjustPosition(positiveEdge, scene, -0.75) || positiveEdge;
            const edgeLightPosition1 = { ...position, ...adjustedPositiveEdge };

            // 负向边缘位置
            const negativeEdge = centerPosition2D.clone().sub(
                directionVector.clone().multiplyScalar(edgeOffset)
            );
            let adjustedNegativeEdge = this._adjustPosition(negativeEdge, scene, -0.75) || negativeEdge;
            const edgeLightPosition2 = { ...position, ...adjustedNegativeEdge };

            const edgeLight1: LightConfig = {
                type: HSCore.Model.LightTypeEnum.SpotLight,
                temperature,
                intensity,
                position: edgeLightPosition1,
                height: defaultHeight,
                ies
            };

            const edgeLight2: LightConfig = {
                type: HSCore.Model.LightTypeEnum.SpotLight,
                temperature,
                intensity,
                position: edgeLightPosition2,
                height: defaultHeight,
                ies
            };

            lights.push(edgeLight1, edgeLight2);
        }

        return lights;
    }

    /**
     * 调整位置以避免遮挡（继承自父类）
     * @param position - 原始位置
     * @param scene - 场景对象
     * @param offset - 偏移量
     * @returns 调整后的位置或null
     */
    protected _adjustPosition(
        position: THREE.Vector2,
        scene: Scene,
        offset: number
    ): THREE.Vector2 | null {
        // 实现由父类提供
        return null;
    }

    /**
     * 获取默认灯光高度（继承自父类）
     * @param scene - 场景对象
     * @returns 灯光高度
     */
    protected getDefaultHeight(scene: Scene): number {
        // 实现由父类提供
        return 0;
    }
}