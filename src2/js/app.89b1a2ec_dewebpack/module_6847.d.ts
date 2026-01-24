/**
 * 国际化语言包 - 用户认证模块
 * 包含登录、注册、密码重置等相关文本
 */
declare module 'module_6847' {
  /**
   * 用户认证相关的国际化文本接口
   */
  interface AuthLocale {
    /** 注册按钮文本 */
    register: string;
    
    /** 发送验证码按钮文本 */
    sendcode: string;
    
    /** 跳转登录提示文本 */
    gologin: string;
    
    /** 手机号输入框标签 */
    phone_number: string;
    
    /** 昵称输入框标签 */
    nickname: string;
    
    /** 密码输入框标签 */
    password: string;
    
    /** 账号密码登录方式文本 */
    pwdlogin: string;
    
    /** 验证码登录方式文本 */
    msglogin: string;
    
    /** 确认密码输入框标签 */
    checkpassword: string;
    
    /** 登录按钮文本 */
    login: string;
    
    /** 验证码必填提示 */
    coderequire: string;
    
    /** 昵称必填提示 */
    nicknamerequire: string;
    
    /** 昵称长度限制提示 */
    nickname16: string;
    
    /** 手机号格式错误提示 */
    correctphonenumber: string;
    
    /** 手机号必填提示 */
    phone_numberrequire: string;
    
    /** 手机号不一致提示 */
    phone_not_same: string;
    
    /** 密码必填提示 */
    passwordrequire: string;
    
    /** 密码格式要求提示 */
    correctpassword: string;
    
    /** 两次密码不一致提示 */
    passwordnotequal: string;
    
    /** 注册成功提示 */
    registerok: string;
    
    /** 刷新/更新按钮文本 */
    refresh: string;
    
    /** 新版本可用提示 */
    newversvail: string;
    
    /** 记住密码选项文本 */
    remember_password: string;
    
    /** 忘记密码链接文本 */
    forgot_password: string;
    
    /** 跳转注册提示文本 */
    no_account: string;
    
    /** 微信登录方式文本 */
    wechat: string;
    
    /** Facebook登录方式文本 */
    facebook: string;
    
    /** Google登录方式文本 */
    google: string;
    
    /** 确认按钮文本 */
    confirm: string;
    
    /** 重置密码文本 */
    retrieve_password: string;
    
    /** 返回登录提示文本 */
    remember_password1: string;
    
    /** 邀请码/注册码输入提示 */
    invited_code: string;
    
    /** 手机号已注册提示 */
    phoneexistgologin: string;
    
    /** 页面主标题 */
    title: string;
    
    /** 第三方登录说明文本 */
    thirdwaylogin: string;
    
    /** 用户名必填提示 */
    usernamerequire: string;
    
    /** 注册码必填提示 */
    sncoderequire: string;
    
    /** 空间名必填提示 */
    spacenamerequired: string;
    
    /** 注册码错误提示 */
    sncode_err: string;
    
    /** 选择公司/空间必填提示 */
    selectCompanyRequired: string;
    
    /** 无搜索结果提示 */
    noData: string;
    
    /** 表单标题 */
    formtitle: string;
    
    /** 头部右侧链接 - 访问官网 */
    head_r_title1: string;
    
    /** 头部右侧链接 - 使用帮助 */
    head_r_title2: string;
    
    /** 头部左侧标题 */
    head_l_title1: string;
    
    /** 注册页面标题 */
    regster_title: string;
    
    /** 协议未勾选提示 */
    footer_agreement: string;
    
    /** 用户协议链接文本 */
    license: string;
    
    /** 隐私协议链接文本 */
    privacy: string;
    
    /** 返回旧版本链接文本 */
    back_version: string;
    
    /** 总用户数统计标签 */
    user_count: string;
    
    /** 今日在线用户统计标签 */
    login_users: string;
    
    /** 协议同意前缀文本 */
    agree: string;
    
    /** Apple登录方式文本 */
    apple_login: string;
  }

  const locale: AuthLocale;
  export = locale;
}