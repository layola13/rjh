import { memo, ReactNode } from 'react';

interface MemoizedComponentProps {
  children: ReactNode;
  shouldUpdate?: boolean;
}

export default memo(
  (props: MemoizedComponentProps) => {
    return props.children;
  },
  (prevProps: MemoizedComponentProps, nextProps: MemoizedComponentProps) => {
    return !nextProps.shouldUpdate;
  }
);