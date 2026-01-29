export const LIMIT = 10;

interface VersionItem {
  id: string;
  timestamp: number;
  isManual: boolean;
  [key: string]: unknown;
}

interface VersionListModalProps {
  list: VersionItem[];
  newestVersionId: string;
  currentPage: number;
  showFilter: boolean;
  total: number;
  onlyManual: boolean;
  disableSubmit: boolean;
  selectedVersionId: string;
  onPageChange?: (page: number) => void;
  onFilterChange?: (checked: boolean) => void;
  onSelectVersion?: (version: VersionItem) => void;
  onCancel?: () => void;
  onOpen?: (versionId: string) => void;
}

interface VersionListModalState {
  isVip: boolean;
}

interface VipInfo {
  isVip: boolean;
}

interface VipCheckResult {
  data?: {
    result?: VipInfo;
  };
}

interface VipInfoChangedEvent {
  data?: VipInfo;
}

interface Signal<T> {
  listen: (callback: (event: T) => void) => void;
  unlisten: (callback: (event: T) => void) => void;
}

interface MarketingBadgePlugin {
  getVipInfo: () => VipInfo | null;
  getVipInfoChangedSignal: () => Signal<VipInfoChangedEvent> | null;
  showMarketModal: (type: string, source: string) => void;
}

export class VersionListModal extends React.Component<VersionListModalProps, VersionListModalState> {
  constructor(props: VersionListModalProps) {
    super(props);
    this.onPageSelected = this.onPageSelected.bind(this);
    this.onManualFilterChange = this.onManualFilterChange.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      isVip: true
    };
  }

  async checkVip(): Promise<boolean> {
    const vipCheckResult = await NWTK.mtop.Render.vipCheck().then((response: VipCheckResult) => {
      return !!(response?.data?.result)?.isVip;
    });

    if (vipCheckResult) {
      return true;
    }

    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    ) as MarketingBadgePlugin | null;

    if (!marketingBadgePlugin) {
      return false;
    }

    return new Promise<boolean>((resolve) => {
      const vipInfo = marketingBadgePlugin.getVipInfo();
      if (vipInfo) {
        resolve(vipInfo.isVip);
      } else {
        const signal = marketingBadgePlugin.getVipInfoChangedSignal();
        const listener = (event: VipInfoChangedEvent) => {
          signal?.unlisten(listener);
          resolve(event.data?.isVip ?? false);
        };
        signal?.listen(listener);
      }
    });
  }

  componentDidMount(): void {
    if (HSApp.Config.TENANT !== 'fp') {
      this.checkVip().then((isVip) => {
        this.setState({ isVip });
      });
    }
  }

  onPageSelected(page: number): void {
    const { onPageChange } = this.props;
    onPageChange?.(page);
  }

  onManualFilterChange(checked: boolean): void {
    const { onFilterChange } = this.props;
    onFilterChange?.(checked);
  }

  onSelectVersion(version: VersionItem): void {
    const { onSelectVersion } = this.props;
    onSelectVersion?.(version);
  }

  onCancel(): void {
    const { onCancel } = this.props;
    onCancel?.();
    Modal.close('simple');
  }

  onOpen(): void {
    const { onOpen, selectedVersionId } = this.props;
    onOpen?.(selectedVersionId);
    Modal.close('simple');
  }

  itemRender(
    current: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ): React.ReactNode {
    if (type === 'prev') {
      return (
        <IconfontView
          showType="hs_xiao_danjiantou_zuo"
          hoverColor="#396efe"
          customStyle={{
            fontSize: '12px',
            color: '#9B9FAB'
          }}
        />
      );
    }
    if (type === 'next') {
      return (
        <IconfontView
          showType="hs_xiao_danjiantou_you"
          hoverColor="#396efe"
          customStyle={{
            fontSize: '12px',
            color: '#9B9FAB'
          }}
        />
      );
    }
    return originalElement;
  }

  updateMember(): void {
    this.onCancel();
    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    ) as MarketingBadgePlugin;
    marketingBadgePlugin.showMarketModal('member', 'version_list');
    HSApp.App.getApp().userTrackLogger.push(
      'historyversion.membership.buy.entry',
      {
        activeSection: HSApp.Util.EventGroupEnum.Toolbar,
        description: '会员权益购买'
      },
      {}
    );
  }

  render(): React.ReactNode {
    const {
      list,
      newestVersionId,
      currentPage,
      showFilter,
      total,
      onlyManual,
      disableSubmit,
      selectedVersionId
    } = this.props;

    let content: React.ReactNode = <LoadingSpinner />;

    if (list.length > 0) {
      const isSevenDayDeadLine =
        HSApp.Config.TENANT !== 'fp' &&
        !this.state.isVip &&
        currentPage === Math.ceil(total / LIMIT);

      content = (
        <>
          <ListViewFrame
            data={list}
            newestVersionId={newestVersionId}
            selectedVersionId={selectedVersionId}
            setItem={this.onSelectVersion}
            isSevenDayDeadLine={isSevenDayDeadLine}
          />
          <div className="historical-version-pagination">
            <Pagination
              simple={true}
              hideOnSinglePage={true}
              current={currentPage}
              total={total}
              pageSize={LIMIT}
              onChange={this.onPageSelected}
              itemRender={this.itemRender}
            />
          </div>
        </>
      );
    }

    return (
      <div className="historical-version-container">
        {content}
        {HSApp.Config.TENANT !== 'fp' && !this.state.isVip && (
          <div
            className="upgrade-version-store"
            onClick={this.updateMember.bind(this)}
          >
            <img
              className="logo"
              src={`${HSApp.Config.RES_BASEPATH}v2/image/vip/putonghuiyuan.svg`}
            />
            <div className="text">
              {ResourceManager.getString('history_version_upgrade_version_store_text')}
            </div>
            <IconfontView
              showType="hs_xiao_danjiantou_you"
              customStyle={{
                fontSize: '12px',
                color: '#fff'
              }}
            />
          </div>
        )}
        <div className="historical-version-modal-footer">
          <div>
            {showFilter && HSApp.Config.TENANT !== 'fp' && (
              <CheckBox checked={onlyManual} onChange={this.onManualFilterChange}>
                {ResourceManager.getString('history_only_show_manual_save_versions')}
              </CheckBox>
            )}
          </div>
          <div className="historical-version-modal-btns">
            <Button
              className="historical-version-cancel-btn"
              onClick={this.onCancel}
            >
              {ResourceManager.getString('cancel')}
            </Button>
            <Button
              className="historical-version-ok-btn"
              onClick={this.onOpen}
              type="primary"
              disabled={disableSubmit}
            >
              {ResourceManager.getString('history_version_open')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}