import { useRef, createRef, RefObject } from 'react';

type RefMap = Map<unknown, RefObject<unknown>>;

export default function useRefMap(): [
  (key: unknown) => RefObject<unknown>,
  (key: unknown) => void
] {
  const refMap = useRef<RefMap>(new Map());

  const getRef = (key: unknown): RefObject<unknown> => {
    if (!refMap.current.has(key)) {
      refMap.current.set(key, createRef());
    }
    return refMap.current.get(key)!;
  };

  const deleteRef = (key: unknown): void => {
    refMap.current.delete(key);
  };

  return [getRef, deleteRef];
}