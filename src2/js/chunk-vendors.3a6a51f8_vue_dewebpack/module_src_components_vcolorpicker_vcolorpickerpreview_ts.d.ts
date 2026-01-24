import type { VNode, PropType } from 'vue';
import type { VSlider } from '../VSlider/VSlider';

/**
 * Color object interface containing various color representations
 */
interface ColorObject {
  /** HSV color with alpha channel */
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  /** RGB color with alpha channel */
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  /** Hue value (0-360) */
  hue: number;
  /** Alpha/opacity value (0-1) */
  alpha: number;
}

/**
 * Props for VColorPickerPreview component
 */
interface VColorPickerPreviewProps {
  /** Current color object */
  color: ColorObject;
  /** Whether the color picker is disabled */
  disabled: boolean;
  /** Whether to hide the alpha/opacity slider */
  hideAlpha: boolean;
}

/**
 * Track configuration for slider components
 */
interface TrackConfig {
  staticClass?: string;
  props?: {
    thumbColor?: string;
    hideDetails?: boolean;
    value?: number;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
  };
  style?: Partial<CSSStyleDeclaration> | Record<string, string>;
  on?: Record<string, (...args: any[]) => void>;
}

/**
 * VColorPickerPreview component
 * Displays a preview of the selected color with hue and alpha sliders
 */
declare const VColorPickerPreview: {
  name: 'v-color-picker-preview';
  
  props: {
    /** Color object containing hsva, rgba, hue, and alpha values */
    color: PropType<ColorObject>;
    /** Disables interaction with the preview controls */
    disabled: PropType<boolean>;
    /** Hides the alpha/opacity slider */
    hideAlpha: PropType<boolean>;
  };

  methods: {
    /**
     * Generates the alpha/opacity slider track
     * @returns VNode for the alpha slider
     */
    genAlpha(): VNode;

    /**
     * Generates the container for hue and alpha sliders
     * @returns VNode containing slider tracks
     */
    genSliders(): VNode;

    /**
     * Generates the color preview dot
     * @returns VNode for the color dot display
     */
    genDot(): VNode;

    /**
     * Generates the hue slider track
     * @returns VNode for the hue slider
     */
    genHue(): VNode;

    /**
     * Generates a slider track with specified configuration
     * @param config - Track configuration object
     * @returns VNode for the configured slider track
     */
    genTrack(config: TrackConfig): VNode;
  };

  /**
   * Render function for the component
   * @param createElement - Vue's createElement function
   * @returns VNode for the complete preview component
   */
  render(createElement: typeof import('vue').h): VNode;
};

export default VColorPickerPreview;