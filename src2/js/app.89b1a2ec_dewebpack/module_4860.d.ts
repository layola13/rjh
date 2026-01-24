/**
 * 国际化语言包类型定义 - 英文版本
 * @module I18nEnglishLanguagePack
 * @description 定义应用程序所有可翻译文本的类型接口
 */

/**
 * 应用程序完整的国际化文本键值对接口
 * @interface I18nLanguagePack
 */
export interface I18nLanguagePack {
  /** 添加 */
  add: string;
  /** 移动端添加 */
  addMobile: string;
  /** 添加订单 */
  add_order: string;
  /** 过滤器 */
  filter: string;
  /** 搜索关键词 */
  search_keyword: string;
  /** 跟踪员姓名 */
  ywy_name: string;
  /** 打印 */
  printing: string;
  /** 详情 */
  details: string;
  /** 件数 */
  pcs: string;
  /** 已支付 */
  paid: string;
  /** 按订单日期 */
  by_order_date: string;
  /** 本月 */
  this_month: string;
  /** 上月 */
  last_month: string;
  /** 近3个月 */
  nearly_3_months: string;
  /** 今年 */
  this_year: string;
  /** 去年 */
  last_year: string;
  /** 自定义 */
  custom: string;
  /** 重置 */
  reset: string;
  /** 确认 */
  confirm: string;
  /** 无数据 */
  no_data: string;
  /** 加载中，请稍候 */
  loading_wait: string;
  /** 合同详情 */
  contract_details: string;
  /** 合同编号 */
  contract_no: string;
  /** 客户 */
  customer: string;
  /** 电话 */
  phone: string;
  /** 地址 */
  address: string;
  /** 合计 */
  total: string;
  /** 合计（备用） */
  total1: string;
  /** 数量 */
  count: string;
  /** 合同状态 */
  contract_status: string;
  /** 合同类型 */
  contract_type: string;
  /** 阳光房合同 */
  sunnyhouse_contract: string;
  /** 门窗合同 */
  webcc_contract: string;
  /** 面积 */
  area: string;
  /** 金额 */
  money: string;
  /** 订单日期 */
  order_date: string;
  /** 日期 */
  date: string;
  /** 编辑 */
  edit: string;
  /** 删除 */
  delete: string;
  /** 分享 */
  share: string;
  /** 链接 */
  link: string;
  /** 包含金额和报价 */
  include_money: string;
  /** 不包含金额和报价 */
  not_include_money: string;
  /** 复制 */
  copy: string;
  /** 关闭 */
  close: string;
  /** 查看报价 */
  view_quote: string;
  /** 报价信息 */
  quotation_information: string;
  /** 添加报价 */
  add_quote: string;
  /** 编辑报价 */
  edit_quote: string;
  /** 报价名称 */
  quote_name: string;
  /** 价格 */
  price: string;
  /** 数量（备用） */
  count2: string;
  /** 长度 */
  length: string;
  /** 折扣 */
  discount: string;
  /** 备注 */
  note: string;
  /** 操作 */
  operation: string;
  /** 请输入报价名称 */
  input_quote_name: string;
  /** 请输入备注 */
  input_note: string;
  /** 基础价格 */
  base_price: string;
  /** 基础价格说明：订单金额总和，不可编辑或删除 */
  base_price_note: string;
  /** 添加合同 */
  add_contract: string;
  /** 编辑合同 */
  edit_contract: string;
  /** 可选，自动生成 */
  input_contract_no: string;
  /** 请输入合同编号 */
  input_contract_no2: string;
  /** 请输入客户名称 */
  input_customer: string;
  /** 客户管理 */
  customer_manage: string;
  /** 请输入电话 */
  input_phone: string;
  /** 请输入地址 */
  input_address: string;
  /** 扫码注册，体验WindoorCraft */
  share_code_text: string;
  /** 请确认是否删除该报价！ */
  delete_quote_warning: string;
  /** 设计订单 */
  design_order: string;
  /** 模板订单 */
  template_order: string;
  /** 计算 */
  calculation: string;
  /** 设计 */
  design: string;
  /** 模板 */
  template: string;
  /** 优化 */
  optimization: string;
  /** 优化列表 */
  optimization_list: string;
  /** 优化列表（移动端） */
  optimization_list_mobile: string;
  /** 添加优化 */
  add_optimization: string;
  /** 取消优化 */
  cancel_optimization: string;
  /** 执行优化 */
  go_optimization: string;
  /** 请先添加需要优化的合同 */
  optimization_warning: string;
  /** 返回 */
  back: string;
  /** 运行 */
  run: string;
  /** 切割 */
  cutting: string;
  /** 利用率 */
  utilization: string;
  /** 剩余 */
  left_over: string;
  /** 基础型材配置 */
  basic_bars: string;
  /** 待切割项目 */
  bars: string;
  /** 优化结果 */
  optimization_result: string;
  /** 计算进行中，请耐心等待... */
  optimization_loading: string;
  /** 没有需要优化切割的型材 */
  optimization_warning2: string;
  /** 没有可打印的切割方案 */
  optimization_warning3: string;
  /** 推送 */
  push: string;
  /** 返回合同详情页 */
  back_contract_details: string;
  /** 这是最后一个订单 */
  last_order: string;
  /** 添加模板订单 */
  add_template_order: string;
  /** 保存 */
  save: string;
  /** 已优化 */
  optimized: string;
  /** 优化设置 */
  optimize_config: string;
  /** 多个分支长度用英文逗号分隔 */
  length_tip: string;
  /** 型材长度 */
  bar_length: string;
  /** 切割头余量 */
  side_waste: string;
  /** 锯切损耗 */
  cut_waste: string;
  /** 余料设置 */
  surplusSetting: string;
  /** 无效数字 */
  invalid_number: string;
  /** 选择过期时间 */
  choose_expire_time: string;
  /** 小时 */
  hours: string;
  /** 分享到微信小程序 */
  share_to_mp_weixin: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
  /** 五金 */
  hardware: string;
  /** 开启 */
  opening: string;
  /** 二维码 */
  qrCode: string;
  /** 下载 */
  download: string;
  /** 总重量 */
  total_weight: string;
  /** 产品名称 */
  product_name: string;
  /** 按合同 */
  by_contract: string;
  /** 按创建人 */
  by_creator: string;
  /** 创建人 */
  creator: string;
  /** 主账号 */
  main_account: string;
  /** 按订单 */
  by_order: string;
  /** 未找到产品 */
  no_product_found: string;
  /** 客户确认状态 */
  customer_confirmed: string;
  /** 全部 */
  all: string;
  /** 未确认 */
  not_confirm: string;
  /** 已确认 */
  confirmed: string;
  /** 排序 */
  sort: string;
  /** 上一页 */
  prev: string;
  /** 下一页 */
  next: string;
  /** 更换产品 */
  change_product: string;
  /** 子账号确认 */
  sub_account_confirm: string;
  /** 子账号取消确认 */
  sub_account_confirm_cancel: string;
  /** 合同 */
  contract: string;
  /** 订单 */
  order: string;
  /** 请输入合同编号、客户或地址 */
  search_contract_tips: string;
  /** 未找到合同 */
  no_contract_found: string;
  /** 合同必填 */
  contract_required: string;
  /** 克隆到 */
  clone_to: string;
  /** 多选 */
  multipleChoice: string;
  /** 操作 */
  operate: string;
  /** 订单操作 */
  order_operate: string;
  /** 意向单 */
  intent_contract: string;
  /** 合同单 */
  agreement_contract: string;
  /** 生产单 */
  production_contract: string;
  /** 已完工 */
  finished_contract: string;
  /** 已发货 */
  delivered_contract: string;
  /** 已结清 */
  settled_contract: string;
  /** 无状态 */
  no_status: string;
  /** 确认签名 */
  confirm_signature: string;
  /** 需要重新签名确认吗？ */
  resign_message: string;
  /** 取消 */
  cancel: string;
  /** 警告 */
  warning: string;
  /** 确认签名？一经确认不可更改 */
  resign_confirm_message: string;
  /** 重新确认 */
  reconfirm: string;
  /** 清空 */
  clean: string;
  /** 意向单（中文键） */
  "意向单": string;
  /** 合同单（中文键） */
  "合同单": string;
  /** 生产单（中文键） */
  "生产单": string;
  /** 已完工（中文键） */
  "已完工": string;
  /** 已发货（中文键） */
  "已发货": string;
  /** 已结清（中文键） */
  "已结清": string;
  /** 最终金额 */
  final_money: string;
  /** 缺少公司信息 */
  lack_company: string;
  /** 请选择要推送的公司 */
  lack_company_message: string;
  /** 统计 */
  statstics: string;
  /** 最小面积设置 */
  min_area_setting: string;
  /** 默认价格设置 */
  default_price_setting: string;
  /** 默认位置设置 */
  default_position_setting: string;
  /** 更新 */
  update: string;
  /** 更改为 */
  change_to: string;
  /** 推送到CC */
  push_to_cc: string;
  /** 无客户信息 */
  no_customer_info: string;
  /** 设置折扣 */
  set_discount: string;
  /** 编辑器 */
  editor: string;
  /** 管理 */
  manage: string;
  /** 纯色添加标题 */
  pure_color_add_title: string;
  /** 纯色表单字段 */
  pure_color_add_form: string;
  /** 输入颜色名称 */
  pure_color_add_form_des: string;
  /** 材质添加标题 */
  material_color_add_title: string;
  /** 材质表单字段 */
  material_color_add_form: string;
  /** 输入材质名称 */
  material_color_add_form_des: string;
  /** 上传材质 */
  material_color_upload_form: string;
  /** 推荐400*400，不超过1M */
  material_color_upload_form_des: string;
  /** 名称必填 */
  name_required: string;
  /** 请上传图片 */
  pic_required: string;
  /** 3D模式 */
  "3d_mode": string;
  /** 所有订单 */
  all_orders: string;
  /** 待处理订单 */
  intention_orders: string;
  /** 已确认订单 */
  formal_orders: string;
  /** 转为意向单 */
  to_intention_order: string;
  /** 转为正式单 */
  to_formal_order: string;
  /** 将此订单转换为意向单？ */
  to_intention_des: string;
  /** 将此订单转换为正式单？ */
  to_formal_des: string;
  /** 订单编号 */
  order_no: string;
  /** 编辑时间 */
  edit_time: string;
  /** 原始图片 */
  original_image: string;
  /** 已收款 */
  money_collected: string;
  /** 未收款 */
  money_uncollected: string;
  /** 收款记录 */
  money_collect_record: string;
  /** 收款时间 */
  collect_time: string;
  /** 收款金额 */
  collect_money: string;
  /** 金额超出 */
  money_exceed: string;
  /** 添加收款 */
  add_collect: string;
  /** 合同已全额收款，是否将订单状态修改为已结清？ */
  conver_status_to_finish_tip: string;
  /** 该模块尚未上线，请等待 */
  receipt_module_not_online: string;
  /** 创建时间从近到远 */
  create_time_from_recent_to_far: string;
  /** 确认时间从近到远 */
  confirm_time_from_recent_to_far: string;
  /** 默认排序 */
  default_sort: string;
  /** 业主/客户 */
  yz: string;
  /** 电话（简称） */
  dh: string;
  /** 拨打电话 */
  call_phone: string;
  /** 旧版本 */
  old_version: string;
  /** 新版本 */
  new_version: string;
}

/**
 * 英文语言包数据
 * @constant
 */
declare const languagePackEnglish: I18nLanguagePack;

export default languagePackEnglish;