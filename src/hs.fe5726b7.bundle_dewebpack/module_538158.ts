interface ArrowOptions {
  l: number;
  t: number;
  w: number;
  h: number;
  color: string;
  rot: number;
  txt: string;
}

interface ArrowWidget extends JQuery {
  arrow(options?: Partial<ArrowOptions>): JQuery;
  arrow(method: 'update', left: number, top: number, width: number, height: number): JQuery;
}

interface JQuery {
  widget(name: string, widget: WidgetDefinition): void;
}

interface WidgetDefinition {
  widgetEventPrefix: string;
  options: ArrowOptions;
  _create(): void;
  update(left: number, top: number, width: number, height: number): void;
}

interface ResourceManagerStatic {
  injectSVGImage(selector: string): Promise<void>;
}

declare const ResourceManager: ResourceManagerStatic;

const ROTATION_90_DEGREES = 90;
const TRIANGLE_SIZE = 10;
const TRIANGLE_OFFSET = -4;
const TEXT_FONT_SIZE = '16px';
const TEXT_MARGIN_TOP = '-10px 0 0 5px';
const TEXT_MARGIN_LEFT_ROTATED = '-13px';

$.widget('custom.arrow', {
  widgetEventPrefix: 'arrow',
  
  options: {
    l: 0,
    t: 0,
    w: 100,
    h: 100,
    color: '#ff0000',
    rot: 0,
    txt: 'txt'
  } as ArrowOptions,

  _create: function(this: { element: JQuery; options: ArrowOptions }) {
    const rotationTransform = `rotate(${this.options.rot}deg)`;
    
    this.element.css({
      'background-color': this.options.color,
      transform: rotationTransform,
      '-ms-transform': rotationTransform,
      '-webkit-transform': rotationTransform,
      position: 'absolute'
    });

    this.element.append('<span class="triangle1 triangle"><span data-src="res/svgs/arrow_triangle.svg"></span></span>');
    this.element.append('<span class="triangle2 triangle"><span data-src="res/svgs/arrow_triangle.svg"></span></span>');
    this.element.append('<span class="txt">txt</span>');

    const self = this;
    
    ResourceManager.injectSVGImage('.triangle span').then(() => {
      self.element.find('.triangle svg path').attr('fill', self.options.color);
    });

    this.element.find('.txt').css({
      position: 'absolute',
      top: '50%',
      'font-size': TEXT_FONT_SIZE,
      color: this.options.color,
      margin: TEXT_MARGIN_TOP
    }).text(this.options.txt);

    if (this.options.rot === ROTATION_90_DEGREES) {
      const rotateNegative90 = 'rotate(-90deg)';
      this.element.find('.txt').css({
        marginLeft: TEXT_MARGIN_LEFT_ROTATED,
        transform: rotateNegative90,
        '-ms-transform': rotateNegative90,
        '-webkit-transform': rotateNegative90
      });
    }

    const rotate180 = 'rotate(180deg)';
    this.element.find('.triangle2').css({
      top: 0,
      transform: rotate180,
      '-ms-transform': rotate180,
      '-webkit-transform': rotate180
    });

    this.element.find('.triangle').css({
      width: `${TRIANGLE_SIZE}px`,
      height: `${TRIANGLE_SIZE}px`,
      position: 'absolute',
      left: `${TRIANGLE_OFFSET}px`
    });

    this.update(this.options.l, this.options.t, this.options.w, this.options.h);
  },

  update: function(this: { element: JQuery; options: ArrowOptions }, left: number, top: number, width: number, height: number): void {
    let adjustedLeft = left;
    let adjustedTop = top;

    if (this.options.rot === ROTATION_90_DEGREES) {
      adjustedLeft += height / 2;
      adjustedTop -= height / 2;
    }

    this.element.width(width).height(height);
    this.element.css('left', adjustedLeft);
    this.element.css('top', adjustedTop);

    this.element.find('.triangle1').css({
      top: this.element.height() - TRIANGLE_SIZE
    });

    this.element.find('.triangle svg path').attr('fill', this.options.color);
  }
} as WidgetDefinition);