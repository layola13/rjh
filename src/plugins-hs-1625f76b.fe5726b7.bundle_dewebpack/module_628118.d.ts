/**
 * 自定义吊顶移动命令类型声明
 * 用于处理吊顶类产品的移动、自动适配和智能定制功能
 */

import { HSCatalog } from './catalog';
import { HSCore } from './core';

/**
 * 吊顶移动命令类
 * 继承自基础命令类，专门处理吊顶内容的移动和自适应逻辑
 */
export default class CustomizedCeilingMoveCommand extends BaseCommand {
  /**
   * 多边形区域，表示吊顶的目标区域
   */
  private _polygon?: Polygon;

  /**
   * 目标2D面，用于吊顶初始化
   */
  private _targetFace2d?: Face2D;

  /**
   * 命令类型标识
   */
  private _cmdType?: HSFPConstants.CommandType;

  /**
   * 构造函数
   * @param element - 操作的元素
   * @param content - 内容对象
   * @param context - 上下文对象
   * @param autoExecute - 是否自动执行，默认 false
   * @param canDoAutoFit - 是否可以执行自动适配，默认 true
   * @param polygon - 多边形区域，可选
   * @param targetFace2d - 目标2D面，可选
   * @param cmdType - 命令类型，可选
   */
  constructor(
    element: unknown,
    content: CeilingContent,
    context: unknown,
    autoExecute?: boolean,
    canDoAutoFit?: boolean,
    polygon?: Polygon,
    targetFace2d?: Face2D,
    cmdType?: HSFPConstants.CommandType
  );

  /**
   * 自定义移动逻辑
   * 根据内容类型执行不同的吊顶更新策略：
   * - 扩展吊顶类型：更新智能定制吊顶
   * - 智能/定制PM吊顶：初始化吊顶区域
   */
  customizedMove(): void;

  /**
   * 更新智能定制吊顶
   * 处理吊顶的智能适配和空间验证
   * - 对于智能定制吊顶：尝试更新并验证空间是否足够
   * - 对于其他类型：执行房间适配逻辑
   * @throws 当空间不足时显示警告提示
   */
  updateSmartCustomizedCeiling(): void;
}

/**
 * 多边形接口
 * 表示2D空间中的多边形区域
 */
interface Polygon {
  // 多边形相关属性和方法
}

/**
 * 2D面接口
 * 表示3D场景中的2D平面
 */
interface Face2D {
  // 2D面相关属性和方法
}

/**
 * 吊顶内容接口
 * 包含吊顶产品的类型、初始化和更新方法
 */
interface CeilingContent {
  /**
   * 内容类型标识
   */
  contentType: ContentType;

  /**
   * 宿主对象
   */
  host?: CeilingHost;

  /**
   * 初始化吊顶
   * @param target - 多边形区域或2D面
   */
  initCeiling(target: Polygon | Face2D): void;

  /**
   * 更新智能定制吊顶
   * @param force - 是否强制更新
   * @param polygon - 目标多边形区域
   * @returns 更新是否成功
   */
  updateSmartCustomizedCeiling?(force: boolean, polygon: Polygon): boolean;
}

/**
 * 内容类型接口
 */
interface ContentType {
  /**
   * 检查是否为指定类型
   * @param type - 内容类型枚举值
   * @returns 是否匹配
   */
  isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
}

/**
 * 吊顶宿主接口
 */
interface CeilingHost {
  /**
   * 定制功能模型
   */
  customizedFeatureModel?: CustomizedFeatureModel;
}

/**
 * 定制功能模型接口
 */
interface CustomizedFeatureModel {
  /**
   * 草图对象
   */
  sketch: {
    /**
     * 标记材质为脏状态，需要重新渲染
     */
    dirtyMaterial(): void;
  };
}

/**
 * 基础命令类
 */
declare class BaseCommand {
  protected _content: CeilingContent;
  protected _canDoAutoFit: boolean;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
  enum CommandType {
    PlaceProduct = 'PlaceProduct',
    DuplicateSequence = 'DuplicateSequence'
  }

  enum Environment {
    NCustomizedCeilingModel = 'NCustomizedCeilingModel'
  }
}