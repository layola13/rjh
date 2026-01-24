/**
 * 键盘按键代码常量定义
 * 包含数字键、小键盘数字键和常用功能键的键码
 */
declare module 'module_809287' {
  /**
   * 键盘按键代码映射对象
   */
  interface KeyCodes {
    /** 主键盘数字0的键码 (48) */
    readonly ZERO: 48;
    
    /** 主键盘数字9的键码 (57) */
    readonly NINE: 57;
    
    /** 小键盘数字0的键码 (96) */
    readonly NUMPAD_ZERO: 96;
    
    /** 小键盘数字9的键码 (105) */
    readonly NUMPAD_NINE: 105;
    
    /** 退格键的键码 (8) */
    readonly BACKSPACE: 8;
    
    /** 删除键的键码 (46) */
    readonly DELETE: 46;
    
    /** 回车键的键码 (13) */
    readonly ENTER: 13;
    
    /** 向上箭头键的键码 (38) */
    readonly ARROW_UP: 38;
    
    /** 向下箭头键的键码 (40) */
    readonly ARROW_DOWN: 40;
  }

  /**
   * 键盘按键代码常量对象
   * @example
   *