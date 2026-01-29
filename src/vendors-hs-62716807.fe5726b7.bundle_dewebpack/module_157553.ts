import React, { createRef, useRef, useEffect, useContext, memo, ReactNode, CSSProperties, RefObject } from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import { cloneElement } from '../_util/reactNode';
import useMergedState from '../_util/hooks/useMergedState';
import omit from '../_util/omit';
import addEventListener from '../_util/addEventListener';

interface BackTopProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  visibilityHeight?: number;
  target?: () => HTMLElement | Window | Document;
  visible?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  duration?: number;
}

interface BackTopContentProps {
  prefixCls: string;
}

interface MotionCallbackProps {
  className?: string;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible
  });

  const backTopRef: RefObject<HTMLDivElement> = createRef();
  const scrollEventRef = useRef<{ remove: () => void } | undefined>();

  const getDefaultTarget = (): HTMLElement | Window | Document => {
    return backTopRef.current && backTopRef.current.ownerDocument
      ? backTopRef.current.ownerDocument
      : window;
  };

  const handleScroll = throttleByAnimationFrame((event: { target: HTMLElement | Window | Document }) => {
    const { visibilityHeight = 400 } = props;
    const scrollTop = getScroll(event.target, true);
    setVisible(scrollTop > visibilityHeight);
  });

  useEffect(() => {
    const targetElement = (props.target || getDefaultTarget)();
    
    scrollEventRef.current = addEventListener(targetElement, 'scroll', (event: Event) => {
      handleScroll({ target: event.target as HTMLElement | Window | Document });
    });

    handleScroll({ target: targetElement });

    return () => {
      if (scrollEventRef.current) {
        scrollEventRef.current.remove();
      }
      handleScroll.cancel();
    };
  }, [props.target]);

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className = '',
  } = props;

  const prefixCls = getPrefixCls('back-top', customizePrefixCls);
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const restProps = omit(props, [
    'prefixCls',
    'className',
    'children',
    'visibilityHeight',
    'target',
    'visible'
  ]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, target, duration = 450 } = props;

    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    });

    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  const renderContent = ({ prefixCls }: BackTopContentProps) => {
    const { children } = props;

    const defaultContent = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`}>
          <VerticalAlignTopOutlined />
        </div>
      </div>
    );

    return (
      <CSSMotion
        visible={visible}
        motionName="fade"
        removeOnLeave={true}
      >
        {({ className: motionClassName }: MotionCallbackProps) => {
          const content = children || defaultContent;
          return (
            <div>
              {cloneElement(content, (originalProps: { className?: string }) => ({
                className: classNames(motionClassName, originalProps.className),
              }))}
            </div>
          );
        }}
      </CSSMotion>
    );
  };

  return (
    <div
      {...restProps}
      className={classString}
      onClick={handleClick}
      ref={backTopRef}
    >
      {renderContent({ prefixCls })}
    </div>
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default memo(BackTop);