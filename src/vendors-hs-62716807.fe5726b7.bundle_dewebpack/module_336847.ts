import React, { useContext, ReactNode, CSSProperties } from 'react';
import { SpaceContext } from './SpaceContext';

interface ItemProps {
  className: string;
  direction: 'horizontal' | 'vertical';
  index: number;
  marginDirection: string;
  children: ReactNode;
  split?: ReactNode;
  wrap?: boolean;
}

export default function SpaceItem(props: ItemProps): JSX.Element | null {
  const {
    className,
    direction,
    index,
    marginDirection,
    children,
    split,
    wrap
  } = props;

  const { horizontalSize, verticalSize, latestIndex } = useContext(SpaceContext);

  let itemStyle: CSSProperties = {};

  if (direction === 'vertical') {
    if (index < latestIndex) {
      itemStyle = {
        marginBottom: horizontalSize / (split ? 2 : 1)
      };
    }
  } else {
    itemStyle = {
      ...(index < latestIndex && {
        [marginDirection]: horizontalSize / (split ? 2 : 1)
      }),
      ...(wrap && {
        paddingBottom: verticalSize
      })
    };
  }

  if (children == null) {
    return null;
  }

  const splitStyle: CSSProperties = itemStyle;

  return (
    <>
      <div className={className} style={itemStyle}>
        {children}
      </div>
      {index < latestIndex && split && (
        <span className={`${className}-split`} style={splitStyle}>
          {split}
        </span>
      )}
    </>
  );
}