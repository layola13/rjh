/**
 * 中文（简体）语言包类型定义
 * @module locale/zh-Hans
 */

/**
 * 徽章组件语言配置
 */
interface BadgeLocale {
  /** 徽章文本 */
  badge: string;
  /** 关闭按钮文本 */
  close: string;
}

/**
 * 数据迭代器组件语言配置
 */
interface DataIteratorLocale {
  /** 无结果时显示的文本 */
  noResultsText: string;
  /** 加载中显示的文本 */
  loadingText: string;
}

/**
 * 数据表格排序标签配置
 */
interface DataTableAriaLabel {
  /** 降序排列的无障碍标签 */
  sortDescending: string;
  /** 升序排列的无障碍标签 */
  sortAscending: string;
  /** 未排序的无障碍标签 */
  sortNone: string;
  /** 移除排序的无障碍标签 */
  activateNone: string;
  /** 激活降序排列的无障碍标签 */
  activateDescending: string;
  /** 激活升序排列的无障碍标签 */
  activateAscending: string;
}

/**
 * 数据表格组件语言配置
 */
interface DataTableLocale {
  /** 每页显示数量的文本 */
  itemsPerPageText: string;
  /** 无障碍标签配置 */
  ariaLabel: DataTableAriaLabel;
  /** 排序方式文本 */
  sortBy: string;
}

/**
 * 数据表格底部组件语言配置
 */
interface DataFooterLocale {
  /** 每页显示数量的文本 */
  itemsPerPageText: string;
  /** 显示全部选项的文本 */
  itemsPerPageAll: string;
  /** 下一页按钮文本 */
  nextPage: string;
  /** 上一页按钮文本 */
  prevPage: string;
  /** 首页按钮文本 */
  firstPage: string;
  /** 尾页按钮文本 */
  lastPage: string;
  /** 分页信息文本模板，格式：{0}-{1} 共 {2} */
  pageText: string;
}

/**
 * 日期选择器组件语言配置
 */
interface DatePickerLocale {
  /** 已选择项数量的文本模板 */
  itemsSelected: string;
  /** 下个月的无障碍标签 */
  nextMonthAriaLabel: string;
  /** 明年的无障碍标签 */
  nextYearAriaLabel: string;
  /** 前一个月的无障碍标签 */
  prevMonthAriaLabel: string;
  /** 前一年的无障碍标签 */
  prevYearAriaLabel: string;
}

/**
 * 轮播图无障碍标签配置
 */
interface CarouselAriaLabel {
  /** 轮播图幻灯片的无障碍标签模板 */
  delimiter: string;
}

/**
 * 轮播图组件语言配置
 */
interface CarouselLocale {
  /** 上一张按钮文本 */
  prev: string;
  /** 下一张按钮文本 */
  next: string;
  /** 无障碍标签配置 */
  ariaLabel: CarouselAriaLabel;
}

/**
 * 日历组件语言配置
 */
interface CalendarLocale {
  /** 更多事件的文本模板 */
  moreEvents: string;
}

/**
 * 文件输入组件语言配置
 */
interface FileInputLocale {
  /** 文件数量计数文本模板 */
  counter: string;
  /** 文件数量和大小计数文本模板 */
  counterSize: string;
}

/**
 * 时间选择器组件语言配置
 */
interface TimePickerLocale {
  /** 上午文本 */
  am: string;
  /** 下午文本 */
  pm: string;
}

/**
 * 分页组件无障碍标签配置
 */
interface PaginationAriaLabel {
  /** 分页导航容器的无障碍标签 */
  wrapper: string;
  /** 下一页的无障碍标签 */
  next: string;
  /** 上一页的无障碍标签 */
  previous: string;
  /** 跳转到指定页面的无障碍标签模板 */
  page: string;
  /** 当前页的无障碍标签模板 */
  currentPage: string;
}

/**
 * 分页组件语言配置
 */
interface PaginationLocale {
  /** 无障碍标签配置 */
  ariaLabel: PaginationAriaLabel;
}

/**
 * 评分组件无障碍标签配置
 */
interface RatingAriaLabel {
  /** 评分图标的无障碍标签模板 */
  icon: string;
}

/**
 * 评分组件语言配置
 */
interface RatingLocale {
  /** 无障碍标签配置 */
  ariaLabel: RatingAriaLabel;
}

/**
 * 中文（简体）完整语言包接口
 */
interface ZhHansLocale {
  /** 徽章组件文本 */
  badge: string;
  /** 关闭按钮文本 */
  close: string;
  /** 数据迭代器组件配置 */
  dataIterator: DataIteratorLocale;
  /** 数据表格组件配置 */
  dataTable: DataTableLocale;
  /** 数据表格底部组件配置 */
  dataFooter: DataFooterLocale;
  /** 日期选择器组件配置 */
  datePicker: DatePickerLocale;
  /** 无数据时显示的文本 */
  noDataText: string;
  /** 轮播图组件配置 */
  carousel: CarouselLocale;
  /** 日历组件配置 */
  calendar: CalendarLocale;
  /** 文件输入组件配置 */
  fileInput: FileInputLocale;
  /** 时间选择器组件配置 */
  timePicker: TimePickerLocale;
  /** 分页组件配置 */
  pagination: PaginationLocale;
  /** 评分组件配置 */
  rating: RatingLocale;
}

/**
 * 导出中文（简体）语言包
 * @default
 */
declare const zhHansLocale: ZhHansLocale;

export default zhHansLocale;