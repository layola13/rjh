import React, { createContext, useContext, useState, useEffect, useRef, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import BarsOutlined from '@ant-design/icons/BarsOutlined';
import { LayoutContext } from './LayoutContext';
import { ConfigContext } from '../config-provider/context';

interface SiderContextValue {
  siderCollapsed?: boolean;
  collapsedWidth?: number | string;
}

export const SiderContext = createContext<SiderContextValue>({});

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type CollapseType = 'clickTrigger' | 'responsive';
type SiderTheme = 'light' | 'dark';

interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  trigger?: ReactNode;
  children?: ReactNode;
  defaultCollapsed?: boolean;
  theme?: SiderTheme;
  style?: CSSProperties;
  collapsible?: boolean;
  collapsed?: boolean;
  reverseArrow?: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
  zeroWidthTriggerStyle?: CSSProperties;
  breakpoint?: BreakpointKey;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  onBreakpoint?: (broken: boolean) => void;
}

const BREAKPOINTS: Record<BreakpointKey, string> = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
};

let uniqueIdCounter = 0;

const generateUniqueId = (prefix: string = ''): string => {
  uniqueIdCounter += 1;
  return `${prefix}${uniqueIdCounter}`;
};

const isNumeric = (value: number | string): boolean => {
  return typeof value === 'number' || !isNaN(parseFloat(String(value)));
};

const Sider: React.FC<SiderProps> = (props) => {
  const {
    prefixCls,
    className,
    trigger,
    children,
    defaultCollapsed = false,
    theme = 'dark',
    style = {},
    collapsible = false,
    reverseArrow = false,
    width = 200,
    collapsedWidth = 80,
    zeroWidthTriggerStyle,
    breakpoint,
    onCollapse,
    onBreakpoint,
    collapsed: controlledCollapsed,
    ...restProps
  } = props;

  const { siderHook } = useContext(LayoutContext);
  const [collapsed, setCollapsed] = useState<boolean>(
    controlledCollapsed !== undefined ? controlledCollapsed : defaultCollapsed
  );
  const [below, setBelow] = useState<boolean>(false);

  useEffect(() => {
    if (controlledCollapsed !== undefined) {
      setCollapsed(controlledCollapsed);
    }
  }, [controlledCollapsed]);

  const handleCollapse = (newCollapsed: boolean, type: CollapseType): void => {
    if (controlledCollapsed === undefined) {
      setCollapsed(newCollapsed);
    }
    onCollapse?.(newCollapsed, type);
  };

  const mediaQueryListRef = useRef<(event: MediaQueryListEvent | MediaQueryList) => void>();

  mediaQueryListRef.current = (event: MediaQueryListEvent | MediaQueryList): void => {
    setBelow(event.matches);
    onBreakpoint?.(event.matches);
    if (collapsed !== event.matches) {
      handleCollapse(event.matches, 'responsive');
    }
  };

  useEffect(() => {
    const handleMediaQuery = (event: MediaQueryListEvent | MediaQueryList): void => {
      mediaQueryListRef.current?.(event);
    };

    let mediaQueryList: MediaQueryList | undefined;

    if (typeof window !== 'undefined') {
      const { matchMedia } = window;
      if (matchMedia && breakpoint && breakpoint in BREAKPOINTS) {
        mediaQueryList = matchMedia(`(max-width: ${BREAKPOINTS[breakpoint]})`);
        try {
          mediaQueryList.addEventListener('change', handleMediaQuery);
        } catch {
          mediaQueryList.addListener(handleMediaQuery);
        }
        handleMediaQuery(mediaQueryList);
      }
    }

    return () => {
      try {
        mediaQueryList?.removeEventListener('change', handleMediaQuery);
      } catch {
        mediaQueryList?.removeListener(handleMediaQuery);
      }
    };
  }, [breakpoint, collapsed, onBreakpoint, onCollapse]);

  useEffect(() => {
    const siderId = generateUniqueId('ant-sider-');
    siderHook.addSider(siderId);
    return () => {
      siderHook.removeSider(siderId);
    };
  }, [siderHook]);

  const toggleCollapse = (): void => {
    handleCollapse(!collapsed, 'clickTrigger');
  };

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixClassName = getPrefixCls('layout-sider', prefixCls);

  const currentWidth = collapsed ? collapsedWidth : width;
  const widthString = isNumeric(currentWidth) ? `${currentWidth}px` : String(currentWidth);
  const isZeroWidth = parseFloat(String(collapsedWidth ?? 0)) === 0;

  const zeroWidthTrigger = isZeroWidth ? (
    <span
      onClick={toggleCollapse}
      className={classNames(
        `${prefixClassName}-zero-width-trigger`,
        `${prefixClassName}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`
      )}
      style={zeroWidthTriggerStyle}
    >
      {trigger ?? <BarsOutlined />}
    </span>
  ) : null;

  const iconNode = collapsed
    ? reverseArrow ? <RightOutlined /> : <LeftOutlined />
    : reverseArrow ? <LeftOutlined /> : <RightOutlined />;

  const triggerElement =
    trigger !== null
      ? zeroWidthTrigger ?? (
          <div
            className={`${prefixClassName}-trigger`}
            onClick={toggleCollapse}
            style={{ width: widthString }}
          >
            {trigger ?? iconNode}
          </div>
        )
      : null;

  const siderStyle: CSSProperties = {
    ...style,
    flex: `0 0 ${widthString}`,
    maxWidth: widthString,
    minWidth: widthString,
    width: widthString,
  };

  const siderClassName = classNames(
    prefixClassName,
    `${prefixClassName}-${theme}`,
    {
      [`${prefixClassName}-collapsed`]: collapsed,
      [`${prefixClassName}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
      [`${prefixClassName}-below`]: below,
      [`${prefixClassName}-zero-width`]: parseFloat(widthString) === 0,
    },
    className
  );

  return (
    <SiderContext.Provider value={{ siderCollapsed: collapsed, collapsedWidth }}>
      <aside className={siderClassName} {...restProps} style={siderStyle}>
        <div className={`${prefixClassName}-children`}>{children}</div>
        {(collapsible || (below && zeroWidthTrigger)) && triggerElement}
      </aside>
    </SiderContext.Provider>
  );
};

export default Sider;