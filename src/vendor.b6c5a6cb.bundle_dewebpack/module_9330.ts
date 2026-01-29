interface ButtonOptions {
  loadingText?: string;
}

interface ButtonData {
  resetText?: string;
  loadingText?: string;
  [key: string]: string | undefined;
}

interface JQueryButtonElement extends JQuery {
  data(key: 'bs.button'): Button | undefined;
  data(key: 'bs.button', value: Button): void;
  data(key: string): unknown;
  data(key: string, value: unknown): void;
}

class Button {
  static readonly VERSION: string = '3.3.7';
  
  static readonly DEFAULTS: ButtonOptions = {
    loadingText: 'loading...'
  };

  private $element: JQuery;
  private options: ButtonOptions;
  private isLoading: boolean;

  constructor(element: HTMLElement, options?: ButtonOptions) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  }

  setState(state: string): void {
    const disabledClass = 'disabled';
    const $element = this.$element;
    const method = $element.is('input') ? 'val' : 'html';
    const data = $element.data() as ButtonData;
    const stateText = `${state}Text`;

    if (data.resetText == null) {
      $element.data('resetText', ($element as any)[method]());
    }

    setTimeout(
      $.proxy(() => {
        const textValue = data[stateText] ?? this.options[stateText as keyof ButtonOptions];
        ($element as any)[method](textValue);

        if (state === 'loading') {
          this.isLoading = true;
          $element
            .addClass(disabledClass)
            .attr(disabledClass, disabledClass)
            .prop(disabledClass, true);
        } else if (this.isLoading) {
          this.isLoading = false;
          $element
            .removeClass(disabledClass)
            .removeAttr(disabledClass)
            .prop(disabledClass, false);
        }
      }, this),
      0
    );
  }

  toggle(): void {
    let shouldTriggerChange = true;
    const $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      const $input = this.$element.find('input');
      const inputType = $input.prop('type') as string;

      if (inputType === 'radio') {
        if ($input.prop('checked')) {
          shouldTriggerChange = false;
        }
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');
      } else if (inputType === 'checkbox') {
        if ($input.prop('checked') !== this.$element.hasClass('active')) {
          shouldTriggerChange = false;
        }
        this.$element.toggleClass('active');
      }

      $input.prop('checked', this.$element.hasClass('active'));

      if (shouldTriggerChange) {
        $input.trigger('change');
      }
    } else {
      this.$element.attr('aria-pressed', String(!this.$element.hasClass('active')));
      this.$element.toggleClass('active');
    }
  }
}

function buttonPlugin(this: JQuery, option?: string | ButtonOptions): JQuery {
  return this.each(function (this: HTMLElement): void {
    const $this = $(this) as JQueryButtonElement;
    let buttonInstance = $this.data('bs.button');
    const options = typeof option === 'object' ? option : undefined;

    if (!buttonInstance) {
      buttonInstance = new Button(this, options);
      $this.data('bs.button', buttonInstance);
    }

    if (option === 'toggle') {
      buttonInstance.toggle();
    } else if (typeof option === 'string') {
      buttonInstance.setState(option);
    }
  });
}

const originalButtonFn = $.fn.button;

$.fn.button = buttonPlugin;
($.fn.button as any).Constructor = Button;
$.fn.button.noConflict = function (): typeof originalButtonFn {
  $.fn.button = originalButtonFn;
  return originalButtonFn;
};

$(document)
  .on('click.bs.button.data-api', '[data-toggle^="button"]', function (event: JQuery.Event): void {
    const $btn = $(event.target as HTMLElement).closest('.btn');
    buttonPlugin.call($btn, 'toggle');

    const isInputTarget = $(event.target as HTMLElement).is('input[type="radio"], input[type="checkbox"]');
    if (!isInputTarget) {
      event.preventDefault();
      if ($btn.is('input, button')) {
        $btn.trigger('focus');
      } else {
        $btn.find('input:visible, button:visible').first().trigger('focus');
      }
    }
  })
  .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (event: JQuery.Event): void {
    const isFocusEvent = /^focus(in)?$/.test(event.type);
    $(event.target as HTMLElement).closest('.btn').toggleClass('focus', isFocusEvent);
  });