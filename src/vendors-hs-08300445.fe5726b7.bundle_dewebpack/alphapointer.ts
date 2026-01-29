export interface AlphaPointerProps {
  direction?: 'horizontal' | 'vertical';
}

export interface PickerStyle {
  width: string;
  height: string;
  borderRadius: string;
  transform: string;
  backgroundColor: string;
  boxShadow: string;
}

export interface AlphaPointerStyles {
  picker: PickerStyle;
}

const DEFAULT_PICKER_STYLE: PickerStyle = {
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  transform: 'translate(-9px, -1px)',
  backgroundColor: 'rgb(248, 248, 248)',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
};

const VERTICAL_PICKER_TRANSFORM = 'translate(-3px, -9px)';

export const AlphaPointer: React.FC<AlphaPointerProps> = ({ direction }) => {
  const isVertical = direction === 'vertical';

  const pickerStyle: PickerStyle = {
    ...DEFAULT_PICKER_STYLE,
    ...(isVertical && { transform: VERTICAL_PICKER_TRANSFORM }),
  };

  return <div style={pickerStyle} />;
};

export default AlphaPointer;