import { HSCore } from './path/to/HSCore';

class CatalogSignalManager {
  private static instance: CatalogSignalManager | undefined = undefined;

  public signalItemClicked: HSCore.Util.Signal;
  public signalItemMouseOver: HSCore.Util.Signal;
  public signalItemMouseOut: HSCore.Util.Signal;
  public signalIndependentHidden: HSCore.Util.Signal;
  public signalExpandCatalog: HSCore.Util.Signal;
  public signalShowCatalog: HSCore.Util.Signal;
  public signalIndependentPanelShow: HSCore.Util.Signal;
  public signalMenuItemClick: HSCore.Util.Signal;
  public signalUploadItemsClick: HSCore.Util.Signal;
  public signalPageScrollStart: HSCore.Util.Signal;
  public signalPageNumChange: HSCore.Util.Signal;
  public signalCatalogRenderEnd: HSCore.Util.Signal;
  public signalCatalogToLog: HSCore.Util.Signal;
  public signalCatalogTabsClick: HSCore.Util.Signal;
  public signalUploadModelClick: HSCore.Util.Signal;
  public signalUpdateFavIdList: HSCore.Util.Signal;
  public signalCatalogToUserTrackLogger: HSCore.Util.Signal;
  public signalCatalogHeaderClick: HSCore.Util.Signal;

  private constructor() {
    this.signalItemClicked = new HSCore.Util.Signal(this);
    this.signalItemMouseOver = new HSCore.Util.Signal(this);
    this.signalItemMouseOut = new HSCore.Util.Signal(this);
    this.signalIndependentHidden = new HSCore.Util.Signal(this);
    this.signalExpandCatalog = new HSCore.Util.Signal(this);
    this.signalShowCatalog = new HSCore.Util.Signal(this);
    this.signalIndependentPanelShow = new HSCore.Util.Signal(this);
    this.signalMenuItemClick = new HSCore.Util.Signal(this);
    this.signalUploadItemsClick = new HSCore.Util.Signal(this);
    this.signalPageScrollStart = new HSCore.Util.Signal(this);
    this.signalPageNumChange = new HSCore.Util.Signal(this);
    this.signalCatalogRenderEnd = new HSCore.Util.Signal(this);
    this.signalCatalogToLog = new HSCore.Util.Signal(this);
    this.signalCatalogTabsClick = new HSCore.Util.Signal(this);
    this.signalUpdateFavIdList = new HSCore.Util.Signal(this);
    this.signalCatalogToUserTrackLogger = new HSCore.Util.Signal(this);
    this.signalUploadModelClick = new HSCore.Util.Signal(this);
    this.signalCatalogHeaderClick = new HSCore.Util.Signal(this);
  }

  public static getInstance(): CatalogSignalManager {
    if (!this.instance) {
      this.instance = new CatalogSignalManager();
    }
    return this.instance;
  }
}

export default CatalogSignalManager;