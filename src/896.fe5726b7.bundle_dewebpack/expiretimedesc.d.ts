/**
 * 用户会员信息接口
 */
interface UserVipInfo {
  /** 会员过期时间戳（毫秒） */
  expireTime: number;
}

/**
 * ExpireTimeDesc 组件属性
 */
interface ExpireTimeDescProps {
  /** 用户会员信息 */
  userVipInfo: UserVipInfo;
}

/**
 * UserInfoBase 组件属性
 */
interface UserInfoBaseProps {
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 日期格式化模板类型
 */
type DateFormatTemplate = string;

/**
 * 日期格式化函数映射
 */
type DateFormatters = {
  [key: string]: (date: Date) => string;
};

/**
 * 会员过期时间描述组件
 * 显示格式化后的会员到期时间
 * 
 * @param props - 组件属性
 * @returns React 元素
 */
export declare function ExpireTimeDesc(props: ExpireTimeDescProps): React.ReactElement;

/**
 * 用户基础信息组件
 * 展示用户基本信息容器
 * 
 * @param props - 组件属性
 * @returns React 元素
 */
export declare function UserInfoBase(props: UserInfoBaseProps): React.ReactElement;

/**
 * 格式化时间戳为指定格式字符串
 * 
 * @param timestamp - 时间戳（毫秒）
 * @param format - 格式化模板，默认 "YYYY/MM/DD"
 * @returns 格式化后的日期字符串
 * 
 * @internal
 */
declare function formatDate(
  timestamp: number,
  format?: DateFormatTemplate
): string;