import React, { useState, useEffect, useRef, useContext, forwardRef } from 'react';
import classNames from 'classnames';
import CSSMotion from './CSSMotion';
import TreeNode from './TreeNode';
import { TreeContext } from './TreeContext';
import { getTreeNodeProps } from './utils';

interface MotionNodeData {
  key: React.Key;
  data: any;
  isStart: boolean;
  isEnd: boolean;
  [key: string]: any;
}

interface MotionConfig {
  motionName?: string;
  motionAppear?: boolean;
  onAppearEnd?: () => void;
  onLeaveEnd?: () => void;
  [key: string]: any;
}

interface MotionTreeNodeProps {
  className?: string;
  style?: React.CSSProperties;
  motion?: MotionConfig;
  motionNodes?: MotionNodeData[];
  motionType?: 'show' | 'hide';
  onMotionStart?: () => void;
  onMotionEnd?: () => void;
  active?: boolean;
  treeNodeRequiredProps?: any;
  domRef?: React.Ref<HTMLDivElement>;
  data?: any;
  [key: string]: any;
}

interface CSSMotionRenderProps {
  className?: string;
  style?: React.CSSProperties;
}

type CSSMotionRenderFunction = (
  props: CSSMotionRenderProps,
  ref: React.Ref<HTMLDivElement>
) => React.ReactElement;

const MotionTreeNode = forwardRef<HTMLDivElement, MotionTreeNodeProps>(
  (props, ref) => {
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

    const [visible, setVisible] = useState(true);
    const { prefixCls } = useContext(TreeContext);
    const motionEndCalledRef = useRef(false);

    const handleMotionEnd = (): void => {
      if (motionEndCalledRef.current) {
        return;
      }
      
      onMotionEnd?.();
      motionEndCalledRef.current = true;
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
          handleMotionEnd();
        }
      };
    }, []);

    if (motionNodes) {
      return (
        <CSSMotion
          ref={ref}
          visible={visible}
          {...motion}
          motionAppear={motionType === 'show'}
          onAppearEnd={handleMotionEnd}
          onLeaveEnd={handleMotionEnd}
        >
          {(motionProps: CSSMotionRenderProps, motionRef: React.Ref<HTMLDivElement>): React.ReactElement => {
            const { className: motionClassName, style: motionStyle } = motionProps;

            return (
              <div
                ref={motionRef}
                className={classNames(`${prefixCls}-treenode-motion`, motionClassName)}
                style={motionStyle}
              >
                {motionNodes.map((node) => {
                  const { data, isStart, isEnd } = node;
                  const { key, children, ...nodeData } = data;
                  const nodeProps = getTreeNodeProps(key, treeNodeRequiredProps);

                  return (
                    <TreeNode
                      {...nodeData}
                      {...nodeProps}
                      active={active}
                      data={node.data}
                      key={key}
                      isStart={isStart}
                      isEnd={isEnd}
                    />
                  );
                })}
              </div>
            );
          }}
        </CSSMotion>
      );
    }

    return (
      <TreeNode
        domRef={ref}
        className={className}
        style={style}
        {...restProps}
        active={active}
      />
    );
  }
);

MotionTreeNode.displayName = 'MotionTreeNode';

export default MotionTreeNode;