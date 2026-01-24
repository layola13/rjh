/**
 * 材质纹理类型枚举
 */
export enum KJLTextureEnum {
  /** 内侧纹理 */
  tex_in = 0,
  /** 外侧纹理 */
  tex_out = 1,
  /** 截面纹理 */
  tex_jt = 2,
  /** 纱网纹理 */
  tex_gauze = 3,
  /** 玻璃纹理 */
  tex_glass = 4,
  /** 立面纹理 */
  tex_lt = 5
}

/**
 * 窗扇类型枚举
 */
export enum LeafTypeEnum {
  /** 玻璃扇 */
  GlassSash = "GlassSash",
  /** 纱窗扇 */
  GauzeSash = "GauzeSash"
}

/**
 * 窗户构件分类枚举
 */
export enum CategoryEnum {
  /** 一字型窗洞 */
  "一字型窗洞" = "2076",
  /** 矩形窗 */
  "矩形窗" = "2080",
  /** 导入的窗 */
  "导入的窗" = "2098",
  /** 边框 */
  "边框" = "2072",
  /** 横梃 */
  "横梃" = "2073",
  /** 竖梃 */
  "竖梃" = "2074",
  /** 纱网 */
  "纱网" = "2075",
  /** 固定玻璃 */
  "固定玻璃" = "2079",
  /** 平开玻扇 */
  "平开玻扇" = "2112",
  /** 平开纱扇 */
  "平开纱扇" = "2113",
  /** 推拉窗扇 */
  "推拉窗扇" = "2114",
  /** 推拉玻扇 */
  "推拉玻扇" = "2115",
  /** 推拉纱扇 */
  "推拉纱扇" = "2116",
  /** 玻璃 */
  "玻璃" = "2070",
  /** 玻扇框 */
  "玻扇框" = "2092",
  /** 纱扇框 */
  "纱扇框" = "2093",
  /** 转换框 */
  "转换框" = "2094",
  /** 压条 */
  "压条" = "2078",
  /** 单轨上轨道 */
  "单轨上轨道" = "2106",
  /** 单轨下轨道 */
  "单轨下轨道" = "2107",
  /** 双轨上轨道 */
  "双轨上轨道" = "2108",
  /** 双轨下轨道 */
  "双轨下轨道" = "2109",
  /** 三轨上轨道 */
  "三轨上轨道" = "2110",
  /** 三轨下轨道 */
  "三轨下轨道" = "2111"
}

/**
 * 基础导入模型类
 */
export declare class ImportBaseModel {}

/**
 * 标准导入模型
 */
export declare class ImportModel extends ImportBaseModel {}

/**
 * 引用型导入模型
 */
export declare class ImportRefModel extends ImportBaseModel {}

/**
 * 扫掠型导入模型
 */
export declare class ImportSweepModel extends ImportBaseModel {}

/**
 * 窗用扫掠型导入模型
 */
export declare class ImportWNSweepModel extends ImportBaseModel {}

/**
 * 拉伸型导入模型
 */
export declare class ImportExtrusionModel extends ImportBaseModel {}

/**
 * 路径曲线参数
 */
export declare class ImportPathCurve {}

/**
 * 导入路径定义
 */
export declare class ImportPath {
  /** 路径点集合 */
  points: Array<unknown>;
  /** 路径曲线集合 */
  curves: Array<ImportPathCurve>;
}

/**
 * 导入参数配置
 */
export declare class ImportParameter {}

/**
 * 材质纹理参数
 */
export declare class ParamTexture {
  /** 材质ID */
  id?: string | number;
  /** 旋转角度 */
  angle?: number;
  /** 侧面角度 */
  sideAngle?: number;
  /** 顶部材质ID */
  topId?: string | number;
  /** 底部材质ID */
  bottomId?: string | number;
  /** 侧面材质ID */
  sideId?: string | number;

  constructor(config?: Partial<ParamTexture>);
}

/**
 * 窗户模型项
 */
export declare class KJLModelItem {
  /** 子模型集合 */
  subModels: Array<unknown>;
  /** 参数集合 */
  parameters: Array<unknown>;
}

/**
 * 窗户模型窗体项
 */
export declare class KJLModelWindowItem {
  /** 子模型集合 */
  subModels: Array<unknown>;
  /** 参数集合 */
  parameters: Array<unknown>;
}

/**
 * 窗户模型部件项
 */
export declare class KJLModelPartItem {
  /** 模型类型 */
  type: string;
  /** 构件分类代码 */
  category: string;
  /** 部件名称 */
  name: string;
  /** 平移变换 [x, y, z] */
  translate: [number, number, number];
  /** 旋转变换 [x, y, z] */
  rotate: [number, number, number];
  /** 子模型集合 */
  subModels: Array<unknown>;
  /** 参数集合 */
  parameters: Array<unknown>;
}

/**
 * 窗户项基础类
 */
export declare class KJLWindowItem {
  /** 窗户名称 */
  name: string;
  /** 部件集合 */
  parts: Array<KJLModelPartItem>;
}

/**
 * 窗户参数配置（扩展版）
 */
export declare class KJLParam_L {
  /** 窗户名称 */
  name: string;
  /** 预览图URL */
  previewImgUrl: string;
  /** 窗户类型 */
  type: number;
  /** 部件集合 */
  parts: Array<unknown>;
  /** 子窗集合 */
  subWindows: Array<unknown>;
}

/**
 * 窗户参数配置（标准版）
 */
export declare class KJLParam {
  /** 窗户名称 */
  name: string;
  /** 预览图URL */
  previewImgUrl: string;
  /** 边框集合 */
  borders: Array<unknown>;
  /** 窗洞路径 */
  windowHole: ImportPath;
  /** 窗框轨道集合 */
  frameRails: Array<unknown>;
  /** 窗框横梃集合 */
  frameMullions: Array<unknown>;
  /** 玻璃窗集合 */
  glassWindows: Array<unknown>;
  /** 纱窗集合 */
  gauzeWindows: Array<unknown>;
  /** 固定玻璃集合 */
  fixedGlass: Array<unknown>;
}