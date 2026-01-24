/**
 * VCard component module
 * Provides a material design card component and its subcomponents
 */

import { VNode } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * VCard actions container component
 * Renders a container for card action buttons (typically at the bottom of the card)
 */
export const VCardActions: FunctionalComponentOptions;

/**
 * VCard subtitle component
 * Displays secondary text below the card title
 */
export const VCardSubtitle: FunctionalComponentOptions;

/**
 * VCard text component
 * Container for the main text content of the card
 */
export const VCardText: FunctionalComponentOptions;

/**
 * VCard title component
 * Displays the primary heading text of the card
 */
export const VCardTitle: FunctionalComponentOptions;

/**
 * Main VCard component
 * A material design card container that can hold various subcomponents
 */
export const VCard: FunctionalComponentOptions;

/**
 * Default export containing all VCard subcomponents
 * Used for Vuetify's internal component registration system
 */
export default interface VCardModule {
  /**
   * Internal Vuetify subcomponents registry
   */
  $_vuetify_subcomponents: {
    VCard: typeof VCard;
    VCardActions: typeof VCardActions;
    VCardSubtitle: typeof VCardSubtitle;
    VCardText: typeof VCardText;
    VCardTitle: typeof VCardTitle;
  };
}