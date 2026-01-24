import { ProceduralTexture } from 'core/Materials/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { Engine } from 'core/Engines/engine';

/**
 * 草地程序纹理类
 * 用于生成程序化的草地纹理效果
 */
export declare class GrassProceduralTexture extends ProceduralTexture {
    /**
     * 地面颜色
     * @internal
     */
    private _groundColor: Color3;

    /**
     * 草地颜色数组（包含3种草的颜色变化）
     * @internal
     */
    private _grassColors: Color3[];

    /**
     * 构造函数
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象，可为null
     * @param fallbackTexture - 备用纹理
     * @param generateMipMaps - 是否生成Mipmap
     */
    constructor(
        name: string,
        size: number,
        scene?: Nullable<Scene>,
        fallbackTexture?: ProceduralTexture,
        generateMipMaps?: boolean
    );

    /**
     * 更新着色器uniform变量
     * 将颜色值传递给着色器
     */
    updateShaderUniforms(): void;

    /**
     * 获取草地颜色数组
     * @returns 包含3种草颜色的数组
     */
    get grassColors(): Color3[];

    /**
     * 设置草地颜色数组
     * @param value - 新的草地颜色数组
     */
    set grassColors(value: Color3[]);

    /**
     * 获取地面颜色
     * @returns 地面基础颜色
     */
    get groundColor(): Color3;

    /**
     * 设置地面颜色
     * @param value - 新的地面颜色
     */
    set groundColor(value: Color3);

    /**
     * 序列化为JSON对象
     * @returns 包含纹理配置的序列化对象
     */
    serialize(): any;

    /**
     * 从序列化数据解析创建纹理实例
     * @param parsedTexture - 解析的纹理数据
     * @param scene - 目标场景
     * @param rootUrl - 根URL路径
     * @returns 解析后的GrassProceduralTexture实例
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): GrassProceduralTexture;
}