/**
 * 自定义材质插件的元数据处理模块
 * @module hsw.plugin.facematerial
 */

declare namespace HSW.Plugin.FaceMaterial {
  /**
   * 上下文菜单项配置
   */
  interface ContextMenuItem {
    /** 菜单项唯一标识符 */
    id: string;
    /** 菜单项显示名称 */
    name: string;
    /** 菜单项图标路径 */
    icon: string;
    /** 点击事件回调函数 */
    onclick: (item: CatalogItem) => void;
  }

  /**
   * 上下文菜单配置
   */
  interface ContextMenu {
    /** 菜单名称 */
    name: string;
    /** 菜单项列表 */
    items: ContextMenuItem[];
  }

  /**
   * 目录项元数据
   */
  interface CatalogItemMetadata {
    /** 产品ID */
    id: string;
    /** 内容类型 */
    contentType: {
      /** 检查是否为指定类型 */
      isTypeOf: (type: string) => boolean;
    };
    /** 上下文菜单配置（可选） */
    contextmenu?: ContextMenu;
  }

  /**
   * 产品配置信息
   */
  interface ProductConfig {
    /** 是否为用户上传的内容 */
    isUserUpload: boolean;
  }

  /**
   * 元数据处理器
   */
  interface MetaProcess {
    /**
     * 处理目录项元数据
     * @param metadata - 目录项元数据
     * @param config - 产品配置信息
     * @returns 处理后的元数据
     * @description 为自定义材质类型的目录项添加编辑和删除功能的上下文菜单
     */
    process(
      metadata: CatalogItemMetadata,
      config: ProductConfig
    ): CatalogItemMetadata;

    /**
     * 迷你模式下处理目录项元数据
     * @param metadata - 目录项元数据
     * @param config - 产品配置信息
     * @description 在迷你模式下为用户上传的自定义材质添加上下文菜单
     */
    miniProcess(metadata: CatalogItemMetadata, config: ProductConfig): void;

    /**
     * 上下文菜单操作集合
     */
    action: {
      /**
       * 删除目录项
       * @param item - 要删除的目录项
       * @description 删除用户上传的自定义材质，需要用户登录状态
       */
      delete(item: CatalogItemMetadata): void;
    };
  }

  /**
   * 提示消息配置
   */
  interface HintOptions {
    /** 提示状态：loading(加载中) | completed(完成) | warning(警告) */
    status: "loading" | "completed" | "warning";
  }

  /**
   * 删除产品结果
   */
  interface DeleteProductResult {
    /** 是否成功 */
    success: boolean;
  }
}

/**
 * 全局HSApp工具集
 */
declare namespace HSApp.Util.Core {
  /**
   * 定义模块
   * @param moduleName - 模块名称
   * @returns 模块对象
   */
  function define<T = any>(moduleName: string): T;
}

/**
 * 目录内容类型枚举
 */
declare namespace HSCatalog {
  enum ContentTypeEnum {
    /** 自定义材质类型 */
    CustomizedMaterial = "CustomizedMaterial"
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   * @returns 本地化字符串
   */
  function getString(key: string): string;
}

/**
 * 实时提示工具
 */
declare namespace LiveHint {
  /**
   * 显示提示消息
   * @param message - 提示消息内容
   * @param duration - 显示时长（毫秒），undefined表示不自动关闭
   * @param callback - 关闭回调函数
   * @param options - 提示选项配置
   */
  function show(
    message: string,
    duration: number | undefined,
    callback: (() => void) | null,
    options: HSW.Plugin.FaceMaterial.HintOptions
  ): void;
}

/**
 * 用户登录状态管理
 */
declare namespace adskUser {
  /**
   * 检查用户是否已登录
   * @returns 登录状态
   */
  function isLogin(): boolean;
}

/**
 * 插件常量定义
 */
declare namespace HSFPConstants {
  enum PluginType {
    /** 目录插件类型 */
    Catalog = "Catalog"
  }
}

/**
 * 目录插件接口
 */
declare interface CatalogPlugin {
  /**
   * 删除产品
   * @param productId - 产品ID
   * @returns Promise，成功时返回删除结果，失败时返回错误信息
   */
  deleteProduct(
    productId: string
  ): Promise<HSW.Plugin.FaceMaterial.DeleteProductResult>;
}

/**
 * 插件管理器
 */
declare interface PluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型
   * @returns 插件实例或undefined
   */
  getPlugin(pluginType: string): CatalogPlugin | undefined;
}

/**
 * 应用程序主对象
 */
declare namespace HSApp.App {
  interface Application {
    /** 插件管理器 */
    pluginManager: PluginManager;
  }

  /**
   * 获取应用程序实例
   * @returns 应用程序对象
   */
  function getApp(): Application;
}