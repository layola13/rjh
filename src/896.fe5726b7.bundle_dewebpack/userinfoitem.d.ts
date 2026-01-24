/**
 * 用户VIP信息配置接口
 */
interface VipConfig {
  /** VIP类型标识 */
  vipType: string;
  /** VIP名称 */
  name: string;
  /** 图标配置，可以是字符串URL或状态映射对象 */
  icon?: string | Record<string, string>;
  /** 获取用户信息项样式 */
  getUserInfoItemStyle?: (userVipInfo: UserVipInfo) => React.CSSProperties;
  /** 获取用户信息标题 */
  userInfoTitle: (userVipInfo: UserVipInfo) => UserInfoTitle;
  /** 获取用户信息右上角图标 */
  getUserInfoTopRightIcon?: (userVipInfo: UserVipInfo) => React.ReactNode;
  /** 获取用户信息底部内容 */
  getUserInfoBottom?: (userVipInfo: UserVipInfo) => React.ReactNode;
}

/**
 * 用户VIP信息接口
 */
interface UserVipInfo {
  /** VIP类型 */
  vipType: string;
  /** VIP状态 */
  status: string;
  /** 是否显示特惠标签 */
  showSale?: boolean;
}

/**
 * 用户信息标题配置
 */
interface UserInfoTitle {
  /** 标题名称（资源键） */
  name?: string;
  /** 标题颜色 */
  color?: string;
}

/**
 * UserInfoItem 组件属性接口
 */
interface UserInfoItemProps {
  /** 用户VIP信息数据 */
  userVipInfo: UserVipInfo;
  /** 点击事件回调 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * 用户信息展示组件
 * 
 * @description 展示用户VIP信息的卡片组件，包含图标、标题、状态和特惠标签
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *