import React from 'react';
import reactCSS from 'reactcss';

interface TriangleStyle {
  width: number;
  height: number;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  position?: string;
  top?: string;
  left?: string;
}

interface PointerStyles {
  triangle: TriangleStyle;
  triangleBorder: Omit<TriangleStyle, 'position' | 'top' | 'left'>;
  left: {
    Extend: string;
    transform: string;
  };
  leftInside: {
    Extend: string;
    transform: string;
  };
  right: {
    Extend: string;
    transform: string;
  };
  rightInside: {
    Extend: string;
    transform: string;
  };
}

interface StylesOutput {
  pointer?: React.CSSProperties;
  left: React.CSSProperties;
  leftInside: React.CSSProperties;
  right: React.CSSProperties;
  rightInside: React.CSSProperties;
}

/**
 * PhotoshopPointerCircle component
 * Renders a dual-arrow pointer indicator for Photoshop-style color picker
 */
export const PhotoshopPointerCircle: React.FC = () => {
  const styles: StylesOutput = reactCSS({
    default: {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '1px',
        left: '1px',
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
      },
      left: {
        Extend: 'triangleBorder',
        transform: 'translate(-13px, -4px)',
      },
      leftInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)',
      },
      right: {
        Extend: 'triangleBorder',
        transform: 'translate(20px, -14px) rotate(180deg)',
      },
      rightInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)',
      },
    },
  });

  return (
    <div style={styles.pointer}>
      <div style={styles.left}>
        <div style={styles.leftInside} />
      </div>
      <div style={styles.right}>
        <div style={styles.rightInside} />
      </div>
    </div>
  );
};

export default PhotoshopPointerCircle;