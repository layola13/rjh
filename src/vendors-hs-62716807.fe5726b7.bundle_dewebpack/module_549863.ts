import { useRef, useState, useEffect, createElement, ReactNode, MouseEvent } from 'react';
import Button from './Button';
import { convertLegacyProps } from './utils';

interface ButtonProps {
  [key: string]: unknown;
}

interface ActionButtonProps {
  type?: string;
  children?: ReactNode;
  prefixCls?: string;
  buttonProps?: ButtonProps;
  autoFocus?: boolean;
  actionFn?: ((closeModal: () => void) => void | Promise<void>) | (() => void | Promise<void>);
  closeModal: () => void;
}

export default function ActionButton(props: ActionButtonProps): JSX.Element {
  const clickedRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (props.autoFocus) {
      const buttonElement = buttonRef.current;
      if (buttonElement) {
        timeoutId = setTimeout(() => {
          buttonElement.focus();
        });
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [props.autoFocus]);

  const handleClick = (): void => {
    const { actionFn, closeModal } = props;
    
    if (clickedRef.current) {
      return;
    }

    clickedRef.current = true;

    if (!actionFn) {
      closeModal();
      return;
    }

    let result: void | Promise<void>;

    if (actionFn.length > 0) {
      result = (actionFn as (closeModal: () => void) => void | Promise<void>)(closeModal);
      clickedRef.current = false;
    } else {
      result = (actionFn as () => void | Promise<void>)();
      if (!result) {
        closeModal();
        return;
      }
    }

    handlePromiseResult(result);
  };

  const handlePromiseResult = (result: void | Promise<void>): void => {
    const { closeModal } = props;

    if (result && typeof (result as Promise<void>).then === 'function') {
      setLoading(true);
      
      (result as Promise<void>)
        .then((...args: unknown[]) => {
          closeModal();
        })
        .catch((error: Error) => {
          console.error(error);
          setLoading(false);
          clickedRef.current = false;
        });
    }
  };

  const { type, children, prefixCls, buttonProps } = props;

  return createElement(
    Button,
    {
      ...convertLegacyProps(type),
      onClick: handleClick,
      loading,
      prefixCls,
      ...buttonProps,
      ref: buttonRef
    },
    children
  );
}