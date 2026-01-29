import React, { useContext, useMemo } from 'react';
import RcImage from 'rc-image';
import PreviewGroup from './PreviewGroup';
import { ConfigContext } from '../config-provider';
import defaultLocale from '../locale/en_US';

interface ImageLocale {
  preview?: string;
}

interface Locale {
  Image?: ImageLocale;
}

interface PreviewConfig {
  mask?: React.ReactNode;
  icons?: Record<string, React.ReactNode>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  getContainer?: false | HTMLElement | (() => HTMLElement);
  [key: string]: unknown;
}

interface ImageProps {
  prefixCls?: string;
  preview?: boolean | PreviewConfig;
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  placeholder?: React.ReactNode;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  [key: string]: unknown;
}

type OmitProps = 'prefixCls' | 'preview';

const Image: React.FC<ImageProps> & { PreviewGroup: typeof PreviewGroup } = (props) => {
  const { prefixCls: customizePrefixCls, preview, ...restProps } = props;
  
  const { getPrefixCls, locale: contextLocale } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);
  
  const locale: Locale = contextLocale ?? defaultLocale;
  const imageLocale: ImageLocale = locale.Image ?? defaultLocale.Image;
  
  const mergedPreview = useMemo<boolean | PreviewConfig>(() => {
    if (preview === false) {
      return false;
    }
    
    const defaultPreviewConfig: PreviewConfig = {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons: PreviewGroup.icons
    };
    
    return typeof preview === 'object' ? { ...defaultPreviewConfig, ...preview } : defaultPreviewConfig;
  }, [preview, prefixCls, imageLocale]);
  
  return <RcImage prefixCls={prefixCls} preview={mergedPreview} {...restProps} />;
};

Image.PreviewGroup = PreviewGroup;

export default Image;