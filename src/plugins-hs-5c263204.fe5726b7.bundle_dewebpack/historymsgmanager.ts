export class HistoryMsgManager {
  private static instance?: HistoryMsgManager;
  private historyMsg: Map<string, unknown>;

  private constructor() {
    this.historyMsg = new Map();
  }

  public static getInstance(): HistoryMsgManager {
    if (!HistoryMsgManager.instance) {
      HistoryMsgManager.instance = new HistoryMsgManager();
    }
    return HistoryMsgManager.instance;
  }

  public setHistoryMsg(key: string, value: unknown): void {
    this.historyMsg.set(key, value);
  }

  public getHistoryMsg(key: string): unknown {
    return this.historyMsg.get(key);
  }

  public clearHistoryMsg(): void {
    this.historyMsg.clear();
  }
}