export class AddLightBandStrategy {
  private app: any;
  private iconImg: any;

  constructor() {
    this.app = HSApp.App.getApp();
  }

  init(iconImg: any): void {
    this.iconImg = iconImg;
  }

  onCleanup(): void {
    // No cleanup required
  }

  stringFace(param: any): void {
    // No implementation
  }

  onReceive(event: any, data: any): boolean {
    return false;
  }
}