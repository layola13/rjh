import { ReactElement, useCallback, cloneElement } from 'react';

interface ItemProps {
  children: ReactElement;
  setRef: (element: HTMLElement | null) => void;
}

export function Item({ children, setRef }: ItemProps): ReactElement {
  const handleRef = useCallback((element: HTMLElement | null) => {
    setRef(element);
  }, [setRef]);

  return cloneElement(children, {
    ref: handleRef
  });
}