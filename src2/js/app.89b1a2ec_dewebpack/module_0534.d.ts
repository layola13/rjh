/**
 * 国际化文本资源类型定义
 * 客户管理模块的多语言文本配置
 */
declare module 'module_0534' {
  /**
   * 客户管理模块的国际化文本配置接口
   * 包含客户管理、财务统计、收款账户等功能的文本资源
   */
  export interface I18nCustomerManageTexts {
    /** 客户管理 */
    customer_manage: string;
    
    /** 一次性购买，永久使用 */
    customer_manage_buy_tip: string;
    
    /** 立即购买 */
    buy_now: string;
    
    /** 咨询客服 */
    consult_customer_service: string;
    
    /** 高效管理客户，随时跟进目标客户 */
    customer_manage_buy_tip2: string;
    
    /** 一次性购买终身使用，购买后即可使用此功能 */
    customer_manage_buy_tip3: string;
    
    /** 实时查看订单付款状态，付款明细一目了然 */
    financial_buy_tip2: string;
    
    /** 去下单 */
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
    
    /** 客户名称 */
    customer_name: string;
    
    /** 电话号码 */
    phone_number: string;
    
    /** 客户类型 */
    customer_type: string;
    
    /** 备注 */
    note: string;
    
    /** 200个字符 */
    note_info: string;
    
    /** 请检查是否完整 */
    check_input: string;
    
    /** 确认删除该客户 */
    delete_customer_confirm: string;
    
    /** 姓名 */
    name: string;
    
    /** 地址 */
    address: string;
    
    /** 财务 */
    financial: string;
    
    /** 统计 */
    statistics: string;
    
    /** 收款明细 */
    receipt_details: string;
    
    /** 全部 */
    all: string;
    
    /** 本月 */
    this_month: string;
    
    /** 本年 */
    this_year: string;
    
    /** 选择结束时间 */
    choose_end_time: string;
    
    /** 总金额 */
    total_money: string;
    
    /** 已付款 */
    paid: string;
    
    /** 未付款 */
    un_paid: string;
    
    /** 未付款人数 */
    un_paid_number_of_people: string;
    
    /** 元 */
    yuan: string;
    
    /** 付款趋势 */
    pay_trend: string;
    
    /** 选中年份 */
    selected_year: string;
    
    /** 环比 */
    ring_ratio: string;
    
    /** 时间范围 */
    time_range: string;
    
    /** 总收款笔数 */
    total_received_count: string;
    
    /** 记录 */
    received_count: string;
    
    /** 总计 */
    total: string;
    
    /** 已付款 */
    received_money: string;
    
    /** 账户 */
    received_account: string;
    
    /** 操作人 */
    operater: string;
    
    /** 时间 */
    received_time: string;
    
    /** 创建时间 */
    created_at: string;
    
    /** 潜在客户 */
    potential_customer: string;
    
    /** 成交客户 */
    deal_customer: string;
    
    /** 流失客户 */
    lost_customer: string;
    
    /** 操作人 */
    receiver: string;
    
    /** 操作 */
    operation: string;
    
    /** 作废 */
    deprecate: string;
    
    /** 已作废 */
    deprecated: string;
    
    /** 作废后无法恢复，确定要作废吗 */
    deprecate_tip: string;
    
    /** 操作成功 */
    operate_success: string;
    
    /** 选择收款账户 */
    select_collection_account: string;
    
    /** 收款账户 */
    collection_account: string;
    
    /** 添加账户 */
    add_account: string;
    
    /** 查看账户 */
    view_account: string;
    
    /** 账户类型 */
    account_type: string;
    
    /** 账户名称 */
    account_name: string;
    
    /** 账号 */
    account_number: string;
    
    /** 银行名称 */
    bank_name: string;
    
    /** 银行账户 */
    bank_account: string;
    
    /** 支付宝 */
    alipay: string;
    
    /** 微信 */
    wechat: string;
    
    /** 银行卡 */
    bank_card: string;
    
    /** 账号 */
    wechat_name_tip: string;
    
    /** 账号 */
    alipay_name_tip: string;
    
    /** 所有账户列表 */
    account_list: string;
    
    /** 添加回款 */
    add_repayment: string;
    
    /** 回款列表 */
    repayment_list: string;
    
    /** 关注并购买 */
    follow_and_buy: string;
    
    /** 确认删除该账户？ */
    delete_account_tip: string;
  }

  /**
   * 导出的国际化文本配置对象
   */
  const i18nTexts: I18nCustomerManageTexts;
  
  export default i18nTexts;
}