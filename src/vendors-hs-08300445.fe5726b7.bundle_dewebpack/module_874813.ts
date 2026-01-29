import { useState, useEffect, useContext, useRef, forwardRef, createElement, RefObject } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import InternalTreeNode from './InternalTreeNode';
import { getTreeNodeProps } from './utils';
import { TreeContext } from './contextTypes';

interface MotionNodeData {
  data: TreeNodeData;
  isStart: boolean[];
  isEnd: boolean[];
}

interface TreeNodeData {
  key: string | number;
  children?: TreeNodeData[];
  [key: string]: unknown;
}

interface MotionProps {
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  motionLeaveImmediately?: boolean;
  motionDeadline?: number;
  removeOnLeave?: boolean;
  leavedClassName?: string;
  onAppearStart?: (node: HTMLElement, done: () => void) => void;
  onAppearActive?: (node: HTMLElement, done: () => void) => void;
  onAppearEnd?: (node: HTMLElement, done: () => void) => void;
  onEnterStart?: (node: HTMLElement, done: () => void) => void;
  onEnterActive?: (node: HTMLElement, done: () => void) => void;
  onEnterEnd?: (node: HTMLElement, done: () => void) => void;
  onLeaveStart?: (node: HTMLElement, done: () => void) => void;
  onLeaveActive?: (node: HTMLElement, done: () => void) => void;
  onLeaveEnd?: (node: HTMLElement, done: () => void) => void;
}

interface TreeNodeRequiredProps {
  [key: string]: unknown;
}

interface MotionTreeNodeProps {
  className?: string;
  style?: React.CSSProperties;
  motion?: MotionProps;
  motionNodes?: MotionNodeData[];
  motionType?: 'show' | 'hide';
  onMotionStart?: () => void;
  onMotionEnd?: () => void;
  active?: boolean;
  treeNodeRequiredProps?: TreeNodeRequiredProps;
  domRef?: RefObject<HTMLDivElement>;
  [key: string]: unknown;
}

interface MotionRenderProps {
  className?: string;
  style?: React.CSSProperties;
}

const MotionTreeNode = forwardRef<HTMLDivElement, MotionTreeNodeProps>((props, ref) => {
  const {
    className,
    style,
    motion,
    motionNodes,
    motionType,
    onMotionStart,
    onMotionEnd,
    active,
    treeNodeRequiredProps,
    ...restProps
  } = props;

  const [visible, setVisible] = useState<boolean>(true);
  const { prefixCls } = useContext(TreeContext);
  const motionEndedRef = useRef<boolean>(false);

  const triggerMotionEnd = (): void => {
    if (motionEndedRef.current) return;
    onMotionEnd?.();
    motionEndedRef.current = true;
  };

  useEffect(() => {
    if (motionNodes && motionType === 'hide' && visible) {
      setVisible(false);
    }
  }, [motionNodes, motionType, visible]);

  useEffect(() => {
    if (motionNodes) {
      onMotionStart?.();
    }
    return () => {
      if (motionNodes) {
        triggerMotionEnd();
      }
    };
  }, []);

  if (motionNodes) {
    return createElement(
      CSSMotion,
      {
        ref,
        visible,
        ...motion,
        motionAppear: motionType === 'show',
        onAppearEnd: triggerMotionEnd,
        onLeaveEnd: triggerMotionEnd,
      },
      (motionProps: MotionRenderProps, motionRef: RefObject<HTMLDivElement>) => {
        const { className: motionClassName, style: motionStyle } = motionProps;
        return createElement(
          'div',
          {
            ref: motionRef,
            className: classNames(`${prefixCls}-treenode-motion`, motionClassName),
            style: motionStyle,
          },
          motionNodes.map((nodeData) => {
            const { data, isStart, isEnd } = nodeData;
            const { key, children, ...nodeProps } = data;
            const treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);

            return createElement(InternalTreeNode, {
              ...nodeProps,
              ...treeNodeProps,
              active,
              data: nodeData.data,
              key,
              isStart,
              isEnd,
            });
          })
        );
      }
    );
  }

  return createElement(InternalTreeNode, {
    domRef: ref,
    className,
    style,
    ...restProps,
    active,
  });
});

MotionTreeNode.displayName = 'MotionTreeNode';

export default MotionTreeNode;