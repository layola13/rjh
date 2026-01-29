import React, { useContext, useState, useEffect, useRef, useMemo, forwardRef, isValidElement, ReactNode, CSSProperties, ImgHTMLAttributes } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';
import { composeRef } from './utils/ref';
import { ConfigContext } from './ConfigProvider';
import warning from './utils/warning';
import { responsiveArray, ScreenSizeMap } from './utils/responsiveObserve';
import useBreakpoint from './hooks/useBreakpoint';
import AvatarContext from './AvatarContext';

type AvatarShape = 'circle' | 'square';
type AvatarSize = 'large' | 'small' | 'default' | number;

interface ResponsiveSize {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onError'> {
  prefixCls?: string;
  shape?: AvatarShape;
  size?: AvatarSize | ResponsiveSize;
  src?: ReactNode;
  srcSet?: string;
  icon?: ReactNode;
  className?: string;
  alt?: string;
  draggable?: boolean;
  children?: ReactNode;
  gap?: number;
  onError?: () => boolean | void;
}

const DEFAULT_GAP = 4;

const InternalAvatar: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (props, ref) => {
  const avatarContext = useContext(AvatarContext);
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isImgExist, setIsImgExist] = useState<boolean>(true);
  
  const avatarNodeRef = useRef<HTMLSpanElement>(null);
  const avatarChildrenRef = useRef<HTMLSpanElement>(null);
  const avatarRef = composeRef(ref, avatarNodeRef);
  
  const { getPrefixCls } = useContext(ConfigContext);
  const breakpoint = useBreakpoint();

  const setScaleParam = (): void => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }

    const childrenWidth = avatarChildrenRef.current.offsetWidth;
    const nodeWidth = avatarNodeRef.current.offsetWidth;

    if (childrenWidth === 0 || nodeWidth === 0) {
      return;
    }

    const gap = props.gap ?? DEFAULT_GAP;
    
    if (gap * 2 < nodeWidth) {
      setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);

  useEffect(() => {
    setScaleParam();
  }, [props.gap]);

  const {
    prefixCls: customizePrefixCls,
    shape = 'circle',
    size = 'default',
    src,
    srcSet,
    icon,
    className,
    alt,
    draggable,
    children,
    onError,
    gap,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  
  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const responsiveSize = useMemo<CSSProperties>(() => {
    if (typeof size !== 'object') {
      return {};
    }

    const currentBreakpoint = responsiveArray.find((screen: keyof ScreenSizeMap) => breakpoint[screen]);
    const currentSize = currentBreakpoint ? (size as ResponsiveSize)[currentBreakpoint] : undefined;

    return currentSize
      ? {
          width: currentSize,
          height: currentSize,
          lineHeight: `${currentSize}px`,
          fontSize: icon ? currentSize / 2 : 18,
        }
      : {};
  }, [breakpoint, size]);

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Avatar',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`
  );

  const classString = classNames(
    prefixCls,
    sizeCls,
    {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: isValidElement(src) || (src && isImgExist),
      [`${prefixCls}-icon`]: icon,
    },
    className
  );

  const sizeStyle: CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {};

  let childrenNode: ReactNode = null;

  if (typeof src === 'string' && isImgExist) {
    childrenNode = (
      <img
        src={src}
        draggable={draggable}
        srcSet={srcSet}
        onError={() => {
          const errorResult = onError?.();
          if (errorResult !== false) {
            setIsImgExist(false);
          }
        }}
        alt={alt}
      />
    );
  } else if (isValidElement(src)) {
    childrenNode = src;
  } else if (icon) {
    childrenNode = icon;
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale}) translateX(-50%)`;
    const childrenStyle: CSSProperties = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString,
    };

    const sizeChildrenStyle: CSSProperties =
      typeof size === 'number'
        ? {
            lineHeight: `${size}px`,
          }
        : {};

    childrenNode = (
      <ResizeObserver onResize={setScaleParam}>
        <span
          className={`${prefixCls}-string`}
          ref={avatarChildrenRef}
          style={{ ...sizeChildrenStyle, ...childrenStyle }}
        >
          {children}
        </span>
      </ResizeObserver>
    );
  } else {
    childrenNode = (
      <span
        className={`${prefixCls}-string`}
        style={{ opacity: 0 }}
        ref={avatarChildrenRef}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      {...restProps}
      style={{
        ...sizeStyle,
        ...responsiveSize,
        ...restProps.style,
      }}
      className={classString}
      ref={avatarRef}
    >
      {childrenNode}
    </span>
  );
};

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(InternalAvatar);

Avatar.displayName = 'Avatar';

export default Avatar;