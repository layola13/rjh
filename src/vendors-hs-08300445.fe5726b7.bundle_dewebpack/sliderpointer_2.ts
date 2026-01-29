export interface SliderPointerProps {
  direction?: 'horizontal' | 'vertical';
}

interface PointerStyles {
  picker: React.CSSProperties;
}

interface StyleConfig {
  default: PointerStyles;
  vertical: PointerStyles;
}

interface MergeOptions {
  vertical: boolean;
}

const DEFAULT_PICKER_WIDTH = '18px';
const DEFAULT_PICKER_HEIGHT = '18px';
const DEFAULT_BORDER_RADIUS = '50%';
const HORIZONTAL_TRANSFORM = 'translate(-9px, -1px)';
const VERTICAL_TRANSFORM = 'translate(-3px, -9px)';
const PICKER_BACKGROUND_COLOR = 'rgb(248, 248, 248)';
const PICKER_BOX_SHADOW = '0 1px 4px 0 rgba(0, 0, 0, 0.37)';

/**
 * SliderPointer component for rendering a draggable pointer in a color slider
 */
export const SliderPointer: React.FC<SliderPointerProps> = ({ direction }) => {
  const styleConfig: StyleConfig = {
    default: {
      picker: {
        width: DEFAULT_PICKER_WIDTH,
        height: DEFAULT_PICKER_HEIGHT,
        borderRadius: DEFAULT_BORDER_RADIUS,
        transform: HORIZONTAL_TRANSFORM,
        backgroundColor: PICKER_BACKGROUND_COLOR,
        boxShadow: PICKER_BOX_SHADOW,
      },
    },
    vertical: {
      picker: {
        transform: VERTICAL_TRANSFORM,
      },
    },
  };

  const mergeOptions: MergeOptions = {
    vertical: direction === 'vertical',
  };

  const styles = mergeStyles(styleConfig, mergeOptions);

  return <div style={styles.picker} />;
};

function mergeStyles(config: StyleConfig, options: MergeOptions): PointerStyles {
  const baseStyles = config.default;
  
  if (options.vertical) {
    return {
      picker: {
        ...baseStyles.picker,
        ...config.vertical.picker,
      },
    };
  }
  
  return baseStyles;
}

export default SliderPointer;