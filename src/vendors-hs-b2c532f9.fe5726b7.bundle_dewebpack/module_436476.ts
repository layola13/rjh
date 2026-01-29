interface PerfectScrollbarSettings {
  [key: string]: any;
}

interface EventManager {
  bind(element: HTMLElement, eventName: string, handler: () => void): void;
}

interface DOMHelper {
  css(element: HTMLElement, property: string, value?: string): string | void;
  create(tagName: string, className: string): HTMLElement;
  appendTo(child: HTMLElement, parent: HTMLElement): HTMLElement;
}

interface Utils {
  toInt(value: string): number;
  outerWidth(element: HTMLElement): number;
}

class PerfectScrollbar {
  settings: PerfectScrollbarSettings;
  containerWidth: number | null = null;
  containerHeight: number | null = null;
  contentWidth: number | null = null;
  contentHeight: number | null = null;
  isRtl: boolean;
  isNegativeScroll: boolean;
  negativeScrollAdjustment: number;
  event: EventManager;
  ownerDocument: Document;
  scrollbarXRail: HTMLElement;
  scrollbarX: HTMLElement;
  scrollbarXActive: boolean | null = null;
  scrollbarXWidth: number | null = null;
  scrollbarXLeft: number | null = null;
  scrollbarXBottom: number;
  isScrollbarXUsingBottom: boolean;
  scrollbarXTop: number | null;
  railBorderXWidth: number;
  railXMarginWidth: number;
  railXWidth: number | null = null;
  railXRatio: number | null = null;
  scrollbarYRail: HTMLElement;
  scrollbarY: HTMLElement;
  scrollbarYActive: boolean | null = null;
  scrollbarYHeight: number | null = null;
  scrollbarYTop: number | null = null;
  scrollbarYRight: number;
  isScrollbarYUsingRight: boolean;
  scrollbarYLeft: number | null;
  scrollbarYOuterWidth: number | null;
  railBorderYWidth: number;
  railYMarginHeight: number;
  railYHeight: number | null = null;
  railYRatio: number | null = null;

  constructor(
    element: HTMLElement,
    options: PerfectScrollbarSettings,
    utils: Utils,
    domHelper: DOMHelper,
    eventManager: EventManager,
    getDefaultSettings: () => PerfectScrollbarSettings
  ) {
    this.settings = getDefaultSettings();
    
    for (const key in options) {
      this.settings[key] = options[key];
    }

    const handleFocus = (): void => {
      element.classList.add('ps--focus');
    };

    const handleBlur = (): void => {
      element.classList.remove('ps--focus');
    };

    this.isRtl = domHelper.css(element, 'direction') === 'rtl';

    const originalScrollLeft = element.scrollLeft;
    element.scrollLeft = -1;
    const hasNegativeScroll = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    this.isNegativeScroll = hasNegativeScroll;

    this.negativeScrollAdjustment = this.isNegativeScroll 
      ? element.scrollWidth - element.clientWidth 
      : 0;

    this.event = eventManager;
    this.ownerDocument = element.ownerDocument ?? document;

    this.scrollbarXRail = domHelper.appendTo(
      domHelper.create('div', 'ps__scrollbar-x-rail'),
      element
    );
    this.scrollbarX = domHelper.appendTo(
      domHelper.create('div', 'ps__scrollbar-x'),
      this.scrollbarXRail
    );
    this.scrollbarX.setAttribute('tabindex', '0');
    this.event.bind(this.scrollbarX, 'focus', handleFocus);
    this.event.bind(this.scrollbarX, 'blur', handleBlur);

    this.scrollbarXBottom = utils.toInt(domHelper.css(this.scrollbarXRail, 'bottom') as string);
    this.isScrollbarXUsingBottom = this.scrollbarXBottom === this.scrollbarXBottom;
    this.scrollbarXTop = this.isScrollbarXUsingBottom 
      ? null 
      : utils.toInt(domHelper.css(this.scrollbarXRail, 'top') as string);

    this.railBorderXWidth = 
      utils.toInt(domHelper.css(this.scrollbarXRail, 'borderLeftWidth') as string) +
      utils.toInt(domHelper.css(this.scrollbarXRail, 'borderRightWidth') as string);

    domHelper.css(this.scrollbarXRail, 'display', 'block');
    this.railXMarginWidth = 
      utils.toInt(domHelper.css(this.scrollbarXRail, 'marginLeft') as string) +
      utils.toInt(domHelper.css(this.scrollbarXRail, 'marginRight') as string);
    domHelper.css(this.scrollbarXRail, 'display', '');

    this.scrollbarYRail = domHelper.appendTo(
      domHelper.create('div', 'ps__scrollbar-y-rail'),
      element
    );
    this.scrollbarY = domHelper.appendTo(
      domHelper.create('div', 'ps__scrollbar-y'),
      this.scrollbarYRail
    );
    this.scrollbarY.setAttribute('tabindex', '0');
    this.event.bind(this.scrollbarY, 'focus', handleFocus);
    this.event.bind(this.scrollbarY, 'blur', handleBlur);

    this.scrollbarYRight = utils.toInt(domHelper.css(this.scrollbarYRail, 'right') as string);
    this.isScrollbarYUsingRight = this.scrollbarYRight === this.scrollbarYRight;
    this.scrollbarYLeft = this.isScrollbarYUsingRight 
      ? null 
      : utils.toInt(domHelper.css(this.scrollbarYRail, 'left') as string);

    this.scrollbarYOuterWidth = this.isRtl ? utils.outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth = 
      utils.toInt(domHelper.css(this.scrollbarYRail, 'borderTopWidth') as string) +
      utils.toInt(domHelper.css(this.scrollbarYRail, 'borderBottomWidth') as string);

    domHelper.css(this.scrollbarYRail, 'display', 'block');
    this.railYMarginHeight = 
      utils.toInt(domHelper.css(this.scrollbarYRail, 'marginTop') as string) +
      utils.toInt(domHelper.css(this.scrollbarYRail, 'marginBottom') as string);
    domHelper.css(this.scrollbarYRail, 'display', '');
  }
}

const instanceStore: Record<string, PerfectScrollbar> = {};

function getDataPsId(element: HTMLElement): string | null {
  return element.getAttribute('data-ps-id');
}

function setDataPsId(element: HTMLElement, id: string): void {
  element.setAttribute('data-ps-id', id);
}

function removeDataPsId(element: HTMLElement): void {
  element.removeAttribute('data-ps-id');
}

export function add(
  element: HTMLElement,
  options: PerfectScrollbarSettings,
  utils: Utils,
  domHelper: DOMHelper,
  eventManager: EventManager,
  getDefaultSettings: () => PerfectScrollbarSettings,
  generateId: () => string
): PerfectScrollbar {
  const id = generateId();
  setDataPsId(element, id);
  instanceStore[id] = new PerfectScrollbar(
    element,
    options,
    utils,
    domHelper,
    eventManager,
    getDefaultSettings
  );
  return instanceStore[id];
}

export function remove(element: HTMLElement): void {
  const id = getDataPsId(element);
  if (id) {
    delete instanceStore[id];
  }
  removeDataPsId(element);
}

export function get(element: HTMLElement): PerfectScrollbar | undefined {
  const id = getDataPsId(element);
  return id ? instanceStore[id] : undefined;
}