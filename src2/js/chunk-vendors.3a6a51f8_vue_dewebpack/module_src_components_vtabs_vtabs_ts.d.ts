import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * Slider position and dimension data for VTabs
 */
interface SliderData {
  /** Height of the slider in pixels */
  height: number | null;
  /** Left offset position in pixels */
  left: number | null;
  /** Right offset position in pixels */
  right: number | null;
  /** Top offset position in pixels */
  top: number | null;
  /** Width of the slider in pixels */
  width: number | null;
}

/**
 * Parsed slot nodes structure
 */
interface ParsedNodes {
  /** Tab header elements */
  tab: VNode[];
  /** Custom slider component */
  slider: VNode | null;
  /** VTabsItems wrapper component */
  items: VNode | null;
  /** Individual tab item components */
  item: VNode[];
}

/**
 * VTabs component data interface
 */
interface VTabsData {
  /** Timeout ID for resize debouncing */
  resizeTimeout: number;
  /** Current slider position and dimensions */
  slider: SliderData;
  /** Transition animation duration in milliseconds */
  transitionTime: number;
}

/**
 * VTabs Component
 * 
 * A complete tabs solution that provides an easy way to organize and navigate
 * between groups of content. Supports horizontal and vertical layouts with
 * customizable appearance and behavior.
 * 
 * @example
 *