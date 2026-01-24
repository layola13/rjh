/**
 * 国际化文本资源配置
 * 包含系统中所有用户提示、警告、确认等文本信息
 */
declare module 'module_2eaa' {
  /**
   * 多用户等待提示的占位符参数
   */
  interface MultipleWaitParams {
    /** 等待的用户总数 */
    wait_user_count: number;
    /** 当前排队位置 */
    rest_count: number;
  }

  /**
   * 应用程序文本资源接口
   * 定义了所有UI文本、提示信息和用户交互消息
   */
  interface LocaleMessages {
    /** 提示：请先画图 */
    bopic: string;
    /** 提示：请先画图并保存 */
    dopicsave: string;
    /** 警告标题 */
    warning: string;
    /** 否定按钮文本 */
    notsure: string;
    /** 确定按钮文本 */
    issure: string;
    /** 不保存按钮文本 */
    notsave: string;
    /** 保存按钮文本 */
    gosave: string;
    /** 前往查看按钮文本 */
    gosee: string;
    /** 未保存修改的确认提示 */
    haveordernotsave: string;
    /** 删除订单确认提示 */
    deleteorder: string;
    /** 删除目录确认提示 */
    deletemenu: string;
    /** 删除窗型确认提示 */
    deletewindoortype: string;
    /** 删除产品确认提示 */
    deleteproduct: string;
    /** 删除公式确认提示 */
    deletescript: string;
    /** 保存订单提示 */
    ifsavetips: string;
    /** 购买功能解锁提示 */
    pleasegobuy: string;
    /** 购买按钮文本 */
    gobuy: string;
    /** 取消按钮文本 */
    cancel: string;
    /** 确认按钮文本 */
    confirm: string;
    /** 添加成功提示 */
    success_added: string;
    /** 添加失败提示 */
    failed_add: string;
    /** 修改成功提示 */
    success_edit: string;
    /** 修改失败提示 */
    failed_edit: string;
    /** 获取列表失败提示 */
    failed_list: string;
    /** 获取二维码失败提示 */
    failed_getcode: string;
    /** 获取详情失败提示 */
    failed_details: string;
    /** 复制分享链接文本 */
    copy_share_link: string;
    /** 删除成功提示 */
    success_delete: string;
    /** 删除失败提示 */
    failed_delete: string;
    /** 复制成功提示 */
    success_copy: string;
    /** 邀请按钮文本 */
    to_invite: string;
    /** 邀请或购买提示 */
    tips: string;
    /** 直接购买提示 */
    buytips: string;
    /** 登录失败提示 */
    login_failed: string;
    /** 保存成功提示 */
    success_save: string;
    /** 保存失败提示 */
    failed_save: string;
    /** 上传失败提示 */
    upload_failed: string;
    /** 上传文件大小限制警告 */
    upload_warning: string;
    /** 克隆成功提示 */
    success_clone: string;
    /** 克隆失败提示 */
    failed_clone: string;
    /** 绑定成功提示 */
    success_bind: string;
    /** 绑定失败提示 */
    failed_bind: string;
    /** 发送成功提示 */
    success_send: string;
    /** 发送失败提示 */
    failed_send: string;
    /** 提交成功提示 */
    success_submit: string;
    /** 验证码错误提示 */
    code_err: string;
    /** 系统提示标题 */
    system_warning: string;
    /** 我知道了按钮文本 */
    isee: string;
    /** 请求频率限制提示 */
    one_min_once: string;
    /** 鼠标缩放操作提示 */
    mouseamplification: string;
    /** 提交失败提示 */
    submit_failure: string;
    /** 获取提现记录失败提示 */
    failed_get_record: string;
    /** 图片选择数量限制提示 */
    exceed_img: string;
    /** 删除方案确认提示 */
    delete_plan: string;
    /** 新建按钮文本 */
    add_plan: string;
    /** 试用过期提示 */
    ty_expired: string;
    /** 型材修改提示 */
    profile_changed: string;
    /** 型材数量超限提示 */
    profile_exceed: string;
    /** 接口错误提示 */
    interface_error: string;
    /** 下载按钮文本 */
    download: string;
    /** 
     * 多用户排队等待消息模板
     * 使用 {wait_user_count} 和 {rest_count} 作为占位符
     */
    multipleWaitMessage: string;
    /** 内容不能为空提示 */
    not_empty: string;
    /** 子账号权限不足提示 */
    lackauthority: string;
    /** 长度必填提示 */
    length_required: string;
    /** 数量必填提示 */
    count_required: string;
    /** 确定删除提示 */
    confirm_delete: string;
    /** 删除单个含订单合同确认提示 */
    confirm_delete_single: string;
    /** 删除多个含订单合同确认提示 */
    confirm_delete_multiple: string;
    /** 子账号确认合同权限说明 */
    son_account_confirm: string;
    /** 子账号取消确认合同权限说明 */
    son_account_cancel: string;
    /** 需要先保存订单提示 */
    require_save_order: string;
    /** 试用版3D功能限制提示 */
    ty_create3d_tips: string;
    /** 试用版升级提示 */
    trial_tips: string;
    /** 查看操作方法按钮文本 */
    view_guide: string;
    /** 打印订单数量超限提示 */
    order_count_exceed: string;
    /** 创建二级目录必填提示 */
    create_secondary_catelog_required: string;
    /** 引导步骤0：使用教程入口说明 */
    info_step0: string;
    /** 引导步骤1：设计窗型图功能说明 */
    info_step1: string;
    /** 引导步骤2：订单管理功能说明 */
    info_step2: string;
    /** 引导步骤3：窗型图库功能说明 */
    info_step3: string;
    /** 引导步骤4：常用窗型功能说明 */
    info_step4: string;
    /** 引导步骤5：个人设置功能说明 */
    info_step5: string;
  }

  const messages: LocaleMessages;
  export default messages;
}