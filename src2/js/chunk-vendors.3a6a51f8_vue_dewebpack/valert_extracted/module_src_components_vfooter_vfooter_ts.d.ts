import Vue from 'vue';
import { VueConstructor } from 'vue';

/**
 * VFooter component - A footer component that can be positioned absolutely, fixed, or as part of the application layout
 */
export interface VFooterProps {
  /** Height of the footer. Can be a number (px) or 'auto' */
  height?: number | string;
  
  /** Reduces the footer's width to be inset from the application's edge */
  inset?: boolean;
  
  /** Removes all padding from the footer */
  padless?: boolean;
  
  /** Specifies the HTML tag to use for the footer element */
  tag?: string;
  
  /** Positions the footer absolutely */
  absolute?: boolean;
  
  /** Fixes the footer to the bottom of the viewport */
  fixed?: boolean;
  
  /** Designates the component as part of the application layout */
  app?: boolean;
  
  /** Applies specified color to the footer background */
  color?: string;
}

/**
 * VFooter component instance
 */
export interface VFooter extends Vue {
  /** Props */
  height: number | string;
  inset: boolean;
  padless: boolean;
  tag: string;
  absolute?: boolean;
  fixed?: boolean;
  app?: boolean;
  color?: string;
  
  /** Computed properties */
  readonly applicationProperty: 'footer' | 'insetFooter';
  readonly classes: Record<string, boolean>;
  readonly computedBottom: number | undefined;
  readonly computedLeft: number | undefined;
  readonly computedRight: number | undefined;
  readonly isPositioned: boolean;
  readonly styles: Record<string, string | undefined>;
  
  /** Methods */
  updateApplication(): number;
  setBackgroundColor(color: string | undefined, data: object): object;
}

/**
 * VFooter component constructor
 */
declare const VFooter: VueConstructor<VFooter>;

export default VFooter;