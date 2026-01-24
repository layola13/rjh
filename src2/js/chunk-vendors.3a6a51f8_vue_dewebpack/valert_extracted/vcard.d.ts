/**
 * VCard Component Module
 * Provides card component and related subcomponents for Vuetify
 */

import { VNode } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * VCard - Main card component
 * A versatile component used to display content in a contained, elevated surface
 */
export declare const VCard: {
  new (): {
    $props: VCardProps;
  };
};

/**
 * VCardActions - Card actions container
 * Used to contain action buttons or interactive elements at the bottom of a card
 */
export declare const VCardActions: FunctionalComponentOptions<Record<string, unknown>, VCardActionsProps>;

/**
 * VCardSubtitle - Card subtitle component
 * Displays secondary text below the card title
 */
export declare const VCardSubtitle: FunctionalComponentOptions<Record<string, unknown>, VCardSubtitleProps>;

/**
 * VCardText - Card text content component
 * Contains the main text content of the card
 */
export declare const VCardText: FunctionalComponentOptions<Record<string, unknown>, VCardTextProps>;

/**
 * VCardTitle - Card title component
 * Displays the primary heading text of the card
 */
export declare const VCardTitle: FunctionalComponentOptions<Record<string, unknown>, VCardTitleProps>;

/**
 * Props for VCard component
 */
export interface VCardProps {
  /** Applies the color to the component */
  color?: string;
  /** Removes elevation (box-shadow) and adds a thin border */
  outlined?: boolean;
  /** Applies a large border radius */
  rounded?: boolean;
  /** Designates an elevation applied to the component (0-24) */
  elevation?: number | string;
  /** Removes the component's border-radius */
  flat?: boolean;
  /** Applies a hover class when hovering over the component */
  hover?: boolean;
  /** Sets the height for the component */
  height?: number | string;
  /** Sets the maximum height for the component */
  maxHeight?: number | string;
  /** Sets the maximum width for the component */
  maxWidth?: number | string;
  /** Sets the minimum height for the component */
  minHeight?: number | string;
  /** Sets the minimum width for the component */
  minWidth?: number | string;
  /** Sets the width for the component */
  width?: number | string;
  /** Applies specified color to the control's text */
  textColor?: string;
  /** Removes the ability to click or target the component */
  disabled?: boolean;
  /** Sets the component as a link and applies the href attribute */
  href?: string;
  /** Specifies the link is a nuxt-link */
  nuxt?: boolean;
  /** Designates the component as anchor and applies the href attribute */
  to?: string | object;
  /** Configure the active CSS class applied when the link is active */
  activeClass?: string;
  /** Designates that the component is a link */
  link?: boolean;
  /** Applies the loading class to the component */
  loading?: boolean | string;
  /** Removes the card's padding */
  tile?: boolean;
}

/**
 * Props for VCardActions component
 */
export interface VCardActionsProps {
  /** CSS classes to apply to the component */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles to apply to the component */
  style?: string | Record<string, string | number>;
}

/**
 * Props for VCardSubtitle component
 */
export interface VCardSubtitleProps {
  /** CSS classes to apply to the component */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles to apply to the component */
  style?: string | Record<string, string | number>;
}

/**
 * Props for VCardText component
 */
export interface VCardTextProps {
  /** CSS classes to apply to the component */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles to apply to the component */
  style?: string | Record<string, string | number>;
}

/**
 * Props for VCardTitle component
 */
export interface VCardTitleProps {
  /** CSS classes to apply to the component */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles to apply to the component */
  style?: string | Record<string, string | number>;
}

/**
 * Default export containing all VCard subcomponents
 */
declare const _default: {
  $_vuetify_subcomponents: {
    VCard: typeof VCard;
    VCardActions: typeof VCardActions;
    VCardSubtitle: typeof VCardSubtitle;
    VCardText: typeof VCardText;
    VCardTitle: typeof VCardTitle;
  };
};

export default _default;