interface RatioLabel {
  FREE: string;
  ORIGIN: string;
  R_1_1: string;
  R_4_3: string;
  R_16_9: string;
}

type RatioType = keyof RatioLabel;

interface InitOptions {
  onRatioSelectorHandler: (ratio: RatioType) => void;
  onTakeSnapshotBtnClk: () => void;
  onCancelBtnClk: () => void;
}

interface ResourceManager {
  getString(key: string): string;
}

declare const ResourceManager: ResourceManager;

class SnapshotController {
  private RATIO_LABEL: RatioLabel = {
    FREE: "Unconstrained",
    ORIGIN: "Original Ratio",
    R_1_1: "1X1(Square)",
    R_4_3: "4X3",
    R_16_9: "16X9"
  };

  private defaultRatio: RatioType = "ORIGIN";
  private onRatioSelectorHandler!: (ratio: RatioType) => void;
  private onTakeSnapshotBtnClk!: () => void;
  private onCancelBtnClk!: () => void;

  /**
   * Initialize the snapshot controller with event handlers
   */
  public init(options: InitOptions): void {
    this.onRatioSelectorHandler = options.onRatioSelectorHandler;
    this.onTakeSnapshotBtnClk = options.onTakeSnapshotBtnClk;
    this.onCancelBtnClk = options.onCancelBtnClk;
    this.initString();
    this.initOptionsInDropdown();
    this.initEvent();
  }

  /**
   * Initialize dropdown menu options with ratio labels
   */
  private initOptionsInDropdown(): void {
    this._$(".dropdown-menu").empty();

    for (const key in this.RATIO_LABEL) {
      if (this.RATIO_LABEL.hasOwnProperty(key)) {
        const ratioKey = key as RatioType;
        const label = this.RATIO_LABEL[ratioKey];
        const template = `<li data='${ratioKey}' role='presentation'><a role='menuitem' href='javascript:void(0);'>${label}</a></li>`;
        this._$(".dropdown-menu").append($(template));
      }
    }

    this.updateUIByData(this.defaultRatio);
  }

  /**
   * Update UI elements based on selected ratio
   */
  private updateUIByData(ratioType: RatioType): void {
    const label = this.RATIO_LABEL[ratioType];
    this._$(".dropdown").attr("data", ratioType);
    this._$(".dropdown .dropdown-toggle .utext").html(label);
  }

  /**
   * Initialize event listeners for UI interactions
   */
  private initEvent(): void {
    this._$("#ratioSelector").off("click").click(() => {
      this._$(".dropdown-menu").toggle();
    });

    this._$(".dropdown ul li").off("click").click((event: JQuery.ClickEvent) => {
      this._$(".dropdown ul").hide();
      const selectedRatio = $(event.currentTarget).attr("data") as RatioType;
      this.updateUIByData(selectedRatio);
      this.onRatioSelectorHandler(selectedRatio);
    });

    this._$("#takeSnapshotBtn").off("click").click(() => {
      this.onTakeSnapshotBtnClk();
    });

    this._$("#cancelBtn").off("click").click(() => {
      this.onCancelBtnClk();
    });
  }

  /**
   * jQuery selector helper scoped to snapshot container
   */
  private _$(selector?: string): JQuery {
    return selector 
      ? $(".snapshotBtnContanier").find(selector) 
      : $(".snapshotBtnContanier");
  }

  /**
   * Initialize localized strings from ResourceManager
   */
  private initString(): void {
    this.RATIO_LABEL.FREE = ResourceManager.getString("snapshot_crop_ratio_free");
    this.RATIO_LABEL.ORIGIN = ResourceManager.getString("snapshot_crop_ratio_origin");
    this.RATIO_LABEL.R_1_1 = ResourceManager.getString("snapshot_crop_ratio_square");
    this._$("#takeSnapshotBtn").html(ResourceManager.getString("snapshot_crop_take_snapshot"));
    this._$("#cancelBtn").html(ResourceManager.getString("snapshot_crop_cancel"));
    this._$(".savesnapshot span").html(ResourceManager.getString("snapshot_crop_save_text"));
  }

  /**
   * Show the snapshot UI
   */
  public show(): void {
    this._$().show();
    this.updateUIByData(this.defaultRatio);
  }

  /**
   * Hide the snapshot UI
   */
  public hide(): void {
    this._$().hide();
    this._$(".dropdown .dropdown-menu").hide();
  }

  /**
   * Get the current save snapshot checkbox status
   */
  public getSnapshotSaveStatus(): boolean {
    return $("li.savesnapshot").is(":visible") && 
           this._$("input[name=savesnapshot]").is(":checked");
  }
}

export default new SnapshotController();