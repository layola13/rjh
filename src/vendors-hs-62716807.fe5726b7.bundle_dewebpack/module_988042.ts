import React, { forwardRef, useContext, ReactElement, ReactNode } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import StarFilled from './StarFilled';
import RcRate from './RcRate';
import Tooltip from './Tooltip';
import { ConfigContext } from './ConfigContext';

interface RateProps {
  prefixCls?: string;
  tooltips?: string[];
  character?: ReactNode;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterRenderParams {
  index: number;
  value: number;
}

type Direction = 'ltr' | 'rtl';

interface ConfigContextType {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  direction?: Direction;
}

const Rate: ForwardRefRenderFunction<unknown, RateProps> = (props, ref) => {
  const { prefixCls, tooltips, ...restProps } = props;
  
  const { getPrefixCls, direction } = useContext<ConfigContextType>(ConfigContext);
  
  const mergedPrefixCls = getPrefixCls('rate', prefixCls);
  
  const characterRender = (node: ReactNode, params: CharacterRenderParams): ReactElement => {
    const { index } = params;
    
    if (tooltips) {
      return (
        <Tooltip title={tooltips[index]}>
          {node}
        </Tooltip>
      );
    }
    
    return node as ReactElement;
  };
  
  return (
    <RcRate
      ref={ref}
      characterRender={characterRender}
      {...restProps}
      prefixCls={mergedPrefixCls}
      direction={direction}
    />
  );
};

const ForwardedRate = forwardRef(Rate);

ForwardedRate.displayName = 'Rate';

ForwardedRate.defaultProps = {
  character: <StarFilled />
};

export default ForwardedRate;