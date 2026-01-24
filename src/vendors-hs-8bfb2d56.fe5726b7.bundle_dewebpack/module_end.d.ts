/**
 * Module: module_end
 * 模块结束验证函数
 * 
 * @description 验证数据解析是否完整，确保没有额外的未处理数据残留
 * @throws {Error} 当存在额外未处理的数据时抛出错误
 */
declare function validateModuleEnd(): void;

/**
 * 模块结束验证的上下文接口
 */
interface ModuleEndContext {
  /**
   * 当前读取位置/索引
   */
  n: number;
  
  /**
   * 数据源对象
   */
  e: {
    /**
     * 数据总长度
     */
    length: number;
  };
}

/**
 * 执行模块结束验证
 * 检查当前位置是否已到达数据末尾
 * 
 * @param context - 验证上下文，包含位置和数据信息
 * @throws {Error} 当 n !== e.length 时抛出 "extra data found" 错误
 */
declare function checkModuleEnd(context: ModuleEndContext): void;