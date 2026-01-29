import { forwardRef, useRef, useImperativeHandle, useEffect, ReactNode, RefObject } from 'react';
import ReactDOM from 'react-dom';
import canUseDom from './canUseDom';

interface PortalWrapperProps {
  didUpdate?: (props: PortalWrapperProps) => void;
  getContainer: () => HTMLElement;
  children: ReactNode;
}

interface PortalWrapperHandle {}

const PortalWrapper = forwardRef<PortalWrapperHandle, PortalWrapperProps>((props, ref) => {
  const { didUpdate, getContainer, children } = props;
  
  const parentNodeRef = useRef<HTMLElement | null>();
  const containerRef = useRef<HTMLElement>();
  const initializedRef = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
  }));

  if (!initializedRef.current && canUseDom()) {
    containerRef.current = getContainer();
    parentNodeRef.current = containerRef.current.parentNode as HTMLElement;
    initializedRef.current = true;
  }

  useEffect(() => {
    didUpdate?.(props);
  });

  useEffect(() => {
    const container = containerRef.current;
    const parentNode = parentNodeRef.current;

    if (container?.parentNode === null && parentNode !== null) {
      parentNode.appendChild(container);
    }

    return () => {
      container?.parentNode?.removeChild(container);
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
});

export default PortalWrapper;