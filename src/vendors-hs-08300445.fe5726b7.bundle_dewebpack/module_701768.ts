import { useState, useEffect, useRef } from 'react';
import KeyCode from './KeyCode';
import { addGlobalMouseDownEvent, getTargetFromEvent } from './utils';

interface PickerTriggerProps {
  open: boolean;
  value: unknown;
  isClickOutside: (element: Element | null) => boolean;
  triggerOpen: (open: boolean) => void;
  forwardKeyDown: (event: React.KeyboardEvent) => boolean;
  onKeyDown: (event: React.KeyboardEvent, preventDefault: () => void) => void;
  blurToCancel?: boolean;
  onSubmit: () => boolean | void;
  onCancel: () => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

interface PickerTriggerState {
  focused: boolean;
  typing: boolean;
}

type PickerTriggerHandlers = {
  onMouseDown: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onFocus: (event: React.FocusEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
};

export default function usePickerTrigger(props: PickerTriggerProps): [PickerTriggerHandlers, PickerTriggerState] {
  const {
    open,
    value,
    isClickOutside,
    triggerOpen,
    forwardKeyDown,
    onKeyDown,
    blurToCancel,
    onSubmit,
    onCancel,
    onFocus,
    onBlur
  } = props;

  const [typing, setTyping] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const mouseDownRef = useRef<boolean>(false);
  const valueChangedRef = useRef<boolean>(false);
  const preventDefaultRef = useRef<boolean>(false);

  const handlers: PickerTriggerHandlers = {
    onMouseDown(): void {
      setTyping(true);
      triggerOpen(true);
    },

    onKeyDown(event: React.KeyboardEvent): void {
      onKeyDown(event, () => {
        preventDefaultRef.current = true;
      });

      if (!preventDefaultRef.current) {
        switch (event.which) {
          case KeyCode.ENTER:
            if (open) {
              if (onSubmit() !== false) {
                setTyping(true);
              }
            } else {
              triggerOpen(true);
            }
            event.preventDefault();
            return;

          case KeyCode.TAB:
            if (typing && open && !event.shiftKey) {
              setTyping(false);
              event.preventDefault();
            } else if (!typing && open && !forwardKeyDown(event) && event.shiftKey) {
              setTyping(true);
              event.preventDefault();
            }
            return;

          case KeyCode.ESC:
            setTyping(true);
            onCancel();
            return;
        }

        if (!open && ![KeyCode.SHIFT].includes(event.which)) {
          triggerOpen(true);
        } else if (!typing) {
          forwardKeyDown(event);
        }
      }
    },

    onFocus(event: React.FocusEvent): void {
      setTyping(true);
      setFocused(true);
      onFocus?.(event);
    },

    onBlur(event: React.FocusEvent): void {
      if (!mouseDownRef.current && isClickOutside(document.activeElement)) {
        if (blurToCancel) {
          setTimeout(() => {
            let activeElement = document.activeElement as Element | null;
            while (activeElement?.shadowRoot) {
              activeElement = activeElement.shadowRoot.activeElement;
            }
            if (isClickOutside(activeElement)) {
              onCancel();
            }
          }, 0);
        } else if (open) {
          triggerOpen(false);
          if (valueChangedRef.current) {
            onSubmit();
          }
        }
        setFocused(false);
        onBlur?.(event);
      } else {
        mouseDownRef.current = false;
      }
    }
  };

  useEffect(() => {
    valueChangedRef.current = false;
  }, [open]);

  useEffect(() => {
    valueChangedRef.current = true;
  }, [value]);

  useEffect(() => {
    return addGlobalMouseDownEvent((event: Event) => {
      const target = getTargetFromEvent(event);
      if (open) {
        const isOutside = isClickOutside(target);
        if (isOutside) {
          if (!focused || isOutside) {
            triggerOpen(false);
          }
        } else {
          mouseDownRef.current = true;
          requestAnimationFrame(() => {
            mouseDownRef.current = false;
          });
        }
      }
    });
  }, [open, focused, isClickOutside, triggerOpen]);

  return [handlers, { focused, typing }];
}