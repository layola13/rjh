export interface PhotoshopPointerCircleProps {
  hsl: {
    h: number;
    s: number;
    l: number;
  };
}

interface PickerStyle {
  width: string;
  height: string;
  borderRadius: string;
  boxShadow: string;
  transform: string;
}

interface Styles {
  picker: PickerStyle;
}

interface StyleVariants {
  default: Styles;
  'black-outline': Partial<Styles>;
}

const PICKER_SIZE = '12px';
const PICKER_RADIUS = '6px';
const PICKER_OFFSET = '-6px';
const LIGHTNESS_THRESHOLD = 0.5;

/**
 * Merges style variants based on active conditions
 */
function mergeStyles(variants: StyleVariants, conditions: Record<string, boolean>): Styles {
  let result = { ...variants.default };
  
  for (const [key, isActive] of Object.entries(conditions)) {
    if (isActive && variants[key as keyof StyleVariants]) {
      const variant = variants[key as keyof StyleVariants];
      result = {
        ...result,
        ...variant,
        picker: {
          ...result.picker,
          ...(variant.picker ?? {})
        }
      };
    }
  }
  
  return result;
}

export const PhotoshopPointerCircle: React.FC<PhotoshopPointerCircleProps> = ({ hsl }) => {
  const styleVariants: StyleVariants = {
    default: {
      picker: {
        width: PICKER_SIZE,
        height: PICKER_SIZE,
        borderRadius: PICKER_RADIUS,
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: `translate(${PICKER_OFFSET}, ${PICKER_OFFSET})`
      }
    },
    'black-outline': {
      picker: {
        boxShadow: 'inset 0 0 0 1px #000'
      }
    }
  };

  const styles = mergeStyles(styleVariants, {
    'black-outline': hsl.l > LIGHTNESS_THRESHOLD
  });

  return <div style={styles.picker} />;
};

export default PhotoshopPointerCircle;