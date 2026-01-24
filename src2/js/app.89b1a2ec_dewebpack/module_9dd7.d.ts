/**
 * 国际化资源类型定义
 * 用于窗型设计系统的多语言支持
 */

/**
 * 操作按钮和菜单项的文本标签
 */
interface Operations {
  /** 画图设置 */
  drawingSettings: string;
  /** 型材 */
  profile: string;
  /** 画图 */
  draw: string;
  /** 测试公式 */
  test: string;
  /** 撤销 */
  undo: string;
  /** 恢复 */
  redo: string;
  /** 删除 */
  remove: string;
  /** 清除 */
  clear: string;
  /** 导入图库 */
  importWindoor: string;
  /** 导入窗型 */
  importJson: string;
  /** 添加变量 */
  addVariable: string;
  /** 排序 */
  sort: string;
  /** 完成 */
  complete: string;
  /** 取消 */
  cancel: string;
  /** 新增条件 */
  addCondition: string;
  /** 编辑 */
  edit: string;
  /** 克隆 */
  clone: string;
  /** 删除 */
  delete: string;
  /** 添加 */
  add: string;
  /** 类排序 */
  groupSort: string;
  /** 添加材料自动报价 */
  addAutomatic: string;
  /** 取消材料自动报价 */
  cancelAutomatic: string;
  /** 添加材料自动成本 */
  addAutomaticCost: string;
  /** 取消材料自动成本 */
  cancelAutomaticCost: string;
  /** 平开系列 */
  sash_series: string;
  /** 导入excel */
  import_excel: string;
  /** 下载模板 */
  download_template: string;
  /** 修改参数 */
  changeParams: string;
  /** 立即体验 */
  try_now: string;
  /** 生成公式 */
  generate_formula: string;
  /** 选择方式 */
  choose_way: string;
  /** 打印排序 */
  print_sort: string;
  /** 从文件导入 */
  from_file: string;
}

/**
 * 表单标签和UI文本
 */
interface Label {
  /** 型材尺寸 */
  profileSize: string;
  /** 更多 */
  more: string;
  /** 默认 */
  default: string;
  /** 外框 */
  frame: string;
  /** 中梃 */
  mullion: string;
  /** 玻扇 */
  sash: string;
  /** 纱扇 */
  screen: string;
  /** 压线 */
  bead: string;
  /** 端铣量 */
  millingFrame: string;
  /** 玻璃安装缝隙 */
  glassGap: string;
  /** 扇中梃 */
  sashMullion: string;
  /** 防盗框 */
  antiTheft: string;
  /** 防盗杆 */
  antiTheftMullion: string;
  /** 中腰尺寸 */
  kfcWaist: string;
  /** 扇上方 */
  upSash: string;
  /** 扇下方 */
  downSash: string;
  /** 勾企 */
  interlock: string;
  /** 转角 */
  cornerJoiner: string;
  /** 连接件 */
  connector: string;
  /** 中梃大面 */
  frameMullionLg: string;
  /** 型材 */
  profile: string;
  /** 玻璃 */
  glass: string;
  /** 配件 */
  addon: string;
  /** 扇尺寸 */
  size: string;
  /** 计算结果 */
  calculationResult: string;
  /** 自定义变量 */
  customVariable: string;
  /** 系统可用变量 */
  availableVariables: string;
  /** 名称 */
  name: string;
  /** 条件 */
  condition: string;
  /** 值 */
  value: string;
  /** 参与优化 */
  isOptimize: string;
  /** 生效 */
  effective: string;
  /** 不生效 */
  inEffective: string;
  /** 类型 */
  material: string;
  /** 计算结果面积用于订单显示面积 */
  min_area_extra: string;
  /** 用于订单信息 */
  min_area_extra_notice: string;
  /** 选择 */
  choose: string;
  /** 输入 */
  input: string;
  /** 且 */
  and: string;
  /** 或 */
  or: string;
  /** 扇结果 */
  sash_result: string;
  /** 外色单价 */
  our_color_price: string;
  /** 内色单价 */
  in_color_price: string;
  /** 玻璃单价 */
  guigelabel_price: string;
  /** 纱网单价 */
  net_price: string;
  /** 五金单价 */
  product_name_price: string;
  /** 外框单价 */
  frame_price: string;
  /** 中梃单价 */
  mullion_price: string;
  /** 开扇单价 */
  sash_price: string;
  /** 边框 */
  边框: string;
  /** 中梃 */
  中梃: string;
  /** 端铣 */
  端铣: string;
  /** 玻璃安装缝隙 */
  玻璃安装缝隙: string;
  /** 扇搭接量 */
  扇搭接量: string;
  /** 扇玻扣减量 */
  扇玻扣减量: string;
  /** 压线 */
  压线: string;
  /** 加强中梃 */
  reinforcedFrameMullion: string;
  /** 参数设置 */
  parameter_setting: string;
  /** 选择推拉方式 */
  choose_slide_way: string;
  /** cc- */
  'cc-': string;
  /** cc+ */
  'cc+': string;
  /** 空 */
  空: string;
  /** 总金额 */
  total_money: string;
  /** 总成本 */
  total_cost: string;
  /** 元 */
  yuan: string;
  /** 产品详情 */
  product_detail: string;
  /** 标准配置 */
  standard_configuration: string;
  /** 铝材 */
  aluminum: string;
  /** 五金系统 */
  hardware_system: string;
  /** 胶条 */
  adhesive_strip: string;
  /** 隔热条 */
  insulation_strip: string;
  /** 型材腔体 */
  profile_cavity: string;
  /** 工艺细节 */
  process_details: string;
  /** 组角工艺 */
  group_corner_process: string;
  /** 窗扇倒角 */
  sash_chamfer: string;
  /** 售后 */
  after_sales: string;
  /** 品质保障 */
  quality_assurance: string;
  /** 门窗性能 */
  performance: string;
  /** 隔音性 */
  sound_insulation: string;
  /** 默认系统自动计算 */
  quote_count_tip: string;
}

/**
 * 表格列标题
 */
interface Table {
  /** 型材结果 */
  profileResult: string;
  /** 编号 */
  code: string;
  /** 名称 */
  name: string;
  /** 类型 */
  type: string;
  /** 切角 */
  cutAngle: string;
  /** 颜色 */
  color: string;
  /** 计算结果 */
  calculationResult: string;
  /** 玻璃结果 */
  glassResult: string;
  /** 规格 */
  specs: string;
  /** 配件结果 */
  addonResult: string;
  /** 报价清单 */
  quoteResult: string;
  /** 计费项目 */
  item: string;
  /** 单价 */
  price: string;
  /** 计算方式 */
  matchTarget: string;
  /** 计价方式 */
  asQuantity: string;
  /** 应用范围 */
  matchType: string;
  /** 最小面积 */
  minSize: string;
  /** 最小长度 */
  minLength: string;
  /** 最小面积/长度 */
  minSizeAndLength: string;
  /** 备注 */
  note: string;
  /** 按数量 */
  quantity: string;
  /** 按尺寸 */
  area: string;
  /** 条件 */
  condition: string;
  /** 值 */
  value: string;
  /** 操作 */
  operation: string;
  /** 辅料 */
  auxibar: string;
  /** 优化 */
  isOptimize: string;
  /** 位置 */
  posType: string;
  /** 方位 */
  sizeType: string;
  /** 边位 */
  sidePosition: string;
  /** 长度 */
  length: string;
  /** 数量 */
  count: string;
  /** 米重 */
  meterWeight: string;
  /** 有效条件 */
  condition2: string;
  /** 开启方式 */
  sashAssignWay: string;
  /** 扇号 */
  sashNum: string;
  /** 扇号\n轨道 */
  sashNumTrackIndex: string;
  /** 轨道号 */
  trackIndex: string;
  /** 折叠方式 */
  sashAssignWay2: string;
  /** 宽度/高度 */
  length2: string;
  /** 开启方向 */
  sashAssignWay3: string;
  /** 推拉方式 */
  sashAssignWay4: string;
  /** 成本项目 */
  name2: string;
  /** 单位 */
  unit: string;
  /** 成本核算 */
  costResult: string;
  /** 面重 */
  squareMeterWeight: string;
  /** 计算长度 */
  calcLength: string;
  /** 计算数量 */
  calcCount: string;
  /** 成本 */
  cost: string;
  /** 报价 */
  quote: string;
  /** 自动报价项 */
  material_automatic: string;
  /** 自动识别 */
  auto_distinguished: string;
  /** 自动成本项 */
  material_automatic_cost: string;
  /** 开启方式 */
  sash_assign_way1: string;
  /** 推拉方式 */
  sash_assign_way2: string;
  /** 折叠方式 */
  sash_assign_way3: string;
  /** 提示内容 */
  error_message: string;
  /** 作用 */
  effect: string;
  /** 阻止保存 */
  prevent_save: string;
  /** 仅提示 */
  hint_only: string;
  /** 利润 */
  mark_up: string;
  /** 折扣 */
  discount: string;
  /** 基础价格 */
  basic_money: string;
}

/**
 * 选项卡标题
 */
interface Tabs {
  /** 外框公式 */
  bar: string;
  /** 内扇公式 */
  sash: string;
  /** 对开扇公式 */
  doubleSash: string;
  /** 推拉扇公式 */
  slideSash: string;
  /** 折叠扇公式 */
  foldSash: string;
  /** 产品报价 */
  quote: string;
  /** 成本核算 */
  cost: string;
  /** 更多设置 */
  more: string;
  /** 设计规则 */
  rule: string;
  /** 玻璃公式 */
  glass: string;
  /** 扇玻公式 */
  sashGlass: string;
}

/**
 * 提示和帮助信息
 */
interface Message {
  /** 请选择型材编号 */
  enter_bom_code: string;
  /** 请输入颜色 */
  enter_color: string;
  /** 请输入成本 */
  enter_cost: string;
  /** 请输入报价 */
  enter_quote: string;
  /** 请选择类型 */
  enter_material: string;
  /** 请输入减尺 */
  enter_reduction: string;
  /** 输入计算公式 */
  enter_formula: string;
  /** cc为玻扇的宽度/高度 */
  sash_detail: string;
  /** cc为纱扇的宽度/高度 */
  screen_detail: string;
  /** cc为标线尺寸 */
  dim_detail: string;
  /** cc为防盗框的高度/宽度 */
  antiTheft_detail: string;
  /** cc为标线尺寸 */
  profile_default_detail: string;
  /** cc为对开扇整体的宽度/高度，c为扇数 */
  doubleSash_detail: string;
  /** cc为推拉扇整体的宽度/高度，a为重叠位数量，b为对碰位数量，c为扇数 */
  slideSash_detail1: string;
  /** cc为推拉扇整体的高度，a为重叠位数量，b为对碰位数量，c为扇数 */
  slideSash_detail2: string;
  /** cc为推拉扇整体的宽度，a为重叠位数量，b为对碰位数量，c为扇数 */
  slideSash_detail3: string;
  /** cc为折叠扇整体的宽度/高度，c为扇数 */
  foldSash_detail: string;
  /** a为合页位数量，b为对碰位数量，d为边框开合位数量 */
  foldSash_detail2: string;
  /** 确定要删除选中的吗 */
  confirm_delete: string;
  /** 输入型材小面宽度，自动生成公式。计算任意窗型的型材和玻璃用量清单 */
  parameter_setting_des: string;
  /** 不选择表示适用于所有推拉扇 */
  sashAssignWay_detail: string;
}

/**
 * 下拉选择器选项
 */
interface Select {
  /** 型材 */
  profile: string;
  /** 五金 */
  hardware: string;
  /** 玻璃 */
  glass: string;
  /** 配件 */
  addon: string;
  /** 平开扇 */
  sash: string;
}

/**
 * 国际化资源根对象
 */
export interface I18nLocale {
  /** 操作相关文本 */
  operations: Operations;
  /** 标签相关文本 */
  label: Label;
  /** 表格相关文本 */
  table: Table;
  /** 选项卡相关文本 */
  tabs: Tabs;
  /** 提示消息相关文本 */
  message: Message;
  /** 选择器选项相关文本 */
  select: Select;
}

/**
 * 导出国际化资源对象
 */
declare const locale: I18nLocale;
export default locale;