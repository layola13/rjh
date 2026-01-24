import { OpeningEntity } from './OpeningEntity';
import { Parameter, DataType } from './Parameter';

/**
 * 门实体类
 * 表示建筑中的门对象，继承自OpeningEntity
 * 
 * @extends OpeningEntity
 */
export declare class DoorEntity extends OpeningEntity {
  /**
   * 获取门实体的实例数据
   * 
   * 该方法从父类获取基础实例数据，并在启用门石材质时添加石材面ID参数
   * 
   * @param context - 包含门配置信息的上下文对象
   * @returns 包含门实例所有参数的数据对象
   */
  getInstanceData(context: DoorContext): InstanceData;
}

/**
 * 门上下文接口
 * 包含门的配置和状态信息
 */
interface DoorContext {
  /**
   * 检查是否启用了门石材质
   * @returns 如果启用门石材质返回true，否则返回false
   */
  isDoorStoneMaterialEnabled(): boolean;

  /**
   * 获取门的石材面信息
   * @returns 包含石材面详细信息的对象
   */
  getDoorStoneFace(): StoneFace;
}

/**
 * 石材面接口
 * 描述门石材面的属性
 */
interface StoneFace {
  /**
   * 石材面的唯一标识符
   */
  id: string;
}

/**
 * 实例数据接口
 * 存储实体实例的参数集合
 */
interface InstanceData {
  /**
   * 添加参数到实例数据中
   * @param parameter - 要添加的参数对象
   */
  addParameter(parameter: Parameter): void;
}