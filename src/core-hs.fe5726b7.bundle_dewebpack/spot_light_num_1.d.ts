/**
 * 灯光配置常量模块
 * 包含聚光灯IES文件配置、补光灯配置、不同照明场景的光照参数等
 */

/**
 * 内容类型枚举（从外部模块导入）
 */
import { ContentTypeEnum } from './content-type-enum';

/**
 * 聚光灯IES文件名 - 配置1
 */
export const SPOT_LIGHT_NUM_1: string;

/**
 * 聚光灯IES文件名 - 配置2
 */
export const SPOT_LIGHT_NUM_2: string;

/**
 * 聚光灯IES文件名 - 配置3
 */
export const SPOT_LIGHT_NUM_3: string;

/**
 * 聚光灯IES文件名 - 配置4
 */
export const SPOT_LIGHT_NUM_4: string;

/**
 * 聚光灯IES文件名 - 配置5
 */
export const SPOT_LIGHT_NUM_5: string;

/**
 * 聚光灯IES文件名 - 配置6
 */
export const SPOT_LIGHT_NUM_6: string;

/**
 * 聚光灯IES文件名 - 配置7（家用场景4）
 */
export const SPOT_LIGHT_NUM_7: string;

/**
 * 聚光灯IES文件名 - 配置8（家用场景13）
 */
export const SPOT_LIGHT_NUM_8: string;

/**
 * 聚光灯IES文件名 - 配置9（家具照明）
 */
export const SPOT_LIGHT_NUM_9: string;

/**
 * 聚光灯IES文件名 - 配置10
 */
export const SPOT_LIGHT_NUM_10: string;

/**
 * 聚光灯IES文件名 - 配置11
 */
export const SPOT_LIGHT_NUM_11: string;

/**
 * 聚光灯IES文件名 - 配置12
 */
export const SPOT_LIGHT_NUM_12: string;

/**
 * 聚光灯IES文件名 - 配置13
 */
export const SPOT_LIGHT_NUM_13: string;

/**
 * 聚光灯IES文件名 - 配置14
 */
export const SPOT_LIGHT_NUM_14: string;

/**
 * 聚光灯IES文件名 - 配置15
 */
export const SPOT_LIGHT_NUM_15: string;

/**
 * 补光灯IES文件名 - 配置1
 */
export const FILL_LIGHT_NUM_1: string;

/**
 * 补光灯IES文件名 - 配置2
 */
export const FILL_LIGHT_NUM_2: string;

/**
 * 补光灯IES文件名 - 配置3
 */
export const FILL_LIGHT_NUM_3: string;

/**
 * 补光灯IES文件名 - 配置4
 */
export const FILL_LIGHT_NUM_4: string;

/**
 * 补光灯IES文件名 - 配置5
 */
export const FILL_LIGHT_NUM_5: string;

/**
 * 补光灯IES文件名 - 配置6
 */
export const FILL_LIGHT_NUM_6: string;

/**
 * 补光灯IES文件名 - 配置7
 */
export const FILL_LIGHT_NUM_7: string;

/**
 * 吊顶照明设备内容类型列表
 * 包含：浴霸、吊灯、吸顶灯、筒灯、枝形吊灯
 */
export const CELLING_LIGHTING_CONTENT_TYPES: readonly ContentTypeEnum[];

/**
 * 吊顶照明设备内容类型列表（不含筒灯）
 * 包含：浴霸、吊灯、吸顶灯、枝形吊灯
 */
export const CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES: readonly ContentTypeEnum[];

/**
 * 桌面照明设备内容类型列表
 * 包含：台灯
 */
export const DESK_LIGHTING_CONTENT_TYPES: readonly ContentTypeEnum[];

/**
 * 安全高度缩放系数
 * 用于计算灯具安全安装高度的比例系数（约2/3）
 */
export const SAFE_HEIGHT_SCALE: number;

/**
 * 夜间场景聚光灯强度（单位：流明）
 */
export const NIGHT_SPOT_INTENSITY: number;

/**
 * 夜间场景聚光灯色温（单位：开尔文K）
 */
export const NIGHT_SPOT_TEMPERATURE: number;

/**
 * 自然场景3聚光灯强度（单位：流明）
 */
export const NATURE_3_SPOT_INTENSITY: number;

/**
 * 自然场景3装饰聚光灯强度（单位：流明）
 */
export const NATURE_3_DECORATE_SPOT_INTENSITY: number;

/**
 * 自然场景3聚光灯色温（单位：开尔文K）
 */
export const NATURE_3_SPOT_TEMPERATURE: number;

/**
 * 冷色场景3聚光灯强度（单位：流明）
 */
export const CHILLY_3_SPOT_INTENSITY: number;

/**
 * 冷色场景3聚光灯色温（单位：开尔文K）
 */
export const CHILLY_3_SPOT_TEMPERATURE: number;

/**
 * 写实场景聚光灯强度（单位：流明）
 */
export const REALISTIC_SPOT_INTENSITY: number;

/**
 * 写实场景聚光灯色温（单位：开尔文K）
 */
export const REALISTIC_SPOT_TEMPERATURE: number;

/**
 * 写实场景装饰聚光灯强度（单位：流明）
 */
export const REALISTIC_DECORATE_SPOT_INTENSITY: number;