import { Command } from 'HSApp/Cmd/Command';
import { ProductMeta } from 'HSCatalog/ProductMeta';
import { Vector3 } from 'THREE';
import { TransactionManager } from 'HSApp/TransactionManager';
import { Request } from 'HSApp/Request';

/**
 * 添加产品到画布的命令类
 * 
 * 该命令负责将产品（普通产品或动态装配体）添加到场景中，
 * 支持位置、旋转、缩放等变换属性，以及材质映射和宿主对象关联。
 */
export default class AddProductCommand extends Command {
  /** 产品元数据 */
  private readonly _productMeta: ProductMeta;
  
  /** 产品位置 */
  private readonly _position: Vector3;
  
  /** 产品旋转 */
  private readonly _rotation: Vector3;
  
  /** 产品缩放 */
  private readonly _scale: Vector3;
  
  /** 宿主对象（父级对象） */
  private readonly _host: unknown;
  
  /** 材质映射表 */
  private readonly _materialMap: Map<string, unknown>;
  
  /** 附加数据 */
  private readonly _data: unknown;

  /**
   * 构造函数
   * 
   * @param productMeta - 产品元数据，包含产品类型、内容类型等信息
   * @param position - 产品在场景中的位置坐标
   * @param rotation - 产品的旋转角度（欧拉角或四元数）
   * @param scale - 产品的缩放比例
   * @param host - 宿主对象，产品将作为其子对象添加
   * @param materialMap - 材质映射表，键为材质ID，值为材质对象（可选，默认为空Map）
   * @param data - 附加数据，用于传递额外的配置信息（可选）
   */
  constructor(
    productMeta: ProductMeta,
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    host: unknown,
    materialMap?: Map<string, unknown>,
    data?: unknown
  );

  /**
   * 执行命令
   * 
   * 根据产品类型创建相应的请求（普通产品或动态装配体），
   * 提交到事务管理器并返回执行结果。
   * 
   * @returns 命令执行后的输出结果
   */
  onExecute(): unknown;

  /**
   * 判断命令是否支持撤销/重做
   * 
   * @returns 始终返回false，表示该命令不支持撤销/重做操作
   */
  canUndoRedo(): boolean;

  /**
   * 自定义功能启动钩子
   * 
   * 当添加的产品是智能定制吊顶类型时，触发相应的信号通知。
   */
  onCustomFunctionStart(): void;

  /**
   * 获取命令描述
   * 
   * @returns 命令的中文描述："添加物品至画布"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * 
   * @returns 命令所属的日志分组类型：内容操作（ContentOperation）
   */
  getCategory(): string;
}