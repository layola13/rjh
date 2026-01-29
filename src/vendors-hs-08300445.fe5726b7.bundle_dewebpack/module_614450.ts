import { useRef, useContext, useImperativeHandle, useCallback, useEffect, useRef as createRef, isValidElement, cloneElement, createElement, forwardRef, RefObject, ReactNode, ReactElement, ForwardRefRenderFunction } from 'react';
import { supportRef, getNodeRef, useComposeRef } from './utils/ref';
import { CollectionContext } from './context/CollectionContext';
import { observe, unobserve } from './utils/resizeObserver';
import ResizeObserverWrapper from './ResizeObserverWrapper';

interface ResizeData {
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
}

interface ResizeObserverProps {
  children: ReactNode | ((ref: RefObject<HTMLElement>) => ReactNode);
  disabled?: boolean;
  onResize?: (size: ResizeData, element: HTMLElement) => void;
  data?: unknown;
}

type ChildrenFunction = (ref: RefObject<HTMLElement>) => ReactNode;

const ResizeObserver: ForwardRefRenderFunction<HTMLElement, ResizeObserverProps> = (props, forwardedRef) => {
  const { children, disabled, onResize, data } = props;

  const elementRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const collectionCallback = useContext(CollectionContext);

  const isChildrenFunction = typeof children === 'function';
  const childNode = isChildrenFunction ? (children as ChildrenFunction)(elementRef) : children;

  const sizeCache = useRef<ResizeData>({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });

  const isValidReactElement = !isChildrenFunction && isValidElement(childNode);
  const canAttachRef = isValidReactElement && supportRef(childNode as ReactElement);
  const childRef = canAttachRef ? getNodeRef(childNode as ReactElement) : null;
  const composedRef = useComposeRef(childRef, elementRef);

  const getObservedElement = (): HTMLElement | null => {
    if (elementRef.current) {
      if (elementRef.current instanceof HTMLElement) {
        return elementRef.current;
      }
      if (typeof elementRef.current === 'object' && 'nativeElement' in elementRef.current) {
        const nativeElement = (elementRef.current as any).nativeElement;
        if (nativeElement instanceof HTMLElement) {
          return nativeElement;
        }
      }
    }
    return wrapperRef.current;
  };

  useImperativeHandle(forwardedRef, () => getObservedElement()!);

  const propsRef = useRef(props);
  propsRef.current = props;

  const handleResize = useCallback((element: HTMLElement) => {
    const currentProps = propsRef.current;
    const { onResize: onResizeCallback, data: resizeData } = currentProps;

    const rect = element.getBoundingClientRect();
    const { width, height } = rect;
    const { offsetWidth, offsetHeight } = element;

    const flooredWidth = Math.floor(width);
    const flooredHeight = Math.floor(height);

    const hasChanged =
      sizeCache.current.width !== flooredWidth ||
      sizeCache.current.height !== flooredHeight ||
      sizeCache.current.offsetWidth !== offsetWidth ||
      sizeCache.current.offsetHeight !== offsetHeight;

    if (hasChanged) {
      const newSize: ResizeData = {
        width: flooredWidth,
        height: flooredHeight,
        offsetWidth,
        offsetHeight
      };

      sizeCache.current = newSize;

      const adjustedWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      const adjustedHeight = offsetHeight === Math.round(height) ? height : offsetHeight;

      const callbackSize: ResizeData = {
        ...newSize,
        offsetWidth: adjustedWidth,
        offsetHeight: adjustedHeight
      };

      collectionCallback?.(callbackSize, element, resizeData);

      if (onResizeCallback) {
        Promise.resolve().then(() => {
          onResizeCallback(callbackSize, element);
        });
      }
    }
  }, []);

  useEffect(() => {
    const element = getObservedElement();

    if (element && !disabled) {
      observe(element, handleResize);
    }

    return () => {
      if (element) {
        unobserve(element, handleResize);
      }
    };
  }, [elementRef.current, disabled]);

  return createElement(
    ResizeObserverWrapper,
    { ref: wrapperRef },
    canAttachRef
      ? cloneElement(childNode as ReactElement, { ref: composedRef })
      : childNode
  );
};

export default forwardRef(ResizeObserver);