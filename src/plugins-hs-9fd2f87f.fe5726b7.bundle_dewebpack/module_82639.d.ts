/**
 * 定制化建模命令模块
 * 用于处理天花板线条(molding)的编辑操作
 */

/**
 * 线条参数数据结构
 */
interface ProfileData {
  /** 线条宽度(米) */
  profileWidth: number;
  /** 线条高度(米) */
  profileHeight: number;
  /** 线条尺寸Y */
  profileSizeY: number;
  /** 线条尺寸X */
  profileSizeX: number;
  /** X轴偏移量(厘米) */
  offsetX: number;
  /** Y轴偏移量(厘米) */
  offsetY: number;
  /** 水平翻转 */
  flipHorizontal?: boolean;
  /** 翻转状态 */
  flip?: boolean;
  /** 法线纹理 */
  normalTexture?: unknown;
  /** 高分辨率法线纹理 */
  normalTextureHigh?: unknown;
  /** 附加数据 */
  data?: unknown;
}

/**
 * 材质数据结构
 */
interface MaterialData {
  /** 旋转角度(度) */
  rotation: number;
}

/**
 * 线条实体参数
 */
interface MoldingParameters {
  /** 线条数据 */
  profileData: ProfileData;
  /** 材质数据 */
  materialData: MaterialData;
  /** 法线翻转 */
  flipNormal: boolean;
  /** 翻转状态 */
  flip: boolean;
  /** 错误代码(-1表示无错误) */
  error: number;
}

/**
 * 参数变更数据
 */
interface ParameterChanges {
  /** 新的线条宽度 */
  profileWidth?: number;
  /** 新的线条高度 */
  profileHeight?: number;
  /** 旋转角度增量 */
  rotateAngle?: number;
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** 水平翻转 */
  flipHorizontal?: boolean;
  /** 法线翻转 */
  flipNormal?: boolean;
  /** 翻转状态 */
  flip?: boolean;
}

/**
 * 线条元数据构建选项
 */
interface MoldingMetadataOptions {
  /** 线条数据 */
  data: ProfileData;
  /** 材质数据 */
  materialData: MaterialData;
  /** 法线纹理 */
  normalTexture?: unknown;
  /** 高分辨率法线纹理 */
  normalTextureHigh?: unknown;
  /** 水平翻转 */
  flipHorizontal: boolean;
  /** 考虑Y射线取反 */
  considerYRayNegate: boolean;
}

/**
 * 线条实体接口
 */
interface IMoldingEntity {
  /** 线条ID */
  moldingId: string;
  /** 路径 */
  path: unknown;
  /** 完整路径 */
  wholePath: unknown;
  /** 水平翻转 */
  flipHorizontal: boolean;
  /** 翻转状态 */
  flip: boolean;
  /** 垂直翻转 */
  flipVertical: boolean;
  /** 保持线条坐标 */
  keepProfileCordinate?: boolean;
  /** 元数据 */
  metadata: {
    offsetX: number;
    parameters?: {
      parametricCeilingType: string;
    };
  };
  /** 选项 */
  options: unknown;

  /**
   * 获取线条参数
   * @returns 线条参数或null
   */
  getParameters(): MoldingParameters | null;

  /**
   * 获取唯一父实体
   * @returns 父实体
   */
  getUniqueParent(): IContentEntity | null;

  /**
   * 更新元数据
   * @param metadata 新的元数据
   */
  updateMetadata(metadata: unknown): void;
}

/**
 * 内容实体接口
 */
interface IContentEntity {
  /** 内容类型 */
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  /** 元数据 */
  metadata?: {
    parameters?: {
      parametricCeilingType: string;
    };
  };

  /**
   * 获取所有线条实体
   * @returns 线条实体数组
   */
  getMoldingEntities(): IMoldingEntity[];
}

/**
 * 内容对象接口
 */
interface IContent {
  /** WebCAD文档对象 */
  webCADDocument: unknown;

  /**
   * 根据ID获取线条实体
   * @param moldingId 线条ID
   * @returns 线条实体
   */
  getMoldingEntityById(moldingId: string): IMoldingEntity;

  /**
   * 更新定制化天花板
   * @param data 更新数据
   */
  updateCustomizedCeiling(data: unknown): void;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  // 请求的具体实现由事务管理器定义
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param args 参数数组
   * @returns 事务请求对象
   */
  createRequest(requestType: string, args: unknown[]): ITransactionRequest;

  /**
   * 提交请求
   * @param request 要提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 编辑定制化线条命令
 * 负责处理天花板线条的各种编辑操作，包括尺寸调整、旋转、翻转和删除
 */
declare class CmdEditCustomizedMolding extends HSApp.Cmd.Command {
  /** 关联的内容对象 */
  private readonly _content: IContent;

  /** 目标线条ID */
  private readonly _moldId: string;

  /** 请求类型 */
  private readonly _requestType: string;

  /** 当前事务请求 */
  private _request: ITransactionRequest | undefined;

  /** 命令上下文 */
  protected context: ICommandContext;

  /**
   * 构造函数
   * @param content 内容对象
   * @param moldId 线条ID
   */
  constructor(content: IContent, moldId: string);

  /**
   * 提交事务请求
   * @private
   */
  private _commitRequest(): void;

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 修改线条数据
   * @param currentParams 当前参数
   * @param changes 要修改的参数
   * @param eventType 事件类型(可选)
   * @param syncRelated 是否同步相关线条(默认false)
   * 
   * @remarks
   * 支持以下参数修改：
   * - profileWidth: 线条宽度
   * - profileHeight: 线条高度
   * - rotateAngle: 旋转角度
   * - offsetX/offsetY: 位置偏移
   * - flipHorizontal/flipNormal/flip: 翻转选项
   * 
   * 对于角矩形和网格天花板，当syncRelated=true时，会同步更新所有相关线条
   */
  changeProfileData(
    currentParams: MoldingParameters,
    changes: ParameterChanges,
    eventType?: string,
    syncRelated?: boolean
  ): void;

  /**
   * 接收并处理事件
   * @param eventType 事件类型
   * @param data 事件数据
   * @returns 处理结果
   * 
   * @remarks
   * 支持的事件类型：
   * - "ceilingchangebegin": 开始编辑，创建事务
   * - "ceilingchanging": 编辑中，实时更新预览
   * - "ceilingchangeend": 结束编辑，提交事务
   * - "deletemolding": 删除线条
   * - "rotatetexture": 旋转纹理
   * - "flipHorizontal": 水平翻转
   * - "flipNormal": 法线翻转
   * - "flip": 翻转
   */
  onReceive(eventType: string, data: ParameterChanges): unknown;
}

/**
 * 命令插件命名空间
 */
declare namespace hsw.plugin.customizedmodeling.cmd {
  export { CmdEditCustomizedMolding };
}

/**
 * 全局常量
 */
declare const HSFPConstants: {
  RequestType: {
    /** 编辑定制化线条请求类型 */
    EditCustomizedMolding: string;
  };
};

declare const HSCatalog: {
  ContentTypeEnum: {
    /** 智能定制化天花板类型 */
    SmartCustomizedCeiling: unknown;
  };
};

declare const HSCore: {
  Model: {
    CustomizedModelMolding: {
      /**
       * 构建线条元数据
       * @param path 路径
       * @param wholePath 完整路径
       * @param options 选项
       * @param flip 翻转状态
       * @param flipNormal 法线翻转
       * @param keepProfileCordinate 保持线条坐标
       * @param moldingId 线条ID
       * @param entityOptions 实体选项
       */
      constructMetaData(
        path: unknown,
        wholePath: unknown,
        options: MoldingMetadataOptions,
        flip: boolean,
        flipNormal: boolean,
        keepProfileCordinate: boolean,
        moldingId: string,
        entityOptions: unknown
      ): unknown;
    };
  };
  Util: {
    ParametricCeilingHelper: {
      /** 参数化天花板类型枚举 */
      ParametricCeilingTypeEnum: {
        /** 角矩形天花板 */
        CornerRectCeiling: string;
        /** 网格天花板 */
        GridCeiling: string;
      };
    };
  };
};

declare const HSApp: {
  Util: {
    Core: {
      /**
       * 定义命名空间
       * @param namespace 命名空间路径
       */
      define(namespace: string): unknown;
    };
  };
  Cmd: {
    /** 命令基类 */
    class Command {
      protected context: ICommandContext;
    }
  };
};

declare const WebCADModelAPI: {
  /**
   * 移除线条
   * @param document WebCAD文档
   * @param moldingId 线条ID
   * @returns 操作结果数据
   */
  removeMolding(document: unknown, moldingId: string): unknown;
};

declare const GeLib: {
  MathUtils: {
    /**
     * 判断数值是否接近相等
     * @param a 数值A
     * @param b 数值B
     * @param tolerance 容差(可选)
     */
    nearlyEqual(a: number, b: number, tolerance?: number): boolean;

    /**
     * 判断数值A是否大于等于B
     * @param a 数值A
     * @param b 数值B
     * @param absoluteTolerance 绝对容差
     * @param relativeTolerance 相对容差
     */
    largerOrEqual(
      a: number,
      b: number,
      absoluteTolerance: number,
      relativeTolerance: number
    ): boolean;
  };
};

export default CmdEditCustomizedMolding;
export { CmdEditCustomizedMolding };