/**
 * 内容编辑插件模块
 * 负责处理场景中各类内容的编辑操作，包括添加、删除、移动、旋转等命令和请求
 */

import { HSApp } from './518193';
import { CmdMoveParametricBackgroundWall } from './979634';
import { CmdMoveNCPBackgroundWallUnit } from './471593';
import { CmdRotateContent } from './433805';
import { CmdRotateContents } from './24644';
import { CmdContentArcArray } from './557333';
import { CmdReplaceZooWeeRRModel } from './938282';
import { CmdEditParametricBackgroundWallIsAutoFit } from './518313';
import { CmdMoveInHardDecoration } from './862898';
import { CmdMoveNCPBgWallInWFA } from './991793';
import { CmdRotateInHardDecoration } from './632048';
import { CmdResizeInHardDecoration } from './472611';
import { MoveParamrtricBackgroundWallRequest } from './352700';
import { MoveNCPBackgroundWallUnitRequest } from './992535';
import { RotateContentRequest } from './35183';
import { EditParametricBackgroundWallIsAutoFitRequest } from './350383';
import { AddMeshContentRequest } from './161789';
import { TransformInHardDecorationRequest } from './934901';

/**
 * 插件依赖信息接口
 */
interface PluginDependency {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖项列表 */
  dependencies: string[];
}

/**
 * 插件上下文接口
 */
interface PluginContext {
  /** 应用实例 */
  app: {
    /** 命令管理器 */
    cmdManager: {
      /** 注册命令类型与实现类的映射 */
      register(commands: Array<[string, new (...args: unknown[]) => unknown]>): void;
    };
    /** 事务管理器 */
    transManager: {
      /** 注册请求类型与实现类的映射 */
      register(requests: Array<[string, new (...args: unknown[]) => unknown]>): void;
    };
  };
}

/**
 * 内容编辑插件类
 * 提供内容编辑相关的命令和请求处理能力
 * 
 * @extends HSApp.Plugin.IPlugin
 */
export declare class ContentEditPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 构造函数
   * 初始化插件基本信息
   */
  constructor();

  /**
   * 插件激活时的回调
   * 注册所有内容编辑相关的命令和请求处理器
   * 
   * @param context - 插件上下文，包含应用实例和管理器
   */
  onActive(context: PluginContext): void;

  /**
   * 插件停用时的回调
   * 清理资源和注销处理器
   */
  onDeactive(): void;
}

/**
 * 命令类型常量声明
 */
declare namespace HSFPConstants {
  /** 命令类型枚举 */
  enum CommandType {
    /** 添加产品 */
    AddProduct = 'AddProduct',
    /** 删除内容 */
    DeleteContent = 'DeleteContent',
    /** 显示所有内容 */
    DisplayAllContent = 'DisplayAllContent',
    /** 显示单个内容 */
    DisplayContent = 'DisplayContent',
    /** 显示多个内容 */
    DisplayContents = 'DisplayContents',
    /** 复制内容 */
    DuplicateContent = 'DuplicateContent',
    /** 翻转内容 */
    FlipContent = 'FlipContent',
    /** 翻转开口 */
    FlipOpening = 'FlipOpening',
    /** 移动内容 */
    MoveContent = 'MoveContent',
    /** 移动多个内容 */
    MoveContents = 'MoveContents',
    /** 移动参数化背景墙 */
    MoveParametricBackgroundWall = 'MoveParametricBackgroundWall',
    /** 移动NCP背景墙单元 */
    MoveNCPBackgroundWallUnit = 'MoveNCPBackgroundWallUnit',
    /** 替换内容 */
    ReplaceContent = 'ReplaceContent',
    /** 旋转内容 */
    RotateContent = 'RotateContent',
    /** 旋转多个内容 */
    RotateContents = 'RotateContents',
    /** 请求包裹 */
    CmdRequestWrap = 'CmdRequestWrap',
    /** 创建参数化吊顶 */
    CreateParametricCeiling = 'CreateParametricCeiling',
    /** 对齐命令 */
    CmdAlign = 'CmdAlign',
    /** 内容阵列 */
    CmdContentArray = 'CmdContentArray',
    /** 内容圆弧阵列 */
    CmdContentArcArray = 'CmdContentArcArray',
    /** 应用参数到所有开口 */
    ApplyParamsToAllOpening = 'ApplyParamsToAllOpening',
    /** 编辑参数化背景墙自动适配属性 */
    EditParametricBackgroundWallIsAutoFit = 'EditParametricBackgroundWallIsAutoFit',
    /** 替换ZooWeeRR模型 */
    CmdReplaceZooWeeRRModel = 'CmdReplaceZooWeeRRModel',
    /** 硬装内移动 */
    MoveInHardDecoration = 'MoveInHardDecoration',
    /** WFA中移动NCP背景墙 */
    MoveNCPBgWallInWFA = 'MoveNCPBgWallInWFA',
    /** 硬装内旋转 */
    RotateInHardDecoration = 'RotateInHardDecoration',
    /** 硬装内调整大小 */
    ResizeInHardDecoration = 'ResizeInHardDecoration',
  }

  /** 请求类型枚举 */
  enum RequestType {
    /** 添加组件 */
    AddAssembly = 'AddAssembly',
    /** 添加飘窗 */
    AddBayWindow = 'AddBayWindow',
    /** 添加新内容 */
    AddContentNew = 'AddContentNew',
    /** 添加内容 */
    AddContent = 'AddContent',
    /** 放置软布 */
    PlaceSoftCloth = 'PlaceSoftCloth',
    /** 恢复软布 */
    RestoreSoftCloth = 'RestoreSoftCloth',
    /** 添加转角平窗 */
    AddCornerFlatWindow = 'AddCornerFlatWindow',
    /** 添加转角窗 */
    AddCornerWindow = 'AddCornerWindow',
    /** 添加参数化组件包 */
    AddPAssemblyPackage = 'AddPAssemblyPackage',
    /** 添加参数化组件 */
    AddPAssembly = 'AddPAssembly',
    /** 添加参数化普通窗 */
    AddPOrdinaryWindow = 'AddPOrdinaryWindow',
    /** 添加产品 */
    AddProduct = 'AddProduct',
    /** 删除组件 */
    DeleteAssembly = 'DeleteAssembly',
    /** 删除内容 */
    DeleteContent = 'DeleteContent',
    /** 删除转角窗 */
    DeleteCornerWindow = 'DeleteCornerWindow',
    /** 删除定制柜 */
    DeleteCustomizedCabinet = 'DeleteCustomizedCabinet',
    /** 删除定制模型 */
    DeleteCustomizedModel = 'DeleteCustomizedModel',
    /** 删除NGM开口 */
    DeleteNgmOpening = 'DeleteNgmOpening',
    /** 删除参数化组件 */
    DeletePAssembly = 'DeletePAssembly',
    /** 删除产品 */
    DeleteProduct = 'DeleteProduct',
    /** 显示内容 */
    DisplayContent = 'DisplayContent',
    /** 翻转内容 */
    FlipContent = 'FlipContent',
    /** 组合内容 */
    GroupContents = 'GroupContents',
    /** 移动内容请求 */
    MoveContentRequest = 'MoveContentRequest',
    /** 移动吊顶内容请求 */
    MoveCeilingContentRequest = 'MoveCeilingContentRequest',
    /** 移动参数化背景墙请求 */
    MoveParamrtricBackgroundWallRequest = 'MoveParamrtricBackgroundWallRequest',
    /** 移动NCP背景墙单元请求 */
    MoveNCPBackgroundWallUnitRequest = 'MoveNCPBackgroundWallUnitRequest',
    /** 替换产品 */
    ReplaceProduct = 'ReplaceProduct',
    /** 旋转内容 */
    RotateContent = 'RotateContent',
    /** 取消组合内容 */
    UngroupContents = 'UngroupContents',
    /** 分布内容 */
    DistributionContents = 'DistributionContents',
    /** 覆盖实体请求 */
    OverwriteEntityRequest = 'OverwriteEntityRequest',
    /** 翻转开口请求 */
    FlipOpeningRequest = 'FlipOpeningRequest',
    /** 添加代理模型请求 */
    AddProxyModelRequest = 'AddProxyModelRequest',
    /** 应用参数到所有开口请求 */
    ApplyParamsToAllOpeningRequest = 'ApplyParamsToAllOpeningRequest',
    /** 删除平台 */
    DeletePlatform = 'DeletePlatform',
    /** 编辑参数化背景墙自动适配 */
    EditParametricBackgroundWallIsAutoFit = 'EditParametricBackgroundWallIsAutoFit',
    /** 添加网格内容 */
    AddMeshContent = 'AddMeshContent',
    /** 硬装内变换 */
    TransformInHardDecoration = 'TransformInHardDecoration',
  }
}

/**
 * 插件注册声明
 * 将ContentEditPlugin注册到全局插件系统
 */
declare module HSApp.Plugin {
  function registerPlugin(name: 'hsw.plugin.ContentEdit.Plugin', plugin: typeof ContentEditPlugin): void;
}