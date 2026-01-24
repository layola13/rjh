/**
 * Moment.js v2.29.1 TypeScript Declarations
 * A JavaScript date library for parsing, validating, manipulating, and formatting dates.
 * @see https://momentjs.com/
 * @license MIT
 */

declare module 'moment' {
  type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | null | undefined;
  
  type MomentFormatSpecification = string | string[];
  
  type MomentUnitOfTime = (
    'year' | 'years' | 'y' |
    'month' | 'months' | 'M' |
    'week' | 'weeks' | 'w' |
    'day' | 'days' | 'd' |
    'hour' | 'hours' | 'h' |
    'minute' | 'minutes' | 'm' |
    'second' | 'seconds' | 's' |
    'millisecond' | 'milliseconds' | 'ms'
  );

  type DurationUnitOfTime = (
    'year' | 'years' | 'y' |
    'quarter' | 'quarters' | 'Q' |
    'month' | 'months' | 'M' |
    'week' | 'weeks' | 'w' |
    'day' | 'days' | 'd' |
    'hour' | 'hours' | 'h' |
    'minute' | 'minutes' | 'm' |
    'second' | 'seconds' | 's' |
    'millisecond' | 'milliseconds' | 'ms'
  );

  type StartOfUnit = (
    'year' | 'month' | 'quarter' | 'week' | 'isoWeek' |
    'day' | 'date' | 'hour' | 'minute' | 'second'
  );

  interface MomentInputObject {
    years?: number;
    year?: number;
    y?: number;
    months?: number;
    month?: number;
    M?: number;
    days?: number;
    day?: number;
    d?: number;
    dates?: number;
    date?: number;
    D?: number;
    hours?: number;
    hour?: number;
    h?: number;
    minutes?: number;
    minute?: number;
    m?: number;
    seconds?: number;
    second?: number;
    s?: number;
    milliseconds?: number;
    millisecond?: number;
    ms?: number;
  }

  interface Duration {
    clone(): Duration;
    humanize(withSuffix?: boolean): string;
    abs(): Duration;
    as(unit: DurationUnitOfTime): number;
    get(unit: DurationUnitOfTime): number;
    milliseconds(): number;
    asMilliseconds(): number;
    seconds(): number;
    asSeconds(): number;
    minutes(): number;
    asMinutes(): number;
    hours(): number;
    asHours(): number;
    days(): number;
    asDays(): number;
    weeks(): number;
    asWeeks(): number;
    months(): number;
    asMonths(): number;
    years(): number;
    asYears(): number;
    add(value: number | Duration, unit?: DurationUnitOfTime): Duration;
    subtract(value: number | Duration, unit?: DurationUnitOfTime): Duration;
    locale(locale?: string): string | Duration;
    localeData(): Locale;
    toISOString(): string;
    toJSON(): string;
    isValid(): boolean;
  }

  interface MomentParsingFlags {
    empty: boolean;
    unusedTokens: string[];
    unusedInput: string[];
    overflow: number;
    charsLeftOver: number;
    nullInput: boolean;
    invalidMonth: string | null;
    invalidFormat: boolean;
    userInvalidated: boolean;
    iso: boolean;
    parsedDateParts: (number | null)[];
    meridiem: string | null;
    rfc2822: boolean;
    weekdayMismatch: boolean;
  }

  interface CalendarSpec {
    sameDay?: string | ((moment?: Moment) => string);
    nextDay?: string | ((moment?: Moment) => string);
    nextWeek?: string | ((moment?: Moment) => string);
    lastDay?: string | ((moment?: Moment) => string);
    lastWeek?: string | ((moment?: Moment) => string);
    sameElse?: string | ((moment?: Moment) => string);
    [key: string]: string | ((moment?: Moment) => string) | undefined;
  }

  interface LocaleSpecification {
    months?: string[] | ((moment: Moment, format?: string) => string);
    monthsShort?: string[] | ((moment: Moment, format?: string) => string);
    weekdays?: string[] | ((moment: Moment, format?: string) => string);
    weekdaysShort?: string[] | ((moment: Moment, format?: string) => string);
    weekdaysMin?: string[] | ((moment: Moment, format?: string) => string);
    relativeTime?: {
      future: string | ((diff: string) => string);
      past: string | ((diff: string) => string);
      s: string | ((num: number) => string);
      ss?: string | ((num: number) => string);
      m: string | ((num: number) => string);
      mm: string | ((num: number) => string);
      h: string | ((num: number) => string);
      hh: string | ((num: number) => string);
      d: string | ((num: number) => string);
      dd: string | ((num: number) => string);
      M: string | ((num: number) => string);
      MM: string | ((num: number) => string);
      y: string | ((num: number) => string);
      yy: string | ((num: number) => string);
    };
    ordinal?: (num: number) => string;
    week?: {
      dow: number;
      doy: number;
    };
    invalidDate?: string;
    calendar?: CalendarSpec;
    longDateFormat?: {
      LT: string;
      LTS: string;
      L: string;
      LL: string;
      LLL: string;
      LLLL: string;
      [key: string]: string;
    };
    meridiemParse?: RegExp;
    isPM?: (input: string) => boolean;
    meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;
  }

  interface Locale {
    calendar(key: string, moment: Moment, now: Moment): string;
    longDateFormat(key: string): string;
    invalidDate(): string;
    ordinal(num: number): string;
    preparse(input: string): string;
    postformat(input: string): string;
    relativeTime(num: number, withoutSuffix: boolean, key: string, isFuture: boolean): string;
    pastFuture(diff: number, output: string): string;
    set(config: LocaleSpecification): void;
    months(moment?: Moment, format?: string): string | string[];
    monthsShort(moment?: Moment, format?: string): string | string[];
    monthsParse(monthName: string, format?: string, strict?: boolean): number | null;
    weekdays(moment?: Moment, format?: string): string | string[];
    weekdaysShort(moment?: Moment): string | string[];
    weekdaysMin(moment?: Moment): string | string[];
    weekdaysParse(weekdayName: string, format?: string, strict?: boolean): number | null;
    isPM(input: string): boolean;
    meridiem(hour: number, minute: number, isLowercase: boolean): string;
    week(moment: Moment): number;
    firstDayOfYear(): number;
    firstDayOfWeek(): number;
  }

  interface Moment {
    format(format?: string): string;
    startOf(unit: StartOfUnit): Moment;
    endOf(unit: StartOfUnit): Moment;
    add(amount: number | Duration, unit?: MomentUnitOfTime): Moment;
    add(amount: DurationInputObject): Moment;
    subtract(amount: number | Duration, unit?: MomentUnitOfTime): Moment;
    subtract(amount: DurationInputObject): Moment;
    calendar(referenceTime?: MomentInput, formats?: CalendarSpec): string;
    clone(): Moment;
    valueOf(): number;
    local(keepLocalTime?: boolean): Moment;
    isLocal(): boolean;
    utc(keepLocalTime?: boolean): Moment;
    isUTC(): boolean;
    isUtc(): boolean;
    parseZone(): Moment;
    isValid(): boolean;
    invalidAt(): number;
    creationData(): MomentCreationData;
    parsingFlags(): MomentParsingFlags;
    year(y?: number): number | Moment;
    years(y?: number): number | Moment;
    quarter(): number;
    quarter(q: number): Moment;
    quarters(): number;
    quarters(q: number): Moment;
    month(M?: number | string): number | Moment;
    months(M?: number | string): number | Moment;
    day(d?: number | string): number | Moment;
    days(d?: number | string): number | Moment;
    date(d?: number): number | Moment;
    dates(d?: number): number | Moment;
    weekday(d?: number): number | Moment;
    isoWeekday(d?: number | string): number | Moment;
    dayOfYear(d?: number): number | Moment;
    week(w?: number): number | Moment;
    weeks(w?: number): number | Moment;
    isoWeek(w?: number): number | Moment;
    isoWeeks(w?: number): number | Moment;
    weeksInYear(): number;
    isoWeeksInYear(): number;
    hour(h?: number): number | Moment;
    hours(h?: number): number | Moment;
    minute(m?: number): number | Moment;
    minutes(m?: number): number | Moment;
    second(s?: number): number | Moment;
    seconds(s?: number): number | Moment;
    millisecond(ms?: number): number | Moment;
    milliseconds(ms?: number): number | Moment;
    weekYear(y?: number): number | Moment;
    isoWeekYear(y?: number): number | Moment;
    get(unit: MomentUnitOfTime): number;
    set(unit: MomentUnitOfTime, value: number): Moment;
    set(objectLiteral: MomentInputObject): Moment;
    toDate(): Date;
    toArray(): number[];
    toJSON(): string;
    toISOString(keepOffset?: boolean): string;
    toObject(): MomentObjectOutput;
    unix(): number;
    inspect(): string;
    isBefore(date?: MomentInput, unit?: MomentUnitOfTime): boolean;
    isAfter(date?: MomentInput, unit?: MomentUnitOfTime): boolean;
    isSame(date?: MomentInput, unit?: MomentUnitOfTime): boolean;
    isSameOrAfter(date?: MomentInput, unit?: MomentUnitOfTime): boolean;
    isSameOrBefore(date?: MomentInput, unit?: MomentUnitOfTime): boolean;
    isBetween(from: MomentInput, to: MomentInput, unit?: MomentUnitOfTime, inclusivity?: '()' | '[)' | '(]' | '[]'): boolean;
    isDST(): boolean;
    isLeapYear(): boolean;
    utcOffset(): number;
    utcOffset(offset: number | string, keepLocalTime?: boolean): Moment;
    daysInMonth(): number;
    diff(date: MomentInput, unit?: MomentUnitOfTime, precise?: boolean): number;
    from(date: MomentInput, withoutSuffix?: boolean): string;
    fromNow(withoutSuffix?: boolean): string;
    to(date: MomentInput, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
    locale(locale?: string): string | Moment;
    localeData(): Locale;
    lang(locale: string): Moment;
    lang(): Locale;
    isDSTShifted(): boolean;
    zoneAbbr(): string;
    zoneName(): string;
    hasAlignedHourOffset(other?: MomentInput): boolean;
    isUtcOffset(): boolean;
    max(date?: MomentInput): Moment;
    min(date?: MomentInput): Moment;
  }

  interface MomentCreationData {
    input: MomentInput;
    format?: MomentFormatSpecification;
    locale: Locale;
    isUTC: boolean;
    strict?: boolean;
  }

  interface MomentObjectOutput {
    years: number;
    months: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }

  interface DurationInputObject {
    years?: number;
    year?: number;
    y?: number;
    quarters?: number;
    quarter?: number;
    Q?: number;
    months?: number;
    month?: number;
    M?: number;
    weeks?: number;
    week?: number;
    w?: number;
    days?: number;
    day?: number;
    d?: number;
    hours?: number;
    hour?: number;
    h?: number;
    minutes?: number;
    minute?: number;
    m?: number;
    seconds?: number;
    second?: number;
    s?: number;
    milliseconds?: number;
    millisecond?: number;
    ms?: number;
  }

  interface MomentStatic {
    version: string;
    fn: Moment;
    
    (): Moment;
    (date: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
    (date: MomentInput, format?: MomentFormatSpecification, locale?: string, strict?: boolean): Moment;
    
    utc(): Moment;
    utc(date: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
    utc(date: MomentInput, format?: MomentFormatSpecification, locale?: string, strict?: boolean): Moment;
    
    unix(timestamp: number): Moment;
    
    invalid(flags?: MomentParsingFlags): Moment;
    
    isMoment(value: unknown): value is Moment;
    isDate(value: unknown): value is Date;
    isDuration(value: unknown): value is Duration;
    
    locale(locale?: string): string;
    locale(locale: string, specification?: LocaleSpecification): string;
    
    updateLocale(locale: string, specification?: LocaleSpecification): Locale | null;
    
    localeData(locale?: string): Locale;
    
    duration(value?: number | string | Duration | DurationInputObject, unit?: DurationUnitOfTime): Duration;
    
    parseZone(date?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
    
    months(): string[];
    months(format: string): string[];
    months(format: string, index: number): string;
    monthsShort(): string[];
    monthsShort(format: string): string[];
    monthsShort(format: string, index: number): string;
    
    weekdays(): string[];
    weekdays(format: string): string[];
    weekdays(localeSorted: boolean, format?: string): string[];
    weekdays(localeSorted: boolean, format: string, index: number): string;
    weekdaysShort(): string[];
    weekdaysShort(format: string): string[];
    weekdaysShort(localeSorted: boolean, format?: string): string[];
    weekdaysShort(localeSorted: boolean, format: string, index: number): string;
    weekdaysMin(): string[];
    weekdaysMin(format: string): string[];
    weekdaysMin(localeSorted: boolean, format?: string): string[];
    weekdaysMin(localeSorted: boolean, format: string, index: number): string;
    
    min(...moments: (Moment | MomentInput)[]): Moment;
    max(...moments: (Moment | MomentInput)[]): Moment;
    
    now(): number;
    
    normalizeUnits(unit?: string): MomentUnitOfTime | undefined;
    relativeTimeThreshold(threshold: string): number | boolean;
    relativeTimeThreshold(threshold: string, limit: number): boolean;
    relativeTimeRounding(fn?: (num: number) => number): (num: number) => number;
    
    calendarFormat(moment: Moment, now: Moment): string;
    
    parseTwoDigitYear(input: string): number;
    
    defaultFormat: string;
    defaultFormatUtc: string;
    
    ISO_8601: () => void;
    RFC_2822: () => void;
    
    HTML5_FMT: {
      DATETIME_LOCAL: string;
      DATETIME_LOCAL_SECONDS: string;
      DATETIME_LOCAL_MS: string;
      DATE: string;
      TIME: string;
      TIME_SECONDS: string;
      TIME_MS: string;
      WEEK: string;
      MONTH: string;
    };
    
    suppressDeprecationWarnings: boolean;
    deprecationHandler: ((name: string, msg: string) => void) | null;
    
    updateOffset(moment: Moment, keepTime?: boolean): void;
  }

  const moment: MomentStatic;
  export = moment;
  export as namespace moment;
}