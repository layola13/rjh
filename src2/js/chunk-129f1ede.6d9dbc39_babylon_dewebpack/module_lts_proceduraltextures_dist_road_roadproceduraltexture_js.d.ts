/**
 * 道路程序纹理模块
 * 用于生成程序化道路纹理效果
 */

import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { Color3 } from "core/Maths/math.color";
import { Scene } from "core/scene";
import { Texture } from "core/Materials/Textures/texture";
import { Nullable } from "core/types";

/**
 * 道路程序纹理类
 * 继承自ProceduralTexture，用于生成程序化的道路纹理效果
 */
export declare class RoadProceduralTexture extends ProceduralTexture {
    /**
     * 道路颜色（私有字段）
     * 默认值为灰色 (0.53, 0.53, 0.53)
     */
    private _roadColor: Color3;

    /**
     * 构造函数
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象，可为null
     * @param fallbackTexture - 后备纹理（可选）
     * @param generateMipMaps - 是否生成Mipmap（可选）
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: Texture,
        generateMipMaps?: boolean
    );

    /**
     * 获取道路颜色
     */
    get roadColor(): Color3;

    /**
     * 设置道路颜色
     * 设置后会自动更新着色器uniform变量
     */
    set roadColor(value: Color3);

    /**
     * 更新着色器的uniform变量
     * 将道路颜色同步到着色器
     */
    updateShaderUniforms(): void;

    /**
     * 序列化纹理配置
     * @returns 序列化后的对象，包含customType标识
     */
    serialize(): any;

    /**
     * 从序列化数据解析并创建RoadProceduralTexture实例
     * @param parsedTexture - 解析的纹理数据
     * @param scene - 场景对象
     * @param rootUrl - 根URL路径
     * @returns 新创建的RoadProceduralTexture实例
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): RoadProceduralTexture;
}