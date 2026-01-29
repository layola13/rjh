import React from 'react';
import { Item } from './Item';

interface RenderItemContext {
  style: {
    width: number;
  };
  offsetX: number;
}

interface VirtualListConfig<T> {
  getKey: (item: T) => string | number;
}

type RenderItemFunction<T> = (
  item: T,
  index: number,
  context: RenderItemContext
) => React.ReactNode;

type SetRefFunction<T> = (item: T, ref: HTMLElement | null) => void;

export default function renderVirtualItems<T>(
  items: T[],
  startIndex: number,
  endIndex: number,
  itemWidth: number,
  offsetX: number,
  setRef: SetRefFunction<T>,
  renderItem: RenderItemFunction<T>,
  config: VirtualListConfig<T>
): React.ReactNode[] {
  const { getKey } = config;

  return items.slice(startIndex, endIndex + 1).map((item, index) => {
    const content = renderItem(item, startIndex + index, {
      style: {
        width: itemWidth,
      },
      offsetX,
    });

    const key = getKey(item);

    return React.createElement(Item, {
      key,
      setRef: (ref: HTMLElement | null) => setRef(item, ref),
    }, content);
  });
}