import React, { forwardRef, useRef, useEffect, RefObject } from 'react';
import Trigger from './Trigger';
import { composeRef } from './utils/ref';
import raf from './utils/raf';

interface DropdownProps {
  visible: boolean;
  overlay: React.ReactNode;
  [key: string]: any;
}

interface TriggerInstance {
  forcePopupAlign: () => void;
}

const Dropdown = forwardRef<TriggerInstance, DropdownProps>((props, ref) => {
  const { visible, overlay, ...restProps } = props;
  
  const triggerRef = useRef<TriggerInstance>(null);
  const composedRef = composeRef(ref, triggerRef);
  const rafIdRef = useRef<number | null>(null);

  function cancelRaf(): void {
    if (rafIdRef.current !== null) {
      raf.cancel(rafIdRef.current);
    }
  }

  useEffect(() => {
    if (visible) {
      rafIdRef.current = raf(() => {
        triggerRef.current?.forcePopupAlign();
      });
    } else {
      cancelRaf();
    }

    return cancelRaf;
  }, [visible, overlay]);

  return React.createElement(Trigger, {
    ref: composedRef,
    visible,
    overlay,
    ...restProps
  });
});

export default Dropdown;