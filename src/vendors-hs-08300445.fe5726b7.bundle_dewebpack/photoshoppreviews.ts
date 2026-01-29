import React from 'react';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

interface PhotoshopPreviewsProps {
  rgb: RGBColor;
  currentColor: string;
}

interface Styles {
  swatches: React.CSSProperties;
  new: React.CSSProperties;
  current: React.CSSProperties;
  label: React.CSSProperties;
}

const BORDER_COLOR = '#B3B3B3';
const BORDER_BOTTOM_COLOR = '#F0F0F0';
const PREVIEW_HEIGHT = '34px';
const MARGIN_BOTTOM = '2px';
const MARGIN_TOP = '1px';
const LABEL_FONT_SIZE = '14px';
const LABEL_COLOR = '#000';

export const PhotoshopPreviews: React.FC<PhotoshopPreviewsProps> = ({ rgb, currentColor }) => {
  const styles: Styles = {
    swatches: {
      border: `1px solid ${BORDER_COLOR}`,
      borderBottom: `1px solid ${BORDER_BOTTOM_COLOR}`,
      marginBottom: MARGIN_BOTTOM,
      marginTop: MARGIN_TOP
    },
    new: {
      height: PREVIEW_HEIGHT,
      background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000'
    },
    current: {
      height: PREVIEW_HEIGHT,
      background: currentColor,
      boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000'
    },
    label: {
      fontSize: LABEL_FONT_SIZE,
      color: LABEL_COLOR,
      textAlign: 'center'
    }
  };

  return (
    <div>
      <div style={styles.label}>new</div>
      <div style={styles.swatches}>
        <div style={styles.new} />
        <div style={styles.current} />
      </div>
      <div style={styles.label}>current</div>
    </div>
  );
};

export default PhotoshopPreviews;