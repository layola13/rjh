/**
 * 越南语言包类型定义
 * Vietnamese language localization definitions
 */

/**
 * 操作相关的文本定义
 * Operation-related text definitions
 */
interface Operations {
  /** 绘图设置 - Drawing settings */
  drawingSettings: string;
  /** 门窗系统配置文件 - Window/door profile system */
  profile: string;
  /** 绘制 - Draw */
  draw: string;
  /** 测试 - Test */
  test: string;
  /** 撤销 - Undo */
  undo: string;
  /** 重做 - Redo */
  redo: string;
  /** 删除对象 - Remove object */
  remove: string;
  /** 清除所有 - Clear all */
  clear: string;
  /** 从库导入门窗 - Import from library */
  importWindoor: string;
  /** 外部导入JSON - Import external JSON */
  importJson: string;
  /** 添加变量 - Add variable */
  addVariable: string;
  /** 排序 - Sort */
  sort: string;
  /** 完成 - Complete */
  complete: string;
  /** 取消 - Cancel */
  cancel: string;
  /** 添加条件 - Add condition */
  addCondition: string;
  /** 编辑 - Edit */
  edit: string;
  /** 克隆/复制 - Clone */
  clone: string;
  /** 删除 - Delete */
  delete: string;
  /** 添加 - Add */
  add: string;
  /** 分组排序 - Group sort */
  groupSort: string;
  /** 添加自动化 - Add automatic */
  addAutomatic: string;
  /** 取消自动化 - Cancel automatic */
  cancelAutomatic: string;
  /** 添加自动成本 - Add automatic cost */
  addAutomaticCost: string;
  /** 取消自动成本 - Cancel automatic cost */
  cancelAutomaticCost: string;
  /** 扇系列声明 - Sash series declaration */
  sash_series: string;
  /** 导入Excel - Import Excel */
  import_excel: string;
  /** 下载模板 - Download template */
  download_template: string;
  /** 更改参数 - Change parameters */
  changeParams: string;
  /** 立即尝试 - Try now */
  try_now: string;
  /** 生成公式 - Generate formula */
  generate_formula: string;
  /** 选择方式 - Choose way */
  choose_way: string;
  /** 打印排序 - Print sort */
  print_sort: string;
  /** 从文件导入 - Import from file */
  from_file: string;
}

/**
 * 标签文本定义
 * Label text definitions
 */
interface Label {
  /** 型材尺寸 - Profile size */
  profileSize: string;
  /** 更多参数 - More parameters */
  more: string;
  /** 默认值 - Default */
  default: string;
  /** 框架 - Frame */
  frame: string;
  /** 中挺/横梁 - Mullion (vertical/horizontal divider) */
  mullion: string;
  /** 窗扇 - Sash */
  sash: string;
  /** 纱窗/防蚊网 - Screen (mosquito net) */
  screen: string;
  /** 压条 - Bead */
  bead: string;
  /** 铣削框架 - Milling frame */
  millingFrame: string;
  /** 玻璃间隙 - Glass gap */
  glassGap: string;
  /** 扇中挺 - Sash mullion */
  sashMullion: string;
  /** 防盗框 - Anti-theft frame */
  antiTheft: string;
  /** 防盗中挺 - Anti-theft mullion */
  antiTheftMullion: string;
  /** KFC腰线 - KFC waist */
  kfcWaist: string;
  /** 上扇企口 - Upper sash tenon */
  upSash: string;
  /** 下扇企口 - Lower sash tenon */
  downSash: string;
  /** 互锁 - Interlock */
  interlock: string;
  /** 角连接件 - Corner joiner */
  cornerJoiner: string;
  /** 框连接件 - Frame connector */
  connector: string;
  /** 框中挺长度 - Frame mullion length */
  frameMullionLg: string;
  /** 型材系统 - Profile system */
  profile: string;
  /** 玻璃 - Glass */
  glass: string;
  /** 附加项 - Addon */
  addon: string;
  /** 尺寸 - Size */
  size: string;
  /** 计算结果 - Calculation result */
  calculationResult: string;
  /** 自定义变量 - Custom variable */
  customVariable: string;
  /** 可用变量 - Available variables */
  availableVariables: string;
  /** 名称 - Name */
  name: string;
  /** 条件 - Condition */
  condition: string;
  /** 值 - Value */
  value: string;
  /** 是否优化 - Is optimize */
  isOptimize: string;
  /** 有效 - Effective */
  effective: string;
  /** 无效 - Ineffective */
  inEffective: string;
  /** 材料 - Material */
  material: string;
  /** 最小面积附加说明 - Minimum area extra notice */
  min_area_extra: string;
  /** 在订单中使用 - Used in order notice */
  min_area_extra_notice: string;
  /** 选择 - Choose */
  choose: string;
  /** 输入 - Input */
  input: string;
  /** 与 - And */
  and: string;
  /** 或 - Or */
  or: string;
  /** 扇结果 - Sash result */
  sash_result: string;
  /** 外层颜色价格 - Outer color price */
  our_color_price: string;
  /** 内层颜色价格 - Inner color price */
  in_color_price: string;
  /** 格栅标签价格 - Grille label price */
  guigelabel_price: string;
  /** 净价 - Net price */
  net_price: string;
  /** 产品名称价格 - Product name price */
  product_name_price: string;
  /** 边框 - Frame (Chinese) */
  边框: string;
  /** 中梃 - Mullion (Chinese) */
  中梃: string;
  /** 端铣 - End milling (Chinese) */
  端铣: string;
  /** 玻璃安装缝隙 - Glass installation gap (Chinese) */
  玻璃安装缝隙: string;
  /** 扇搭接量 - Sash overlap (Chinese) */
  扇搭接量: string;
  /** 扇玻扣减量 - Sash glass deduction (Chinese) */
  扇玻扣减量: string;
  /** 压线 - Bead (Chinese) */
  压线: string;
  /** 加固框中挺 - Reinforced frame mullion */
  reinforcedFrameMullion: string;
  /** 参数设置 - Parameter setting */
  parameter_setting: string;
  /** 选择滑动方式 - Choose slide way */
  choose_slide_way: string;
  /** CC减 - CC minus */
  "cc-": string;
  /** CC加 - CC plus */
  "cc+": string;
  /** 空 - Empty */
  空: string;
  /** 总金额 - Total money */
  total_money: string;
  /** 总成本 - Total cost */
  total_cost: string;
  /** 元(货币单位) - Yuan (currency unit) */
  yuan: string;
  /** 产品详情 - Product detail */
  product_detail: string;
  /** 标准配置 - Standard configuration */
  standard_configuration: string;
  /** 铝材 - Aluminum */
  aluminum: string;
  /** 五金系统 - Hardware system */
  hardware_system: string;
  /** 胶条 - Adhesive strip */
  adhesive_strip: string;
  /** 隔热条 - Insulation strip */
  insulation_strip: string;
  /** 型材腔体 - Profile cavity */
  profile_cavity: string;
  /** 工艺详情 - Process details */
  process_details: string;
  /** 组角工艺 - Group corner process */
  group_corner_process: string;
  /** 扇倒角 - Sash chamfer */
  sash_chamfer: string;
  /** 售后 - After sales */
  after_sales: string;
  /** 质量保证 - Quality assurance */
  quality_assurance: string;
  /** 性能 - Performance */
  performance: string;
  /** 隔音 - Sound insulation */
  sound_insulation: string;
  /** 报价计数提示 - Quote count tip */
  quote_count_tip: string;
}

/**
 * 表格列定义
 * Table column definitions
 */
interface Table {
  /** 型材结果 - Profile result */
  profileResult: string;
  /** 代码 - Code */
  code: string;
  /** 名称 - Name */
  name: string;
  /** 类型 - Type */
  type: string;
  /** 切割角度 - Cut angle */
  cutAngle: string;
  /** 颜色 - Color */
  color: string;
  /** 计算结果 - Calculation result */
  calculationResult: string;
  /** 玻璃结果 - Glass result */
  glassResult: string;
  /** 规格 - Specs */
  specs: string;
  /** 附加项结果 - Addon result */
  addonResult: string;
  /** 报价结果 - Quote result */
  quoteResult: string;
  /** 项目 - Item */
  item: string;
  /** 价格 - Price */
  price: string;
  /** 匹配目标 - Match target */
  matchTarget: string;
  /** 作为数量 - As quantity */
  asQuantity: string;
  /** 匹配类型 - Match type */
  matchType: string;
  /** 最小尺寸 - Minimum size */
  minSize: string;
  /** 最小长度 - Minimum length */
  minLength: string;
  /** 最小尺寸/长度 - Minimum size/length */
  minSizeAndLength: string;
  /** 备注 - Note */
  note: string;
  /** 数量 - Quantity */
  quantity: string;
  /** 面积 - Area */
  area: string;
  /** 条件 - Condition */
  condition: string;
  /** 值 - Value */
  value: string;
  /** 操作 - Operation */
  operation: string;
  /** 辅助条 - Auxiliary bar */
  auxibar: string;
  /** 是否优化 - Is optimize */
  isOptimize: string;
  /** 位置类型 - Position type */
  posType: string;
  /** 尺寸类型 - Size type */
  sizeType: string;
  /** 侧面位置 - Side position */
  sidePosition: string;
  /** 长度 - Length */
  length: string;
  /** 数量 - Count */
  count: string;
  /** 米重 - Meter weight */
  meterWeight: string;
  /** 条件2 - Condition (alternative) */
  condition2: string;
  /** 扇分配方式 - Sash assign way */
  sashAssignWay: string;
  /** 扇编号 - Sash number */
  sashNum: string;
  /** 扇编号轨道索引 - Sash number track index */
  sashNumTrackIndex: string;
  /** 轨道索引 - Track index */
  trackIndex: string;
  /** 扇分配方式2 - Sash assign way (alternative 2) */
  sashAssignWay2: string;
  /** 宽度/高度 - Width/Height */
  length2: string;
  /** 扇分配方式3 - Sash assign way (alternative 3) */
  sashAssignWay3: string;
  /** 扇分配方式4 - Sash assign way (alternative 4) */
  sashAssignWay4: string;
  /** 名称2 - Name (alternative) */
  name2: string;
  /** 单位 - Unit */
  unit: string;
  /** 成本结果 - Cost result */
  costResult: string;
  /** 平方米重量 - Square meter weight */
  squareMeterWeight: string;
  /** 计算长度 - Calculated length */
  calcLength: string;
  /** 计算数量 - Calculated count */
  calcCount: string;
  /** 成本 - Cost */
  cost: string;
  /** 报价 - Quote */
  quote: string;
  /** 材料自动化 - Material automatic */
  material_automatic: string;
  /** 自动区分 - Auto distinguished */
  auto_distinguished: string;
  /** 材料自动成本 - Material automatic cost */
  material_automatic_cost: string;
  /** 扇分配方式1 - Sash assign way 1 */
  sash_assign_way1: string;
  /** 扇分配方式2 - Sash assign way 2 */
  sash_assign_way2: string;
  /** 扇分配方式3 - Sash assign way 3 */
  sash_assign_way3: string;
  /** 错误信息 - Error message */
  error_message: string;
  /** 效果 - Effect */
  effect: string;
  /** 阻止保存 - Prevent save */
  prevent_save: string;
  /** 仅提示 - Hint only */
  hint_only: string;
  /** 加价 - Mark up */
  mark_up: string;
  /** 折扣 - Discount */
  discount: string;
  /** 基础金额 - Basic money */
  basic_money: string;
}

/**
 * 选项卡标题定义
 * Tab title definitions
 */
interface Tabs {
  /** 型材条 - Bar */
  bar: string;
  /** 单开扇 - Single sash */
  sash: string;
  /** 双开扇 - Double sash */
  doubleSash: string;
  /** 推拉扇 - Slide sash */
  slideSash: string;
  /** 折叠扇 - Fold sash */
  foldSash: string;
  /** 报价 - Quote */
  quote: string;
  /** 成本 - Cost */
  cost: string;
  /** 更多设置 - More settings */
  more: string;
  /** 设计规则 - Design rule */
  rule: string;
  /** 玻璃 - Glass */
  glass: string;
  /** 扇玻璃 - Sash glass */
  sashGlass: string;
}

/**
 * 消息提示文本定义
 * Message prompt text definitions
 */
interface Message {
  /** 请选择BOM代码 - Please choose BOM code */
  enter_bom_code: string;
  /** 请输入颜色 - Please enter color */
  enter_color: string;
  /** 请输入成本 - Please enter cost */
  enter_cost: string;
  /** 请输入报价 - Please enter quote */
  enter_quote: string;
  /** 请选择材料 - Please choose material */
  enter_material: string;
  /** 请输入长度 - Please enter length */
  enter_reduction: string;
  /** 请输入公式 - Please enter formula */
  enter_formula: string;
  /** 扇详情说明(cc等于扇宽/高) - Sash detail (cc equals sash width/height) */
  sash_detail: string;
  /** 纱窗详情说明 - Screen detail */
  screen_detail: string;
  /** 尺寸详情说明 - Dimension detail */
  dim_detail: string;
  /** 防盗窗详情说明 - Anti-theft detail */
  antiTheft_detail: string;
  /** 型材默认详情说明 - Profile default detail */
  profile_default_detail: string;
  /** 双开扇详情说明 - Double sash detail */
  doubleSash_detail: string;
  /** 推拉扇详情说明1 - Slide sash detail 1 */
  slideSash_detail1: string;
  /** 推拉扇详情说明2(高度) - Slide sash detail 2 (height) */
  slideSash_detail2: string;
  /** 推拉扇详情说明3(宽度) - Slide sash detail 3 (width) */
  slideSash_detail3: string;
  /** 折叠扇详情说明 - Fold sash detail */
  foldSash_detail: string;
  /** 折叠扇详情说明2(铰链/碰撞/开闭位置) - Fold sash detail 2 (hinge/collision/frame positions) */
  foldSash_detail2: string;
  /** 确认删除提示 - Confirm delete */
  confirm_delete: string;
  /** 参数设置说明 - Parameter setting description */
  parameter_setting_des: string;
  /** 扇分配方式说明 - Sash assign way detail */
  sashAssignWay_detail: string;
}

/**
 * 选择器选项定义
 * Selector option definitions
 */
interface Select {
  /** 型材系统 - Profile */
  profile: string;
  /** 五金配件 - Hardware */
  hardware: string;
  /** 玻璃 - Glass */
  glass: string;
  /** 附加项 - Addon */
  addon: string;
  /** 窗扇 - Sash */
  sash: string;
}

/**
 * 越南语言包根结构
 * Vietnamese language package root structure
 */
interface VietnameseLocale {
  /** 操作相关文本 - Operation texts */
  operations: Operations;
  /** 标签文本 - Label texts */
  label: Label;
  /** 表格列文本 - Table column texts */
  table: Table;
  /** 选项卡标题 - Tab titles */
  tabs: Tabs;
  /** 消息提示文本 - Message texts */
  message: Message;
  /** 选择器选项 - Selector options */
  select: Select;
}

/**
 * 导出越南语语言包
 * Export Vietnamese language localization
 */
declare const vietnameseLocale: VietnameseLocale;

export default vietnameseLocale;
export type {
  VietnameseLocale,
  Operations,
  Label,
  Table,
  Tabs,
  Message,
  Select
};