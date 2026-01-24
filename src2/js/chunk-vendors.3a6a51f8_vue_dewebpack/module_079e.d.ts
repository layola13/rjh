/**
 * Moment.js 日本語ロケール設定
 * Japanese locale configuration for Moment.js
 */

/**
 * 年号情報を表すインターフェース
 * Interface representing Japanese era information
 */
interface Era {
  /** 年号開始日 (ISO 8601形式) / Era start date (ISO 8601 format) */
  since: string;
  /** 年号終了日 (ISO 8601形式、オプション) / Era end date (ISO 8601 format, optional) */
  until?: string | number;
  /** オフセット値 / Offset value */
  offset: number;
  /** 年号の正式名称 / Official era name */
  name: string;
  /** 年号の短縮表記 (1文字) / Narrow era representation (single character) */
  narrow: string;
  /** 年号の略称 / Era abbreviation */
  abbr: string;
}

/**
 * 日付フォーマット設定インターフェース
 * Interface for date format configuration
 */
interface LongDateFormat {
  /** 時刻フォーマット (時:分) / Time format (hour:minute) */
  LT: string;
  /** 時刻フォーマット (秒付き) / Time format with seconds */
  LTS: string;
  /** 短い日付フォーマット / Short date format */
  L: string;
  /** 長い日付フォーマット / Long date format */
  LL: string;
  /** 日付と時刻フォーマット / Date and time format */
  LLL: string;
  /** 完全な日付と時刻フォーマット / Full date and time format */
  LLLL: string;
  /** 小文字の短い日付 / Lowercase short date */
  l: string;
  /** 小文字の長い日付 / Lowercase long date */
  ll: string;
  /** 小文字の日付と時刻 / Lowercase date and time */
  lll: string;
  /** 小文字の完全な日付と時刻 / Lowercase full date and time */
  llll: string;
}

/**
 * カレンダー表示設定インターフェース
 * Interface for calendar display configuration
 */
interface CalendarSpec {
  /** 今日の表示フォーマット / Format for today */
  sameDay: string;
  /** 明日の表示フォーマット / Format for tomorrow */
  nextDay: string;
  /** 来週の表示フォーマット関数 / Format function for next week */
  nextWeek: (now: MomentInput) => string;
  /** 昨日の表示フォーマット / Format for yesterday */
  lastDay: string;
  /** 先週の表示フォーマット関数 / Format function for last week */
  lastWeek: (now: MomentInput) => string;
  /** その他の日付の表示フォーマット / Format for other dates */
  sameElse: string;
}

/**
 * 相対時間表示設定インターフェース
 * Interface for relative time display configuration
 */
interface RelativeTimeSpec {
  /** 未来の時刻フォーマット / Future time format */
  future: string;
  /** 過去の時刻フォーマット / Past time format */
  past: string;
  /** 数秒の表示 / Display for few seconds */
  s: string;
  /** 秒数の表示 / Display for seconds */
  ss: string;
  /** 1分の表示 / Display for one minute */
  m: string;
  /** 分数の表示 / Display for minutes */
  mm: string;
  /** 1時間の表示 / Display for one hour */
  h: string;
  /** 時間数の表示 / Display for hours */
  hh: string;
  /** 1日の表示 / Display for one day */
  d: string;
  /** 日数の表示 / Display for days */
  dd: string;
  /** 1ヶ月の表示 / Display for one month */
  M: string;
  /** 月数の表示 / Display for months */
  MM: string;
  /** 1年の表示 / Display for one year */
  y: string;
  /** 年数の表示 / Display for years */
  yy: string;
}

/**
 * Moment.jsのインスタンスを表す型
 * Type representing a Moment.js instance
 */
interface MomentInput {
  /** 週番号を取得 / Get week number */
  week(): number;
}

/**
 * Moment.jsのロケール設定オブジェクト
 * Locale configuration object for Moment.js
 */
interface LocaleSpecification {
  /** 年号リスト / List of Japanese eras */
  eras: Era[];
  /** 年号の年表記の正規表現 / Regex for era year ordinal */
  eraYearOrdinalRegex: RegExp;
  /** 年号の年をパースする関数 / Function to parse era year */
  eraYearOrdinalParse: (input: string, match: RegExpMatchArray) => number;
  /** 月名リスト / List of month names */
  months: string[];
  /** 短縮月名リスト / List of short month names */
  monthsShort: string[];
  /** 曜日名リスト / List of weekday names */
  weekdays: string[];
  /** 短縮曜日名リスト / List of short weekday names */
  weekdaysShort: string[];
  /** 最短曜日名リスト / List of minimal weekday names */
  weekdaysMin: string[];
  /** 長い日付フォーマット設定 / Long date format configuration */
  longDateFormat: LongDateFormat;
  /** 午前/午後のパース用正規表現 / Regex for parsing AM/PM */
  meridiemParse: RegExp;
  /** 午後かどうかを判定する関数 / Function to determine if PM */
  isPM: (input: string) => boolean;
  /** 午前/午後の文字列を返す関数 / Function to return AM/PM string */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** カレンダー表示設定 / Calendar display configuration */
  calendar: CalendarSpec;
  /** 日の序数表記のパース用正規表現 / Regex for parsing day ordinal */
  dayOfMonthOrdinalParse: RegExp;
  /** 序数表記を生成する関数 / Function to generate ordinal */
  ordinal: (num: number, token: string) => string;
  /** 相対時間表示設定 / Relative time display configuration */
  relativeTime: RelativeTimeSpec;
}

/**
 * Moment.jsのロケール定義関数の型
 * Type for Moment.js locale definition function
 */
interface MomentStatic {
  /** ロケールを定義する / Define a locale */
  defineLocale(locale: string, config: LocaleSpecification): void;
}

/**
 * 日本語ロケール設定を定義
 * Define Japanese locale configuration
 * 
 * @param moment - Moment.jsのインスタンス / Moment.js instance
 */
declare function defineJapaneseLocale(moment: MomentStatic): void;

export { Era, LocaleSpecification, MomentStatic, defineJapaneseLocale };