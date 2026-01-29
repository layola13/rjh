import { useState, useEffect, CSSProperties, MouseEvent } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import './styles.css';

export const Icons = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/a/font_2367327_ti7c03wugvi.js',
    '//at.alicdn.com/t/a/font_2365901_vor456n701s.js',
    '//at.alicdn.com/t/a/font_2748600_2u870llsdo2.js'
  ]
});

export const defaultStyle: CSSProperties = {
  color: '#1c1c1c',
  fontSize: '18px'
};

export const defaultBgStyle: CSSProperties = {
  background: 'unset'
};

interface IconfontViewProps {
  showType: string;
  hoverBgColor?: string;
  hoverType?: string;
  hoverColor?: string;
  clickColor?: string;
  iconOnclick?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  customClass?: string;
  customStyle?: CSSProperties;
  customBgStyle?: CSSProperties;
  bgExtendSize?: number;
  isImg?: boolean;
}

export const IconfontView: React.FC<IconfontViewProps> = ({
  showType,
  hoverBgColor,
  hoverType,
  hoverColor,
  clickColor,
  iconOnclick,
  onMouseEnter,
  onMouseLeave,
  customClass = '',
  customStyle = defaultStyle,
  customBgStyle = defaultBgStyle,
  bgExtendSize = 7,
  isImg
}) => {
  const [currentType, setCurrentType] = useState<string>(showType);
  const [iconStyle, setIconStyle] = useState<CSSProperties>({
    ...defaultStyle,
    ...customStyle
  });
  const [bgStyle, setBgStyle] = useState<CSSProperties>({
    ...defaultBgStyle,
    ...customBgStyle
  });

  useEffect(() => {
    if (!hoverType) {
      setIconStyle({ ...defaultStyle, ...customStyle });
    }
    setCurrentType(showType);
  }, [showType, customStyle, hoverType]);

  const fontSizeValue = (iconStyle.fontSize as string)?.split('px')[0] ?? '18';
  const backgroundSize = Number.parseInt(fontSizeValue) + bgExtendSize;
  
  const hoverBackgroundStyle: CSSProperties = hoverBgColor
    ? {
        width: `${backgroundSize}px`,
        height: `${backgroundSize}px`,
        borderRadius: `${backgroundSize}px`,
        background: bgStyle.background
      }
    : {};

  const handleMouseEnter = (): void => {
    onMouseEnter?.();
    
    if (hoverType) {
      setCurrentType(hoverType);
    }
    
    if (!hoverType && hoverColor) {
      setIconStyle({ ...defaultStyle, ...customStyle, color: hoverColor });
    }
    
    if (!hoverType && hoverBgColor) {
      setBgStyle({ ...defaultBgStyle, ...customBgStyle, background: hoverBgColor });
    }
  };

  const handleMouseLeave = (): void => {
    onMouseLeave?.();
    
    if (hoverType) {
      setCurrentType(showType);
    }
    
    if (!hoverType) {
      setIconStyle({ ...defaultStyle, ...customStyle });
    }
    
    if (!hoverType) {
      setBgStyle({ ...defaultBgStyle, ...customBgStyle });
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    iconOnclick?.(event);
    
    if (clickColor) {
      setIconStyle({ ...defaultStyle, ...customStyle, color: clickColor });
    }
    
    setBgStyle({ ...defaultBgStyle, ...customBgStyle });
  };

  const handleMouseUp = (): void => {
    if (hoverType) {
      setCurrentType(hoverType);
    }
    
    if (!hoverType && hoverColor) {
      setIconStyle({ ...defaultStyle, ...customStyle, color: hoverColor });
    }
    
    if (!hoverType && hoverBgColor) {
      setBgStyle({ ...defaultBgStyle, ...customBgStyle, background: hoverBgColor });
    }
  };

  return (
    <div
      className={`hs-iconfont-view ${customClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="hover-icon-bg" style={hoverBackgroundStyle}>
        {isImg ? (
          <img src={currentType} alt="icon" />
        ) : (
          <Icons type={currentType} style={iconStyle} />
        )}
      </div>
    </div>
  );
};