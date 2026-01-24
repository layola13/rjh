/**
 * 国际化文本资源类型定义
 * 用于窗型管理系统的多语言支持
 */
interface I18nTextResources {
  /** 新增目录 */
  newContents: string;
  
  /** 完成/退出编辑模式 */
  exitEditing: string;
  
  /** 分享功能 */
  share: string;
  
  /** 编辑功能 */
  edit: string;
  
  /** 公式 */
  script: string;
  
  /** 新增窗型 */
  newWindow: string;
  
  /** 窗型编号 */
  typeNumber: string;
  
  /** 窗型名称 */
  typeName: string;
  
  /** 删除操作 */
  delete: string;
  
  /** 提示：该系列暂无窗型，请先新增 */
  Tips: string;
  
  /** 请选择目录等级 */
  catalog: string;
  
  /** 一级目录 */
  catalog1: string;
  
  /** 二级目录 */
  catalog2: string;
  
  /** 请选择上级目录 */
  Above: string;
  
  /** 目录名 */
  directoryName: string;
  
  /** 新增目录操作 */
  add_directory: string;
  
  /** 编辑目录操作 */
  edit_directory: string;
  
  /** 备注 */
  remarks: string;
  
  /** 窗型目录 */
  windowCatalog: string;
  
  /** 保存标线 */
  save_marking: string;
  
  /** 测试公式 */
  test_script: string;
  
  /** 添加 */
  add: string;
  
  /** 克隆 */
  clone: string;
  
  /** 全选 */
  select_all: string;
  
  /** 全不选 */
  not_at_all: string;
  
  /** 输入 */
  input: string;
  
  /** 编号 */
  code: string;
  
  /** 名称 */
  name: string;
  
  /** 颜色 */
  color: string;
  
  /** 长度 */
  length: string;
  
  /** 数量 */
  count: string;
  
  /** 切角1 */
  angle_one: string;
  
  /** 切角2 */
  angle_two: string;
  
  /** 材料清单 */
  material_list: string;
  
  /** 型材清单 */
  profile_list: string;
  
  /** 玻璃清单 */
  glass_list: string;
  
  /** 配件清单 */
  addon_list: string;
  
  /** 成本清单 */
  cost_list: string;
  
  /** 订单日志 */
  order_log: string;
  
  /** 切角 */
  angle: string;
  
  /** 有效条件 */
  condition: string;
  
  /** 备注 */
  note: string;
  
  /** 计算结果 */
  result: string;
  
  /** 规格 */
  specs: string;
  
  /** 高度 */
  height: string;
  
  /** 宽度 */
  width: string;
  
  /** 成本公式 */
  cost: string;
  
  /** 成本 */
  costing: string;
  
  /** 公式 */
  cost1: string;
  
  /** 型材公式 */
  bar: string;
  
  /** 型材 */
  bar1: string;
  
  /** 玻璃公式 */
  glass: string;
  
  /** 玻璃 */
  glass1: string;
  
  /** 配件公式 */
  addon: string;
  
  /** 配件 */
  addon1: string;
  
  /** 窗型图库 */
  window_library: string;
  
  /** 产品管理 */
  product_management: string;
  
  /** 警告文本：请选择要 */
  warning1: string;
  
  /** 警告文本：的 */
  warning2: string;
  
  /** 警告文本：默认 */
  warning3: string;
  
  /** 警告文本：选择的第一条 */
  warning4: string;
  
  /** 警告文本：请选择要删除的 */
  warning5: string;
  
  /** 新增系列 */
  add_series: string;
  
  /** 编辑系列 */
  edit_series: string;
  
  /** 新增公式 */
  add_script: string;
  
  /** 返回上一级 */
  go_back: string;
  
  /** 暂无系列 */
  no_series: string;
  
  /** 暂无图片 */
  no_pictures: string;
  
  /** 暂无公式 */
  no_script: string;
  
  /** 查看公式 */
  intelligence_script: string;
  
  /** 模板公式 */
  template_script: string;
  
  /** 分享公式 */
  share_product: string;
  
  /** 发送客户 */
  send_customer: string;
  
  /** 警告文本：请输入系列名 */
  warning6: string;
  
  /** 系列名 */
  series_name: string;
  
  /** 导入系列 */
  import_script: string;
  
  /** 系列图片 */
  cover: string;
  
  /** 如要更换系列图片请上传 */
  cover_text: string;
  
  /** 选择窗型 */
  select_window: string;
  
  /** 警告文本：请先选择窗型! */
  warning7: string;
  
  /** 警告文本：请先选择目录 */
  warning8: string;
  
  /** 选择经销商 */
  choose_dealer: string;
  
  /** 共享公式 */
  send_scripts: string;
  
  /** 警告文本：请先选择要分享的公式! */
  warning9: string;
  
  /** 搜索 */
  search: string;
  
  /** 此操作会将选中的公式共享给经销商 */
  actionwill: string;
  
  /** 联系方式为 */
  contactwith: string;
  
  /** 请确认操作！ */
  confirm_action: string;
  
  /** 轨道号 */
  track_index: string;
  
  /** 新添加在前 */
  new_added_first: string;
  
  /** 新添加在后 */
  new_added_last: string;
  
  /** 排序 */
  sort: string;
  
  /** 取消 */
  cancel: string;
  
  /** 类型 */
  type: string;
  
  /** 上传商城 */
  upload_market: string;
  
  /** 上传图片 */
  upload_image: string;
  
  /** 省 */
  province: string;
  
  /** 市 */
  city: string;
  
  /** 型材品牌 */
  product_brand: string;
  
  /** 公式类型 */
  formula_type: string;
  
  /** 窗型系列 */
  window_type: string;
  
  /** 公式名称 */
  formula_name: string;
  
  /** 公式描述 */
  formula_describe: string;
  
  /** 我已阅读 */
  have_read: string;
  
  /** 购买须知及用户协议 */
  agreement: string;
  
  /** 确认上传 */
  confirm_upload: string;
  
  /** 窗 */
  window: string;
  
  /** 门 */
  door: string;
  
  /** 上传成功，请等待审核 */
  upload_success: string;
  
  /** 描述上限60个字 */
  description_exceed: string;
  
  /** 型材商城 */
  product_mall: string;
  
  /** 编辑名称 */
  edit_name: string;
  
  /** 新名称 */
  new_name: string;
  
  /** 选择客户 */
  choose_customer: string;
  
  /** 分享公式 */
  share_script: string;
  
  /** 复制口令 */
  copy_password: string;
  
  /** 已为您生成口令, 快去分享给其他人吧~ */
  copy_password_message: string;
  
  /** 您的口令是 */
  password_message: string;
  
  /** 请输入分享口令 */
  input_password: string;
  
  /** 窗型 */
  new_window: string;
  
  /** 异形玻璃清单 */
  poly_glass_list: string;
  
  /** 玻璃序号 */
  serial: string;
  
  /** 面积 */
  area: string;
  
  /** 图片 */
  svg: string;
  
  /** 材料管理 */
  product_manage: string;
  
  /** 未命名 */
  undefined: string;
  
  /** 教程 */
  course: string;
  
  /** 请输入编号搜索 */
  input_code: string;
  
  /** 目标系列 */
  target_product: string;
  
  /** 智能公式 */
  intelligent_formula: string;
  
  /** 回收站 */
  recycle: string;
  
  /** 恢复 */
  restore: string;
  
  /** 一级目录 */
  primary_category: string;
  
  /** 二级目录 */
  secondary_category: string;
  
  /** 恢复产品 */
  restore_product: string;
  
  /** 请选择一个目录 */
  please_select_category: string;
}

/**
 * 导出的国际化文本资源模块
 * 包含窗型管理系统所有界面文本的中文翻译
 */
declare const i18nResources: I18nTextResources;

export default i18nResources;