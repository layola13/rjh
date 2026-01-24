/**
 * 显示计算订单对话框
 * Opens and displays the calculation order dialog
 * 
 * @module openCalcorderDialog
 */

/**
 * 计算订单对话框状态接口
 * Interface for calculation order dialog state
 */
interface CalcorderDialogState {
  /** 对话框显示状态 / Dialog visibility state */
  show: boolean;
  [key: string]: unknown;
}

/**
 * 应用状态接口
 * Application state interface
 */
interface AppState {
  /** 添加计算订单对话框状态 / Add calculation order dialog state */
  add_calcorder_dialog: CalcorderDialogState;
  [key: string]: unknown;
}

/**
 * 打开计算订单对话框
 * Opens the calculation order dialog
 * 
 * @param context - 应用状态上下文（当前未使用）/ Application state context (currently unused)
 */
export declare function openCalcorderDialog(context: AppState): void;