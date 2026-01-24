/**
 * 删除按钮点击事件处理器
 * @module module_onclick
 * @remarks 原始模块ID: onclick
 */
declare function onClickHandler(this: DeleteButtonContext): void;

/**
 * 删除按钮上下文接口
 */
interface DeleteButtonContext {
  /**
   * 内部删除按钮点击处理方法
   */
  _deleteBtnClkHandler(): void;
}