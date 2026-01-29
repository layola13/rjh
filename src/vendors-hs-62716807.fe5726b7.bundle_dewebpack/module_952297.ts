import React, { forwardRef, useContext, ReactNode, CSSProperties } from 'react';
import Tooltip from './Tooltip';
import { ConfigContext } from './ConfigContext';
import { getRenderPropValue } from './utils';

type RenderFunction = () => ReactNode;
type RenderProp = ReactNode | RenderFunction;

interface PopoverProps {
  prefixCls?: string;
  title?: RenderProp;
  content?: RenderProp;
  placement?: string;
  transitionName?: string;
  trigger?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayStyle?: CSSProperties;
  [key: string]: unknown;
}

const DEFAULT_MOUSE_ENTER_DELAY = 0.1;
const DEFAULT_MOUSE_LEAVE_DELAY = 0.1;

/**
 * Popover component that displays a tooltip with title and content
 */
const Popover = forwardRef<unknown, PopoverProps>((props, ref) => {
  const {
    prefixCls,
    title,
    content,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const finalPrefixCls = getPrefixCls('popover', prefixCls);

  const renderOverlay = (prefix: string): ReactNode => {
    return (
      <>
        {title && (
          <div className={`${prefix}-title`}>
            {getRenderPropValue(title)}
          </div>
        )}
        <div className={`${prefix}-inner-content`}>
          {getRenderPropValue(content)}
        </div>
      </>
    );
  };

  return (
    <Tooltip
      {...restProps}
      prefixCls={finalPrefixCls}
      ref={ref}
      overlay={renderOverlay(finalPrefixCls)}
    />
  );
});

Popover.displayName = 'Popover';

Popover.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: DEFAULT_MOUSE_ENTER_DELAY,
  mouseLeaveDelay: DEFAULT_MOUSE_LEAVE_DELAY,
  overlayStyle: {}
};

export default Popover;