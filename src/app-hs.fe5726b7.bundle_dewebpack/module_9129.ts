export enum CursorEnum {
  grab = "cursor:default;cursor:-moz-grab;cursor:-webkit-grab;",
  grabbing = "cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing;",
  none = "cursor: pointer;",
  move = "cursor: move;",
  default = "cursor: default;",
  crosshair = "cursor: crosshair;",
  nsResize = "cursor: ns-resize;",
  ewResize = "cursor: ew-resize;",
  pointer = "cursor: pointer",
  notallowed = "cursor: not-allowed"
}

interface HoldingStatusItem {
  key: string;
  cursor: string;
}

interface Logger {
  debug(message: string): void;
}

interface LoggerFactory {
  logger(name: string): Logger;
}

declare const log: LoggerFactory;

interface Wall {
  from: Point;
  to: Point;
}

interface Point {
  x: number;
  y: number;
}

interface WallUtil {
  canFreeMove(wall: Wall): boolean;
}

interface MathUtil {
  getAngleHorizontaleCCW(from: Point, to: Point): number;
}

declare namespace HSApp {
  namespace Util {
    const Wall: WallUtil;
  }
}

declare namespace HSCore {
  namespace Model {
    class Wall {
      from: Point;
      to: Point;
    }
  }
  namespace Util {
    const Math: MathUtil;
  }
}

export class CursorStatus {
  private logger: Logger;
  private _owner: HTMLElement;
  private _locked: boolean;
  private _cursorStatus: string;
  private _holdingStatus: HoldingStatusItem[];
  private _cacheStyle?: string;

  constructor(owner: HTMLElement) {
    this.logger = log.logger("HSApp.View.CursorStatus");
    this._owner = owner;
    this._locked = false;
    this._cursorStatus = "";
    this._holdingStatus = [];
  }

  private _setStatus(cursorStyle: string): void {
    this._replaceItemOfStyle(this._owner, "cursor", cursorStyle);
    const message = `Apply: ${cursorStyle}`;
    this.logger.debug(message);
  }

  private _replaceItemOfStyle(
    element: HTMLElement,
    propertyName: string,
    propertyValue: string
  ): void {
    if (!propertyName || !element?.getAttribute || !element.setAttribute) {
      return;
    }

    const currentStyle = element.getAttribute("style");
    let newStyle = "";

    if (currentStyle) {
      const styleItems = currentStyle.split(";");
      const propertyRegex = new RegExp(`\\s*${propertyName}\\s*:`);

      styleItems.forEach((item) => {
        if (item.search(propertyRegex) === -1) {
          newStyle += `${item};`;
        }
      });

      if (newStyle.length > 0) {
        newStyle = newStyle.substring(0, newStyle.length - 1);
      }
    }

    newStyle += propertyValue;

    if (this._cacheStyle !== newStyle) {
      this._cacheStyle = newStyle;
      element.setAttribute("style", newStyle);
    }
  }

  lock(): void {
    this.logger.debug("lock = true");
    this._locked = true;
  }

  unlock(): void {
    this.logger.debug("lock = false");
    this._locked = false;
  }

  holdingStatus(cursorStyle: string, key: string): void {
    this.logger.debug("holdingStatus");

    if (!cursorStyle || !this._owner) {
      return;
    }

    this._holdingStatus = this._holdingStatus.filter((item) => item.key !== key);
    this._holdingStatus.push({
      key,
      cursor: cursorStyle
    });

    this._setStatus(cursorStyle);

    if (!this._locked) {
      this.lock();
    }
  }

  releaseStatus(key: string): void {
    this.logger.debug("releaseStatus");

    if (!this._owner) {
      return;
    }

    for (let i = 0; i < this._holdingStatus.length; i++) {
      if (this._holdingStatus[i].key === key) {
        this._holdingStatus = this._holdingStatus.slice(0, i);
        break;
      }
    }

    if (this._holdingStatus.length > 0) {
      const lastHoldingItem = this._holdingStatus[this._holdingStatus.length - 1];
      this._setStatus(lastHoldingItem.cursor);
    } else {
      this.unlock();
      this._setStatus(this._cursorStatus);
    }
  }

  setCurrentStatus(cursorStyle: string, forceReset?: boolean): void {
    if (!cursorStyle || !this._owner) {
      return;
    }

    this._cursorStatus = cursorStyle;

    if (forceReset) {
      this._holdingStatus.length = 0;
      this._locked = false;
    }

    if (!this._locked) {
      this._setStatus(cursorStyle);
    }
  }

  calWallCursorStatus(wall: Wall): string {
    let cursor = CursorEnum.move;
    let isFixedWall = false;

    if (wall instanceof HSCore.Model.Wall) {
      if (!HSApp.Util.Wall.canFreeMove(wall)) {
        isFixedWall = true;
      }
    }

    if (isFixedWall) {
      const angle = HSCore.Util.Math.getAngleHorizontaleCCW(wall.from, wall.to);

      if (
        (angle >= -180 && angle <= -135) ||
        (angle > -45 && angle <= 45) ||
        (angle > 135 && angle <= 180)
      ) {
        cursor = CursorEnum.nsResize;
      } else if (
        (angle > -135 && angle <= -45) ||
        (angle > 45 && angle <= 135)
      ) {
        cursor = CursorEnum.ewResize;
      }
    }

    return cursor;
  }

  calEdgeCursorStatus(edge: { from: Point; to: Point }): string {
    let cursor = CursorEnum.move;
    const angle = HSCore.Util.Math.getAngleHorizontaleCCW(edge.from, edge.to);

    if (
      (angle >= -180 && angle <= -135) ||
      (angle > -45 && angle <= 45) ||
      (angle > 135 && angle <= 180)
    ) {
      cursor = CursorEnum.nsResize;
    } else if (
      (angle > -135 && angle <= -45) ||
      (angle > 45 && angle <= 135)
    ) {
      cursor = CursorEnum.ewResize;
    }

    return cursor;
  }
}