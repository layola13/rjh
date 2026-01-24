/**
 * 木材材质中英文对照表类型定义
 * Wood material bilingual mapping type definitions
 * 
 * @description 包含各种木材、颜色和表面处理方式的中英文对照
 * Contains Chinese-English mappings for various wood types, colors and surface finishes
 * 
 * @module WoodMaterialTranslations
 */

/**
 * 木材材质翻译映射接口
 * Wood material translation mapping interface
 */
interface WoodMaterialTranslations {
  /** 白色白橡木亚光 */
  readonly "白色白橡木亚光": "white oak matt";
  
  /** 白橡木砂纹 */
  readonly "白橡木砂纹": "white oak sand grain";
  
  /** 红棕色澳洲红木亚光 */
  readonly "红棕色澳洲红木亚光": "red-brown Australian rosewood matt";
  
  /** 黄色黑胡桃木砂纹 */
  readonly "黄色黑胡桃木砂纹": "yellow black walnut sand grain";
  
  /** 黄色花梨木亚光 */
  readonly "黄色花梨木亚光": "yellow rosewood matt";
  
  /** 咖啡色榆木亚光 */
  readonly "咖啡色榆木亚光": "Brown Elm Matte";
  
  /** 土黄色澳洲红木亚光 */
  readonly "土黄色澳洲红木亚光": "khaki australian rosewood matt";
  
  /** 土黄色花梨木 */
  readonly "土黄色花梨木": "khaki rosewood";
  
  /** 土黄色花梨木亚光 */
  readonly "土黄色花梨木亚光": "Khaki rosewood matt";
  
  /** 土黄色黄榆木亚光 */
  readonly "土黄色黄榆木亚光": "khaki yellow elm matt";
  
  /** 土黄色灰榆木亚光 */
  readonly "土黄色灰榆木亚光": "khaki grey elm matt";
  
  /** 棕色红酸枝木砂纹 */
  readonly "棕色红酸枝木砂纹": "Brown red rosewood sand grain";
  
  /** 把手/手柄 */
  readonly "handle": "handle";
  
  /** 巴西柚木 */
  readonly "巴西柚木": "Brazilian Teak";
  
  /** 白松木 */
  readonly "白松木": "white pine";
  
  /** 纯白色 */
  readonly "纯白": "pure white";
  
  /** 瓷泳灰色 */
  readonly "瓷泳灰": "Porcelain swimming grey";
  
  /** 瓷泳金色 */
  readonly "瓷泳金": "Porcelain swimming gold";
  
  /** 横纹紫檀 */
  readonly "横纹紫檀": "Striped red sandalwood";
  
  /** 红花梨木 */
  readonly "红花梨": "red pear";
  
  /** 红橡木 */
  readonly "红橡": "red oak";
  
  /** 肌肤黑色 */
  readonly "肌肤黑": "dark skin";
  
  /** 金丝楠木 */
  readonly "金丝楠": "Jin Sinan";
  
  /** 金橡木 */
  readonly "金橡": "golden oak";
  
  /** 沙比利木 */
  readonly "沙比利": "Sapele";
  
  /** 水晶红色 */
  readonly "水晶红": "crystal red";
  
  /** 水曲柳木 */
  readonly "水曲柳": "Ash";
  
  /** 香槟色 */
  readonly "香槟": "champagne";
  
  /** 樱桃木 */
  readonly "樱桃木": "cherry wood";
  
  /** 柚木 */
  readonly "柚木": "teak";
  
  /** 原木色 */
  readonly "原木": "log";
  
  /** 尊贵白色 */
  readonly "尊贵白": "noble white";
}

/**
 * 木材材质翻译数据
 * Wood material translation data
 */
declare const woodMaterialTranslations: WoodMaterialTranslations;

export default woodMaterialTranslations;

/**
 * 中文材质名称联合类型
 * Chinese material name union type
 */
export type ChineseMaterialName = keyof WoodMaterialTranslations;

/**
 * 英文材质名称联合类型
 * English material name union type
 */
export type EnglishMaterialName = WoodMaterialTranslations[ChineseMaterialName];