import React, { Component, CSSProperties, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

interface MenuItem {
  id?: string;
  label: string;
  onClick?: (event: MouseEvent) => void;
  children?: MenuItem[];
}

interface RightMenuProps {
  data: MenuItem[];
  onItemClickEventTrack?: () => void;
}

interface RightMenuState {
  display: boolean;
}

interface GuidePlugin {
  showGuide: () => boolean;
}

interface PluginManager {
  getPlugin: (type: string) => GuidePlugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface HSApp {
  App: {
    getApp: () => App;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: {
  PluginType: {
    Guide: string;
  };
};

interface MenuItemComponentProps {
  item: MenuItem;
  onItemClick: (item: MenuItem, event: MouseEvent) => void;
  onSubMenuClick: () => void;
}

declare const MenuItemComponent: React.ComponentType<MenuItemComponentProps>;

const RIGHT_MENU_CONTAINER_REF = 'hsw-right-menu-container-ref';

const MIRROR_COMMANDS = ['mirrorx_command', 'mirrory_command', 'mirrorz_command'];

export default class RightMenu extends Component<RightMenuProps, RightMenuState> {
  refs: {
    [RIGHT_MENU_CONTAINER_REF]: Element;
  };

  constructor(props: RightMenuProps) {
    super(props);
    
    this.state = {
      display: true
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.onItemClickEventTrack = this.props.onItemClickEventTrack;
  }

  componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick(event: MouseEvent): void {
    const containerNode = ReactDOM.findDOMNode(this.refs[RIGHT_MENU_CONTAINER_REF]);
    
    if (containerNode?.contains(event.target as Node)) {
      this.setState({ display: true });
    } else {
      this.setState({ display: false });
    }
    
    if (event.buttons === 2) {
      this.setState({ display: true });
    }
  }

  handleItemClick(item: MenuItem, event: MouseEvent): void {
    const { children, onClick, id } = item;
    
    onClick?.(event);
    this.onItemClickEventTrack?.();
    
    if (!children) {
      this.setState({ display: false });
      
      if (id && MIRROR_COMMANDS.includes(id)) {
        this.setState({ display: true });
      }
    }
  }

  handleSubMenuClick(): void {
    this.onItemClickEventTrack?.();
    this.setState({ display: false });
  }

  onItemClickEventTrack?: () => void;

  render(): JSX.Element {
    const { data } = this.props;
    
    const containerStyle: CSSProperties = {
      display: this.state.display ? 'block' : 'none'
    };
    
    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
    
    return (
      <div ref={RIGHT_MENU_CONTAINER_REF} style={containerStyle}>
        {guidePlugin?.showGuide() && (
          <div className="rightmenumask" />
        )}
        
        <div className="mintoolbarcontainer" />
        
        <div className="mainland">
          {data.map((item) => (
            <MenuItemComponent
              key={item.id ?? item.label}
              item={item}
              onItemClick={this.handleItemClick}
              onSubMenuClick={this.handleSubMenuClick}
            />
          ))}
        </div>
      </div>
    );
  }
}