import { forwardRef, useContext, CSSProperties, MouseEvent, ForwardRefExoticComponent, RefAttributes } from 'react';
import { normalizeTwoToneColors } from './utils';
import { setTwoToneColor, getTwoToneColor } from './twoToneColor';
import IconBase from './IconBase';
import Context from './Context';

interface IconDefinition {
  name: string;
  theme?: string;
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

interface ContextValue {
  prefixCls?: string;
  rootClassName?: string;
}

interface AntdIconComponent extends ForwardRefExoticComponent<AntdIconProps & RefAttributes<HTMLSpanElement>> {
  getTwoToneColor: () => string;
  setTwoToneColor: (color: string | [string, string]) => void;
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

  const context = useContext<ContextValue>(Context);
  const prefixCls = context.prefixCls ?? 'anticon';
  const rootClassName = context.rootClassName;

  const classNames = [
    rootClassName,
    prefixCls,
    icon.name ? `${prefixCls}-${icon.name}` : undefined,
    spin || icon.name === 'loading' ? `${prefixCls}-spin` : undefined,
    className
  ].filter(Boolean).join(' ');

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
      className={classNames}
    >
      <IconBase
        icon={icon}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        style={rotateStyle}
      />
    </span>
  );
}) as AntdIconComponent;

AntdIcon.displayName = 'AntdIcon';
AntdIcon.getTwoToneColor = getTwoToneColor;
AntdIcon.setTwoToneColor = setTwoToneColor;

export default AntdIcon;