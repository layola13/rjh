interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface Position {
  top: number;
  left: number;
}

interface Storage {
  clear(key: string): void;
  get(key: string): unknown;
}

interface Signal {
  new (context: unknown): Signal;
}

interface StorageConstructor {
  new (namespace: string): Storage;
}

interface Util {
  Storage: StorageConstructor;
  Signal: Signal;
}

interface HSCore {
  Util: Util;
}

interface HSApp {
  Util: Util;
}

interface ResourceManager {
  parseURL(path: string, basePath: string): string;
}

declare const HSCore: HSCore;
declare const HSApp: HSApp;
declare const ResourceManager: ResourceManager;
declare const $: (selector: Window | string) => {
  width(): number;
  height(): number;
};

const PADDING_SMALL = 48;
const PADDING_LARGE = 104;
const PADDING_EDGE = 33;
const PADDING_RIGHT = 10;
const PADDING_OFFSET = 3;

const STORAGE_NAMESPACE = 'hsw.plugin.userguide';
const RESOURCE_BASE_PATH = './plugin/userguide/';
const RESOURCE_PREFIX = 'res/';
const IMAGE_RESOURCE_PREFIX = 'res/ImgUserGuidePlugin/';

const IMAGE_EXTENSION_PATTERN = /\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/;

interface UserGuideModule {
  storage: Record<string, Storage>;
  signalSkipBtnClicked: Signal;
  initStorage(key: string): void;
  clearStorage(key: string): void;
  getStorage(key: string): unknown;
  getTargetPoint(element: Rectangle, dimensions: Dimensions): Position;
  getOffset(element: HTMLElement): Position;
  parseURL(url: string): string;
}

const userGuideModule: UserGuideModule = {
  storage: {},

  signalSkipBtnClicked: new HSCore.Util.Signal(this),

  initStorage(key: string): void {
    this.storage[key] = new HSApp.Util.Storage(STORAGE_NAMESPACE);
  },

  clearStorage(key: string): void {
    if (!this.storage[key]) {
      this.storage[key] = new HSApp.Util.Storage(STORAGE_NAMESPACE);
    }
    this.storage[key].clear(key);
    delete this.storage[key];
  },

  getStorage(key: string): unknown {
    if (!this.storage[key]) {
      this.storage[key] = new HSApp.Util.Storage(STORAGE_NAMESPACE);
    }
    return this.storage[key].get(key);
  },

  getTargetPoint(element: Rectangle, dimensions: Dimensions): Position {
    const { width: targetWidth, height: targetHeight } = dimensions;
    let left = 0;
    let top = 0;
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    if (element.left > targetWidth && element.right < targetWidth) {
      left = element.left - targetWidth;
      top = element.top;
    } else if (element.top < targetHeight && element.bottom > targetHeight) {
      top = element.top + element.height;
      left = element.left + element.width / 2 - targetWidth / 2;
      if (left < 0) {
        left = PADDING_SMALL;
      }
      if (left + targetWidth > windowWidth) {
        top = element.top + (element.height - targetHeight) / 2;
        left = element.left - targetWidth + PADDING_OFFSET;
      }
    } else if (element.left < targetWidth && element.right > targetWidth) {
      left = element.left + element.width;
      left = element.width / 2 < PADDING_SMALL ? PADDING_SMALL : element.left + element.width / 2;
      top = element.top + element.height / 2 - targetHeight / 2;
      if (top < 0) {
        top = PADDING_LARGE;
      }
      if (top + targetHeight > windowHeight) {
        top = windowHeight - targetHeight - PADDING_EDGE;
      }
    } else if (element.bottom < targetHeight && element.top > targetHeight) {
      top = element.top - targetHeight;
      left = element.left + element.width / 2 - targetWidth / 2;
      if (left < 0) {
        left = PADDING_SMALL;
      }
      if (left + targetWidth > windowWidth) {
        left = windowWidth - targetWidth - PADDING_RIGHT;
      }
    } else {
      left = element.width - targetWidth - PADDING_RIGHT;
      top = element.height / 2 - targetHeight / 2;
    }

    return { top, left };
  },

  getOffset(element: HTMLElement): Position {
    let top = 0;
    let left = 0;
    let currentElement: HTMLElement | null = element;

    while (
      currentElement &&
      !isNaN(currentElement.offsetLeft) &&
      !isNaN(currentElement.offsetTop)
    ) {
      left += currentElement.offsetLeft - currentElement.scrollLeft;
      top += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent as HTMLElement | null;
    }

    return { top, left };
  },

  parseURL(url: string): string {
    let resourcePath = RESOURCE_PREFIX + url;

    if (IMAGE_EXTENSION_PATTERN.test(url)) {
      resourcePath = IMAGE_RESOURCE_PREFIX + url;
    }

    return ResourceManager.parseURL(resourcePath, RESOURCE_BASE_PATH);
  }
};

export default userGuideModule;