/**
 * Vuetify 繁體中文（台灣）語言包類型定義
 * @module LocaleZhHant
 */

/**
 * 數據迭代器本地化配置
 */
interface DataIteratorLocale {
  /** 無結果時顯示的文本 */
  noResultsText: string;
  /** 加載中顯示的文本 */
  loadingText: string;
}

/**
 * 數據表格 ARIA 標籤配置
 */
interface DataTableAriaLabel {
  /** 降序排列的 ARIA 標籤 */
  sortDescending: string;
  /** 升序排列的 ARIA 標籤 */
  sortAscending: string;
  /** 無排序狀態的 ARIA 標籤 */
  sortNone: string;
  /** 移除排序的 ARIA 標籤 */
  activateNone: string;
  /** 激活降序排列的 ARIA 標籤 */
  activateDescending: string;
  /** 激活升序排列的 ARIA 標籤 */
  activateAscending: string;
}

/**
 * 數據表格本地化配置
 */
interface DataTableLocale {
  /** 每頁顯示行數的標籤文本 */
  itemsPerPageText: string;
  /** ARIA 無障礙標籤配置 */
  ariaLabel: DataTableAriaLabel;
  /** 排序方式標籤 */
  sortBy: string;
}

/**
 * 數據頁腳本地化配置
 */
interface DataFooterLocale {
  /** 每頁項目數的標籤文本 */
  itemsPerPageText: string;
  /** 顯示全部項目的標籤 */
  itemsPerPageAll: string;
  /** 下一頁按鈕文本 */
  nextPage: string;
  /** 上一頁按鈕文本 */
  prevPage: string;
  /** 第一頁按鈕文本 */
  firstPage: string;
  /** 最後一頁按鈕文本 */
  lastPage: string;
  /** 頁碼範圍文本模板，{0}=起始索引, {1}=結束索引, {2}=總數 */
  pageText: string;
}

/**
 * 日期選擇器本地化配置
 */
interface DatePickerLocale {
  /** 已選擇項目數的文本模板，{0}=數量 */
  itemsSelected: string;
  /** 下個月按鈕的 ARIA 標籤 */
  nextMonthAriaLabel: string;
  /** 明年按鈕的 ARIA 標籤 */
  nextYearAriaLabel: string;
  /** 上個月按鈕的 ARIA 標籤 */
  prevMonthAriaLabel: string;
  /** 去年按鈕的 ARIA 標籤 */
  prevYearAriaLabel: string;
}

/**
 * 輪播組件 ARIA 標籤配置
 */
interface CarouselAriaLabel {
  /** 輪播項分隔符 ARIA 標籤，{0}=當前索引, {1}=總數 */
  delimiter: string;
}

/**
 * 輪播組件本地化配置
 */
interface CarouselLocale {
  /** 上一張按鈕文本 */
  prev: string;
  /** 下一張按鈕文本 */
  next: string;
  /** ARIA 無障礙標籤配置 */
  ariaLabel: CarouselAriaLabel;
}

/**
 * 日曆組件本地化配置
 */
interface CalendarLocale {
  /** 顯示更多事件的文本模板，{0}=數量 */
  moreEvents: string;
}

/**
 * 文件輸入組件本地化配置
 */
interface FileInputLocale {
  /** 文件數量文本模板，{0}=數量 */
  counter: string;
  /** 文件數量和大小文本模板，{0}=數量, {1}=總大小 */
  counterSize: string;
}

/**
 * 時間選擇器本地化配置
 */
interface TimePickerLocale {
  /** 上午標識 */
  am: string;
  /** 下午標識 */
  pm: string;
}

/**
 * 分頁組件 ARIA 標籤配置
 */
interface PaginationAriaLabel {
  /** 分頁容器的 ARIA 標籤 */
  wrapper: string;
  /** 下一頁按鈕的 ARIA 標籤 */
  next: string;
  /** 上一頁按鈕的 ARIA 標籤 */
  previous: string;
  /** 跳轉到指定頁面的 ARIA 標籤模板，{0}=頁碼 */
  page: string;
  /** 當前頁面的 ARIA 標籤模板，{0}=頁碼 */
  currentPage: string;
}

/**
 * 分頁組件本地化配置
 */
interface PaginationLocale {
  /** ARIA 無障礙標籤配置 */
  ariaLabel: PaginationAriaLabel;
}

/**
 * 評分組件 ARIA 標籤配置
 */
interface RatingAriaLabel {
  /** 評分圖標的 ARIA 標籤模板，{0}=當前值, {1}=最大值 */
  icon: string;
}

/**
 * 評分組件本地化配置
 */
interface RatingLocale {
  /** ARIA 無障礙標籤配置 */
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
  /** 數據迭代器本地化 */
  dataIterator: DataIteratorLocale;
  /** 數據表格本地化 */
  dataTable: DataTableLocale;
  /** 數據頁腳本地化 */
  dataFooter: DataFooterLocale;
  /** 日期選擇器本地化 */
  datePicker: DatePickerLocale;
  /** 無數據時顯示的文本 */
  noDataText: string;
  /** 輪播組件本地化 */
  carousel: CarouselLocale;
  /** 日曆組件本地化 */
  calendar: CalendarLocale;
  /** 文件輸入組件本地化 */
  fileInput: FileInputLocale;
  /** 時間選擇器本地化 */
  timePicker: TimePickerLocale;
  /** 分頁組件本地化 */
  pagination: PaginationLocale;
  /** 評分組件本地化 */
  rating: RatingLocale;
}

/**
 * 繁體中文（台灣）語言包默認導出
 */
declare const zhHantLocale: VuetifyLocaleZhHant;

export default zhHantLocale;