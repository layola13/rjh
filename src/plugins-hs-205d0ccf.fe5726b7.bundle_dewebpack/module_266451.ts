interface SourceData {
  order?: number;
  visible?: boolean;
  enable?: boolean;
  badge?: string;
  hover?: boolean;
  command?: string;
  hotkey?: string;
  registerHotkey?: boolean;
  hotkeyOptions?: Record<string, unknown>;
  count?: number;
  isGroup?: boolean;
  defaultHoverFirstChild?: boolean;
  firstTooltip?: string;
  className?: string;
  delayDisappearTime?: number;
  checkStatus?: boolean;
  label?: string;
  labelIcon?: string;
  icon?: string;
  isImg?: boolean;
  bgImg?: string;
  iconhover?: string;
  linetype?: string;
  catagory?: string;
  tooltip?: string;
  width?: number;
  onclick?: () => void;
  isPressed?: boolean;
  styleName?: string;
  guidetip?: string;
  isChecked?: boolean;
  checkHalfStatus?: boolean;
  onchange?: () => void;
  groupId?: string;
  cancelRadioStatus?: boolean;
  popover?: unknown;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onButtonMouseEnter?: () => void;
  onButtonMouseLeave?: () => void;
  dynamicTooltip?: string;
  hasDot?: boolean;
  showNew?: boolean;
  textClassName?: string;
  hasBadgeDot?: boolean;
  hasWarning?: boolean;
  showNewCallBack?: () => void;
  showTipBySignal?: boolean;
  infoIcon?: string;
  getBenefitAmount?: () => number;
  showMarketModal?: () => void;
}

interface Source {
  name?: string;
  type: string;
  data: SourceData;
  setData(data: Partial<MenuItemData>): void;
  disable(...args: unknown[]): unknown;
  enable(...args: unknown[]): unknown;
  collapse(...args: unknown[]): unknown;
  expand(...args: unknown[]): unknown;
  show(...args: unknown[]): unknown;
  hide(...args: unknown[]): unknown;
  addBadge(...args: unknown[]): unknown;
  removeBadge(...args: unknown[]): unknown;
  addDot(...args: unknown[]): unknown;
  removeDot(...args: unknown[]): unknown;
  getPath(...args: unknown[]): unknown;
  isPressed(...args: unknown[]): unknown;
  setPressed(...args: unknown[]): unknown;
  click(...args: unknown[]): unknown;
  setChecked(...args: unknown[]): unknown;
  setDataOnly(...args: unknown[]): unknown;
  setShowDynamicTooltip(...args: unknown[]): unknown;
}

interface FolderImpl {
  childItems: MenuItem[];
  hasBadgeDot: boolean;
  hasChildPressed: boolean;
  setData(data: { submenu?: unknown }): void;
  getChild(...args: unknown[]): unknown;
  getAllChildren(...args: unknown[]): unknown;
  add(...args: unknown[]): unknown;
  remove(...args: unknown[]): unknown;
  onchange(...args: unknown[]): unknown;
  insertBefore(...args: unknown[]): unknown;
  insertAfter(...args: unknown[]): unknown;
}

interface MenuItemData {
  order?: number;
  submenu?: unknown;
}

class DataWrapper {
  private _source: SourceData;
  public order: number | undefined;

  constructor(source: SourceData) {
    this._source = source;
    this.order = source.order;
  }

  get visible(): boolean | undefined {
    return this._source.visible;
  }

  get enable(): boolean | undefined {
    return this._source.enable;
  }

  get badge(): string | undefined {
    return this._source.badge;
  }

  get hover(): boolean | undefined {
    return this._source.hover;
  }

  get command(): string | undefined {
    return this._source.command;
  }

  get hotkey(): string | undefined {
    return this._source.hotkey;
  }

  get registerHotkey(): boolean | undefined {
    return this._source.registerHotkey;
  }

  get hotkeyOptions(): Record<string, unknown> | undefined {
    return this._source.hotkeyOptions;
  }

  get count(): number | undefined {
    return this._source.count;
  }

  get isGroup(): boolean | undefined {
    return this._source.isGroup;
  }

  get defaultHoverFirstChild(): boolean | undefined {
    return this._source.defaultHoverFirstChild;
  }

  get firstTooltip(): string | undefined {
    return this._source.firstTooltip;
  }

  get className(): string | undefined {
    return this._source.className;
  }

  get delayDisappearTime(): number | undefined {
    return this._source.delayDisappearTime;
  }

  get checkStatus(): boolean | undefined {
    return this._source.checkStatus;
  }

  get label(): string | undefined {
    return this._source.label;
  }

  get labelIcon(): string | undefined {
    return this._source.labelIcon;
  }

  get icon(): string | undefined {
    return this._source.icon;
  }

  get isImg(): boolean | undefined {
    return this._source.isImg;
  }

  get bgImg(): string | undefined {
    return this._source.bgImg;
  }

  get iconhover(): string | undefined {
    return this._source.iconhover;
  }

  get linetype(): string | undefined {
    return this._source.linetype;
  }

  get catagory(): string | undefined {
    return this._source.catagory;
  }

  get tooltip(): string | undefined {
    return this._source.tooltip;
  }

  get width(): number | undefined {
    return this._source.width;
  }

  get onclick(): (() => void) | undefined {
    return this._source.onclick;
  }

  get isPressed(): boolean | undefined {
    return this._source.isPressed;
  }

  get styleName(): string | undefined {
    return this._source.styleName;
  }

  get guidetip(): string | undefined {
    return this._source.guidetip;
  }

  get isChecked(): boolean | undefined {
    return this._source.isChecked;
  }

  get checkHalfStatus(): boolean | undefined {
    return this._source.checkHalfStatus;
  }

  get onchange(): (() => void) | undefined {
    return this._source.onchange;
  }

  get groupId(): string | undefined {
    return this._source.groupId;
  }

  get cancelRadioStatus(): boolean | undefined {
    return this._source.cancelRadioStatus;
  }

  get popover(): unknown | undefined {
    return this._source.popover;
  }

  get onMouseEnter(): (() => void) | undefined {
    return this._source.onMouseEnter;
  }

  get onMouseLeave(): (() => void) | undefined {
    return this._source.onMouseLeave;
  }

  get onButtonMouseEnter(): (() => void) | undefined {
    return this._source.onButtonMouseEnter;
  }

  get onButtonMouseLeave(): (() => void) | undefined {
    return this._source.onButtonMouseLeave;
  }

  get dynamicTooltip(): string | undefined {
    return this._source.dynamicTooltip;
  }

  get hasDot(): boolean | undefined {
    return this._source.hasDot;
  }

  get showNew(): boolean | undefined {
    return this._source.showNew;
  }

  get textClassName(): string | undefined {
    return this._source.textClassName;
  }

  get hasBadgeDot(): boolean | undefined {
    return this._source.hasBadgeDot;
  }

  get hasWarning(): boolean | undefined {
    return this._source.hasWarning;
  }

  get showNewCallBack(): (() => void) | undefined {
    return this._source.showNewCallBack;
  }

  get showTipBySignal(): boolean | undefined {
    return this._source.showTipBySignal;
  }

  get infoIcon(): string | undefined {
    return this._source.infoIcon;
  }

  get getBenefitAmount(): (() => number) | undefined {
    return this._source.getBenefitAmount;
  }

  get showMarketModal(): (() => void) | undefined {
    return this._source.showMarketModal;
  }
}

class MenuItem {
  public name: string;
  public childItems: MenuItem[];
  public data: DataWrapper;
  private _source: Source;
  private _changeCallback: () => void;
  private _folderImpl: FolderImpl;

  constructor(
    config: Partial<MenuItemData> & { name?: string },
    source: Source,
    folderImpl: FolderImpl,
    changeCallback: () => void
  ) {
    const { name, ...restConfig } = config;
    this.name = name || source.name || '';
    this._source = source;
    this._changeCallback = changeCallback;
    this._folderImpl = folderImpl;
    this.childItems = folderImpl.childItems;
    this.data = new DataWrapper(source.data);
    this.setData(restConfig);
  }

  setData(data?: Partial<MenuItemData>): void {
    if (!data) {
      return;
    }

    const { order, submenu, ...restData } = data;

    if (order !== undefined) {
      this.data.order = order;
    }

    if (submenu !== undefined) {
      this._folderImpl.setData({ submenu });
    }

    this._source.setData(restData);
    this._changeCallback();
  }

  get type(): string {
    return this._source.type;
  }

  get hasBadgeDot(): boolean {
    return !this.data.badge && (this.data.hasBadgeDot || this._folderImpl.hasBadgeDot);
  }

  get hasWarning(): boolean {
    return !!this.data.hasWarning || this.childItems.some((item) => item.data.hasWarning || false);
  }

  get hasChildPressed(): boolean {
    return this._folderImpl.hasChildPressed;
  }

  get count(): number {
    return this.data.count || 0;
  }

  disable(...args: unknown[]): unknown {
    return this._source.disable(...args);
  }

  enable(...args: unknown[]): unknown {
    return this._source.enable(...args);
  }

  collapse(...args: unknown[]): unknown {
    return this._source.collapse(...args);
  }

  expand(...args: unknown[]): unknown {
    return this._source.expand(...args);
  }

  show(...args: unknown[]): unknown {
    return this._source.show(...args);
  }

  hide(...args: unknown[]): unknown {
    return this._source.hide(...args);
  }

  addBadge(...args: unknown[]): unknown {
    return this._source.addBadge(...args);
  }

  removeBadge(...args: unknown[]): unknown {
    return this._source.removeBadge(...args);
  }

  addDot(...args: unknown[]): unknown {
    return this._source.addDot(...args);
  }

  removeDot(...args: unknown[]): unknown {
    return this._source.removeDot(...args);
  }

  getPath(...args: unknown[]): unknown {
    return this._source.getPath(...args);
  }

  isPressed(...args: unknown[]): unknown {
    return this._source.isPressed(...args);
  }

  setPressed(...args: unknown[]): unknown {
    return this._source.setPressed(...args);
  }

  click(...args: unknown[]): unknown {
    return this._source.click(...args);
  }

  setChecked(...args: unknown[]): unknown {
    return this._source.setChecked(...args);
  }

  setDataOnly(...args: unknown[]): unknown {
    return this._source.setDataOnly(...args);
  }

  setShowDynamicTooltip(...args: unknown[]): unknown {
    return this._source.setShowDynamicTooltip(...args);
  }

  getChild(...args: unknown[]): unknown {
    return this._folderImpl.getChild(...args);
  }

  getAllChildren(...args: unknown[]): unknown {
    return this._folderImpl.getAllChildren(...args);
  }

  add(...args: unknown[]): unknown {
    return this._folderImpl.add(...args);
  }

  remove(...args: unknown[]): unknown {
    return this._folderImpl.remove(...args);
  }

  onchange(...args: unknown[]): unknown {
    return this._folderImpl.onchange(...args);
  }

  insertBefore(...args: unknown[]): unknown {
    return this._folderImpl.insertBefore(...args);
  }

  insertAfter(...args: unknown[]): unknown {
    return this._folderImpl.insertAfter(...args);
  }
}

export default MenuItem;