/**
 * 多语言翻译资源接口
 * 定义了系统中所有可翻译的文本键值对
 */
interface TranslationResources {
  /** 工作台 */
  workbench: string;
  
  /** 查找/发现 */
  find: string;
  
  /** 本月提现 */
  this_month_draw: string;
  
  /** 本月金额 */
  this_month_money: string;
  
  /** 总提现 */
  total_draw: string;
  
  /** 总金额 */
  total_money: string;
  
  /** 设计 */
  design: string;
  
  /** 订单 */
  order: string;
  
  /** 门窗库 */
  windoor: string;
  
  /** 产品 */
  product: string;
  
  /** 个人中心 */
  personal: string;
  
  /** 登出 */
  logout: string;
  
  /** 关注我们 */
  followus: string;
  
  /** 获取最新消息 */
  getnews: string;
  
  /** 修改密码 */
  change_password: string;
  
  /** 教程 */
  tutorial: string;
  
  /** 教程(简化版) */
  tutorial_lite: string;
  
  /** 首页 */
  home: string;
  
  /** 订单(备用) */
  order1: string;
  
  /** 门窗库(备用) */
  windoor1: string;
  
  /** 配方/公式 */
  formula: string;
  
  /** 个人中心(备用) */
  personal1: string;
  
  /** 分享获取奖金按钮 */
  share_btn: string;
  
  /** 微信公众号按钮 */
  wechat_btn: string;
  
  /** 系统设置 */
  system_settings: string;
  
  /** 绘图设置 */
  drawing_settings: string;
  
  /** 分享设置 */
  share_settings: string;
  
  /** 分享过期时间 */
  share_expire_time: string;
  
  /** 永久 */
  permanent: string;
  
  /** 订单设置 */
  order_settings: string;
  
  /** 其他设置 */
  other_settings: string;
  
  /** 税务设置 */
  tax_settings: string;
  
  /** 条款与条件 */
  treaty: string;
  
  /** 请输入条款与条件 */
  enter_treaty: string;
  
  /** 跳过 */
  skip: string;
  
  /** 下一步 */
  next: string;
  
  /** 上一步 */
  prev: string;
  
  /** 完成/我知道了 */
  complete: string;
  
  /** 货币符号(人民币) */
  yuan: string;
  
  /** 照片匹配 */
  photo_match: string;
  
  /** 照片匹配副标题 */
  photo_match_subtitle: string;
  
  /** 关注官方账号 */
  focus_official: string;
  
  /** 关注官方账号副标题 */
  focus_official_subtitle: string;
  
  /** 阳光房 */
  sunnyhouse: string;
  
  /** 阳光房副标题 */
  sunnyhouse_subtitle: string;
  
  /** 计算体验 */
  calc_experience: string;
  
  /** 计算体验副标题 */
  calc_experience_subtitle: string;
  
  /** 问卷调查 */
  questionnaire: string;
  
  /** 问卷调查副标题 */
  questionnaire_subtitle: string;
  
  /** 计算体验(移动端) */
  calc_experience_mobile: string;
  
  /** 计算体验副标题(移动端) */
  calc_experience_subtitle_mobile: string;
  
  /** 免费试用 */
  free_trial: string;
  
  /** 新功能标识 */
  new: string;
  
  /** 体验标识 */
  experience: string;
  
  /** 内测标识 */
  internal_test: string;
  
  /** 公司名称 */
  company_name: string;
  
  /** 最新订单 */
  latest_orders: string;
  
  /** 设计提示 */
  design_tip: string;
  
  /** 小程序 */
  microProgram: string;
  
  /** 区域设置 */
  area_setting: string;
  
  /** 玻璃和五金设置 */
  glass_hardware_setting: string;
  
  /** 颜色设置 */
  color_setting: string;
  
  /** 字体设置 */
  font_setting: string;
  
  /** 高级设置 */
  advanced_setting: string;
  
  /** 分享设置 */
  share_setting: string;
  
  /** 条款设置 */
  treaty_setting: string;
  
  /** 税务设置 */
  tax_setting: string;
  
  /** 永久分享 */
  permanent_share: string;
  
  /** 计算体验标语 */
  calc_experience_slogan: string;
  
  /** 拨打电话 */
  call_phone: string;
  
  /** 编辑历史 */
  edit_history: string;
  
  /** 账户过期通知标题 */
  expire_notice_title: string;
  
  /** 我知道了 */
  i_know: string;
  
  /** 联系销售 */
  contact_sales: string;
  
  /** 去购买 */
  go_buy: string;
  
  /** 过期提示文本1 */
  expiration_1: string;
  
  /** 过期提示文本2 */
  expiration_2: string;
}

/**
 * 翻译资源模块
 * 导出英文翻译资源对象
 */
declare const translationResources: TranslationResources;

export default translationResources;