import React from 'react';
import { Input } from 'antd';
import { IconfontView } from './IconfontView';
import { Tabs, Scroll } from './CommonComponents';
import DesignItem from './DesignItem';
import Pagination from './Pagination';
import noDesignImage from './assets/no-design.png';

interface TabItem {
  label: string;
  value: number;
}

interface Design {
  assetid: string;
  id: string;
  [key: string]: unknown;
}

interface DesignsResponse {
  items: Design[];
  total: number;
  offset: number;
  stylerMember?: unknown;
}

interface MigrateParams {
  oldMagic?: number;
  newMagic?: number;
}

interface OpenDesignHandlerProps {
  showDataType: 'design' | 'template';
  hasDesign: boolean;
  onlyDesign: boolean;
  isShowOpen: boolean;
  setData: (hasData: boolean) => void;
}

interface OpenDesignHandlerState {
  designs: Design[];
  total: number;
  offset: number;
  showLoading: boolean;
  searchKeys: string;
  templateType: number;
  stylerMember?: unknown;
}

interface TemplateListParams {
  pageNum: number;
  pageSize: number;
  templateType: number;
  sellType: number;
}

const PAGE_SIZE = 15;

export default class OpenDesignHandler extends React.Component<
  OpenDesignHandlerProps,
  OpenDesignHandlerState
> {
  private versionCode: number;
  private pl?: PanelLoading;
  private name: string;
  private tabs: TabItem[];
  private magics: (number | undefined)[];

  constructor(props: OpenDesignHandlerProps) {
    super(props);

    this.state = {
      designs: [],
      total: 0,
      offset: 0,
      showLoading: false,
      searchKeys: '',
      templateType: 2,
    };

    this.name = '';
    this.versionCode = HSApp.HSCore.Doc.FloorplanMeta.magic;

    this.tabs = [
      {
        label: ResourceManager.getString('plugin_welcome_v2_button_searchtemplate_Project'),
        value: 2,
      },
      {
        label: ResourceManager.getString('plugin_welcome_v2_button_searchtemplate_Room'),
        value: 1,
      },
    ];

    const persistencePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      'hsw.plugin.persistence.Plugin'
    );
    const migrateParams: MigrateParams = persistencePlugin?.OpenDesignHandler?.migrateParams || {};
    this.magics = [migrateParams.oldMagic, migrateParams.newMagic];
  }

  componentDidMount(): void {
    this.initData();
  }

  UNSAFE_componentWillReceiveProps(nextProps: OpenDesignHandlerProps): void {
    if (nextProps.showDataType !== this.props.showDataType) {
      this.updateView(0, nextProps.showDataType);
    }
  }

  getTotalPageNum(): number {
    return Math.ceil(this.state.total / PAGE_SIZE);
  }

  getCurrentPageNum(): number {
    return Math.ceil(this.state.offset / PAGE_SIZE) + 1;
  }

  jumpToPrevPage(): void {
    if (this.getCurrentPageNum() !== 1) {
      this.updateView(this.state.offset - PAGE_SIZE);
    }
  }

  jumpToNextPage(): void {
    if (this.getCurrentPageNum() !== this.getTotalPageNum()) {
      this.updateView(this.state.offset + PAGE_SIZE);
    }
  }

  jumpToPage(event: React.MouseEvent<HTMLElement>): void {
    const pageNum = parseInt((event.target as HTMLElement).innerHTML, 10);
    this.updateView((pageNum - 1) * PAGE_SIZE);
  }

  showLoadingIcon(isShow: boolean, isPanelCenter: boolean = false): void {
    this.setState({ showLoading: isShow });

    const containerElement = document.querySelector('.open-designs-contents') as HTMLElement;
    if (!this.pl) {
      this.pl = new PanelLoading(containerElement, { ispanelcenter: isPanelCenter });
    }

    isShow ? this.pl.show() : this.pl.hide();
  }

  initData(offset: number = 0): void {
    this.showLoadingIcon(true, true);

    const searchName = this.name;

    if (!this.props.hasDesign) {
      return this.props.setData(false);
    }

    HSApp.Util.Request.getDesignsByUser(offset, PAGE_SIZE, searchName, undefined, this.magics)
      .then((response: DesignsResponse) => {
        if (HSApp.Config.TENANT === 'fp' && !this.props.onlyDesign && response.total <= 0) {
          this.props.setData(false);
        } else {
          this._loadAllDesignSuccess(response);
        }
      })
      .catch(() => {
        this._loadAllDesignFailed();
      });
  }

  updateView(
    offset: number = 0,
    showDataType?: 'design' | 'template',
    templateType?: number
  ): void {
    this.setState({ designs: [] });
    this.showLoadingIcon(true, true);

    const searchName = this.name;
    const dataType = showDataType || this.props.showDataType;
    const currentTemplateType = templateType || this.state.templateType;

    const requestPromise =
      dataType === 'design'
        ? HSApp.Util.Request.getDesignsByUser(offset, PAGE_SIZE, searchName, undefined, this.magics)
        : this.getTemplateList(offset, currentTemplateType);

    requestPromise
      .then((response: DesignsResponse) => {
        this._loadAllDesignSuccess({ ...response, offset });
      })
      .catch(() => {
        this._loadAllDesignFailed();
      });
  }

  getTemplateList(offset: number, templateType: number): Promise<DesignsResponse> {
    const params: TemplateListParams = {
      pageNum: offset / PAGE_SIZE + 1,
      pageSize: PAGE_SIZE,
      templateType,
      sellType: 3,
    };

    return NWTK.mtop.designTemplates.list({ data: params }).then((result: { data: DesignsResponse }) => result.data);
  }

  reset(): void {
    this.setState({
      designs: [],
      total: 0,
      showLoading: false,
    });
  }

  onCloseHandler(): void {
    HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Welcome).close();
  }

  renderDesigns(designs: Design[]): React.ReactNode {
    if (designs.length === 0 && !this.state.showLoading) {
      return (
        <div className="nodesigncontainer">
          <img className="nodesign-picture" src={noDesignImage} alt="No designs" />
          <span className="nodesigntext">{ResourceManager.getString('no_design')}</span>
        </div>
      );
    }

    const templatesPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.DesignTemplates
    );
    const TemplateListItem = templatesPlugin?.TemplateListItem;
    const ItemComponent =
      this.props.showDataType === 'template' && TemplateListItem ? TemplateListItem : DesignItem;

    return designs.map((design, index) => (
      <ItemComponent
        key={design.assetid}
        design={design}
        index={index}
        enableEdit={true}
        removeDesignItem={this.removeDesignItem}
        onCloseHandler={this.onCloseHandler}
        tabValue={this.state.templateType}
        stylerMember={this.state.stylerMember}
      />
    ));
  }

  removeDesignItem = (designId: string): void => {
    const filteredDesigns = this.state.designs.filter((design) => design.id !== designId);
    this.setState({ designs: filteredDesigns });
  };

  _loadAllDesignSuccess(response: DesignsResponse): void {
    this.setState({
      designs: response.items,
      total: response.total,
      offset: response.offset,
      stylerMember: response.stylerMember,
    });
    this.showLoadingIcon(false);
  }

  _loadAllDesignFailed(): void {
    this.reset();
    this.showLoadingIcon(false);
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    this.setState({ searchKeys: searchValue });
  };

  onSearch = (): void => {
    this.name = this.state.searchKeys;
    this.updateView();
  };

  clearUp = (): void => {
    this.setState({ searchKeys: '' });
  };

  handleTabChange = (_event: unknown, tabValue: number): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.DesignTemplates,
      'new_design_templates_choose_template_type',
      {
        template_type: tabValue === 1 ? 'roomTemplate' : 'projectTemplate',
        from: 'welcomePanel',
      }
    );

    this.setState({ templateType: tabValue });
    this.updateView(0, this.props.showDataType, tabValue);
  };

  handleOpenRecyleBin = (): void => {
    HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.OpenDesign, 'open_recycle_bin');
    const recycleBinUrl = `${HSApp.Config.SITE_URL}/workspace/mydesigns?openRecycleBin=true`;
    if (recycleBinUrl) {
      window.open(recycleBinUrl, '_blank', 'noopener=yes, noreferrer=yes');
    }
  };

  render(): React.ReactNode {
    const { designs, searchKeys } = this.state;
    const { isShowOpen, showDataType, onlyDesign } = this.props;

    const contentClassName =
      designs.length <= 0
        ? 'open-designs-contents location-no-design-list'
        : 'open-designs-contents';

    return (
      <div className="open-designs">
        <div className={`open-designs-header ${showDataType}`}>
          {showDataType === 'design' ? (
            <>
              <div className="left-container">
                <div className="open-designs-title">
                  {ResourceManager.getString('plugin_welcome_tabs_design')}
                </div>
                <div className="open-designs-search">
                  <Input
                    placeholder={ResourceManager.getString('open_my_design_placeholder')}
                    value={searchKeys}
                    onChange={this.onChange}
                    onPressEnter={this.onSearch}
                    allowClear={true}
                  />
                  {searchKeys.length > 0 && (
                    <div className="clear-icon" onClick={this.clearUp}>
                      <IconfontView
                        showType="hs_xiao_shanchu"
                        customStyle={{ color: '#1C1C1C', fontSize: '10px' }}
                        customBgStyle={{ background: '#E1E1E6' }}
                        hoverBgColor="#396EFE"
                        hoverColor="#ffffff"
                        clickColor="#396EFE"
                        bgExtendSize={8}
                      />
                    </div>
                  )}
                  <IconfontView
                    showType="hs_xian_sousuo"
                    hoverColor="#396efe"
                    customClass="search-icon"
                    customStyle={{ color: '#9B9FAB', fontSize: '16px' }}
                    iconOnclick={this.onSearch}
                  />
                </div>
              </div>
              {HSApp.Config.TENANT === 'fp' && !adskUser.isEnterprise && onlyDesign && (
                <div className="recycle-bin" onClick={this.handleOpenRecyleBin}>
                  {ResourceManager.getString('trash_hover_title')}
                  <IconfontView
                    showType="hs_xiao_danjiantou_shang"
                    customStyle={{ fontSize: '14px' }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="open-designs-title">
                {ResourceManager.getString('start_with_template')}
              </div>
              <Tabs
                className="special-second-tabs"
                tabs={this.tabs}
                onChange={this.handleTabChange}
              />
            </>
          )}
        </div>

        {isShowOpen ? (
          <Scroll className="open-designs-scroll-container">
            <div className={`${contentClassName} ${showDataType} contents-extend`}>
              {this.renderDesigns(designs)}
              <div className="open-designs-mask" />
            </div>
          </Scroll>
        ) : (
          <div className={`${contentClassName} ${showDataType}`}>
            {this.renderDesigns(designs)}
            <div className="open-designs-mask" />
          </div>
        )}

        <Pagination
          total={this.state.total}
          offset={this.state.offset}
          limit={PAGE_SIZE}
          jumpToPrevPage={this.jumpToPrevPage}
          jumpToNextPage={this.jumpToNextPage}
          jumpToPage={this.jumpToPage}
          hide={!isShowOpen}
        />
      </div>
    );
  }
}