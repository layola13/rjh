import { messageCenter } from './messageCenter';

export class Handler {
  private messageCenter: typeof messageCenter;

  constructor() {
    this.messageCenter = messageCenter;
  }

  getConnectSignal() {
    return this.messageCenter.connectSignal;
  }

  listen(event: string, callback: Function) {
    return this.messageCenter.listen(event, callback);
  }

  unlisten(event: string, callback: Function) {
    return this.messageCenter.unlisten(event, callback);
  }
}