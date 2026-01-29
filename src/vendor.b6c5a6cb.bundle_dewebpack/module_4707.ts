interface CarouselOptions {
  interval: number | false;
  pause: string | false;
  wrap: boolean;
  keyboard: boolean;
  slide?: string;
}

interface CarouselEventData {
  relatedTarget: HTMLElement;
  direction: string;
}

interface JQuerySupport {
  transition?: {
    end: string;
  };
}

interface JQuery {
  carousel(options?: CarouselOptions | string | number): JQuery;
  data(key: string, value?: unknown): unknown;
  emulateTransitionEnd(duration: number): JQuery;
  one(events: string, handler: (event: JQuery.Event) => void): JQuery;
}

class Carousel {
  static readonly VERSION = "3.3.7";
  static readonly TRANSITION_DURATION = 600;
  static readonly DEFAULTS: CarouselOptions = {
    interval: 5000,
    pause: "hover",
    wrap: true,
    keyboard: true
  };

  private $element: JQuery;
  private $indicators: JQuery;
  private options: CarouselOptions;
  private paused: boolean | null;
  private sliding: boolean | null;
  private interval: number | null;
  private $active: JQuery | null;
  private $items: JQuery | null;

  constructor(element: HTMLElement, options: CarouselOptions) {
    this.$element = $(element);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    if (this.options.keyboard) {
      this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
    }

    if (
      this.options.pause === "hover" &&
      !("ontouchstart" in document.documentElement)
    ) {
      this.$element
        .on("mouseenter.bs.carousel", $.proxy(this.pause, this))
        .on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    }
  }

  keydown(event: JQuery.Event): void {
    if (!/input|textarea/i.test((event.target as HTMLElement).tagName)) {
      switch (event.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return;
      }
      event.preventDefault();
    }
  }

  cycle(shouldResetPaused?: boolean): this {
    if (!shouldResetPaused) {
      this.paused = false;
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.options.interval && !this.paused) {
      this.interval = setInterval(
        $.proxy(this.next, this),
        this.options.interval
      ) as unknown as number;
    }

    return this;
  }

  getItemIndex(item: JQuery): number {
    this.$items = item.parent().children(".item");
    return this.$items.index(item || this.$active);
  }

  getItemForDirection(direction: string, activeItem: JQuery): JQuery {
    const activeIndex = this.getItemIndex(activeItem);

    const isFirstItem = direction === "prev" && activeIndex === 0;
    const isLastItem = direction === "next" && activeIndex === this.$items!.length - 1;

    if ((isFirstItem || isLastItem) && !this.options.wrap) {
      return activeItem;
    }

    const delta = direction === "prev" ? -1 : 1;
    const nextIndex = (activeIndex + delta) % this.$items!.length;

    return this.$items!.eq(nextIndex);
  }

  to(position: number): void | this {
    const self = this;
    this.$active = this.$element.find(".item.active");
    const activeIndex = this.getItemIndex(this.$active);

    if (position > this.$items!.length - 1 || position < 0) {
      return;
    }

    if (this.sliding) {
      return this.$element.one("slid.bs.carousel", () => {
        self.to(position);
      });
    }

    if (activeIndex === position) {
      return this.pause().cycle();
    }

    const direction = position > activeIndex ? "next" : "prev";
    return this.slide(direction, this.$items!.eq(position));
  }

  pause(shouldResetPaused?: boolean): this {
    if (!shouldResetPaused) {
      this.paused = true;
    }

    if (
      this.$element.find(".next, .prev").length &&
      ($.support as JQuerySupport).transition
    ) {
      this.$element.trigger(($.support as JQuerySupport).transition!.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval!) as unknown as null;

    return this;
  }

  next(): this | void {
    if (!this.sliding) {
      return this.slide("next");
    }
  }

  prev(): this | void {
    if (!this.sliding) {
      return this.slide("prev");
    }
  }

  slide(direction: string, nextItem?: JQuery): this {
    const $active = this.$element.find(".item.active");
    const $next = nextItem || this.getItemForDirection(direction, $active);
    const intervalValue = this.interval;
    const directionClass = direction === "next" ? "left" : "right";
    const self = this;

    if ($next.hasClass("active")) {
      this.sliding = false;
      return this;
    }

    const relatedTarget = $next[0];
    const slideEvent = $.Event("slide.bs.carousel", {
      relatedTarget,
      direction: directionClass
    } as CarouselEventData);

    this.$element.trigger(slideEvent);

    if (slideEvent.isDefaultPrevented()) {
      return this;
    }

    this.sliding = true;

    if (intervalValue) {
      this.pause();
    }

    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      const $nextIndicator = $(
        this.$indicators.children()[this.getItemIndex($next)]
      );
      if ($nextIndicator) {
        $nextIndicator.addClass("active");
      }
    }

    const slidEvent = $.Event("slid.bs.carousel", {
      relatedTarget,
      direction: directionClass
    } as CarouselEventData);

    if (
      ($.support as JQuerySupport).transition &&
      this.$element.hasClass("slide")
    ) {
      $next.addClass(direction);
      $next[0].offsetWidth;
      $active.addClass(directionClass);
      $next.addClass(directionClass);

      $active
        .one("bsTransitionEnd", () => {
          $next
            .removeClass([direction, directionClass].join(" "))
            .addClass("active");
          $active.removeClass(["active", directionClass].join(" "));
          self.sliding = false;
          setTimeout(() => {
            self.$element.trigger(slidEvent);
          }, 0);
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass("active");
      $next.addClass("active");
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    if (intervalValue) {
      this.cycle();
    }

    return this;
  }
}

function carouselPlugin(
  this: JQuery,
  option?: CarouselOptions | string | number
): JQuery {
  return this.each(function (this: HTMLElement) {
    const $this = $(this);
    let data = $this.data("bs.carousel") as Carousel | undefined;
    const options = $.extend(
      {},
      Carousel.DEFAULTS,
      $this.data(),
      typeof option === "object" && option
    );
    const action = typeof option === "string" ? option : options.slide;

    if (!data) {
      data = new Carousel(this, options);
      $this.data("bs.carousel", data);
    }

    if (typeof option === "number") {
      data.to(option);
    } else if (action) {
      (data as any)[action]();
    } else if (options.interval) {
      data.pause().cycle();
    }
  });
}

const oldCarousel = $.fn.carousel;

$.fn.carousel = carouselPlugin;
$.fn.carousel.Constructor = Carousel;
$.fn.carousel.noConflict = function (): typeof carouselPlugin {
  $.fn.carousel = oldCarousel;
  return carouselPlugin;
};

function handleClickEvent(event: JQuery.Event): void {
  const $this = $(event.currentTarget as HTMLElement);
  const href = $this.attr("href");
  const targetSelector =
    $this.attr("data-target") || (href && href.replace(/.*(?=#[^\s]+$)/, ""));
  const $target = $(targetSelector!);

  if ($target.hasClass("carousel")) {
    const options = $.extend({}, $target.data(), $this.data());
    const slideToIndex = $this.attr("data-slide-to");

    if (slideToIndex) {
      options.interval = false;
    }

    carouselPlugin.call($target, options);

    if (slideToIndex) {
      ($target.data("bs.carousel") as Carousel).to(Number(slideToIndex));
    }

    event.preventDefault();
  }
}

$(document)
  .on("click.bs.carousel.data-api", "[data-slide]", handleClickEvent)
  .on("click.bs.carousel.data-api", "[data-slide-to]", handleClickEvent);

$(window).on("load", () => {
  $('[data-ride="carousel"]').each(function (this: HTMLElement) {
    const $carousel = $(this);
    carouselPlugin.call($carousel, $carousel.data());
  });
});