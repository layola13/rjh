import BaseClipboard from './BaseClipboard';

export default class LegacyClipboard extends BaseClipboard {
  private _clipboardData: DataTransfer | null = null;

  init(config: unknown): void {
    super.init(config);
    this._clipboardData = window.clipboardData as DataTransfer | null;
  }

  protected _setClipboardListeners(): void {
    const hotkey = this.hotkey;
    
    hotkey.registerHotkey(
      { win: 'ctrl+v' },
      () => {
        this._dispatchSignal('paste');
      }
    );
    
    hotkey.registerHotkey(
      { win: 'ctrl+c' },
      () => {
        this._dispatchSignal('copy');
      }
    );
    
    hotkey.registerHotkey(
      { win: 'ctrl+x' },
      () => {
        this._dispatchSignal('cut');
      }
    );
  }

  protected _getDataFormat(): string {
    return 'Text';
  }

  fireCopy(): void {
    this._dispatchSignal('copy');
  }

  fireCut(): void {
    this._dispatchSignal('cut');
  }

  firePaste(): void {
    this._dispatchSignal('paste');
  }
}