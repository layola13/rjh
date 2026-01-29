import { Container } from './Container';
import { autoDetectRenderer } from './autoDetectRenderer';
import type { Renderer } from './Renderer';

interface ApplicationOptions {
  forceCanvas?: boolean;
  resizeTo?: Window | HTMLElement | null;
  [key: string]: unknown;
}

interface ApplicationPlugin {
  init(this: Application, options: ApplicationOptions): void;
  destroy(this: Application): void;
}

export class Application {
  private static _plugins: ApplicationPlugin[] = [];

  renderer: Renderer;
  stage: Container;
  private _options?: ApplicationOptions | null;
  private _resizeTo?: Window | HTMLElement | null;
  resize?: () => void;

  constructor(options: ApplicationOptions = {}) {
    const mergedOptions: ApplicationOptions = Object.assign(
      { forceCanvas: false },
      options
    );

    this.renderer = autoDetectRenderer(mergedOptions);
    this.stage = new Container();

    Application._plugins.forEach((plugin) => {
      plugin.init.call(this, mergedOptions);
    });
  }

  static registerPlugin(plugin: ApplicationPlugin): void {
    Application._plugins.push(plugin);
  }

  render(): void {
    this.renderer.render(this.stage);
  }

  get view(): HTMLCanvasElement {
    return this.renderer.view;
  }

  get screen(): Rectangle {
    return this.renderer.screen;
  }

  destroy(removeView?: boolean, stageOptions?: unknown): void {
    const plugins = Application._plugins.slice(0);
    plugins.reverse();
    plugins.forEach((plugin) => {
      plugin.destroy.call(this);
    });

    this.stage.destroy(stageOptions);
    this.stage = null!;
    this.renderer.destroy(removeView);
    this.renderer = null!;
    this._options = null;
  }
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ResizePlugin: ApplicationPlugin = {
  init(this: Application, options: ApplicationOptions): void {
    Object.defineProperty(this, 'resizeTo', {
      set(target: Window | HTMLElement | null) {
        window.removeEventListener('resize', this.resize);
        this._resizeTo = target;
        if (target) {
          window.addEventListener('resize', this.resize);
          this.resize();
        }
      },
      get(): Window | HTMLElement | null | undefined {
        return this._resizeTo;
      }
    });

    this.resize = () => {
      if (this._resizeTo) {
        if (this._resizeTo === window) {
          this.renderer.resize(window.innerWidth, window.innerHeight);
        } else {
          const element = this._resizeTo as HTMLElement;
          this.renderer.resize(element.clientWidth, element.clientHeight);
        }
      }
    };

    this._resizeTo = null;
    this.resizeTo = options.resizeTo ?? null;
  },

  destroy(this: Application): void {
    this.resizeTo = null;
    this.resize = null!;
  }
};

Application.registerPlugin(ResizePlugin);