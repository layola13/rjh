/**
 * 客户管理与财务模块的国际化文本配置
 * Module: module_8cd3
 * Original ID: 8cd3
 */

/**
 * 客户类型枚举
 */
export enum CustomerType {
  /** 潜在客户 */
  POTENTIAL = 'potential_customer',
  /** 成交客户 */
  DEAL = 'deal_customer',
  /** 流失客户 */
  LOST = 'lost_customer'
}

/**
 * 账户类型枚举
 */
export enum AccountType {
  /** 支付宝 */
  ALIPAY = 'alipay',
  /** 微信 */
  WECHAT = 'wechat',
  /** 银行卡 */
  BANK_CARD = 'bank_card'
}

/**
 * 时间范围枚举
 */
export enum TimeRange {
  /** 全部 */
  ALL = 'all',
  /** 本月 */
  THIS_MONTH = 'this_month',
  /** 今年 */
  THIS_YEAR = 'this_year'
}

/**
 * 国际化文本键值对接口
 */
export interface I18nLocaleMessages {
  /** 客户管理 */
  customer_manage: string;
  /** 一次购买终身使用 */
  customer_manage_buy_tip: string;
  /** 立即购买 */
  buy_now: string;
  /** 咨询客服 */
  consult_customer_service: string;
  /** 高效管理客户，随时跟进目标客户 */
  customer_manage_buy_tip2: string;
  /** 一次购买终身使用，购买后可使用该功能 */
  customer_manage_buy_tip3: string;
  /** 订单收款情况实时查看, 收款明细一目了然 */
  financial_buy_tip2: string;
  /** 跳转订单 */
  to_order: string;
  /** 编辑 */
  edit: string;
  /** 删除 */
  delete: string;
  /** 确认 */
  confirm: string;
  /** 取消 */
  cancel: string;
  /** 添加客户 */
  add_customer: string;
  /** 编辑客户 */
  edit_customer: string;
  /** 输入 */
  input: string;
  /** 客户姓名 */
  customer_name: string;
  /** 联系电话 */
  phone_number: string;
  /** 客户类型 */
  customer_type: string;
  /** 备注 */
  note: string;
  /** 备注内容200个字以内 */
  note_info: string;
  /** 请填写完整 */
  check_input: string;
  /** 确定要删除该客户吗 */
  delete_customer_confirm: string;
  /** 姓名 */
  name: string;
  /** 地址 */
  address: string;
  /** 财务收款 */
  financial: string;
  /** 概括统计 */
  statistics: string;
  /** 收款明细 */
  receipt_details: string;
  /** 全部 */
  all: string;
  /** 本月 */
  this_month: string;
  /** 今年 */
  this_year: string;
  /** 选择截止日期 */
  choose_end_time: string;
  /** 总金额 */
  total_money: string;
  /** 已收款 */
  paid: string;
  /** 尾款 */
  un_paid: string;
  /** 待收人数 */
  un_paid_number_of_people: string;
  /** 元 */
  yuan: string;
  /** 收款趋势 */
  pay_trend: string;
  /** 所选年份 */
  selected_year: string;
  /** 环比 */
  ring_ratio: string;
  /** 选择起止日期 */
  time_range: string;
  /** 共收款 */
  total_received_count: string;
  /** 笔 */
  received_count: string;
  /** 共计 */
  total: string;
  /** 收款金额 */
  received_money: string;
  /** 收款账户 */
  received_account: string;
  /** 操作人 */
  operater: string;
  /** 收款时间 */
  received_time: string;
  /** 创建于 */
  created_at: string;
  /** 潜在客户 */
  potential_customer: string;
  /** 成交客户 */
  deal_customer: string;
  /** 流失客户 */
  lost_customer: string;
  /** 收款人 */
  receiver: string;
  /** 操作 */
  operation: string;
  /** 作废 */
  deprecate: string;
  /** 已作废 */
  deprecated: string;
  /** 作废后不能恢复，确认要作废吗 */
  deprecate_tip: string;
  /** 操作成功 */
  operate_success: string;
  /** 选择账户 */
  select_collection_account: string;
  /** 收款账户 */
  collection_account: string;
  /** 新增账户 */
  add_account: string;
  /** 查看账号 */
  view_account: string;
  /** 账号类型 */
  account_type: string;
  /** 名称 */
  account_name: string;
  /** 账号 */
  account_number: string;
  /** 开户行 */
  bank_name: string;
  /** 开户账号 */
  bank_account: string;
  /** 支付宝 */
  alipay: string;
  /** 微信 */
  wechat: string;
  /** 银行卡 */
  bank_card: string;
  /** 微信账号名称 */
  wechat_name_tip: string;
  /** 支付宝账号名称 */
  alipay_name_tip: string;
  /** 全部收款账号 */
  account_list: string;
  /** 添加付款 */
  add_repayment: string;
  /** 付款记录 */
  repayment_list: string;
  /** 关注公众号购买 */
  follow_and_buy: string;
  /** 确定删除该账号吗? */
  delete_account_tip: string;
}

/**
 * 中文简体语言包
 */
declare const localeMessages: I18nLocaleMessages;

export default localeMessages;