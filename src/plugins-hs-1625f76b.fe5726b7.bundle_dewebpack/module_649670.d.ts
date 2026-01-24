import type { DModel } from './DModel';
import type { Group } from './Group';
import type { Layer } from './Layer';
import type { ContentType } from './ContentType';

/**
 * 组合操作的规格配置
 */
interface GroupOperationSpec {
  /** 创建的组合对象 */
  group: Group;
  /** 组合中的成员模型列表 */
  members: DModel[];
  /** 父级图层 */
  parent: Layer;
}

/**
 * 组合元数据
 */
interface GroupMetadata {
  /** 组合名称 */
  name?: string;
  /** 组合类型 */
  type?: string;
  /** 其他元数据属性 */
  [key: string]: unknown;
}

/**
 * 模型组合请求
 * 
 * 用于将多个模型组合成一个组的事务请求。
 * 支持撤销和重做操作。
 */
export default class GroupModelsRequest extends HSCore.Transaction.Request {
  /** 要组合的模型成员列表 */
  private _members: DModel[];
  
  /** 组合的元数据 */
  private _meta: GroupMetadata;
  
  /** 组合操作规格，包含组合对象、成员和父级信息 */
  private _spec: GroupOperationSpec;

  /**
   * 构造函数
   * 
   * @param members - 要组合的模型数组
   * @param metadata - 组合的元数据配置
   */
  constructor(members: DModel[], metadata: GroupMetadata);

  /**
   * 提交组合操作
   * 
   * 执行以下操作：
   * 1. 获取当前活动图层
   * 2. 创建新的组合对象
   * 3. 根据环境ID（tpzz或tpzz-cabinet）选择主要模型并设置旋转
   * 4. 将成员添加到组合中
   * 
   * @returns 创建的组合对象
   */
  onCommit(): Group;

  /**
   * 撤销组合操作
   * 
   * 将组合拆解，恢复到组合前的状态
   */
  onUndo(): void;

  /**
   * 重做组合操作
   * 
   * 重新应用组合操作
   */
  onRedo(): void;

  /**
   * 获取操作描述
   * 
   * @returns 操作的中文描述
   */
  getDescription(): string;

  /**
   * 获取操作类别
   * 
   * @returns 日志分组类型：内容操作
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}