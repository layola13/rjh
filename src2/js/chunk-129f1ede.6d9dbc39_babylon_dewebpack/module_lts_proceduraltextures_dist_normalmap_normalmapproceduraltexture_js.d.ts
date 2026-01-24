import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';

/**
 * 法线贴图程序纹理类
 * 用于从基础纹理生成法线贴图的程序化纹理
 */
export declare class NormalMapProceduralTexture extends ProceduralTexture {
    /**
     * 内部存储的基础纹理
     * @internal
     */
    private _baseTexture: Nullable<Texture>;

    /**
     * 构造函数
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象，默认为null时使用当前场景
     * @param fallbackTexture - 回退纹理（未使用的参数）
     * @param generateMipMaps - 是否生成Mip贴图
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: Texture,
        generateMipMaps?: boolean
    );

    /**
     * 获取基础纹理
     * 用于生成法线贴图的源纹理
     */
    get baseTexture(): Nullable<Texture>;

    /**
     * 设置基础纹理
     * @param value - 新的基础纹理
     */
    set baseTexture(value: Nullable<Texture>);

    /**
     * 更新着色器uniforms
     * 将基础纹理和尺寸传递给着色器
     */
    updateShaderUniforms(): void;

    /**
     * 渲染程序纹理
     * @param useCameraPostProcess - 是否使用相机后处理效果
     */
    render(useCameraPostProcess?: boolean): void;

    /**
     * 调整纹理尺寸
     * @param width - 新宽度
     * @param height - 新高度
     */
    resize(width: number, height: number): void;

    /**
     * 检查纹理是否准备就绪
     * @returns 如果基础纹理和程序纹理都已准备好则返回true
     */
    isReady(): boolean;

    /**
     * 序列化为JSON对象
     * @returns 包含纹理数据的序列化对象
     */
    serialize(): any;

    /**
     * 从JSON数据解析创建NormalMapProceduralTexture实例
     * @param parsedTexture - 解析的纹理数据
     * @param scene - 目标场景
     * @param rootUrl - 根URL路径
     * @returns 新创建的NormalMapProceduralTexture实例
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): NormalMapProceduralTexture;
}