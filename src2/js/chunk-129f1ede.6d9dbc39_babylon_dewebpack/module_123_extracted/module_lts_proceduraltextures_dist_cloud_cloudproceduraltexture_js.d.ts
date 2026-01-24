import type { Scene } from '@babylonjs/core/scene';
import type { Color4 } from '@babylonjs/core/Maths/math.color';
import type { Nullable } from '@babylonjs/core/types';
import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';

/**
 * 云朵程序纹理类
 * 用于生成程序化的云朵纹理效果
 * @extends ProceduralTexture
 */
export declare class CloudProceduralTexture extends ProceduralTexture {
    /**
     * 天空颜色（内部存储）
     * @internal
     */
    private _skyColor: Color4;

    /**
     * 云朵颜色（内部存储）
     * @internal
     */
    private _cloudColor: Color4;

    /**
     * 振幅系数（内部存储）
     * @internal
     */
    private _amplitude: number;

    /**
     * 八度数（噪声层数）（内部存储）
     * @internal
     */
    private _numOctaves: number;

    /**
     * 创建云朵程序纹理实例
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象，可为null
     * @param fallbackTexture - 后备纹理（未使用）
     * @param generateMipMaps - 是否生成Mipmap
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: undefined,
        generateMipMaps?: boolean
    );

    /**
     * 天空颜色
     * 获取或设置天空的颜色，默认为浅蓝色(0.15, 0.68, 1, 1)
     */
    get skyColor(): Color4;
    set skyColor(value: Color4);

    /**
     * 云朵颜色
     * 获取或设置云朵的颜色，默认为白色(1, 1, 1, 1)
     */
    get cloudColor(): Color4;
    set cloudColor(value: Color4);

    /**
     * 振幅
     * 控制云朵效果的强度，默认为1
     */
    get amplitude(): number;
    set amplitude(value: number);

    /**
     * 八度数
     * 控制噪声的复杂度（层数），默认为4
     */
    get numOctaves(): number;
    set numOctaves(value: number);

    /**
     * 更新着色器统一变量
     * 将当前属性值传递给着色器
     * @internal
     */
    updateShaderUniforms(): void;

    /**
     * 序列化纹理
     * 将纹理数据序列化为JSON对象
     * @returns 序列化后的对象
     */
    serialize(): any;

    /**
     * 从序列化数据解析纹理
     * @param parsedTexture - 解析的纹理数据
     * @param scene - 场景对象
     * @param rootUrl - 根URL路径
     * @returns 解析后的CloudProceduralTexture实例
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): CloudProceduralTexture;
}