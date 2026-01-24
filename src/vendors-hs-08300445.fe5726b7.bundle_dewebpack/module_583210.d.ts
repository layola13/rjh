/**
 * 分页组件国际化配置（中文）
 * Pagination component internationalization configuration (Chinese)
 */
export interface PaginationLocale {
  /** 每页显示条数的文本 "条/页" */
  items_per_page: string;
  
  /** 跳转输入框前的文本 "跳至" */
  jump_to: string;
  
  /** 跳转确认按钮文本 "确定" */
  jump_to_confirm: string;
  
  /** 页码文本 "页" */
  page: string;
  
  /** 上一页按钮文本 "上一页" */
  prev_page: string;
  
  /** 下一页按钮文本 "下一页" */
  next_page: string;
  
  /** 向前5页按钮文本 "向前 5 页" */
  prev_5: string;
  
  /** 向后5页按钮文本 "向后 5 页" */
  next_5: string;
  
  /** 向前3页按钮文本 "向前 3 页" */
  prev_3: string;
  
  /** 向后3页按钮文本 "向后 3 页" */
  next_3: string;
  
  /** 页码选择器文本 "页码" */
  page_size: string;
}

/**
 * 中文分页配置默认导出
 * Default Chinese pagination locale configuration
 */
declare const paginationLocale: PaginationLocale;

export default paginationLocale;