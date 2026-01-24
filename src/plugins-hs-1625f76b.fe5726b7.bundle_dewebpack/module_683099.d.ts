/**
 * 替换模型配置模块
 * 提供模型替换功能的配置和处理逻辑
 */

import type { HSCore } from 'HSCore';
import type { HSApp } from 'HSApp';
import type { HSCatalog } from 'HSCatalog';
import type { MessageBox, LiveHint, ResourceManager } from 'GlobalTypes';

/**
 * 替换配置参数接口
 */
interface ReplaceOptions {
  /** 排除的分类类型 */
  excludeType?: HSCatalog.CategoryTypeEnum;
  /** 客户自定义分类列表 */
  customerCategories?: string[];
  /** 查询参数 */
  query?: QueryParams;
  /** 场景类型 */
  sceneType?: string;
  /** 我的数据配置 */
  mydata?: MyDataConfig;
  /** 模型尺寸 */
  modelSize?: ModelSize;
  /** 替换类型 */
  types?: HSCatalog.CategoryTypeEnum | HSCatalog.CategoryTypeEnum[];
  /** 替换场景 */
  replaceScene?: string;
  /** 企业文件夹列表场景类型 */
  entFolderListSceneType?: string;
  /** 不可关闭区域的元素选择器 */
  unclosedAreaElements?: string[];
}

/**
 * 查询参数接口
 */
interface QueryParams {
  /** 分类ID */
  categoryId?: string;
  /** 搜索ID */
  seekId?: string;
}

/**
 * 我的数据配置接口
 */
interface MyDataConfig {
  /** 数据类型列表 */
  types?: (HSCatalog.CategoryTypeEnum | string)[];
  /** 模型搜索过滤器 */
  modelSearchFilter?: {
    sceneType?: string;
  };
}

/**
 * 模型尺寸接口
 */
interface ModelSize {
  /** 高度（单位：米） */
  height: string;
  /** 长度（单位：米） */
  length: string;
  /** 宽度（单位：米） */
  width: string;
}

/**
 * 尺寸范围接口（单位：毫米）
 */
interface SizeRange {
  /** 宽度 */
  W: number;
  /** 深度 */
  D?: number;
  /** 高度 */
  H: number;
}

/**
 * 替换处理器接口
 */
interface ReplaceHandlers {
  /**
   * 产品选择处理器
   * @param selectedProduct - 选中的产品数据
   * @param context - 应用上下文
   */
  productSelectedHandler(
    selectedProduct: ProductSelectionData,
    context: AppContext
  ): void;

  /**
   * 面板显示处理器
   */
  panelShownHandler(): void;

  /**
   * 面板隐藏处理器
   */
  panelHiddenHandler(): void;

  /**
   * 撤销/重做处理器
   * @param request - 请求对象
   * @param isRedo - 是否为重做操作
   */
  undoRedoHandler(request: ReplaceRequest, isRedo: boolean): void;
}

/**
 * 产品选择数据接口
 */
interface ProductSelectionData {
  /** 产品数据 */
  data?: HSCore.Model.Content;
  /** 依赖配对关系 */
  depMates?: unknown;
}

/**
 * 应用上下文接口
 */
interface AppContext {
  /** 选择管理器 */
  selectionManager: SelectionManager;
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 选择管理器接口
 */
interface SelectionManager {
  /** 获取当前选中的对象列表 */
  selected(): HSCore.Model.Content[];
  /** 选中指定对象 */
  select(content: HSCore.Model.Content): void;
  /** 取消选中指定对象 */
  unselect(content: HSCore.Model.Content): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求对象
   * @param type - 请求类型
   * @param args - 请求参数
   */
  createRequest(type: string, args: unknown[]): ReplaceRequest;
  /**
   * 提交请求
   * @param request - 请求对象
   * @returns 替换后的内容对象，失败返回null
   */
  commit(request: ReplaceRequest): HSCore.Model.Content | null;
}

/**
 * 替换请求接口
 */
interface ReplaceRequest {
  /** 请求类型 */
  type: string;
  /** 请求结果 */
  result?: HSCore.Model.Content;
  /** 原始内容 */
  oldContent?: HSCore.Model.Content;
  /** 获取被移除的软装布料列表 */
  getRemovedSoftCloth(): HSCore.Model.Content[];
}

/**
 * 状态栏控件接口
 */
interface StatusBarControl {
  /**
   * 更新控件状态
   * @param state - 新状态
   */
  update(state: { isActive: boolean }): void;
}

/**
 * 插件实例接口
 */
interface PluginInstance {
  /**
   * 根据ID获取状态栏控件
   * @param id - 控件ID
   */
  getStatusBarControlById(id: string): StatusBarControl | undefined;
}

/**
 * 替换功能配置生成器
 * 
 * @param pluginInstance - 插件实例
 * @returns 配置生成函数
 * 
 * @example
 *