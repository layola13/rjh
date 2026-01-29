import { forwardRef, useRef, useEffect, Ref } from 'react';
import raf from 'raf';
import { composeRef } from '../../../utils/ref';
import Trigger from '../Trigger';

interface AlignProps {
  visible?: boolean;
  [key: string]: any;
}

interface TriggerHandle {
  forcePopupAlign: () => void;
}

const Align = forwardRef<TriggerHandle, AlignProps>((props, ref: Ref<TriggerHandle>) => {
  const { visible, ...restProps } = props;
  const triggerRef = useRef<TriggerHandle>(null);
  const rafIdRef = useRef<number | null>(null);

  function cancelAlignRaf(): void {
    if (rafIdRef.current !== null) {
      raf.cancel(rafIdRef.current);
      rafIdRef.current = null;
    }
  }

  function startAlignRaf(): void {
    rafIdRef.current = raf(() => {
      triggerRef.current?.forcePopupAlign();
      rafIdRef.current = null;
      startAlignRaf();
    });
  }

  useEffect(() => {
    if (visible) {
      startAlignRaf();
    } else {
      cancelAlignRaf();
    }

    return cancelAlignRaf;
  }, [visible]);

  return (
    <Trigger
      ref={composeRef(triggerRef, ref)}
      {...restProps}
    />
  );
});

export default Align;