import { useState, useEffect, useContext, Fragment, createElement } from 'react';

interface ImagePreviewType {
  src?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  mask?: React.ReactNode;
  icons?: {
    rotateLeft?: React.ReactNode;
    rotateRight?: React.ReactNode;
    zoomIn?: React.ReactNode;
    zoomOut?: React.ReactNode;
    close?: React.ReactNode;
  };
}

interface MousePosition {
  x: number;
  y: number;
}

interface PreviewGroupContextType {
  isPreviewGroup?: boolean;
  setCurrent?: (current: number) => void;
  setShowPreview?: (show: boolean) => void;
  setMousePosition?: (position: MousePosition | null) => void;
  registerImage?: (id: number, src: string) => () => void;
}

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
  src?: string;
  alt?: string;
  onPreviewClose?: (visible: boolean, prevVisible: boolean) => void;
  prefixCls?: string;
  previewPrefixCls?: string;
  placeholder?: boolean | React.ReactNode;
  fallback?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  preview?: boolean | ImagePreviewType;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  decoding?: 'async' | 'auto' | 'sync';
  loading?: 'eager' | 'lazy';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  sizes?: string;
  srcSet?: string;
  useMap?: string;
}

type ImageStatus = 'loading' | 'normal' | 'error';

let imageIdCounter = 0;

function getOffset(element: HTMLElement): { left: number; top: number } {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function useMergedState<T>(
  defaultValue: T,
  options: { value?: T; onChange?: (value: T, prevValue: T) => void }
): [T, (value: T) => void] {
  const { value, onChange } = options;
  const [innerValue, setInnerValue] = useState<T>(defaultValue);
  
  const mergedValue = value !== undefined ? value : innerValue;
  
  const setState = (newValue: T) => {
    const prevValue = mergedValue;
    if (value === undefined) {
      setInnerValue(newValue);
    }
    onChange?.(newValue, prevValue);
  };
  
  return [mergedValue, setState];
}

function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object') {
        return Object.keys(cls)
          .filter(key => cls[key])
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

const PreviewGroupContext = {
  isPreviewGroup: false,
  setCurrent: undefined,
  setShowPreview: undefined,
  setMousePosition: undefined,
  registerImage: undefined
} as PreviewGroupContextType;

const Image: React.FC<ImageProps> & { PreviewGroup?: React.FC; displayName?: string } = ({
  src,
  alt,
  onPreviewClose,
  prefixCls = 'rc-image',
  previewPrefixCls,
  placeholder,
  fallback,
  width,
  height,
  style,
  preview = true,
  className,
  onClick,
  wrapperClassName,
  wrapperStyle,
  crossOrigin,
  decoding,
  loading,
  referrerPolicy,
  sizes,
  srcSet,
  useMap,
  ...restProps
}) => {
  const previewPrefixClsValue = previewPrefixCls ?? `${prefixCls}-preview`;
  const isPlaceholderEnabled = placeholder && placeholder !== true;
  
  const previewConfig: ImagePreviewType = typeof preview === 'object' ? preview : {};
  const {
    src: previewSrc,
    visible: previewVisible,
    onVisibleChange = onPreviewClose,
    getContainer,
    mask,
    icons
  } = previewConfig;
  
  const previewSrcValue = previewSrc ?? src;
  const isControlled = previewVisible !== undefined;
  
  const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible, {
    value: previewVisible,
    onChange: onVisibleChange
  });
  
  const [status, setStatus] = useState<ImageStatus>(isPlaceholderEnabled ? 'loading' : 'normal');
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);
  
  const isError = status === 'error';
  
  const groupContext = useContext(PreviewGroupContext);
  const {
    isPreviewGroup,
    setCurrent,
    setShowPreview: setGroupShowPreview,
    setMousePosition: setGroupMousePosition,
    registerImage
  } = groupContext;
  
  const [imageId] = useState(() => {
    imageIdCounter += 1;
    return imageIdCounter;
  });
  
  const isPreviewEnabled = preview && !isError;
  
  const onImageLoad = () => {
    setStatus('normal');
  };
  
  useEffect(() => {
    if (!isPreviewGroup || !registerImage) {
      return () => {};
    }
    
    const unregister = registerImage(imageId, previewSrcValue ?? '');
    
    if (!isPreviewEnabled) {
      unregister();
    }
    
    return unregister;
  }, [previewSrcValue, isPreviewEnabled]);
  
  const wrapperClass = classNames(prefixCls, wrapperClassName, {
    [`${prefixCls}-error`]: isError
  });
  
  const imgSrc = isError && fallback ? fallback : src;
  
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    crossOrigin,
    decoding,
    loading,
    referrerPolicy,
    sizes,
    srcSet,
    useMap,
    alt,
    className: classNames(`${prefixCls}-img`, {
      [`${prefixCls}-img-placeholder`]: placeholder === true
    }, className),
    style: {
      height,
      ...style
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (preview && !isError) {
      if (!isControlled) {
        const target = e.target as HTMLElement;
        const offset = getOffset(target);
        const position: MousePosition = {
          x: offset.left,
          y: offset.top
        };
        
        if (isPreviewGroup) {
          setCurrent?.(imageId);
          setGroupMousePosition?.(position);
        } else {
          setMousePosition(position);
        }
      }
      
      if (isPreviewGroup) {
        setGroupShowPreview?.(true);
      } else {
        setShowPreview(true);
      }
    }
    
    onClick?.(e);
  };
  
  const handleImgRef = (element: HTMLImageElement | null) => {
    if (status === 'loading' && element?.complete && (element.naturalWidth || element.naturalHeight)) {
      onImageLoad();
    }
  };
  
  const handlePreviewClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreview(false);
    if (!isControlled) {
      setMousePosition(null);
    }
  };
  
  return createElement(
    Fragment,
    null,
    createElement(
      'div',
      {
        ...restProps,
        className: wrapperClass,
        onClick: handleClick,
        style: {
          width,
          height,
          ...wrapperStyle
        }
      },
      createElement('img', {
        ...imgProps,
        ref: handleImgRef,
        ...(isError && fallback
          ? { src: fallback }
          : {
              onLoad: onImageLoad,
              onError: () => setStatus('error'),
              src
            })
      }),
      status === 'loading' &&
        createElement('div', {
          'aria-hidden': 'true',
          className: `${prefixCls}-placeholder`
        }, placeholder),
      mask && isPreviewEnabled &&
        createElement('div', {
          className: `${prefixCls}-mask`
        }, mask)
    ),
    !isPreviewGroup && isPreviewEnabled &&
      createElement(Preview, {
        'aria-hidden': !isShowPreview,
        visible: isShowPreview,
        prefixCls: previewPrefixClsValue,
        onClose: handlePreviewClose,
        mousePosition,
        src: imgSrc,
        alt,
        getContainer,
        icons
      })
  );
};

Image.displayName = 'Image';

export default Image;