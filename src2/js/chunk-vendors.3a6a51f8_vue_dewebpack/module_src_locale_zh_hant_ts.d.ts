/**
 * 繁體中文（台灣）語言包
 * Vuetify 組件庫的繁體中文本地化配置
 * @module locale/zh-Hant
 */

/**
 * 數據迭代器相關的本地化文本
 */
interface DataIteratorLocale {
  /** 無搜索結果時顯示的文本 */
  noResultsText: string;
  /** 數據加載中顯示的文本 */
  loadingText: string;
}

/**
 * 數據表格排序相關的ARIA標籤
 */
interface DataTableAriaLabel {
  /** 降序排列的無障礙標籤 */
  sortDescending: string;
  /** 升序排列的無障礙標籤 */
  sortAscending: string;
  /** 無排序狀態的無障礙標籤 */
  sortNone: string;
  /** 啟用無排序狀態的提示 */
  activateNone: string;
  /** 啟用降序排列的提示 */
  activateDescending: string;
  /** 啟用升序排列的提示 */
  activateAscending: string;
}

/**
 * 數據表格相關的本地化文本
 */
interface DataTableLocale {
  /** 每頁顯示行數的標籤文本 */
  itemsPerPageText: string;
  /** 無障礙訪問標籤配置 */
  ariaLabel: DataTableAriaLabel;
  /** 排序方式標籤 */
  sortBy: string;
}

/**
 * 數據底部分頁器相關的本地化文本
 */
interface DataFooterLocale {
  /** 每頁項目數的標籤文本 */
  itemsPerPageText: string;
  /** 顯示全部項目的選項文本 */
  itemsPerPageAll: string;
  /** 下一頁按鈕文本 */
  nextPage: string;
  /** 上一頁按鈕文本 */
  prevPage: string;
  /** 第一頁按鈕文本 */
  firstPage: string;
  /** 最後一頁按鈕文本 */
  lastPage: string;
  /** 分頁信息文本模板，{0}=起始索引, {1}=結束索引, {2}=總數 */
  pageText: string;
}

/**
 * 日期選擇器相關的本地化文本
 */
interface DatePickerLocale {
  /** 已選擇項目數的文本模板，{0}=選擇數量 */
  itemsSelected: string;
  /** 下個月按鈕的無障礙標籤 */
  nextMonthAriaLabel: string;
  /** 明年按鈕的無障礙標籤 */
  nextYearAriaLabel: string;
  /** 上個月按鈕的無障礙標籤 */
  prevMonthAriaLabel: string;
  /** 去年按鈕的無障礙標籤 */
  prevYearAriaLabel: string;
}

/**
 * 輪播圖ARIA標籤配置
 */
interface CarouselAriaLabel {
  /** 輪播分隔符文本模板，{0}=當前幻燈片, {1}=總幻燈片數 */
  delimiter: string;
}

/**
 * 輪播圖相關的本地化文本
 */
interface CarouselLocale {
  /** 上一張按鈕文本 */
  prev: string;
  /** 下一張按鈕文本 */
  next: string;
  /** 無障礙訪問標籤配置 */
  ariaLabel: CarouselAriaLabel;
}

/**
 * 日曆組件相關的本地化文本
 */
interface CalendarLocale {
  /** 顯示更多事件的文本模板，{0}=額外事件數量 */
  moreEvents: string;
}

/**
 * 文件輸入組件相關的本地化文本
 */
interface FileInputLocale {
  /** 文件數量文本模板，{0}=文件數 */
  counter: string;
  /** 文件數量和大小文本模板，{0}=文件數, {1}=總大小 */
  counterSize: string;
}

/**
 * 時間選擇器相關的本地化文本
 */
interface TimePickerLocale {
  /** 上午標識 */
  am: string;
  /** 下午標識 */
  pm: string;
}

/**
 * 分頁組件ARIA標籤配置
 */
interface PaginationAriaLabel {
  /** 分頁導航容器的無障礙標籤 */
  wrapper: string;
  /** 下一頁按鈕的無障礙標籤 */
  next: string;
  /** 上一頁按鈕的無障礙標籤 */
  previous: string;
  /** 跳轉到指定頁面的無障礙標籤模板，{0}=頁碼 */
  page: string;
  /** 當前頁的無障礙標籤模板，{0}=當前頁碼 */
  currentPage: string;
}

/**
 * 分頁組件相關的本地化文本
 */
interface PaginationLocale {
  /** 無障礙訪問標籤配置 */
  ariaLabel: PaginationAriaLabel;
}

/**
 * 評分組件ARIA標籤配置
 */
interface RatingAriaLabel {
  /** 評分圖標的無障礙標籤模板，{0}=當前評分, {1}=最高評分 */
  icon: string;
}

/**
 * 評分組件相關的本地化文本
 */
interface RatingLocale {
  /** 無障礙訪問標籤配置 */
  ariaLabel: RatingAriaLabel;
}

/**
 * Vuetify 繁體中文語言包完整配置
 */
interface VuetifyLocaleZhHant {
  /** 徽章組件文本 */
  badge: string;
  /** 關閉按鈕文本 */
  close: string;
  /** 數據迭代器本地化配置 */
  dataIterator: DataIteratorLocale;
  /** 數據表格本地化配置 */
  dataTable: DataTableLocale;
  /** 數據底部分頁器本地化配置 */
  dataFooter: DataFooterLocale;
  /** 日期選擇器本地化配置 */
  datePicker: DatePickerLocale;
  /** 無數據時顯示的文本 */
  noDataText: string;
  /** 輪播圖本地化配置 */
  carousel: CarouselLocale;
  /** 日曆組件本地化配置 */
  calendar: CalendarLocale;
  /** 文件輸入組件本地化配置 */
  fileInput: FileInputLocale;
  /** 時間選擇器本地化配置 */
  timePicker: TimePickerLocale;
  /** 分頁組件本地化配置 */
  pagination: PaginationLocale;
  /** 評分組件本地化配置 */
  rating: RatingLocale;
}

/**
 * 導出繁體中文語言包配置
 * @default VuetifyLocaleZhHant
 */
declare const zhHantLocale: VuetifyLocaleZhHant;

export default zhHantLocale;