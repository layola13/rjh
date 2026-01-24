import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { Color3 } from "core/Maths/math.color";
import { Scene } from "core/scene";
import { Nullable } from "core/types";
import { Texture } from "core/Materials/Textures/texture";

/**
 * 砖块程序纹理类
 * 用于生成参数化的砖墙纹理效果
 * @extends ProceduralTexture
 */
export declare class BrickProceduralTexture extends ProceduralTexture {
    /**
     * 砖块高度方向的数量（内部属性）
     * @internal
     */
    private _numberOfBricksHeight: number;

    /**
     * 砖块宽度方向的数量（内部属性）
     * @internal
     */
    private _numberOfBricksWidth: number;

    /**
     * 接缝颜色（内部属性）
     * @internal
     */
    private _jointColor: Color3;

    /**
     * 砖块颜色（内部属性）
     * @internal
     */
    private _brickColor: Color3;

    /**
     * 创建砖块程序纹理实例
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象，可为null
     * @param fallbackTexture - 回退纹理（可选）
     * @param generateMipMaps - 是否生成mipmap（可选）
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: Texture,
        generateMipMaps?: boolean
    );

    /**
     * 获取砖块高度方向的数量
     * @returns 砖块高度数量
     */
    get numberOfBricksHeight(): number;

    /**
     * 设置砖块高度方向的数量
     * @param value - 新的砖块高度数量
     */
    set numberOfBricksHeight(value: number);

    /**
     * 获取砖块宽度方向的数量
     * @returns 砖块宽度数量
     */
    get numberOfBricksWidth(): number;

    /**
     * 设置砖块宽度方向的数量
     * @param value - 新的砖块宽度数量
     */
    set numberOfBricksWidth(value: number);

    /**
     * 获取接缝颜色
     * @returns 接缝颜色对象
     */
    get jointColor(): Color3;

    /**
     * 设置接缝颜色
     * @param value - 新的接缝颜色
     */
    set jointColor(value: Color3);

    /**
     * 获取砖块颜色
     * @returns 砖块颜色对象
     */
    get brickColor(): Color3;

    /**
     * 设置砖块颜色
     * @param value - 新的砖块颜色
     */
    set brickColor(value: Color3);

    /**
     * 更新着色器uniform变量
     * 将当前属性值传递给着色器
     */
    updateShaderUniforms(): void;

    /**
     * 序列化纹理为JSON对象
     * @returns 序列化后的对象，包含所有可序列化属性
     */
    serialize(): unknown;

    /**
     * 从序列化数据解析并创建砖块程序纹理实例
     * @param parsedTexture - 解析的纹理数据对象
     * @param scene - 目标场景
     * @param rootUrl - 根URL路径
     * @returns 新创建的BrickProceduralTexture实例
     */
    static Parse(
        parsedTexture: unknown,
        scene: Scene,
        rootUrl: string
    ): BrickProceduralTexture;
}