/**
 * 灯光配置常量模块
 * 定义了各种灯光类型的IES文件名、内容类型分类和光照参数
 */

/**
 * 聚光灯IES文件名 - 类型1
 * IES (Illuminating Engineering Society) 文件用于定义灯光的照明分布模式
 */
export const SPOT_LIGHT_NUM_1: string;

/**
 * 聚光灯IES文件名 - 类型2
 */
export const SPOT_LIGHT_NUM_2: string;

/**
 * 聚光灯IES文件名 - 类型3
 */
export const SPOT_LIGHT_NUM_3: string;

/**
 * 聚光灯IES文件名 - 类型4
 */
export const SPOT_LIGHT_NUM_4: string;

/**
 * 聚光灯IES文件名 - 类型5
 */
export const SPOT_LIGHT_NUM_5: string;

/**
 * 聚光灯IES文件名 - 类型6
 */
export const SPOT_LIGHT_NUM_6: string;

/**
 * 聚光灯IES文件名 - 类型7 (家用场景4)
 */
export const SPOT_LIGHT_NUM_7: string;

/**
 * 聚光灯IES文件名 - 类型8 (家用场景13)
 */
export const SPOT_LIGHT_NUM_8: string;

/**
 * 聚光灯IES文件名 - 类型9 (家具照明)
 */
export const SPOT_LIGHT_NUM_9: string;

/**
 * 聚光灯IES文件名 - 类型10
 */
export const SPOT_LIGHT_NUM_10: string;

/**
 * 聚光灯IES文件名 - 类型11
 */
export const SPOT_LIGHT_NUM_11: string;

/**
 * 聚光灯IES文件名 - 类型12
 */
export const SPOT_LIGHT_NUM_12: string;

/**
 * 聚光灯IES文件名 - 类型13
 */
export const SPOT_LIGHT_NUM_13: string;

/**
 * 聚光灯IES文件名 - 类型14
 */
export const SPOT_LIGHT_NUM_14: string;

/**
 * 聚光灯IES文件名 - 类型15
 */
export const SPOT_LIGHT_NUM_15: string;

/**
 * 补光灯IES文件名 - 类型1
 */
export const FILL_LIGHT_NUM_1: string;

/**
 * 补光灯IES文件名 - 类型2
 */
export const FILL_LIGHT_NUM_2: string;

/**
 * 补光灯IES文件名 - 类型3
 */
export const FILL_LIGHT_NUM_3: string;

/**
 * 补光灯IES文件名 - 类型4
 */
export const FILL_LIGHT_NUM_4: string;

/**
 * 补光灯IES文件名 - 类型5
 */
export const FILL_LIGHT_NUM_5: string;

/**
 * 补光灯IES文件名 - 类型6
 */
export const FILL_LIGHT_NUM_6: string;

/**
 * 补光灯IES文件名 - 类型7
 */
export const FILL_LIGHT_NUM_7: string;

/**
 * 天花板照明设备内容类型数组
 * 包含所有可安装在天花板上的照明设备类型（含筒灯）
 */
export const CELLING_LIGHTING_CONTENT_TYPES: readonly [
  ContentTypeEnum.BathroomHeaterWithLight,
  ContentTypeEnum.PendantLight,
  ContentTypeEnum.CeilingLight,
  ContentTypeEnum.Downlight,
  ContentTypeEnum.Chandelier
];

/**
 * 天花板照明设备内容类型数组（不含筒灯）
 * 排除了筒灯的天花板照明设备类型集合
 */
export const CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES: readonly [
  ContentTypeEnum.BathroomHeaterWithLight,
  ContentTypeEnum.PendantLight,
  ContentTypeEnum.CeilingLight,
  ContentTypeEnum.Chandelier
];

/**
 * 桌面照明设备内容类型数组
 * 仅包含台灯类型
 */
export const DESK_LIGHTING_CONTENT_TYPES: readonly [ContentTypeEnum.DeskLamp];

/**
 * 安全高度缩放比例
 * 用于计算灯具安装的最小安全高度，约为2/3比例
 */
export const SAFE_HEIGHT_SCALE: number;

/**
 * 夜间模式聚光灯强度 (流明)
 */
export const NIGHT_SPOT_INTENSITY: number;

/**
 * 夜间模式聚光灯色温 (开尔文)
 */
export const NIGHT_SPOT_TEMPERATURE: number;

/**
 * 自然光模式3聚光灯强度 (流明)
 */
export const NATURE_3_SPOT_INTENSITY: number;

/**
 * 自然光模式3装饰聚光灯强度 (流明)
 */
export const NATURE_3_DECORATE_SPOT_INTENSITY: number;

/**
 * 自然光模式3聚光灯色温 (开尔文)
 */
export const NATURE_3_SPOT_TEMPERATURE: number;

/**
 * 冷色调模式3聚光灯强度 (流明)
 */
export const CHILLY_3_SPOT_INTENSITY: number;

/**
 * 冷色调模式3聚光灯色温 (开尔文)
 */
export const CHILLY_3_SPOT_TEMPERATURE: number;

/**
 * 写实模式聚光灯强度 (流明)
 */
export const REALISTIC_SPOT_INTENSITY: number;

/**
 * 写实模式聚光灯色温 (开尔文)
 */
export const REALISTIC_SPOT_TEMPERATURE: number;

/**
 * 写实模式装饰聚光灯强度 (流明)
 */
export const REALISTIC_DECORATE_SPOT_INTENSITY: number;

/**
 * 内容类型枚举
 * 从外部模块导入，定义各种照明设备类型
 */
import type { ContentTypeEnum } from './content-type-enum';