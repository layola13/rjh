enum HandleType {
  TOP = 0,
  BOTTOM = 1,
  LEFT = 2,
  RIGHT = 3,
  LEFTTOP = 4,
  LEFTBOTTOM = 5,
  RIGHTTOP = 6,
  RIGHTBOTTOM = 7,
  BOX = 8
}

interface Vector2 {
  x: number;
  y: number;
}

interface Box {
  box: number[];
  category?: string;
}

interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

interface TranslateValue {
  translateX: number;
  translateY: number;
}

interface CalcTranslateResult {
  translate: TranslateValue;
  width: number;
  height: number;
}

class Vector2 implements Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class ImgAnchorPicker {
  private readonly _imgUrl: string;
  private readonly _boxList: Box[];
  private readonly _containerMaxSize?: MaxSize;
  private readonly _handleElementMap: Map<HandleType, HTMLElement>;
  private readonly _handleClassNameMap: Map<HandleType, string>;
  private readonly _anchorPointElements: HTMLElement[];
  private readonly _canvas: HTMLCanvasElement;
  
  private _img: HTMLImageElement;
  private _clipBox: HTMLDivElement;
  private _boxImg: HTMLImageElement;
  private _imgOriginWidth?: number;
  private _imgOriginHeight?: number;
  private _isDraggingHandle: boolean;
  private _isDrawing: boolean;
  private _clipBoxVisible: boolean;
  
  public container: HTMLDivElement;
  public readonly MIN_WIDTH = 50;
  public readonly MIN_HEIGHT = 50;

  constructor(imgUrl: string, boxList: Box[], containerMaxSize?: MaxSize) {
    this._imgUrl = imgUrl;
    this._boxList = boxList;
    this._containerMaxSize = containerMaxSize;
    this._handleElementMap = new Map();
    this._anchorPointElements = [];
    this._isDraggingHandle = false;
    this._isDrawing = false;
    this._clipBoxVisible = false;

    this._handleClassNameMap = new Map([
      [HandleType.TOP, "handle handle-top"],
      [HandleType.BOTTOM, "handle handle-bottom"],
      [HandleType.LEFT, "handle handle-left"],
      [HandleType.RIGHT, "handle handle-right"],
      [HandleType.LEFTTOP, "handle handle-lefttop"],
      [HandleType.LEFTBOTTOM, "handle handle-leftbottom"],
      [HandleType.RIGHTTOP, "handle handle-righttop"],
      [HandleType.RIGHTBOTTOM, "handle handle-rightbottom"]
    ]);

    this.container = document.createElement("div");
    this.container.className = "img-box";

    this._img = document.createElement("img");
    this._img.src = this._imgUrl;
    this._img.crossOrigin = "anonymous";
    this._img.onload = () => {
      this._imgOriginWidth = this._img.width;
      this._imgOriginHeight = this._img.height;

      if (this._containerMaxSize) {
        const { maxWidth, maxHeight } = this._containerMaxSize;
        let width = this._img.width;
        let height = this._img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        this.container.style.width = `${width}px`;
        this.container.style.height = `${height}px`;
        this._img.style.width = `${width}px`;
        this._img.style.height = `${height}px`;
      }

      this.drawMask();
      this.drawAnchorPoints();
      this.drawClipBox();
      this.onImgLoad();
    };

    this.container.appendChild(this._img);
    this._canvas = document.createElement("canvas");
  }

  private get _localBoxList(): Box[] {
    if (!this._img || !this._imgOriginWidth || !this._imgOriginHeight) {
      console.warn("Please load an image!");
      return [];
    }

    const scale = this._img.width / this._imgOriginWidth;
    return this._boxList.map(item => ({
      box: item.box.map(coord => coord * scale),
      category: item.category
    }));
  }

  get currentBox(): number[] | undefined {
    if (!this._clipBoxVisible) {
      return undefined;
    }

    const scale = this._img.width / this._imgOriginWidth!;
    const { translateX, translateY } = this._getTranslateFromCSSString(this._clipBox.style.transform);

    const box = [
      Math.max(Math.min(translateX, this._img.width), 0),
      Math.max(Math.min(translateY, this._img.height), 0),
      Math.max(Math.min(translateX + this._clipBox.clientWidth, this._img.width), 0),
      Math.max(Math.min(translateY + this._clipBox.clientHeight, this._img.height), 0)
    ];

    return box.map(coord => Math.floor(coord / scale));
  }

  drawMask(): void {
    const mask = document.createElement("div");
    mask.className = "img-mask";
    mask.style.width = `${this._img.width}px`;
    mask.style.height = `${this._img.height}px`;
    mask.style.left = `${this._img.offsetLeft}px`;
    mask.style.top = `${this._img.offsetTop}px`;
    this.container.appendChild(mask);
  }

  drawAnchorPoints(): void {
    this._localBoxList.forEach(item => {
      const box = item.box;
      const center = new Vector2((box[0] + box[2]) / 2, (box[1] + box[3]) / 2);
      const anchorPoint = document.createElement("div");
      
      this.container.appendChild(anchorPoint);
      anchorPoint.className = "anchor-point";
      anchorPoint.style.left = `${center.x}px`;
      anchorPoint.style.top = `${center.y}px`;

      anchorPoint.addEventListener("click", (event: MouseEvent) => {
        this._addAnimation(this._clipBox, "animation");
        this._addAnimation(this._boxImg, "animation");

        const topLeft = new Vector2(box[0], box[1]);
        const width = box[2] - box[0];
        const height = box[3] - box[1];

        this._updateClipBox(topLeft, width, height);

        let transitionCount = 0;
        this._clipBox.ontransitionstart = () => transitionCount++;

        const trackEvent = () => {
          (window as any).HSApp?.App?.getApp()?.userTrackLogger?.push("inspiration.imagesearch.pick", {
            description: "灵感图搜，选区",
            param: { type: "point" }
          }, {});
        };

        if (this._clipBoxVisible) {
          this._clipBox.ontransitionend = () => {
            trackEvent();
            this.onClipBoxDraw(item.category);
          };
        } else {
          trackEvent();
          this.setElementVisible(this._clipBox, true);
          this._clipBoxVisible = true;
          this.onClipBoxDraw(item.category);
        }

        event.stopPropagation();
      });

      anchorPoint.addEventListener("mousedown", (event: MouseEvent) => event.stopPropagation());
      anchorPoint.addEventListener("mouseup", (event: MouseEvent) => event.stopPropagation());

      this._anchorPointElements.push(anchorPoint);
    });
  }

  drawClipBox(): void {
    this._clipBox = document.createElement("div");
    this._clipBox.className = "clip-box";
    this.setElementVisible(this._clipBox, false);
    this._clipBoxVisible = false;

    const imgView = document.createElement("div");
    this._clipBox.appendChild(imgView);
    imgView.className = "img-view";

    this._boxImg = document.createElement("img");
    this._boxImg.style.width = `${this._img.clientWidth}px`;
    this._boxImg.style.height = `${this._img.clientHeight}px`;
    imgView.appendChild(this._boxImg);
    this._boxImg.src = this._imgUrl;

    const topHandle = document.createElement("div");
    this._clipBox.appendChild(topHandle);
    topHandle.className = "handle handle-top";

    const topHandleArea = document.createElement("div");
    topHandle.appendChild(topHandleArea);
    topHandleArea.className = "handle-area";
    this._handleElementMap.set(HandleType.TOP, topHandleArea);

    this._createMoveHandle(HandleType.TOP);
    this._createMoveHandle(HandleType.BOTTOM);
    this._createMoveHandle(HandleType.LEFT);
    this._createMoveHandle(HandleType.RIGHT);
    this._createMoveHandle(HandleType.LEFTTOP);
    this._createMoveHandle(HandleType.LEFTBOTTOM);
    this._createMoveHandle(HandleType.RIGHTTOP);
    this._createMoveHandle(HandleType.RIGHTBOTTOM);

    this._handleEventProcess();
    this.container.appendChild(this._clipBox);
  }

  private _createMoveHandle(handleType: HandleType): void {
    const handle = document.createElement("div");
    this._clipBox.appendChild(handle);

    const handleArea = document.createElement("div");
    handle.appendChild(handleArea);
    handle.className = this._handleClassNameMap.get(handleType)!;
    handleArea.className = "handle-area";
    this._handleElementMap.set(handleType, handleArea);
  }

  setElementVisible(element: HTMLElement, visible: boolean): void {
    if (element) {
      element.style.display = visible ? "" : "none";
    }
  }

  private _updateClipBox(position?: Vector2, width?: number, height?: number): void {
    if (position) {
      this._clipBox.style.transform = `translateX(${position.x}px) translateY(${position.y}px)`;
      this._boxImg.style.transform = `translateX(${-position.x}px) translateY(${-position.y}px)`;
    }
    if (width !== undefined) {
      this._clipBox.style.width = `${width}px`;
    }
    if (height !== undefined) {
      this._clipBox.style.height = `${height}px`;
    }
  }

  private _updateClipBoxByPoint(startPoint: Vector2, endPoint: Vector2): void {
    const topLeft = new Vector2(Math.min(startPoint.x, endPoint.x), Math.min(startPoint.y, endPoint.y));
    let width = Math.abs(startPoint.x - endPoint.x);
    let height = Math.abs(startPoint.y - endPoint.y);

    if (Math.abs(startPoint.x - endPoint.x) < this.MIN_WIDTH) {
      if (startPoint.x - endPoint.x > 0) {
        topLeft.x = startPoint.x - this.MIN_WIDTH;
      }
      width = this.MIN_WIDTH;
    }

    if (Math.abs(startPoint.y - endPoint.y) < this.MIN_HEIGHT) {
      if (startPoint.y - endPoint.y > 0) {
        topLeft.y = startPoint.y - this.MIN_HEIGHT;
      }
      height = this.MIN_HEIGHT;
    }

    this._updateClipBox(topLeft, width, height);
  }

  onImgLoad(): void {}

  onClipBoxDraw(category?: string): void {}

  private _getTranslateFromCSSString(transformString: string): TranslateValue {
    return {
      translateX: Number(transformString.match(/X\((.*?)px/)![1]),
      translateY: Number(transformString.match(/Y\((.*?)px/)![1])
    };
  }

  private _calcTranslate(
    handleType: HandleType,
    delta: Vector2,
    currentTranslate?: TranslateValue,
    currentWidth?: number,
    currentHeight?: number
  ): CalcTranslateResult {
    const translate = currentTranslate ?? this._getTranslateFromCSSString(this._clipBox.style.transform);
    let translateX = translate.translateX;
    let translateY = translate.translateY;
    let width = currentWidth ?? this._clipBox.clientWidth;
    let height = currentHeight ?? this._clipBox.clientHeight;

    const updateTop = () => {
      height = this._limitValue(height - delta.y, this.MIN_HEIGHT, height + translateY);
      translateY = this._limitValue(translateY + delta.y, 0, currentHeight! + translateY - this.MIN_HEIGHT);
    };

    const updateBottom = () => {
      height = this._limitValue(height + delta.y, this.MIN_HEIGHT, this._img.height - translateY);
    };

    const updateLeft = () => {
      width = this._limitValue(width - delta.x, this.MIN_WIDTH, width + translateX);
      translateX = this._limitValue(translateX + delta.x, 0, currentWidth! + translateX - this.MIN_HEIGHT);
    };

    const updateRight = () => {
      width = this._limitValue(width + delta.x, this.MIN_WIDTH, this._img.width - translateX);
    };

    switch (handleType) {
      case HandleType.BOX:
        translateX = this._limitValue(translateX + delta.x, 0, this._img.width - currentWidth!);
        translateY = this._limitValue(translateY + delta.y, 0, this._img.height - currentHeight!);
        break;
      case HandleType.TOP:
        updateTop();
        break;
      case HandleType.BOTTOM:
        updateBottom();
        break;
      case HandleType.LEFT:
        updateLeft();
        break;
      case HandleType.RIGHT:
        updateRight();
        break;
      case HandleType.LEFTTOP:
        updateLeft();
        updateTop();
        break;
      case HandleType.LEFTBOTTOM:
        updateLeft();
        updateBottom();
        break;
      case HandleType.RIGHTTOP:
        updateRight();
        updateTop();
        break;
      case HandleType.RIGHTBOTTOM:
        updateRight();
        updateBottom();
        break;
    }

    return {
      translate: { translateX, translateY },
      height,
      width
    };
  }

  private _handleEventProcess(): void {
    let drawStartPoint: Vector2;
    let currentHandleType: HandleType;
    let initialTranslate: TranslateValue;
    let initialWidth: number;
    let initialHeight: number;
    let mouseStartPoint: Vector2;

    this._handleElementMap.forEach((handleElement, handleType) => {
      handleElement.addEventListener("mousedown", (event: MouseEvent) => {
        this._removeAnimation(this._clipBox, "animation");
        this._removeAnimation(this._boxImg, "animation");
        this._isDraggingHandle = true;
        initialTranslate = this._getTranslateFromCSSString(this._clipBox.style.transform);
        initialWidth = this._clipBox.clientWidth;
        initialHeight = this._clipBox.clientHeight;
        mouseStartPoint = new Vector2(event.screenX, event.screenY);
        currentHandleType = handleType;
        event.stopPropagation();
      });
    });

    this._clipBox.addEventListener("mousedown", (event: MouseEvent) => {
      this._removeAnimation(this._clipBox, "animation");
      this._removeAnimation(this._boxImg, "animation");
      this._isDraggingHandle = true;
      mouseStartPoint = new Vector2(event.screenX, event.screenY);
      initialTranslate = this._getTranslateFromCSSString(this._clipBox.style.transform);
      initialWidth = this._clipBox.clientWidth;
      initialHeight = this._clipBox.clientHeight;
      currentHandleType = HandleType.BOX;
    });

    this.container.addEventListener("mousedown", (event: MouseEvent) => {
      if (this._isDrawing || this._isDraggingHandle) return;

      this._removeAnimation(this._clipBox, "animation");
      this._removeAnimation(this._boxImg, "animation");
      this._isDrawing = true;
      drawStartPoint = new Vector2(event.offsetX, event.offsetY);
      this._updateClipBox(drawStartPoint, this.MIN_WIDTH, this.MIN_HEIGHT);
      initialTranslate = this._getTranslateFromCSSString(this._clipBox.style.transform);
      initialWidth = this._clipBox.clientWidth;
      initialHeight = this._clipBox.clientHeight;
      this.setElementVisible(this._clipBox, true);
      this._clipBoxVisible = true;

      this._handleElementMap.forEach(() => {
        this._clipBox.style.pointerEvents = "none";
      });

      this._anchorPointElements.forEach(element => this.setElementVisible(element, false));
    });

    this.container.addEventListener("mouseup", () => {
      this._isDraggingHandle = false;
      this._isDrawing = false;

      this._handleElementMap.forEach(() => {
        this._clipBox.style.pointerEvents = "";
      });

      this._anchorPointElements.forEach(element => this.setElementVisible(element, true));

      (window as any).HSApp?.App?.getApp()?.userTrackLogger?.push("inspiration.imagesearch.pick", {
        description: "灵感图搜，选区",
        param: { type: "box" }
      }, {});

      this.onClipBoxDraw();
    });

    document.body.addEventListener("mousemove", (event: MouseEvent) => {
      if (this._isDraggingHandle) {
        const delta = new Vector2(event.screenX - mouseStartPoint.x, event.screenY - mouseStartPoint.y);
        const result = this._calcTranslate(currentHandleType, delta, initialTranslate, initialWidth, initialHeight);
        this._updateClipBox(
          new Vector2(result.translate.translateX, result.translate.translateY),
          result.width,
          result.height
        );
      } else if (this._isDrawing) {
        this._updateClipBoxByPoint(drawStartPoint, new Vector2(event.offsetX, event.offsetY));
      }
    });
  }

  captureImage(): string | undefined {
    const context = this._canvas.getContext("2d");
    if (!this._clipBoxVisible || !context) {
      return undefined;
    }

    const box = this.currentBox!;
    const width = box[2] - box[0];
    const height = box[3] - box[1];

    this._canvas.width = width;
    this._canvas.height = height;
    context.drawImage(this._img, box[0], box[1], width, height, 0, 0, width, height);

    return this._canvas.toDataURL();
  }

  private _addAnimation(element: HTMLElement, animationClass: string): void {
    if (element.className.search(animationClass) === -1) {
      element.className += ` ${animationClass}`;
    }
  }

  private _removeAnimation(element: HTMLElement, animationClass: string): void {
    const index = element.className.search(` ${animationClass}`);
    if (index !== -1) {
      const chars = element.className.split("");
      chars.splice(index, animationClass.length + 1);
      element.className = chars.join("");
    }
  }

  private _limitValue(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }
}