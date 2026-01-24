/**
 * 定制化建模插件类型定义
 * 提供墙面附着模型、房间附着模型、参数化吊顶等定制建模功能
 * @module CustomizedModelingPlugin
 */

import type { IPlugin } from 'HSApp.Plugin';
import type { App } from 'HSApp';
import type { CommandManager } from 'HSApp.CommandManager';
import type { TransactionManager } from 'HSApp.TransactionManager';
import type { CatalogManager } from 'HSApp.CatalogManager';
import type { PluginDependencies } from 'HSApp.Plugin';
import type { Request, TransactionCommitEvent } from 'HSApp.Transaction';
import type { Content } from 'HSCatalog';

/**
 * 插件常量命名空间
 */
declare const CUSTOMIZED_MODELING_NAMESPACE = 'hsw.plugin.customizedmodeling';
declare const CUSTOMIZED_MODELING_CMD_NAMESPACE = 'hsw.plugin.customizedmodeling.cmd';

/**
 * 定制化建模插件配置项
 */
interface CustomizedModelingPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的其他插件类型列表 */
  dependencies: string[];
}

/**
 * 插件依赖项映射
 */
interface CustomizedModelingDependencies extends PluginDependencies {
  /** 上下文菜单插件 */
  'hsw.plugin.contextmenu.Plugin': any;
  /** 工具栏插件 */
  [HSFPConstants.PluginType.Toolbar]: any;
  /** 调整大小组件插件 */
  [HSFPConstants.PluginType.ResizeWidget]: any;
  /** 单个房间插件 */
  [HSFPConstants.PluginType.SingleRoom]: any;
  /** 目录插件 */
  [HSFPConstants.PluginType.Catalog]: any;
  /** 属性栏插件 */
  [HSFPConstants.PluginType.PropertyBar]: any;
  /** 上下文工具插件 */
  [HSFPConstants.PluginType.ContextualTools]: any;
  /** 左侧菜单插件 */
  [HSFPConstants.PluginType.LeftMenu]: any;
  /** 右侧菜单插件 */
  [HSFPConstants.PluginType.RightMenu]: any;
  /** 页面头部插件 */
  [HSFPConstants.PluginType.PageHeader]: any;
  /** 用户指南插件 */
  'hsw.plugin.userguide.Plugin': any;
}

/**
 * 定制化建模插件类
 * 支持创建和编辑墙面附着模型、房间附着模型、参数化吊顶、踢脚线、灯带等定制化建模功能
 */
declare class CustomizedModelingPlugin extends IPlugin {
  /** 应用实例 */
  private app: App;
  
  /** 命令管理器 */
  private cmdMgr: CommandManager;
  
  /** 事务管理器 */
  private transMgr: TransactionManager;
  
  /** 目录管理器 */
  private catalogMgr: CatalogManager;
  
  /** 工具栏插件引用 */
  private toolbarPlugin: any;
  
  /** 插件依赖项集合 */
  private dependencies: CustomizedModelingDependencies;
  
  /** 冻结的内容列表 */
  private _freezedContents: Content[];
  
  /** 未选中的内容列表 */
  private _unselectedContents: Content[];

  /**
   * 构造函数
   * 初始化插件配置，声明依赖关系
   */
  constructor();

  /**
   * 插件激活回调
   * 注册所有定制化建模相关命令，初始化元数据处理器和Gizmo工厂
   * @param context - 插件上下文，包含应用实例
   * @param dependencies - 依赖的其他插件实例映射
   */
  onActive(context: { app: App }, dependencies: CustomizedModelingDependencies): void;

  /**
   * 插件停用回调
   * 清理插件资源
   */
  onDeactive(): void;

  /**
   * 初始化插件
   * 当启用定制化建模配置时，初始化处理器
   */
  init(): void;

  /**
   * 反初始化插件
   * 清理处理器资源
   */
  uninit(): void;

  /**
   * 上传自定义内容
   * @param content - 要上传的定制化内容数据
   */
  uploadCustomizedContent(content: unknown): void;

  /**
   * 修改模型类型
   * 触发编辑模型类型的UI操作
   */
  modifyModelType(): void;

  /**
   * 事务提交回调
   * 监听添加产品请求，当添加石膏吊顶/定制吊顶/智能定制吊顶时显示提示
   * @param event - 事务提交事件
   */
  onReqCommitted(event: TransactionCommitEvent): void;

  /**
   * 进入定制化模型编辑模式
   * 取消单房间模式，切换到2D视图，创建房间附着定制模型命令
   * @param modelData - 模型数据
   */
  enterCustomizedModel(modelData: unknown): void;

  /**
   * UI添加材质按钮点击事件
   * @param materialData - 材质数据
   */
  onUIAddMaterialBtnClk(materialData: unknown): void;

  /**
   * UI编辑按钮点击事件
   * 触发编辑操作
   */
  onUIEditBtnClk(): void;
}

/**
 * 命令类型枚举扩展（定制化建模相关）
 */
declare namespace HSFPConstants {
  enum CommandType {
    /** 创建墙面附着定制模型 */
    CreateWallAttachedCustomizedModel = 'CreateWallAttachedCustomizedModel',
    /** 创建房间附着定制模型 */
    CreateRoomAttachedCustomizedModel = 'CreateRoomAttachedCustomizedModel',
    /** 编辑定制模型 */
    EditCustomizedModel = 'EditCustomizedModel',
    /** 编辑定制模型类型 */
    EditCustomizedModelType = 'EditCustomizedModelType',
    /** 编辑参数化吊顶 */
    EditParametricCeiling = 'EditParametricCeiling',
    /** 编辑定制踢脚线 */
    EditCustomizedMolding = 'EditCustomizedMolding',
    /** 添加定制模型踢脚线 */
    AddCustomizedModelMolding = 'AddCustomizedModelMolding',
    /** 删除定制模型踢脚线 */
    DeleteCustomizedModelMolding = 'DeleteCustomizedModelMolding',
    /** 添加定制模型灯槽 */
    AddCustomizedModelLightSlot = 'AddCustomizedModelLightSlot',
    /** 删除定制模型灯槽 */
    DeleteCustomizedModelLightSlot = 'DeleteCustomizedModelLightSlot',
    /** 编辑定制模型灯槽 */
    EditCustomizedModelLightSlot = 'EditCustomizedModelLightSlot',
    /** 编辑定制模型灯带 */
    EditCustomizedModelLightBand = 'EditCustomizedModelLightBand',
    /** N版编辑定制模型灯带 */
    EditNCustomizedModelLightBand = 'EditNCustomizedModelLightBand',
    /** N版编辑定制模型灯槽 */
    EditNCustomizedModelLightSlot = 'EditNCustomizedModelLightSlot',
    /** 切换自托管灯带 */
    ToggleSelfHostLightBand = 'ToggleSelfHostLightBand',
    /** 删除定制模型灯带 */
    DeleteCustomizedModelLightBand = 'DeleteCustomizedModelLightBand',
    /** N版编辑参数化吊顶 */
    NEditParametricCeiling = 'NEditParametricCeiling',
    /** 编辑N版参数化背景墙基础 */
    EditNCPBackgroundWallBase = 'EditNCPBackgroundWallBase',
    /** 编辑N版参数化背景墙单元自定义踢脚线 */
    EditNCPBackgroundWallUnitSelfMolding = 'EditNCPBackgroundWallUnitSelfMolding',
    /** 替换N版参数化背景墙单元自定义踢脚线 */
    ReplaceNCPBackgroundWallUnitSelfMolding = 'ReplaceNCPBackgroundWallUnitSelfMolding',
    /** 打开独立面板 */
    OpenIndependentPanel = 'OpenIndependentPanel',
    /** 编辑参数化内容基础 */
    EditParametricContentBase = 'EditParametricContentBase'
  }

  enum RequestType {
    /** 添加产品请求 */
    AddProduct = 'AddProduct'
  }

  enum PluginType {
    /** 定制化建模插件类型 */
    CustomizedModeling = 'CustomizedModeling',
    Toolbar = 'Toolbar',
    ResizeWidget = 'ResizeWidget',
    SingleRoom = 'SingleRoom',
    Catalog = 'Catalog',
    PropertyBar = 'PropertyBar',
    ContextualTools = 'ContextualTools',
    LeftMenu = 'LeftMenu',
    RightMenu = 'RightMenu',
    PageHeader = 'PageHeader'
  }
}

/**
 * 内容类型枚举扩展
 */
declare namespace HSCatalog {
  enum ContentTypeEnum {
    /** 石膏吊顶 */
    GypsumCeiling = 'GypsumCeiling',
    /** 定制吊顶 */
    CustomizedCeiling = 'CustomizedCeiling',
    /** 智能定制吊顶 */
    SmartCustomizedCeiling = 'SmartCustomizedCeiling'
  }
}

/**
 * 应用配置扩展
 */
declare namespace HSApp.Config {
  /** 是否启用定制化建模功能 */
  const ENABLE_CUSTOMIZED_MODELING: boolean;
}

export type { 
  CustomizedModelingPlugin,
  CustomizedModelingPluginConfig,
  CustomizedModelingDependencies
};

export default CustomizedModelingPlugin;