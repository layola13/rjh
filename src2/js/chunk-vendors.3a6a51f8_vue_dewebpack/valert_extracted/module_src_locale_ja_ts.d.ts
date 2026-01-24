/**
 * 日本語ロケール定義
 * Vuetify コンポーネントの日本語翻訳
 */
declare module '@/locale/ja' {
  /**
   * バッジコンポーネントのラベル
   */
  export interface BadgeLocale {
    badge: string;
  }

  /**
   * データイテレーターコンポーネントのローカライゼーション
   */
  export interface DataIteratorLocale {
    /** 検索結果が見つからない場合のメッセージ */
    noResultsText: string;
    /** データ読み込み中のメッセージ */
    loadingText: string;
  }

  /**
   * データテーブルのアクセシビリティラベル
   */
  export interface DataTableAriaLabel {
    /** 降順ソートのラベル */
    sortDescending: string;
    /** 昇順ソートのラベル */
    sortAscending: string;
    /** ソート未適用のラベル */
    sortNone: string;
    /** ソート解除の説明 */
    activateNone: string;
    /** 降順ソート有効化の説明 */
    activateDescending: string;
    /** 昇順ソート有効化の説明 */
    activateAscending: string;
  }

  /**
   * データテーブルコンポーネントのローカライゼーション
   */
  export interface DataTableLocale {
    /** 1ページあたりの表示件数のラベル */
    itemsPerPageText: string;
    /** アクセシビリティラベル */
    ariaLabel: DataTableAriaLabel;
    /** ソート方式のラベル */
    sortBy: string;
  }

  /**
   * データフッターコンポーネントのローカライゼーション
   */
  export interface DataFooterLocale {
    /** 1ページあたりの件数のラベル */
    itemsPerPageText: string;
    /** すべて表示のラベル */
    itemsPerPageAll: string;
    /** 次ページボタンのラベル */
    nextPage: string;
    /** 前ページボタンのラベル */
    prevPage: string;
    /** 最初のページボタンのラベル */
    firstPage: string;
    /** 最後のページボタンのラベル */
    lastPage: string;
    /** ページ情報テキスト（{0}-{1} 件目 / {2}件） */
    pageText: string;
  }

  /**
   * 日付ピッカーコンポーネントのローカライゼーション
   */
  export interface DatePickerLocale {
    /** 選択された日付数の表示（{0}日付選択） */
    itemsSelected: string;
    /** 来月ボタンのアクセシビリティラベル */
    nextMonthAriaLabel: string;
    /** 来年ボタンのアクセシビリティラベル */
    nextYearAriaLabel: string;
    /** 前月ボタンのアクセシビリティラベル */
    prevMonthAriaLabel: string;
    /** 前年ボタンのアクセシビリティラベル */
    prevYearAriaLabel: string;
  }

  /**
   * カルーセルのアクセシビリティラベル
   */
  export interface CarouselAriaLabel {
    /** スライド位置の説明（カルーセルのスライド {0}件目 / {1}件） */
    delimiter: string;
  }

  /**
   * カルーセルコンポーネントのローカライゼーション
   */
  export interface CarouselLocale {
    /** 前へボタンのラベル */
    prev: string;
    /** 次へボタンのラベル */
    next: string;
    /** アクセシビリティラベル */
    ariaLabel: CarouselAriaLabel;
  }

  /**
   * カレンダーコンポーネントのローカライゼーション
   */
  export interface CalendarLocale {
    /** さらに表示のラベル（さらに{0}） */
    moreEvents: string;
  }

  /**
   * ファイル入力コンポーネントのローカライゼーション
   */
  export interface FileInputLocale {
    /** ファイル数の表示（{0} ファイル） */
    counter: string;
    /** ファイル数とサイズの表示（{0} ファイル (合計 {1})） */
    counterSize: string;
  }

  /**
   * 時刻ピッカーコンポーネントのローカライゼーション
   */
  export interface TimePickerLocale {
    /** 午前のラベル */
    am: string;
    /** 午後のラベル */
    pm: string;
  }

  /**
   * ページネーションのアクセシビリティラベル
   */
  export interface PaginationAriaLabel {
    /** ページネーション全体のラベル */
    wrapper: string;
    /** 次ページのラベル */
    next: string;
    /** 前ページのラベル */
    previous: string;
    /** 特定ページへの移動ラベル（{0}ページ目に移動） */
    page: string;
    /** 現在のページラベル（現在のページ、ページ {0}） */
    currentPage: string;
  }

  /**
   * ページネーションコンポーネントのローカライゼーション
   */
  export interface PaginationLocale {
    /** アクセシビリティラベル */
    ariaLabel: PaginationAriaLabel;
  }

  /**
   * 評価（レーティング）のアクセシビリティラベル
   */
  export interface RatingAriaLabel {
    /** 評価アイコンのラベル（Rating {0} of {1}） */
    icon: string;
  }

  /**
   * 評価（レーティング）コンポーネントのローカライゼーション
   */
  export interface RatingLocale {
    /** アクセシビリティラベル */
    ariaLabel: RatingAriaLabel;
  }

  /**
   * 日本語ロケールオブジェクト
   * Vuetify コンポーネント全体の日本語翻訳を提供
   */
  export interface JapaneseLocale {
    /** バッジのラベル */
    badge: string;
    /** 閉じるボタンのラベル */
    close: string;
    /** データイテレーター */
    dataIterator: DataIteratorLocale;
    /** データテーブル */
    dataTable: DataTableLocale;
    /** データフッター */
    dataFooter: DataFooterLocale;
    /** 日付ピッカー */
    datePicker: DatePickerLocale;
    /** データなしメッセージ */
    noDataText: string;
    /** カルーセル */
    carousel: CarouselLocale;
    /** カレンダー */
    calendar: CalendarLocale;
    /** ファイル入力 */
    fileInput: FileInputLocale;
    /** 時刻ピッカー */
    timePicker: TimePickerLocale;
    /** ページネーション */
    pagination: PaginationLocale;
    /** 評価 */
    rating: RatingLocale;
  }

  /**
   * 日本語ロケール定義のデフォルトエクスポート
   */
  const locale: JapaneseLocale;
  export default locale;
}