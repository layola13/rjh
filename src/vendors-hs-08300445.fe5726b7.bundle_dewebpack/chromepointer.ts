interface PickerStyle {
  width: string;
  height: string;
  borderRadius: string;
  transform: string;
  backgroundColor: string;
  boxShadow: string;
}

interface ChromePointerStyles {
  picker: PickerStyle;
}

interface StyleConfig {
  default: ChromePointerStyles;
}

const PICKER_WIDTH = '12px';
const PICKER_HEIGHT = '12px';
const PICKER_BORDER_RADIUS = '6px';
const PICKER_TRANSFORM = 'translate(-6px, -1px)';
const PICKER_BACKGROUND_COLOR = 'rgb(248, 248, 248)';
const PICKER_BOX_SHADOW = '0 1px 4px 0 rgba(0, 0, 0, 0.37)';

export const ChromePointer = (): JSX.Element => {
  const styleConfig: StyleConfig = {
    default: {
      picker: {
        width: PICKER_WIDTH,
        height: PICKER_HEIGHT,
        borderRadius: PICKER_BORDER_RADIUS,
        transform: PICKER_TRANSFORM,
        backgroundColor: PICKER_BACKGROUND_COLOR,
        boxShadow: PICKER_BOX_SHADOW
      }
    }
  };

  const styles = styleConfig.default;

  return <div style={styles.picker} />;
};

export default ChromePointer;