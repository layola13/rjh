import { isMobile, removeItems } from './utils';
import { DisplayObject } from './DisplayObject';
import type { Renderer } from './Renderer';
import type { InteractionManager } from './InteractionManager';

interface AccessibleDisplayObject extends DisplayObject {
  accessible: boolean;
  accessibleTitle: string | null;
  accessibleHint: string | null;
  tabIndex: number;
  _accessibleActive: boolean;
  _accessibleDiv: HTMLButtonElement | null;
  accessibleType: string;
  accessiblePointerEvents: string;
  accessibleChildren: boolean;
  renderId?: number;
  hitArea?: HitArea;
  worldTransform: Transform;
  getBounds(): Bounds;
}

interface HitArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Transform {
  tx: number;
  ty: number;
  a: number;
  d: number;
}

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RendererWithInteraction extends Renderer {
  plugins: {
    interaction: InteractionManager;
  };
  _lastObjectRendered: AccessibleDisplayObject;
  view: HTMLCanvasElement;
  width: number;
  height: number;
  resolution: number;
  renderingToScreen: boolean;
  on(event: string, handler: () => void, context?: unknown): void;
  off(event: string, handler: () => void): void;
}

const DEFAULT_BUTTON_SIZE = 100;
const ANDROID_UPDATE_FREQUENCY_MS = 500;
const TAB_KEY_CODE = 9;
const NO_MOVEMENT = 0;

export const accessibleTarget = {
  accessible: false,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  _accessibleActive: false,
  _accessibleDiv: null,
  accessibleType: "button",
  accessiblePointerEvents: "auto",
  accessibleChildren: true
};

DisplayObject.mixin(accessibleTarget);

export class AccessibilityManager {
  private _hookDiv: HTMLButtonElement | null = null;
  private div: HTMLDivElement;
  private pool: HTMLButtonElement[] = [];
  private renderId: number = 0;
  private debug: boolean = false;
  private renderer: RendererWithInteraction;
  private children: AccessibleDisplayObject[] = [];
  private isActive: boolean = false;
  private isMobileAccessibility: boolean = false;
  private androidUpdateCount: number = 0;
  private androidUpdateFrequency: number = ANDROID_UPDATE_FREQUENCY_MS;

  constructor(renderer: RendererWithInteraction) {
    if (isMobile.tablet || isMobile.phone) {
      this.createTouchHook();
    }

    const containerDiv = document.createElement("div");
    containerDiv.style.width = `${DEFAULT_BUTTON_SIZE}px`;
    containerDiv.style.height = `${DEFAULT_BUTTON_SIZE}px`;
    containerDiv.style.position = "absolute";
    containerDiv.style.top = "0px";
    containerDiv.style.left = "0px";
    containerDiv.style.zIndex = "2";

    this.div = containerDiv;
    this.renderer = renderer;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);

    window.addEventListener("keydown", this._onKeyDown, false);
  }

  private createTouchHook(): void {
    const hookButton = document.createElement("button");
    hookButton.style.width = "1px";
    hookButton.style.height = "1px";
    hookButton.style.position = "absolute";
    hookButton.style.top = "-1000px";
    hookButton.style.left = "-1000px";
    hookButton.style.zIndex = "2";
    hookButton.style.backgroundColor = "#FF0000";
    hookButton.title = "select to enable accessability for this content";

    hookButton.addEventListener("focus", () => {
      this.isMobileAccessibility = true;
      this.activate();
      this.destroyTouchHook();
    });

    document.body.appendChild(hookButton);
    this._hookDiv = hookButton;
  }

  private destroyTouchHook(): void {
    if (this._hookDiv) {
      document.body.removeChild(this._hookDiv);
      this._hookDiv = null;
    }
  }

  public activate(): void {
    if (this.isActive) return;

    this.isActive = true;
    window.document.addEventListener("mousemove", this._onMouseMove, true);
    window.removeEventListener("keydown", this._onKeyDown, false);
    this.renderer.on("postrender", this.update, this);

    if (this.renderer.view.parentNode) {
      this.renderer.view.parentNode.appendChild(this.div);
    }
  }

  public deactivate(): void {
    if (!this.isActive || this.isMobileAccessibility) return;

    this.isActive = false;
    window.document.removeEventListener("mousemove", this._onMouseMove, true);
    window.addEventListener("keydown", this._onKeyDown, false);
    this.renderer.off("postrender", this.update);

    if (this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
    }
  }

  private updateAccessibleObjects(displayObject: AccessibleDisplayObject): void {
    if (!displayObject.visible || !displayObject.accessibleChildren) return;

    if (displayObject.accessible && displayObject.interactive) {
      if (!displayObject._accessibleActive) {
        this.addChild(displayObject);
      }
      displayObject.renderId = this.renderId;
    }

    const children = displayObject.children as AccessibleDisplayObject[];
    for (let i = 0; i < children.length; i++) {
      this.updateAccessibleObjects(children[i]);
    }
  }

  private update(): void {
    const currentTime = performance.now();

    if (isMobile.android.device && currentTime < this.androidUpdateCount) {
      return;
    }

    this.androidUpdateCount = currentTime + this.androidUpdateFrequency;

    if (!this.renderer.renderingToScreen) return;

    this.updateAccessibleObjects(this.renderer._lastObjectRendered);

    const boundingRect = this.renderer.view.getBoundingClientRect();
    const resolution = this.renderer.resolution;
    const scaleX = boundingRect.width / this.renderer.width * resolution;
    const scaleY = boundingRect.height / this.renderer.height * resolution;

    this.div.style.left = `${boundingRect.left}px`;
    this.div.style.top = `${boundingRect.top}px`;
    this.div.style.width = `${this.renderer.width}px`;
    this.div.style.height = `${this.renderer.height}px`;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      if (child.renderId !== this.renderId) {
        child._accessibleActive = false;
        removeItems(this.children, i, 1);
        this.div.removeChild(child._accessibleDiv!);
        this.pool.push(child._accessibleDiv!);
        child._accessibleDiv = null;
        i--;
        continue;
      }

      const accessibleDiv = child._accessibleDiv!;
      const hitArea = child.hitArea;
      const transform = child.worldTransform;

      if (hitArea) {
        accessibleDiv.style.left = `${(transform.tx + hitArea.x * transform.a) * scaleX}px`;
        accessibleDiv.style.top = `${(transform.ty + hitArea.y * transform.d) * scaleY}px`;
        accessibleDiv.style.width = `${hitArea.width * transform.a * scaleX}px`;
        accessibleDiv.style.height = `${hitArea.height * transform.d * scaleY}px`;
      } else {
        const bounds = child.getBounds();
        this.capHitArea(bounds);

        accessibleDiv.style.left = `${bounds.x * scaleX}px`;
        accessibleDiv.style.top = `${bounds.y * scaleY}px`;
        accessibleDiv.style.width = `${bounds.width * scaleX}px`;
        accessibleDiv.style.height = `${bounds.height * scaleY}px`;

        if (accessibleDiv.title !== child.accessibleTitle && child.accessibleTitle !== null) {
          accessibleDiv.title = child.accessibleTitle;
        }

        if (accessibleDiv.getAttribute("aria-label") !== child.accessibleHint && child.accessibleHint !== null) {
          accessibleDiv.setAttribute("aria-label", child.accessibleHint);
        }
      }

      if (child.accessibleTitle !== accessibleDiv.title || child.tabIndex !== accessibleDiv.tabIndex) {
        accessibleDiv.title = child.accessibleTitle ?? "";
        accessibleDiv.tabIndex = child.tabIndex;

        if (this.debug) {
          this.updateDebugHTML(accessibleDiv);
        }
      }
    }

    this.renderId++;
  }

  private updateDebugHTML(element: HTMLButtonElement): void {
    element.innerHTML = `type: ${element.type}</br> title : ${element.title}</br> tabIndex: ${element.tabIndex}`;
  }

  private capHitArea(bounds: Bounds): void {
    if (bounds.x < 0) {
      bounds.width += bounds.x;
      bounds.x = 0;
    }

    if (bounds.y < 0) {
      bounds.height += bounds.y;
      bounds.y = 0;
    }

    if (bounds.x + bounds.width > this.renderer.width) {
      bounds.width = this.renderer.width - bounds.x;
    }

    if (bounds.y + bounds.height > this.renderer.height) {
      bounds.height = this.renderer.height - bounds.y;
    }
  }

  private addChild(displayObject: AccessibleDisplayObject): void {
    let button = this.pool.pop();

    if (!button) {
      button = document.createElement("button");
      button.style.width = `${DEFAULT_BUTTON_SIZE}px`;
      button.style.height = `${DEFAULT_BUTTON_SIZE}px`;
      button.style.backgroundColor = this.debug ? "rgba(255, 255, 255, 0.5)" : "transparent";
      button.style.position = "absolute";
      button.style.zIndex = "2";
      button.style.borderStyle = "none";

      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf("chrome") > -1) {
        button.setAttribute("aria-live", "off");
      } else {
        button.setAttribute("aria-live", "polite");
      }

      if (navigator.userAgent.match(/rv:.*Gecko\//)) {
        button.setAttribute("aria-relevant", "additions");
      } else {
        button.setAttribute("aria-relevant", "text");
      }

      button.addEventListener("click", this._onClick.bind(this));
      button.addEventListener("focus", this._onFocus.bind(this));
      button.addEventListener("focusout", this._onFocusOut.bind(this));
    }

    button.style.pointerEvents = displayObject.accessiblePointerEvents;
    button.type = displayObject.accessibleType;

    if (displayObject.accessibleTitle && displayObject.accessibleTitle !== null) {
      button.title = displayObject.accessibleTitle;
    } else if (!displayObject.accessibleHint || displayObject.accessibleHint === null) {
      button.title = `displayObject ${displayObject.tabIndex}`;
    }

    if (displayObject.accessibleHint && displayObject.accessibleHint !== null) {
      button.setAttribute("aria-label", displayObject.accessibleHint);
    }

    if (this.debug) {
      this.updateDebugHTML(button);
    }

    displayObject._accessibleActive = true;
    displayObject._accessibleDiv = button;
    (button as any).displayObject = displayObject;

    this.children.push(displayObject);
    this.div.appendChild(displayObject._accessibleDiv);
    displayObject._accessibleDiv.tabIndex = displayObject.tabIndex;
  }

  private _onClick(event: MouseEvent): void {
    const target = event.target as HTMLButtonElement & { displayObject: AccessibleDisplayObject };
    const interaction = this.renderer.plugins.interaction;

    interaction.dispatchEvent(target.displayObject, "click", interaction.eventData);
    interaction.dispatchEvent(target.displayObject, "pointertap", interaction.eventData);
    interaction.dispatchEvent(target.displayObject, "tap", interaction.eventData);
  }

  private _onFocus(event: FocusEvent): void {
    const target = event.target as HTMLButtonElement & { displayObject: AccessibleDisplayObject };

    if (!target.getAttribute("aria-live")) {
      target.setAttribute("aria-live", "assertive");
    }

    const interaction = this.renderer.plugins.interaction;
    interaction.dispatchEvent(target.displayObject, "mouseover", interaction.eventData);
  }

  private _onFocusOut(event: FocusEvent): void {
    const target = event.target as HTMLButtonElement & { displayObject: AccessibleDisplayObject };

    if (!target.getAttribute("aria-live")) {
      target.setAttribute("aria-live", "polite");
    }

    const interaction = this.renderer.plugins.interaction;
    interaction.dispatchEvent(target.displayObject, "mouseout", interaction.eventData);
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === TAB_KEY_CODE) {
      this.activate();
    }
  }

  private _onMouseMove(event: MouseEvent): void {
    if (event.movementX !== NO_MOVEMENT || event.movementY !== NO_MOVEMENT) {
      this.deactivate();
    }
  }

  public destroy(): void {
    this.destroyTouchHook();

    for (let i = 0; i < this.children.length; i++) {
      this.children[i]._accessibleDiv = null;
    }

    window.document.removeEventListener("mousemove", this._onMouseMove, true);
    window.removeEventListener("keydown", this._onKeyDown);

    this.pool = [];
    this.children = [];
    this.renderer = null!;
    this.div = null!;
  }
}