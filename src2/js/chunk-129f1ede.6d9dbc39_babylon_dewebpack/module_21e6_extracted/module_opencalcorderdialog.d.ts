/**
 * 计算订单对话框配置接口
 */
interface CalcorderDialogConfig {
  /** 控制对话框显示状态 */
  show: boolean;
}

/**
 * 应用状态或上下文对象接口
 */
interface AppState {
  /** 添加计算订单对话框的配置 */
  add_calcorder_dialog: CalcorderDialogConfig;
}

/**
 * 打开计算订单对话框
 * 
 * @description 显示添加计算订单的对话框组件
 * @param t - 未使用的参数（可能是事件对象或触发器）
 * @param context - 应用状态上下文对象
 * @returns void
 */
declare function openCalcorderDialog(t: unknown, context: AppState): void;

export default openCalcorderDialog;