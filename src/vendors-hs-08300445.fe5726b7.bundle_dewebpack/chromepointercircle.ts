interface PickerStyles {
  width: string;
  height: string;
  borderRadius: string;
  boxShadow: string;
  transform: string;
}

interface StyleSheet {
  picker: PickerStyles;
}

interface StyleConfig {
  default: StyleSheet;
}

const CIRCLE_SIZE = '12px';
const CIRCLE_RADIUS = '6px';
const CIRCLE_OFFSET = '-6px';

export const ChromePointerCircle: React.FC = () => {
  const styles: StyleSheet = {
    picker: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_RADIUS,
      boxShadow: 'inset 0 0 0 1px #fff',
      transform: `translate(${CIRCLE_OFFSET}, ${CIRCLE_OFFSET})`
    }
  };

  return React.createElement('div', {
    style: styles.picker
  });
};

export default ChromePointerCircle;