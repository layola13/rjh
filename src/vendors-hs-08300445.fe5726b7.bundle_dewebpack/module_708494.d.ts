/**
 * 默认的表单验证错误消息配置
 * 支持模板字符串插值，可使用 ${name}、${type}、${len}、${min}、${max}、${enum}、${pattern} 等变量
 */
export interface ValidateMessages {
  /** 默认验证错误消息 */
  default?: string;
  /** 必填字段验证失败消息 */
  required?: string;
  /** 枚举值验证失败消息 */
  enum?: string;
  /** 空白字符验证失败消息 */
  whitespace?: string;
  
  /** 日期相关验证消息 */
  date?: {
    /** 日期格式错误消息 */
    format?: string;
    /** 日期解析失败消息 */
    parse?: string;
    /** 日期无效消息 */
    invalid?: string;
  };
  
  /** 类型验证失败消息映射 */
  types?: {
    /** 字符串类型验证失败 */
    string?: string;
    /** 方法类型验证失败 */
    method?: string;
    /** 数组类型验证失败 */
    array?: string;
    /** 对象类型验证失败 */
    object?: string;
    /** 数字类型验证失败 */
    number?: string;
    /** 日期类型验证失败 */
    date?: string;
    /** 布尔类型验证失败 */
    boolean?: string;
    /** 整数类型验证失败 */
    integer?: string;
    /** 浮点数类型验证失败 */
    float?: string;
    /** 正则类型验证失败 */
    regexp?: string;
    /** 邮箱类型验证失败 */
    email?: string;
    /** URL类型验证失败 */
    url?: string;
    /** 十六进制类型验证失败 */
    hex?: string;
  };
  
  /** 字符串长度验证消息 */
  string?: {
    /** 字符串长度必须等于指定值 */
    len?: string;
    /** 字符串最小长度限制 */
    min?: string;
    /** 字符串最大长度限制 */
    max?: string;
    /** 字符串长度范围限制 */
    range?: string;
  };
  
  /** 数字范围验证消息 */
  number?: {
    /** 数字必须等于指定值 */
    len?: string;
    /** 数字最小值限制 */
    min?: string;
    /** 数字最大值限制 */
    max?: string;
    /** 数字范围限制 */
    range?: string;
  };
  
  /** 数组长度验证消息 */
  array?: {
    /** 数组长度必须等于指定值 */
    len?: string;
    /** 数组最小长度限制 */
    min?: string;
    /** 数组最大长度限制 */
    max?: string;
    /** 数组长度范围限制 */
    range?: string;
  };
  
  /** 正则模式验证消息 */
  pattern?: {
    /** 模式匹配失败消息 */
    mismatch?: string;
  };
}

/**
 * 默认的验证错误消息配置对象
 * 用于表单验证时生成友好的错误提示信息
 */
export declare const defaultValidateMessages: ValidateMessages;