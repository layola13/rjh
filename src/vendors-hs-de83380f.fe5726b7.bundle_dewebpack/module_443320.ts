import React, { forwardRef, useContext, CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';
import { normalizeTwoToneColors } from './utils';
import { setTwoToneColor, getTwoToneColor } from './twoToneColorPalette';
import IconBase from './IconBase';
import ConfigContext from './ConfigContext';

interface IconDefinition {
  name: string;
  icon: any;
}

interface AntdIconProps {
  className?: string;
  icon: IconDefinition;
  spin?: boolean;
  rotate?: number;
  tabIndex?: number;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  twoToneColor?: string | [string, string];
  style?: CSSProperties;
  role?: string;
  'aria-label'?: string;
}

setTwoToneColor('#1890ff');

const AntdIcon = forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
  const {
    className,
    icon,
    spin,
    rotate,
    tabIndex,
    onClick,
    twoToneColor,
    ...restProps
  } = props;

  const context = useContext(ConfigContext);
  const prefixCls = context.prefixCls ?? 'anticon';
  const rootClassName = context.rootClassName;

  const iconClassName = classNames(
    rootClassName,
    prefixCls,
    {
      [`${prefixCls}-${icon.name}`]: !!icon.name,
      [`${prefixCls}-spin`]: !!spin || icon.name === 'loading'
    },
    className
  );

  let computedTabIndex = tabIndex;
  if (computedTabIndex === undefined && onClick) {
    computedTabIndex = -1;
  }

  const rotateStyle: CSSProperties | undefined = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`
      }
    : undefined;

  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

  return (
    <span
      role="img"
      aria-label={icon.name}
      {...restProps}
      ref={ref}
      tabIndex={computedTabIndex}
      onClick={onClick}
      className={iconClassName}
    >
      <IconBase
        icon={icon}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        style={rotateStyle}
      />
    </span>
  );
});

AntdIcon.displayName = 'AntdIcon';

const AntdIconWithStatics = AntdIcon as typeof AntdIcon & {
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
};

AntdIconWithStatics.getTwoToneColor = getTwoToneColor;
AntdIconWithStatics.setTwoToneColor = setTwoToneColor;

export default AntdIconWithStatics;