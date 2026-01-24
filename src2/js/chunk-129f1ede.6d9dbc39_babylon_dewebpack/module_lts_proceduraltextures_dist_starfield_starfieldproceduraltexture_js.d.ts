import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { Scene } from "core/scene";
import { Nullable } from "core/types";
import { Engine } from "core/Engines/engine";

/**
 * 星空程序纹理类
 * 用于生成程序化的星空效果纹理
 * @extends ProceduralTexture
 */
export declare class StarfieldProceduralTexture extends ProceduralTexture {
    /**
     * 时间参数（私有字段）
     * @private
     */
    private _time;

    /**
     * Alpha 旋转角度参数（私有字段）
     * @private
     */
    private _alpha;

    /**
     * Beta 旋转角度参数（私有字段）
     * @private
     */
    private _beta;

    /**
     * 缩放级别参数（私有字段）
     * @private
     */
    private _zoom;

    /**
     * 形态参数（私有字段）
     * @private
     */
    private _formuparam;

    /**
     * 步进大小参数（私有字段）
     * @private
     */
    private _stepsize;

    /**
     * 平铺参数（私有字段）
     * @private
     */
    private _tile;

    /**
     * 亮度参数（私有字段）
     * @private
     */
    private _brightness;

    /**
     * 暗物质密度参数（私有字段）
     * @private
     */
    private _darkmatter;

    /**
     * 距离衰减参数（私有字段）
     * @private
     */
    private _distfading;

    /**
     * 饱和度参数（私有字段）
     * @private
     */
    private _saturation;

    /**
     * 创建星空程序纹理实例
     * @param name - 纹理名称
     * @param size - 纹理尺寸
     * @param scene - 场景对象
     * @param fallbackTexture - 后备纹理（可选）
     * @param generateMipMaps - 是否生成 Mipmap（可选）
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: Nullable<ProceduralTexture>,
        generateMipMaps?: boolean
    );

    /**
     * 更新着色器统一变量
     * 将所有参数同步到着色器
     */
    updateShaderUniforms(): void;

    /**
     * 时间参数
     * 控制星空的动画时间进度
     * @default 1
     */
    get time(): number;
    set time(value: number);

    /**
     * Alpha 旋转角度
     * 控制星空绕 X 轴的旋转角度
     * @default 0.5
     */
    get alpha(): number;
    set alpha(value: number);

    /**
     * Beta 旋转角度
     * 控制星空绕 Y 轴的旋转角度
     * @default 0.8
     */
    get beta(): number;
    set beta(value: number);

    /**
     * 缩放级别
     * 控制星空的视觉缩放程度
     * @default 0.8
     */
    get zoom(): number;
    set zoom(value: number);

    /**
     * 形态参数
     * 控制星云的形状特征
     * @default 0.53
     */
    get formuparam(): number;
    set formuparam(value: number);

    /**
     * 步进大小
     * 控制光线行进的步长
     * @default 0.1
     */
    get stepsize(): number;
    set stepsize(value: number);

    /**
     * 平铺系数
     * 控制星空纹理的平铺效果
     * @default 0.85
     */
    get tile(): number;
    set tile(value: number);

    /**
     * 亮度
     * 控制星空的整体亮度
     * @default 0.0015
     */
    get brightness(): number;
    set brightness(value: number);

    /**
     * 暗物质密度
     * 控制暗物质云的浓度
     * @default 0.4
     */
    get darkmatter(): number;
    set darkmatter(value: number);

    /**
     * 距离衰减
     * 控制随距离的亮度衰减程度
     * @default 0.73
     */
    get distfading(): number;
    set distfading(value: number);

    /**
     * 饱和度
     * 控制颜色的饱和度
     * @default 0.85
     */
    get saturation(): number;
    set saturation(value: number);

    /**
     * 序列化纹理数据
     * 将纹理配置转换为可存储的 JSON 对象
     * @returns 序列化后的对象
     */
    serialize(): any;

    /**
     * 从序列化数据解析纹理
     * @param parsedTexture - 解析的纹理数据对象
     * @param scene - 目标场景
     * @param rootUrl - 资源根路径
     * @returns 解析后的 StarfieldProceduralTexture 实例
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): StarfieldProceduralTexture;
}