/**
 * 多语言提示信息配置（越南语版本）
 * @description 包含系统中所有用户提示、警告和确认消息的翻译文本
 */
declare module 'module_6804' {
  /**
   * 国际化消息配置接口
   */
  interface I18nMessages {
    /** 提示：请先绘制 */
    bopic: string;
    
    /** 提示：请先绘制并保存 */
    dopicsave: string;
    
    /** 警告标题 */
    warning: string;
    
    /** 否定回答：否 */
    notsure: string;
    
    /** 操作：前往查看 */
    gosee: string;
    
    /** 操作：保存 */
    gosave: string;
    
    /** 肯定回答：是 */
    issure: string;
    
    /** 操作：不保存 */
    notsave: string;
    
    /** 提示：退出前是否保存更改 */
    haveordernotsave: string;
    
    /** 提示：请确保必需的订单已保存 */
    ifsavetips: string;
    
    /** 提示：购买后解锁功能，点击此处购买 */
    pleasegobuy: string;
    
    /** 确认：是否删除订单 */
    deleteorder: string;
    
    /** 确认：是否删除菜单 */
    deletemenu: string;
    
    /** 确认：是否删除产品 */
    deleteproduct: string;
    
    /** 确认：是否删除门窗类型 */
    deletewindoortype: string;
    
    /** 确认：是否删除脚本 */
    deletescript: string;
    
    /** 操作：购买 */
    gobuy: string;
    
    /** 操作：取消 */
    cancel: string;
    
    /** 操作：确认 */
    confirm: string;
    
    /** 成功提示：添加成功 */
    success_added: string;
    
    /** 失败提示：添加失败 */
    failed_add: string;
    
    /** 成功提示：编辑成功 */
    success_edit: string;
    
    /** 失败提示：编辑失败 */
    failed_edit: string;
    
    /** 失败提示：获取列表失败 */
    failed_list: string;
    
    /** 失败提示：获取二维码失败 */
    failed_getcode: string;
    
    /** 失败提示：获取详情失败 */
    failed_details: string;
    
    /** 操作：复制分享链接 */
    copy_share_link: string;
    
    /** 成功提示：删除成功 */
    success_delete: string;
    
    /** 失败提示：删除失败 */
    failed_delete: string;
    
    /** 成功提示：复制成功 */
    success_copy: string;
    
    /** 操作：邀请 */
    to_invite: string;
    
    /** 提示：邀请用户或直接购买以解锁 */
    tips: string;
    
    /** 提示：购买以解锁 */
    buytips: string;
    
    /** 失败提示：登录失败 */
    login_failed: string;
    
    /** 成功提示：保存成功 */
    success_save: string;
    
    /** 失败提示：保存失败 */
    failed_save: string;
    
    /** 失败提示：上传失败 */
    upload_failed: string;
    
    /** 警告：上传文件大小不能超过3M */
    upload_warning: string;
    
    /** 成功提示：克隆成功 */
    success_clone: string;
    
    /** 失败提示：克隆失败 */
    failed_clone: string;
    
    /** 成功提示：绑定成功 */
    success_bind: string;
    
    /** 失败提示：绑定失败 */
    failed_bind: string;
    
    /** 成功提示：发送成功 */
    success_send: string;
    
    /** 失败提示：发送失败 */
    failed_send: string;
    
    /** 成功提示：提交成功 */
    success_submit: string;
    
    /** 错误提示：验证码错误 */
    code_err: string;
    
    /** 系统警告标题 */
    system_warning: string;
    
    /** 操作：我知道了 */
    isee: string;
    
    /** 限制提示：每分钟只能请求一次 */
    one_min_once: string;
    
    /** 操作提示：按住Alt键加鼠标滚轮进行缩放 */
    mouseamplification: string;
    
    /** 失败提示：提交失败 */
    submit_failure: string;
    
    /** 失败提示：获取提现记录失败 */
    failed_get_record: string;
    
    /** 提示：请选择一张图片 */
    exceed_img: string;
    
    /** 确认：是否删除此方案 */
    delete_plan: string;
    
    /** 操作：添加 */
    add_plan: string;
    
    /** 提示：试用版已过期，请购买延期 */
    ty_expired: string;
    
    /** 提示：配置已更改，请重新导出并运行 */
    profile_changed: string;
    
    /** 提示：配置超限，请下载工具优化 */
    profile_exceed: string;
    
    /** 错误提示：接口错误 */
    interface_error: string;
    
    /** 操作：下载 */
    download: string;
    
    /** 
     * 队列等待提示：当前账户被{wait_user_count}人使用，还剩{rest_count}人
     * @description 支持模板变量插值
     */
    multipleWaitMessage: string;
    
    /** 验证提示：内容不能为空 */
    not_empty: string;
    
    /** 权限提示：当前账户缺少权限 */
    lackauthority: string;
    
    /** 验证提示：需要长度 */
    length_required: string;
    
    /** 验证提示：需要数量 */
    count_required: string;
    
    /** 确认：确认删除？ */
    confirm_delete: string;
    
    /** 确认：合同包含订单，确认删除？ */
    confirm_delete_single: string;
    
    /** 确认：一个或多个合同包含订单，确认删除？ */
    confirm_delete_multiple: string;
    
    /** 确认提示：确认合同后未经许可无法修改 */
    son_account_confirm: string;
    
    /** 取消提示：取消确认，子账户有权限可修改 */
    son_account_cancel: string;
    
    /** 提示：请先保存订单 */
    require_save_order: string;
    
    /** 提示：购买后解锁3D创建功能 */
    ty_create3d_tips: string;
    
    /** 提示：当前为试用版，请更新 */
    trial_tips: string;
    
    /** 操作：查看操作指南 */
    view_guide: string;
    
    /** 提示：打印订单过多，请分批打印 */
    order_count_exceed: string;
    
    /** 提示：请创建二级目录 */
    create_secondary_catelog_required: string;
    
    /** 引导信息：进入查看使用教程 */
    info_step0: string;
    
    /** 引导信息：进入设计门窗图并直接保存下单 */
    info_step1: string;
    
    /** 引导信息：进入存储已保存订单、打印报表和与客户分享订单 */
    info_step2: string;
    
    /** 引导信息：进入创建门窗形状库，下单时可直接修改尺寸 */
    info_step3: string;
    
    /** 引导信息：进入添加常用门窗类型用于下单或创建模板公式 */
    info_step4: string;
    
    /** 引导信息：进入修改个人信息、设置公司信息 */
    info_step5: string;
  }

  const messages: I18nMessages;
  export = messages;
}