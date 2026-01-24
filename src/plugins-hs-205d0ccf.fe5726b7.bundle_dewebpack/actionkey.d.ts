/**
 * Card action tooltip component module
 * Provides action key enumeration and tooltip rendering functionality
 */

/**
 * Enumeration of available card actions
 */
export enum ActionKey {
  /** Delete action */
  Delete = 0,
  /** Download action */
  Download = 1,
  /** Share action */
  Share = 2,
  /** Mark/Bookmark action */
  Mark = 3,
  /** Generate action */
  Generate = 4,
  /** Upgrade action */
  Upgrade = 5,
  /** Feedback action */
  FeedBack = 6,
}

/**
 * Style configuration for icon components
 */
interface IconCustomStyle {
  fontSize: string;
  color: string;
}

/**
 * Individual tooltip item configuration
 */
interface TooltipItem {
  /** Unique identifier for the tooltip item */
  key: ActionKey;
  /** Localization key for the tooltip title */
  title: string;
  /** Icon type identifier */
  icon: string;
  /** Whether this item is disabled */
  disable?: boolean;
  /** Callback function invoked when item is clicked */
  callback?: () => void;
}

/**
 * Props for the CardTooltip component
 */
interface CardTooltipProps {
  /** Array of tooltip items to display */
  tooltipItems: TooltipItem[];
}

/**
 * Renders a card tooltip with multiple action items
 * Filters out disabled items and displays interactive icons with tooltips
 * 
 * @param props - Component properties
 * @returns React element containing tooltip items
 */
export declare function CardTooltip(props: CardTooltipProps): JSX.Element;

/**
 * Global resource manager for internationalization
 */
declare global {
  const ResourceManager: {
    /**
     * Retrieves a localized string by key
     * @param key - Localization key
     * @returns Translated string
     */
    getString(key: string): string;
  };
}