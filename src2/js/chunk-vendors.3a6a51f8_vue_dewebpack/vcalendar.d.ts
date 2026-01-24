/**
 * VCalendar component module
 * Provides calendar components for different view types (daily, weekly, monthly, category)
 */

/**
 * Base calendar component
 */
export declare class VCalendar {
  /** Component properties */
  readonly $props: VCalendarProps;
  
  /** Component methods */
  readonly $slots: VCalendarSlots;
}

/**
 * Daily view calendar component
 * Displays calendar in daily view format
 */
export declare class VCalendarDaily {
  /** Component properties */
  readonly $props: VCalendarDailyProps;
  
  /** Component methods */
  readonly $slots: VCalendarSlots;
}

/**
 * Weekly view calendar component
 * Displays calendar in weekly view format
 */
export declare class VCalendarWeekly {
  /** Component properties */
  readonly $props: VCalendarWeeklyProps;
  
  /** Component methods */
  readonly $slots: VCalendarSlots;
}

/**
 * Monthly view calendar component
 * Displays calendar in monthly view format
 */
export declare class VCalendarMonthly {
  /** Component properties */
  readonly $props: VCalendarMonthlyProps;
  
  /** Component methods */
  readonly $slots: VCalendarSlots;
}

/**
 * Category view calendar component
 * Displays calendar organized by categories
 */
export declare class VCalendarCategory {
  /** Component properties */
  readonly $props: VCalendarCategoryProps;
  
  /** Component methods */
  readonly $slots: VCalendarSlots;
}

/**
 * Calendar component properties interface
 */
export interface VCalendarProps {
  /** Calendar value (date) */
  value?: string | Date;
  
  /** Event color */
  color?: string;
  
  /** Calendar type */
  type?: 'month' | 'week' | 'day' | 'category';
}

/**
 * Daily calendar properties interface
 */
export interface VCalendarDailyProps extends VCalendarProps {
  /** Interval minutes */
  intervalMinutes?: number;
  
  /** First interval */
  firstInterval?: number;
  
  /** Interval count */
  intervalCount?: number;
}

/**
 * Weekly calendar properties interface
 */
export interface VCalendarWeeklyProps extends VCalendarProps {
  /** Weekdays to display */
  weekdays?: number[];
}

/**
 * Monthly calendar properties interface
 */
export interface VCalendarMonthlyProps extends VCalendarProps {
  /** Show adjacent months */
  showAdjacentMonths?: boolean;
}

/**
 * Category calendar properties interface
 */
export interface VCalendarCategoryProps extends VCalendarProps {
  /** Categories to display */
  categories?: string[] | Record<string, unknown>[];
}

/**
 * Calendar slots interface
 */
export interface VCalendarSlots {
  /** Default slot */
  default?: unknown;
  
  /** Day slot */
  day?: unknown;
  
  /** Event slot */
  event?: unknown;
}

/**
 * Default export containing all calendar subcomponents
 */
declare const VCalendarModule: {
  /** Vuetify subcomponents registry */
  readonly $_vuetify_subcomponents: {
    readonly VCalendar: typeof VCalendar;
    readonly VCalendarCategory: typeof VCalendarCategory;
    readonly VCalendarDaily: typeof VCalendarDaily;
    readonly VCalendarWeekly: typeof VCalendarWeekly;
    readonly VCalendarMonthly: typeof VCalendarMonthly;
  };
};

export default VCalendarModule;