import React, { Component, ReactElement, CSSProperties, cloneElement } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import shallowEqual from 'shallowequal';
import CollapsePanel from './CollapsePanel';

type CollapsibleType = 'header' | 'disabled' | 'icon';
type ActiveKeyType = string | string[];

interface CollapseProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  activeKey?: ActiveKeyType;
  defaultActiveKey?: ActiveKeyType;
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  collapsible?: CollapsibleType;
  openMotion?: Record<string, unknown>;
  expandIcon?: (props: Record<string, unknown>) => ReactElement;
  onChange?: (activeKey: string | string[]) => void;
  children?: React.ReactNode;
}

interface CollapseState {
  activeKey: string[];
}

interface PanelProps {
  key?: string;
  header?: React.ReactNode;
  headerClass?: string;
  destroyInactivePanel?: boolean;
  collapsible?: CollapsibleType;
  children?: React.ReactNode;
}

function normalizeActiveKey(activeKey: ActiveKeyType | undefined): string[] {
  let result = activeKey;
  
  if (!Array.isArray(result)) {
    const type = typeof result;
    result = type === 'number' || type === 'string' ? [result] : [];
  }
  
  return (result as Array<string | number>).map((key) => String(key));
}

class Collapse extends Component<CollapseProps, CollapseState> {
  static defaultProps = {
    prefixCls: 'rc-collapse',
    onChange: () => {},
    accordion: false,
    destroyInactivePanel: false,
  };

  static Panel = CollapsePanel;

  static getDerivedStateFromProps(nextProps: CollapseProps): Partial<CollapseState> | null {
    const newState: Partial<CollapseState> = {};
    
    if ('activeKey' in nextProps) {
      newState.activeKey = normalizeActiveKey(nextProps.activeKey);
    }
    
    return newState;
  }

  constructor(props: CollapseProps) {
    super(props);

    const { activeKey, defaultActiveKey } = props;
    const initialActiveKey = 'activeKey' in props ? activeKey : defaultActiveKey;

    this.state = {
      activeKey: normalizeActiveKey(initialActiveKey),
    };
  }

  shouldComponentUpdate(nextProps: CollapseProps, nextState: CollapseState): boolean {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  onClickItem = (panelKey: string): void => {
    let { activeKey } = this.state;

    if (this.props.accordion) {
      activeKey = activeKey[0] === panelKey ? [] : [panelKey];
    } else {
      activeKey = [...activeKey];
      const index = activeKey.indexOf(panelKey);
      
      if (index > -1) {
        activeKey.splice(index, 1);
      } else {
        activeKey.push(panelKey);
      }
    }

    this.setActiveKey(activeKey);
  };

  getNewChild = (child: ReactElement<PanelProps>, index: number): ReactElement | null => {
    if (!child) {
      return null;
    }

    const { activeKey } = this.state;
    const {
      prefixCls,
      openMotion,
      accordion,
      destroyInactivePanel,
      expandIcon,
      collapsible,
    } = this.props;

    const key = child.key ?? String(index);
    const {
      header,
      headerClass,
      destroyInactivePanel: childDestroyInactivePanel,
      collapsible: childCollapsible,
    } = child.props;

    const panelCollapsible = childCollapsible ?? collapsible;

    const enhancedProps = {
      key,
      panelKey: key,
      header,
      headerClass,
      isActive: accordion ? activeKey[0] === key : activeKey.indexOf(key as string) > -1,
      prefixCls,
      destroyInactivePanel: childDestroyInactivePanel ?? destroyInactivePanel,
      openMotion,
      accordion,
      children: child.props.children,
      onItemClick: panelCollapsible === 'disabled' ? null : this.onClickItem,
      expandIcon,
      collapsible: panelCollapsible,
    };

    return typeof child.type === 'string' ? child : cloneElement(child, enhancedProps);
  };

  getItems = (): ReactElement[] => {
    const { children } = this.props;
    return toArray(children).map(this.getNewChild);
  };

  setActiveKey = (activeKey: string[]): void => {
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey });
    }

    this.props.onChange?.(this.props.accordion ? activeKey[0] : activeKey);
  };

  render(): ReactElement {
    const { prefixCls, className, style, accordion } = this.props;

    const collapseClassName = classNames({
      [prefixCls!]: true,
      [className!]: !!className,
    });

    return (
      <div
        className={collapseClassName}
        style={style}
        role={accordion ? 'tablist' : undefined}
      >
        {this.getItems()}
      </div>
    );
  }
}

export default Collapse;