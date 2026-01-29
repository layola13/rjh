import React, { CSSProperties, ReactNode } from 'react';

interface RaisedProps {
  zDepth?: 0 | 1 | 2 | 3 | 4 | 5;
  radius?: number;
  background?: string;
  children?: ReactNode;
  styles?: {
    wrap?: CSSProperties;
    content?: CSSProperties;
    bg?: CSSProperties;
  };
}

interface ComputedStyles {
  wrap: CSSProperties;
  content: CSSProperties;
  bg: CSSProperties;
}

const SHADOW_PRESETS: Record<string, { bg: { boxShadow: string } }> = {
  'zDepth-0': {
    bg: {
      boxShadow: 'none'
    }
  },
  'zDepth-1': {
    bg: {
      boxShadow: '0 2px 10px rgba(0, 0, 0, .12), 0 2px 5px rgba(0, 0, 0, .16)'
    }
  },
  'zDepth-2': {
    bg: {
      boxShadow: '0 6px 20px rgba(0, 0, 0, .19), 0 8px 17px rgba(0, 0, 0, .2)'
    }
  },
  'zDepth-3': {
    bg: {
      boxShadow: '0 17px 50px rgba(0, 0, 0, .19), 0 12px 15px rgba(0, 0, 0, .24)'
    }
  },
  'zDepth-4': {
    bg: {
      boxShadow: '0 25px 55px rgba(0, 0, 0, .21), 0 16px 28px rgba(0, 0, 0, .22)'
    }
  },
  'zDepth-5': {
    bg: {
      boxShadow: '0 40px 77px rgba(0, 0, 0, .22), 0 27px 24px rgba(0, 0, 0, .2)'
    }
  }
};

const DEFAULT_SHADOW_MULTIPLIER = 4;

export const Raised: React.FC<RaisedProps> = ({
  zDepth = 1,
  radius = 2,
  background = '#fff',
  children,
  styles = {}
}) => {
  const defaultStyles: ComputedStyles = {
    wrap: {
      position: 'relative',
      display: 'inline-block',
      ...styles.wrap
    },
    content: {
      position: 'relative',
      ...styles.content
    },
    bg: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      boxShadow: `0 ${zDepth}px ${DEFAULT_SHADOW_MULTIPLIER * zDepth}px rgba(0, 0, 0, .24)`,
      borderRadius: radius,
      background,
      ...styles.bg
    }
  };

  const shadowPreset = SHADOW_PRESETS[`zDepth-${zDepth}`];
  if (shadowPreset) {
    defaultStyles.bg = {
      ...defaultStyles.bg,
      ...shadowPreset.bg
    };
  }

  return (
    <div style={defaultStyles.wrap}>
      <div style={defaultStyles.bg} />
      <div style={defaultStyles.content}>{children}</div>
    </div>
  );
};

export default Raised;