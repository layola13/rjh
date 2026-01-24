/**
 * 模块：ChangeSlabThicknessRequest
 * 原始模块ID：94623
 * 用途：修改楼板厚度的事务请求类
 */

/**
 * 楼板对象接口
 * 表示具有可修改厚度属性的楼板实体
 */
interface Slab {
  /** 楼板厚度（单位通常为毫米） */
  thickness: number;
}

/**
 * 修改楼板厚度的事务请求
 * 
 * 该类实现了命令模式，支持修改楼板厚度的提交、撤销和重做操作。
 * 继承自HSCore的事务请求基类，确保操作的原子性和可逆性。
 * 
 * @extends HSCore.Transaction.Request
 * 
 * @example
 *