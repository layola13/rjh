/**
 * VFooter Component Declaration
 * A footer component that can be fixed, absolute, or part of the application layout
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { VSheet } from '../VSheet/VSheet';

/**
 * Props for the VFooter component
 */
export interface VFooterProps {
  /** Height of the footer. Can be a number (px) or 'auto' */
  height?: number | string;
  
  /** Reduces the footer width to leave space for navigation drawer */
  inset?: boolean;
  
  /** Removes all padding from the footer */
  padless?: boolean;
  
  /** Specify a custom HTML tag to use for the footer element */
  tag?: string;
  
  /** Positions the footer absolutely */
  absolute?: boolean;
  
  /** Positions the footer fixed */
  fixed?: boolean;
  
  /** Designates the component as part of the application layout */
  app?: boolean;
  
  /** Applies specified color to the background */
  color?: string;
}

/**
 * VFooter Component
 * 
 * The footer component is a versatile element that can be positioned at the bottom
 * of the page either absolutely, fixed, or as part of the application layout system.
 * It extends VSheet and inherits all of its properties.
 */
export interface VFooter extends Vue {
  /** Computed property that determines which application property to update */
  readonly applicationProperty: 'insetFooter' | 'footer';
  
  /** Computed classes for the footer element */
  readonly classes: Record<string, boolean>;
  
  /** Computed bottom position value */
  readonly computedBottom: number | undefined;
  
  /** Computed left position value */
  readonly computedLeft: number | undefined;
  
  /** Computed right position value */
  readonly computedRight: number | undefined;
  
  /** Determines if the footer is positioned (absolute, fixed, or app) */
  readonly isPositioned: boolean;
  
  /** Computed styles for the footer element */
  readonly styles: Record<string, string | undefined>;
  
  /** Updates the application layout with footer dimensions */
  updateApplication(): number;
  
  /** Render function */
  $createElement(tag: string, data: any, children: VNode[] | undefined): VNode;
}

/**
 * VFooter Component Constructor
 */
export interface VFooterConstructor extends VueConstructor<VFooter> {
  options: {
    name: 'v-footer';
    props: VFooterProps;
  };
}

declare const VFooter: VFooterConstructor;

export default VFooter;