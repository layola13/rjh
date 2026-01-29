import React, { useContext, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { isPresetColor } from './utils';

type RibbonPlacement = 'start' | 'end';

interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: CSSProperties;
  color?: string;
  children?: ReactNode;
  text?: ReactNode;
  placement?: RibbonPlacement;
}

const Ribbon: React.FC<RibbonProps> = (props) => {
  const {
    className,
    prefixCls,
    style,
    color,
    children,
    text,
    placement = 'end'
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const ribbonPrefixCls = getPrefixCls('ribbon', prefixCls);
  const isPreset = isPresetColor(color);

  const ribbonClassName = classNames(
    ribbonPrefixCls,
    `${ribbonPrefixCls}-placement-${placement}`,
    {
      [`${ribbonPrefixCls}-rtl`]: direction === 'rtl',
      [`${ribbonPrefixCls}-color-${color}`]: isPreset
    },
    className
  );

  const ribbonStyle: CSSProperties = {};
  const cornerStyle: CSSProperties = {};

  if (color && !isPreset) {
    ribbonStyle.background = color;
    cornerStyle.color = color;
  }

  return (
    <div className={`${ribbonPrefixCls}-wrapper`}>
      {children}
      <div className={ribbonClassName} style={{ ...ribbonStyle, ...style }}>
        <span className={`${ribbonPrefixCls}-text`}>{text}</span>
        <div className={`${ribbonPrefixCls}-corner`} style={cornerStyle} />
      </div>
    </div>
  );
};

export default Ribbon;