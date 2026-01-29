export enum HintBoxType {
  // 根据实际使用补充枚举值
}

export interface Box {
  getCornerPts(): Point[];
}

export interface Point {
  x: number;
  y: number;
}

export interface MarginedBox {
  // 根据实际使用补充属性
}

export interface HintBoxConfig {
  marginedBox: MarginedBox;
  box: Box;
  type: HintBoxType;
}

export class Loop {
  constructor(points: Point[]) {}
}

export class Log {
  static d(loop: Loop): void {}
}

export class HintBox {
  private readonly marginedBox: MarginedBox;
  private readonly box: Box;
  private readonly type: HintBoxType;

  constructor(config: HintBoxConfig) {
    this.marginedBox = config.marginedBox;
    this.box = config.box;
    this.type = config.type;
  }

  logBox(): void {
    Log.d(new Loop(this.box.getCornerPts()));
  }
}