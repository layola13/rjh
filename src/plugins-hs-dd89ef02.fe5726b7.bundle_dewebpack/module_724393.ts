import React from 'react';
import { IconfontView } from './IconfontView';

interface ItemData {
  id: string;
  label: string;
  icon: string;
  iconActive: string;
  hotKey?: string;
  disable?: boolean;
  tooltip?: string;
  enableSwitchTip?: boolean;
  autoSwitchTip?: string;
}

interface ViewData {
  defaultKey: string;
  options: ItemData[];
  onchange: (event: React.MouseEvent, id: string) => void;
}

interface ViewSwitchData {
  type: 'toplevel' | 'multilevel';
  data: ViewData;
}

interface TopLevelItemProps {
  data: ViewData;
  itemData: ItemData;
  handleClick: (event: React.MouseEvent, data: ViewData, itemData: ItemData) => void;
}

interface TopLevelItemState {
  isHover: boolean;
}

class TopLevelItem extends React.Component<TopLevelItemProps, TopLevelItemState> {
  constructor(props: TopLevelItemProps) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  handleItemClick = (event: React.MouseEvent, data: ViewData, itemData: ItemData): void => {
    this.props.handleClick(event, data, itemData);
  };

  onMouseOver = (): void => {
    this.setState({
      isHover: true
    });
  };

  onMouseOut = (): void => {
    this.setState({
      isHover: false
    });
  };

  render(): React.ReactNode {
    const { data, itemData } = this.props;
    const { id } = itemData;

    let viewClassName = 'view ';
    let hotKeyClassName = 'hot-key-view ';

    if (itemData.id === data.defaultKey) {
      viewClassName += 'viewactive ';
      hotKeyClassName += 'hot-key-view-active';
    }

    const iconSrc = itemData.id === data.defaultKey || this.state.isHover 
      ? itemData.iconActive 
      : itemData.icon;

    return (
      <li
        id={id}
        key={id}
        className={viewClassName}
        onClick={(event) => this.handleItemClick(event, data, itemData)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className="img">
          <img src={iconSrc} />
        </div>
        <div className="text">
          {itemData.label}
          {itemData.hotKey && (
            <span className={hotKeyClassName}>
              {itemData.hotKey}
            </span>
          )}
        </div>
      </li>
    );
  }
}

interface MultiLevelItemProps {
  index: number;
  data: ViewData;
  itemData: ItemData;
  handleClick: (event: React.MouseEvent, data: ViewData, itemData: ItemData) => void;
}

interface MultiLevelItemState {
  isHover: boolean;
}

class MultiLevelItem extends React.Component<MultiLevelItemProps, MultiLevelItemState> {
  constructor(props: MultiLevelItemProps) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  handleItemClick = (event: React.MouseEvent, data: ViewData, itemData: ItemData): void => {
    this.props.handleClick(event, data, itemData);
  };

  onMouseOver = (): void => {
    this.setState({
      isHover: true
    });
  };

  onMouseOut = (): void => {
    this.setState({
      isHover: false
    });
  };

  render(): React.ReactNode {
    const { index, data, itemData } = this.props;

    let viewClassName = 'view viewlevel';
    let hotKeyClassName = 'hot-key-view ';

    if (itemData.id === data.defaultKey) {
      viewClassName += ' viewactive';
      hotKeyClassName += 'hot-key-view-active';
    }

    if (index !== 0) {
      viewClassName += ' viewhover';
    }

    if (itemData.id) {
      viewClassName += ` ${itemData.id}`;
    }

    const iconSrc = itemData.id === data.defaultKey || this.state.isHover
      ? itemData.iconActive
      : itemData.icon;

    return (
      <li
        className={viewClassName}
        onClick={(event) => this.handleItemClick(event, data, itemData)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className="img">
          <img src={iconSrc} />
        </div>
        <div className="text">
          {itemData.label}
          {itemData.hotKey && (
            <span className={hotKeyClassName}>
              {itemData.hotKey}
            </span>
          )}
        </div>
        {index === 0 && data.options.length > 1 && (
          <span className="arrow-icon">
            <IconfontView
              showType="hs_xiao_shijiantou_tuozhan"
              customStyle={{ fontSize: '6px' }}
              hoverColor="#396EFE"
              clickColor="#396EFE"
            />
          </span>
        )}
      </li>
    );
  }
}

interface ViewSwitchProps {
  data: ViewSwitchData[];
  showViewSwitch?: boolean;
}

interface ViewSwitchState {
  showViewSwitch: boolean;
}

const DEBOUNCE_DELAY = 1000;

export default class ViewSwitch extends React.Component<ViewSwitchProps, ViewSwitchState> {
  private debounced: (event: React.MouseEvent, data: ViewData, itemData: ItemData) => void;

  constructor(props: ViewSwitchProps) {
    super(props);
    this.state = {
      showViewSwitch: props.showViewSwitch ?? true
    };

    this.debounced = _.debounce(
      (event: React.MouseEvent, data: ViewData, itemData: ItemData) => {
        return this.onItemClickDebounce(event, data, itemData);
      },
      DEBOUNCE_DELAY,
      {
        leading: true,
        trailing: false
      }
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps: ViewSwitchProps): void {
    if (nextProps.showViewSwitch !== undefined) {
      this.setState({
        showViewSwitch: nextProps.showViewSwitch
      });
    }
  }

  _onItemClick = (event: React.MouseEvent, data: ViewData, itemData: ItemData): void => {
    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);

    if (guidePlugin?.showGuide()) {
      this.debounced(event, data, itemData);
    } else {
      if (itemData.disable) {
        return;
      }
      data.onchange(event, itemData.id);
    }
  };

  autoSwitchTipCloseHandler = (): void => {
    HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.ViewSwitch)
      .showAutoSwitchTip(false);
  };

  onItemClickDebounce = (event: React.MouseEvent, data: ViewData, itemData: ItemData): void => {
    if (!itemData.disable) {
      data.onchange(event, itemData.id);
    }
  };

  hide = (): void => {
    this.setState({
      showViewSwitch: false
    });
  };

  show = (): void => {
    this.setState({
      showViewSwitch: true
    });
  };

  render(): React.ReactNode {
    const { data } = this.props;
    const elements: React.ReactNode[] = [];

    let containerClassName = 'viewswitch';
    if (this.state.showViewSwitch === false) {
      containerClassName += ' hide';
    }

    data.forEach((viewSwitchData) => {
      const viewData = viewSwitchData.data;

      if (viewSwitchData.type === 'toplevel') {
        viewData.options.forEach((itemData) => {
          let element: React.ReactNode = (
            <TopLevelItem
              data={viewData}
              itemData={itemData}
              handleClick={this._onItemClick}
            />
          );

          if (itemData.enableSwitchTip && itemData.autoSwitchTip) {
            element = (
              <HSApp.UI.Popover.Tooltip
                placement="top"
                trigger="new"
                type="view-auto-switch"
                delayClose="5000"
                onClose={this.autoSwitchTipCloseHandler}
                title={itemData.autoSwitchTip}
              >
                {element}
              </HSApp.UI.Popover.Tooltip>
            );
          } else if (itemData.tooltip) {
            element = (
              <HSApp.UI.Popover.Tooltip
                placement="bottom"
                trigger="hover"
                title={itemData.tooltip}
              >
                {element}
              </HSApp.UI.Popover.Tooltip>
            );
          }

          elements.push(element);
        });
      } else {
        const subElements: React.ReactNode[] = [];

        viewData.options.forEach((itemData, index) => {
          if (index !== 0) {
            let element: React.ReactNode = (
              <MultiLevelItem
                index={index}
                data={viewData}
                itemData={itemData}
                handleClick={this._onItemClick}
              />
            );

            if (itemData.enableSwitchTip && itemData.autoSwitchTip) {
              element = (
                <HSApp.UI.Popover.Tooltip
                  placement="top"
                  trigger="new"
                  type="view-auto-switch"
                  delayClose="5000"
                  onClose={this.autoSwitchTipCloseHandler}
                  title={itemData.autoSwitchTip}
                >
                  {element}
                </HSApp.UI.Popover.Tooltip>
              );
            }

            subElements.push(element);
          }
        });

        const firstItemData = viewData.options[0];
        let firstElement: React.ReactNode = (
          <MultiLevelItem
            index={0}
            data={viewData}
            itemData={firstItemData}
            handleClick={this._onItemClick}
          />
        );

        if (firstItemData.enableSwitchTip && firstItemData.autoSwitchTip) {
          firstElement = (
            <HSApp.UI.Popover.Tooltip
              placement="top"
              trigger="new"
              type="view-auto-switch"
              delayClose="5000"
              onClose={this.autoSwitchTipCloseHandler}
              title={firstItemData.autoSwitchTip}
            >
              {firstElement}
            </HSApp.UI.Popover.Tooltip>
          );
        }

        elements.push(
          <li className="viewlevels">
            <div className="viewlevels-item">
              {firstElement}
              <ul className="viewlevels-item-switch viewsul">
                {subElements}
              </ul>
            </div>
          </li>
        );
      }
    });

    return (
      <div className={containerClassName}>
        {data.length > 0 ? (
          <ul className="views views-v2">
            {elements}
          </ul>
        ) : null}
      </div>
    );
  }
}