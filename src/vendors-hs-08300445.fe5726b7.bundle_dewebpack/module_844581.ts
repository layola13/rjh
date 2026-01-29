import { forwardRef, useRef, useImperativeHandle, useEffect, ReactNode, RefObject } from 'react';
import ReactDOM from 'react-dom';
import canUseDom from './canUseDom';

interface PortalWrapperProps {
  didUpdate?: (props: PortalWrapperProps) => void;
  getContainer: () => HTMLElement;
  children: ReactNode;
}

interface PortalWrapperRef {}

const PortalWrapper = forwardRef<PortalWrapperRef, PortalWrapperProps>((props, ref) => {
  const { didUpdate, getContainer, children } = props;
  
  const parentNodeRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({}));

  if (!isInitializedRef.current && canUseDom()) {
    containerRef.current = getContainer();
    parentNodeRef.current = containerRef.current.parentNode as HTMLElement;
    isInitializedRef.current = true;
  }

  useEffect(() => {
    didUpdate?.(props);
  });

  useEffect(() => {
    if (containerRef.current?.parentNode === null && parentNodeRef.current !== null) {
      parentNodeRef.current.appendChild(containerRef.current);
    }

    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
});

export default PortalWrapper;