/**
 * Vue Color Picker Component
 * A customizable color picker component with various display modes and swatch support
 */

/**
 * Component data state
 */
interface ColorPickerData {
  /** Whether the color picker dropdown is visible */
  show_color: boolean;
  /** Currently selected color value */
  color: string;
}

/**
 * Component props definition
 */
interface ColorPickerProps {
  /** Initial color value to display */
  initialColor: {
    type: StringConstructor;
    default: string;
  };
  /** Whether to use large size variant */
  big: {
    type: BooleanConstructor;
    default: boolean;
  };
  /** Color format mode (e.g., 'rgba', 'hex', 'hsla') */
  mode: {
    type: StringConstructor;
    default: string;
  };
  /** Whether to position dropdown menu above the trigger */
  top: {
    type: BooleanConstructor;
    default: boolean;
  };
  /** Whether to display color swatches panel */
  showSwatches: {
    type: BooleanConstructor;
    default: boolean;
  };
  /** Array of predefined color swatches */
  swatches: {
    default: () => string[];
  };
}

/**
 * Component computed properties
 */
interface ColorPickerComputed {
  /** Style object for the color display block */
  color_block_style: {
    backgroundColor: string;
    height: string;
  };
}

/**
 * Component methods
 */
interface ColorPickerMethods {
  /**
   * Emits the selected color to parent component
   * @param color - The selected color value
   */
  pickColor(color: string): void;
}

/**
 * Component lifecycle hooks
 */
interface ColorPickerLifecycle {
  /**
   * Initializes component with initial color value
   */
  mounted(): void;
}

/**
 * Component watchers
 */
interface ColorPickerWatchers {
  /**
   * Watches for changes to initialColor prop
   * @param newValue - New color value
   * @param oldValue - Previous color value
   */
  initialColor(newValue: string, oldValue: string): void;
}

/**
 * Complete Color Picker Component Type Definition
 */
declare const ColorPickerComponent: {
  data(): ColorPickerData;
  props: ColorPickerProps;
  computed: {
    color_block_style(): ColorPickerComputed['color_block_style'];
  };
  methods: ColorPickerMethods;
  mounted: ColorPickerLifecycle['mounted'];
  watch: ColorPickerWatchers;
};

export default ColorPickerComponent;