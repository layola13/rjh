import { Component } from 'react';
import { connect, ConnectProps } from 'react-redux';
import ReactDOM from 'react-dom';
import { addGroup } from './actions';
import GroupListComponent from './GroupListComponent';
import GroupItemsPanel from './GroupItemsPanel';
import closeIconSvg from './assets/close-icon.svg';
import ResourceManager from './ResourceManager';
import HSApp from './HSApp';
import HSFPConstants from './HSFPConstants';
import AssetParser from './AssetParser';

enum CitePosition {
  CATELOG_PRODUCT_ITEM = 'CATELOG_PRODUCT_ITEM',
  RIGHT_PROPERTY_BAR = 'RIGHT_PROPERTY_BAR',
  ALERT_POPUP = 'ALERT_POPUP',
  GROUP_LIST_PANEL = 'GROUP_LIST_PANEL'
}

interface GroupItem {
  fid: string;
  name: string;
}

interface ProductGroupInfo {
  seekId: string;
  catagoryId: string;
}

interface FavGroupPanelProps extends ConnectProps {
  citePosition: CitePosition;
  groupItems: GroupItem[];
  productGroupInfo?: ProductGroupInfo;
  className?: string;
  dispatch: (action: any) => void;
}

interface FavGroupPanelState {
  isShow: boolean;
  selectedVal?: string;
  selectedId?: string;
}

interface RootState {
  groupItems: GroupItem[];
}

class FavGroupPanel extends Component<FavGroupPanelProps, FavGroupPanelState> {
  constructor(props: FavGroupPanelProps) {
    super(props);
    this.state = {
      isShow: false
    };

    this.addGroup = this.addGroup.bind(this);
    this.setCurrentFavgroup = this.setCurrentFavgroup.bind(this);
    this.showGroupListPanel = this.showGroupListPanel.bind(this);
  }

  componentDidMount(): void {
    if (!this.state.selectedId) {
      const app = HSApp.App.getApp();
      const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
      const currentConfig = catalogPlugin.getCurrentConfig();
      const matchedGroup = this.props.groupItems.find(
        (item) => item.fid === currentConfig.fid
      );

      this.setState({
        selectedVal: matchedGroup 
          ? matchedGroup.name 
          : ResourceManager.getString('favorite_all_group'),
        selectedId: currentConfig.fid,
        isShow: false
      });
    }
  }

  addGroup(groupName: string): void {
    const seekId = this.props.productGroupInfo?.seekId ?? '';
    this.props.dispatch(addGroup(groupName, undefined, seekId));
  }

  closePanel(): void {
    const seekId = this.props.productGroupInfo?.seekId ?? '';
    const categoryId = this.props.productGroupInfo?.catagoryId ?? '';
    const app = HSApp.App.getApp();
    const favoritePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);

    if (seekId && !favoritePlugin.getFavoritesData().has(seekId)) {
      favoritePlugin.addFavorite(seekId, categoryId, 'default').then(() => {
        app.pluginManager
          .getPlugin(HSFPConstants.PluginType.Catalog)
          .toggleFavTip(true);
        
        const panelElement = document.querySelector('#favGroup_panel_collection');
        if (panelElement) {
          ReactDOM.unmountComponentAtNode(panelElement);
        }
      });
    }
  }

  setCurrentFavgroup(groupName: string, groupId: string): void {
    this.setState({
      selectedVal: groupName || ResourceManager.getString('favorite_all_group'),
      selectedId: groupId,
      isShow: false
    });
  }

  showGroupListPanel(): void {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  private injectSVGImage(element: HTMLElement | null): void {
    if (element) {
      ResourceManager.injectSVGImage(element);
    }
  }

  render() {
    const { citePosition, groupItems, productGroupInfo, className = '' } = this.props;
    
    let headerElement: JSX.Element | null = null;
    let panelModifier = '';
    let extraModifier = '';
    let showGroupSelector = false;

    if (
      citePosition === CitePosition.CATELOG_PRODUCT_ITEM ||
      citePosition === CitePosition.RIGHT_PROPERTY_BAR
    ) {
      panelModifier = ' hoverPanel';
    } else if (citePosition === CitePosition.ALERT_POPUP) {
      headerElement = (
        <div className="header">
          <label>{ResourceManager.getString('favorite_add_to_group')}</label>
          <span className="closeBtn" onClick={this.closePanel.bind(this)}>
            <img src={closeIconSvg} alt="closeButton" />
          </span>
        </div>
      );
      extraModifier = ' popupPanel';
    } else if (citePosition === CitePosition.GROUP_LIST_PANEL) {
      showGroupSelector = true;
    }

    const groupSelectorElement = showGroupSelector ? (
      <div className="selectedItem" onClick={this.showGroupListPanel} key={Math.random()}>
        <span>{this.state.selectedVal}</span>
        <span
          ref={(el) => this.injectSVGImage(el)}
          data-src={
            this.state.isShow
              ? AssetParser.parseURL('dropup.svg')
              : AssetParser.parseURL('dropdown.svg')
          }
        />
      </div>
    ) : null;

    return (
      <div className={`favGroup_panel_mask ${extraModifier} ${className}`}>
        <div className={`favGroup_panel${panelModifier}`}>
          {headerElement}
          {showGroupSelector ? (
            <GroupListComponent onAddClick={this.addGroup} groupItems={groupItems} />
          ) : null}
          <div className="show">
            <GroupItemsPanel
              groupItems={groupItems}
              isFavoriteProductPage={showGroupSelector}
              productGroupInfo={productGroupInfo}
              setCurrentFavgroup={this.setCurrentFavgroup}
              selectedId={this.state.selectedId}
            />
            {!showGroupSelector ? (
              <GroupListComponent onAddClick={this.addGroup} groupItems={groupItems} />
            ) : null}
          </div>
          {groupSelectorElement}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  groupItems: state.groupItems
});

export default connect(mapStateToProps)(FavGroupPanel);