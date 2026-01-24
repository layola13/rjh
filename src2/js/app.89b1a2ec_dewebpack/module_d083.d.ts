/**
 * 国际化语言资源包 - 中文简体
 * 包含系统中所有界面文本的中文翻译
 */

/**
 * 通用操作相关的文本
 */
interface CommonActions {
  /** 新增 */
  add: string;
  /** 添加窗型 */
  addMobile: string;
  /** 添加订单 */
  add_order: string;
  /** 筛选 */
  filter: string;
  /** 关键字搜索 */
  search_keyword: string;
  /** 业务员 */
  ywy_name: string;
  /** 打印 */
  printing: string;
  /** 详情 */
  details: string;
  /** 编辑 */
  edit: string;
  /** 删除 */
  delete: string;
  /** 分享 */
  share: string;
  /** 链接 */
  link: string;
  /** 复制 */
  copy: string;
  /** 关闭 */
  close: string;
  /** 操作 */
  operation: string;
  /** 保存 */
  save: string;
  /** 确认 */
  confirm: string;
  /** 取消 */
  cancel: string;
  /** 返回 */
  back: string;
  /** 重置 */
  reset: string;
  /** 更新 */
  update: string;
  /** 管理 */
  manage: string;
  /** 下载 */
  download: string;
}

/**
 * 合同相关的文本
 */
interface ContractTexts {
  /** 合同详情 */
  contract_details: string;
  /** 合同号 */
  contract_no: string;
  /** 客户 */
  customer: string;
  /** 联系方式 */
  phone: string;
  /** 项目地址 */
  address: string;
  /** 合同状态 */
  contract_status: string;
  /** 合同类型 */
  contract_type: string;
  /** 阳光房 */
  sunnyhouse_contract: string;
  /** 门窗 */
  webcc_contract: string;
  /** 下单日期 */
  order_date: string;
  /** 添加合同 */
  add_contract: string;
  /** 修改合同 */
  edit_contract: string;
  /** 合同号，选填，可自动生成 */
  input_contract_no: string;
  /** 请输入合同号 */
  input_contract_no2: string;
  /** 请输入客户 */
  input_customer: string;
  /** 管理客户 */
  customer_manage: string;
  /** 请输入联系方式 */
  input_phone: string;
  /** 请输入项目地址 */
  input_address: string;
  /** 合同 */
  contract: string;
  /** 输入合同号、客户、地址搜索 */
  search_contract_tips: string;
  /** 无对应合同 */
  no_contract_found: string;
  /** 请选择合同 */
  contract_required: string;
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
  /** 返回合同详情页 */
  back_contract_details: string;
  /** 按合同内容 */
  by_contract: string;
}

/**
 * 订单相关的文本
 */
interface OrderTexts {
  /** 订单 */
  order: string;
  /** 设计订单 */
  design_order: string;
  /** 模板订单 */
  template_order: string;
  /** 添加收款 */
  add_collect: string;
  /** 新增模板单 */
  add_template_order: string;
  /** 已经是最后一条订单了 */
  last_order: string;
  /** 按订单内容 */
  by_order: string;
  /** 按下单日期 */
  by_order_date: string;
  /** 订单编号 */
  order_no: string;
  /** 更多 */
  order_operate: string;
  /** 全部订单 */
  all_orders: string;
  /** 意向订单 */
  intention_orders: string;
  /** 正式订单 */
  formal_orders: string;
  /** 转意向单 */
  to_intention_order: string;
  /** 转正式单 */
  to_formal_order: string;
  /** 确定要将该订单转换为意向订单吗？ */
  to_intention_des: string;
  /** 确定要将该订单转换为正式订单吗？ */
  to_formal_des: string;
}

/**
 * 报价相关的文本
 */
interface QuotationTexts {
  /** 查看报价 */
  view_quote: string;
  /** 报价信息 */
  quotation_information: string;
  /** 添加报价 */
  add_quote: string;
  /** 编辑报价 */
  edit_quote: string;
  /** 报价项 */
  quote_name: string;
  /** 单价 */
  price: string;
  /** 折扣 */
  discount: string;
  /** 请输入报价项名称 */
  input_quote_name: string;
  /** 基础价格 */
  base_price: string;
  /** 此项为订单金额之和，不可修改删除 */
  base_price_note: string;
  /** 请确认是否删除该报价！ */
  delete_quote_warning: string;
  /** 包含金额和报价 */
  include_money: string;
  /** 不包含金额和报价 */
  not_include_money: string;
  /** 设置折扣 */
  set_discount: string;
}

/**
 * 优化相关的文本
 */
interface OptimizationTexts {
  /** 算料 */
  calculation: string;
  /** 优化 */
  optimization: string;
  /** 优化列表 */
  optimization_list: string;
  /** 型材优化 */
  optimization_list_mobile: string;
  /** 加入优化 */
  add_optimization: string;
  /** 取消优化 */
  cancel_optimization: string;
  /** 去优化 */
  go_optimization: string;
  /** 请先添加需要优化的合同 */
  optimization_warning: string;
  /** 开始计算 */
  run: string;
  /** 切割方式 */
  cutting: string;
  /** 利用率 */
  utilization: string;
  /** 余料 */
  left_over: string;
  /** 基础型材配置 */
  basic_bars: string;
  /** 型材列表 */
  bars: string;
  /** 切割方案 */
  optimization_result: string;
  /** 正在计算，请耐心等待... */
  optimization_loading: string;
  /** 没有需要优化切割的型材 */
  optimization_warning2: string;
  /** 没有可打印的切割方案 */
  optimization_warning3: string;
  /** 已优化 */
  optimized: string;
  /** 优化设置 */
  optimize_config: string;
  /** 多个支长用英文逗号隔开 */
  length_tip: string;
  /** 默认优化支长 */
  bar_length: string;
  /** 型材切割料头 */
  side_waste: string;
  /** 型材切割锯口 */
  cut_waste: string;
  /** 余料设置 */
  surplusSetting: string;
}

/**
 * 数量和计量单位相关的文本
 */
interface MeasurementTexts {
  /** 樘 */
  pcs: string;
  /** 总 */
  total: string;
  /** 共计 */
  total1: string;
  /** 樘数 */
  count: string;
  /** 数量 */
  count2: string;
  /** 长度 */
  length: string;
  /** 面积 */
  area: string;
  /** 金额 */
  money: string;
  /** 总重量 */
  total_weight: string;
}

/**
 * 日期和时间相关的文本
 */
interface DateTimeTexts {
  /** 日期 */
  date: string;
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
  /** 选择有效时间 */
  choose_expire_time: string;
  /** 小时 */
  hours: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
  /** 修改时间 */
  edit_time: string;
  /** 收款时间 */
  collect_time: string;
  /** 创建时间从近到远 */
  create_time_from_recent_to_far: string;
  /** 确认时间从近到远 */
  confirm_time_from_recent_to_far: string;
}

/**
 * 状态和提示信息相关的文本
 */
interface StatusTexts {
  /** 已付 */
  paid: string;
  /** 暂无数据 */
  no_data: string;
  /** 加载中，请稍后 */
  loading_wait: string;
  /** 备注 */
  note: string;
  /** 请输入备注 */
  input_note: string;
  /** 推送 */
  push: string;
  /** 无效数字 */
  invalid_number: string;
  /** 未找到对应系列 */
  no_product_found: string;
  /** 确认状态 */
  customer_confirmed: string;
  /** 全部 */
  all: string;
  /** 未确认 */
  not_confirm: string;
  /** 已确认 */
  confirmed: string;
  /** 提示 */
  warning: string;
}

/**
 * 设计和模板相关的文本
 */
interface DesignTexts {
  /** 设计 */
  design: string;
  /** 模板 */
  template: string;
  /** 五金 */
  hardware: string;
  /** 洞口 */
  opening: string;
  /** 系列 */
  product_name: string;
  /** 更换系列 */
  change_product: string;
  /** 3D模式 */
  "3d_mode": string;
  /** 修改前原图 */
  original_image: string;
}

/**
 * 分享和二维码相关的文本
 */
interface ShareTexts {
  /** 扫码注册体验自造窗 */
  share_code_text: string;
  /** 分享至微信小程序 */
  share_to_mp_weixin: string;
  /** 二维码 */
  qrCode: string;
}

/**
 * 账号和权限相关的文本
 */
interface AccountTexts {
  /** 按创建账号 */
  by_creator: string;
  /** 创建者 */
  creator: string;
  /** 主账号 */
  main_account: string;
  /** 确认 */
  sub_account_confirm: string;
  /** 取消确认 */
  sub_account_confirm_cancel: string;
  /** 修改人 */
  editor: string;
}

/**
 * 图片导航相关的文本
 */
interface NavigationTexts {
  /** 排序 */
  sort: string;
  /** 上图 */
  prev: string;
  /** 下图 */
  next: string;
  /** 多选 */
  multipleChoice: string;
  /** 克隆至 */
  clone_to: string;
  /** 更换至 */
  change_to: string;
  /** 默认排序 */
  default_sort: string;
}

/**
 * 签名确认相关的文本
 */
interface SignatureTexts {
  /** 确认签名 */
  confirm_signature: string;
  /** 确认要重新签名确认吗? */
  resign_message: string;
  /** 确认签名?一经确认无法更改。 */
  resign_confirm_message: string;
  /** 重新确认 */
  reconfirm: string;
  /** 清除 */
  clean: string;
}

/**
 * 合同状态别名
 */
interface ContractStatusAliases {
  /** 意向单 */
  意向单: string;
  /** 合同单 */
  合同单: string;
  /** 生产单 */
  生产单: string;
  /** 已完工 */
  已完工: string;
  /** 已发货 */
  已发货: string;
  /** 已结清 */
  已结清: string;
}

/**
 * 财务相关的文本
 */
interface FinanceTexts {
  /** 尾款 */
  final_money: string;
  /** 已收款 */
  money_collected: string;
  /** 尾款 */
  money_uncollected: string;
  /** 收款记录 */
  money_collect_record: string;
  /** 收款 */
  collect_money: string;
  /** 超过上限 */
  money_exceed: string;
  /** 该合同已完成全部付款，是否将订单状态修改为已结清？ */
  conver_status_to_finish_tip: string;
  /** 模块正在开发中，敬请期待 */
  receipt_module_not_online: string;
}

/**
 * 工厂和推送相关的文本
 */
interface FactoryTexts {
  /** 账号尚未绑定任何工厂，请先绑定! */
  lack_company: string;
  /** 请选择一个厂家推送 */
  lack_company_message: string;
  /** 推送至cc */
  push_to_cc: string;
}

/**
 * 设置相关的文本
 */
interface SettingsTexts {
  /** 统计 */
  statstics: string;
  /** 最小面积设置 */
  min_area_setting: string;
  /** 默认单价设置 */
  default_price_setting: string;
  /** 默认位置设置 */
  default_position_setting: string;
}

/**
 * 颜色和材质相关的文本
 */
interface ColorMaterialTexts {
  /** 颜色 */
  pure_color_add_title: string;
  /** 颜色名称 */
  pure_color_add_form: string;
  /** 输入颜色名称 */
  pure_color_add_form_des: string;
  /** 纹理 */
  material_color_add_title: string;
  /** 纹理名称 */
  material_color_add_form: string;
  /** 输入纹理名称 */
  material_color_add_form_des: string;
  /** 上传纹理 */
  material_color_upload_form: string;
  /** 建议尺寸大小为400*400, 不超过1M */
  material_color_upload_form_des: string;
  /** 请填写名称 */
  name_required: string;
  /** 请上传材质图片 */
  pic_required: string;
}

/**
 * 客户信息相关的文本
 */
interface CustomerTexts {
  /** 未填写客户相关信息 */
  no_customer_info: string;
  /** 业主 */
  yz: string;
  /** 电话 */
  dh: string;
  /** 一键拨打 */
  call_phone: string;
}

/**
 * 版本相关的文本
 */
interface VersionTexts {
  /** 旧报表库 */
  old_version: string;
  /** 新报表库 */
  new_version: string;
}

/**
 * 完整的语言资源包类型定义
 */
type LanguageResource = CommonActions &
  ContractTexts &
  OrderTexts &
  QuotationTexts &
  OptimizationTexts &
  MeasurementTexts &
  DateTimeTexts &
  StatusTexts &
  DesignTexts &
  ShareTexts &
  AccountTexts &
  NavigationTexts &
  SignatureTexts &
  ContractStatusAliases &
  FinanceTexts &
  FactoryTexts &
  SettingsTexts &
  ColorMaterialTexts &
  CustomerTexts &
  VersionTexts;

/**
 * 中文简体语言包
 */
declare const zhCNLanguageResource: LanguageResource;

export default zhCNLanguageResource;