/**
 * 部件装配旋转工具模块
 * 用于处理和获取装配件的旋转配置信息
 */

/**
 * 旋转配置信息接口
 */
interface IRotationConfig {
  /** 开启角度或状态值 */
  opening: string;
  /** 旋转标识符 */
  rotationId: string;
}

/**
 * 旋转配置映射表
 * 键为旋转ID或句柄ID，值为旋转配置
 */
interface IRotationConfigMap {
  [key: string]: IRotationConfig;
}

/**
 * 默认值项接口
 */
interface IDefaultValueItem {
  /** 包含旋转信息的等式字符串 */
  equation: string;
}

/**
 * 用户自由数据接口
 */
interface IUserFreeData {
  /** 默认值配置数组 */
  defaultValues?: IDefaultValueItem[];
}

/**
 * 装配元数据接口
 */
interface IAssemblyMetadata {
  /** 用户自定义自由数据 */
  userFreeData?: IUserFreeData;
}

/**
 * 装配模型接口（扩展HSCore.Model.PAssembly）
 */
interface IPAssembly {
  /** 装配元数据 */
  metadata?: IAssemblyMetadata;
}

/**
 * HSCore命名空间声明
 */
declare namespace HSCore {
  namespace Model {
    class PAssembly implements IPAssembly {
      metadata?: IAssemblyMetadata;
    }
  }
}

/**
 * 装配旋转处理工具
 * 提供获取和解析装配件旋转配置的功能
 */
export declare const PAssemblyRotation: {
  /**
   * 获取装配件的内容旋转配置
   * 
   * 解析装配件元数据中的默认值，提取旋转相关的配置信息。
   * 支持从等式字符串（格式：rotationId_opening=value）中解析旋转ID、开启值等信息。
   * 
   * @param assembly - 装配模型实例，必须为HSCore.Model.PAssembly类型
   * @returns 旋转配置映射表，若输入无效或无配置则返回undefined
   * 
   * @example
   *