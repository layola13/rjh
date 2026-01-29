interface ModalOptions {
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  show?: boolean;
  remote?: string | false;
}

interface ModalEventDetail {
  relatedTarget?: HTMLElement;
}

interface JQueryModalEvent extends JQueryEventObject {
  relatedTarget?: HTMLElement;
}

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

const DEFAULT_OPTIONS: ModalOptions = {
  backdrop: true,
  keyboard: true,
  show: true
};

class Modal {
  public static readonly VERSION = '3.3.7';
  
  private options: ModalOptions;
  private $body: JQuery;
  private $element: JQuery;
  private $dialog: JQuery;
  private $backdrop: JQuery | null;
  private isShown: boolean | null;
  private originalBodyPad: string | null;
  private scrollbarWidth: number;
  private ignoreBackdropClick: boolean;
  private bodyIsOverflowing: boolean = false;

  constructor(element: HTMLElement, options: ModalOptions) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, () => {
        this.$element.trigger('loaded.bs.modal');
      });
    }
  }

  public toggle(relatedTarget?: HTMLElement): void {
    if (this.isShown) {
      this.hide();
    } else {
      this.show(relatedTarget);
    }
  }

  public show(relatedTarget?: HTMLElement): void {
    const showEvent = $.Event('show.bs.modal', { relatedTarget }) as JQueryModalEvent;
    this.$element.trigger(showEvent);

    if (this.isShown || showEvent.isDefaultPrevented()) {
      return;
    }

    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');
    this.escape();
    this.resize();

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', (event) => {
      this.hide(event);
    });

    this.$dialog.on('mousedown.dismiss.bs.modal', () => {
      this.$element.one('mouseup.dismiss.bs.modal', (event) => {
        if ($(event.target).is(this.$element)) {
          this.ignoreBackdropClick = true;
        }
      });
    });

    this.backdrop(() => {
      const hasTransition = $.support.transition && this.$element.hasClass('fade');

      if (!this.$element.parent().length) {
        this.$element.appendTo(this.$body);
      }

      this.$element.show().scrollTop(0);
      this.adjustDialog();

      if (hasTransition) {
        this.$element[0].offsetWidth; // Force reflow
      }

      this.$element.addClass('in');
      this.enforceFocus();

      const shownEvent = $.Event('shown.bs.modal', { relatedTarget }) as JQueryModalEvent;

      if (hasTransition) {
        this.$dialog
          .one('bsTransitionEnd', () => {
            this.$element.trigger('focus').trigger(shownEvent);
          })
          .emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this.$element.trigger('focus').trigger(shownEvent);
      }
    });
  }

  public hide(event?: JQueryEventObject): void {
    if (event) {
      event.preventDefault();
    }

    const hideEvent = $.Event('hide.bs.modal');
    this.$element.trigger(hideEvent);

    if (!this.isShown || hideEvent.isDefaultPrevented()) {
      return;
    }

    this.isShown = false;
    this.escape();
    this.resize();

    $(document).off('focusin.bs.modal');

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal');

    this.$dialog.off('mousedown.dismiss.bs.modal');

    if ($.support.transition && this.$element.hasClass('fade')) {
      this.$element
        .one('bsTransitionEnd', () => {
          this.hideModal();
        })
        .emulateTransitionEnd(TRANSITION_DURATION);
    } else {
      this.hideModal();
    }
  }

  private enforceFocus(): void {
    $(document)
      .off('focusin.bs.modal')
      .on('focusin.bs.modal', (event) => {
        if (
          document !== event.target &&
          this.$element[0] !== event.target &&
          !this.$element.has(event.target).length
        ) {
          this.$element.trigger('focus');
        }
      });
  }

  private escape(): void {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', (event) => {
        if (event.which === 27) {
          this.hide();
        }
      });
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  }

  private resize(): void {
    if (this.isShown) {
      $(window).on('resize.bs.modal', () => {
        this.handleUpdate();
      });
    } else {
      $(window).off('resize.bs.modal');
    }
  }

  private hideModal(): void {
    this.$element.hide();
    this.backdrop(() => {
      this.$body.removeClass('modal-open');
      this.resetAdjustments();
      this.resetScrollbar();
      this.$element.trigger('hidden.bs.modal');
    });
  }

  private removeBackdrop(): void {
    if (this.$backdrop) {
      this.$backdrop.remove();
      this.$backdrop = null;
    }
  }

  private backdrop(callback?: () => void): void {
    const fadeClass = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      const hasTransition = $.support.transition && !!fadeClass;

      this.$backdrop = $(document.createElement('div'))
        .addClass(`modal-backdrop ${fadeClass}`)
        .appendTo(this.$body);

      this.$element.on('click.dismiss.bs.modal', (event) => {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
        } else if (event.target === event.currentTarget) {
          if (this.options.backdrop === 'static') {
            this.$element[0].focus();
          } else {
            this.hide();
          }
        }
      });

      if (hasTransition) {
        this.$backdrop[0].offsetWidth; // Force reflow
      }

      this.$backdrop.addClass('in');

      if (!callback) {
        return;
      }

      if (hasTransition) {
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else {
        callback();
      }
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      const callbackRemove = (): void => {
        this.removeBackdrop();
        if (callback) {
          callback();
        }
      };

      if ($.support.transition && this.$element.hasClass('fade')) {
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  }

  private handleUpdate(): void {
    this.adjustDialog();
  }

  private adjustDialog(): void {
    const isModalOverflowing =
      this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && isModalOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !isModalOverflowing ? this.scrollbarWidth : ''
    });
  }

  private resetAdjustments(): void {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  }

  private checkScrollbar(): void {
    let windowWidth = window.innerWidth;

    if (!windowWidth) {
      const documentRect = document.documentElement.getBoundingClientRect();
      windowWidth = documentRect.right - Math.abs(documentRect.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < windowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  }

  private setScrollbar(): void {
    const bodyPaddingRight = parseInt(this.$body.css('padding-right') || '0', 10);
    this.originalBodyPad = document.body.style.paddingRight || '';

    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
    }
  }

  private resetScrollbar(): void {
    this.$body.css('padding-right', this.originalBodyPad);
  }

  private measureScrollbar(): number {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  }
}

function modalPlugin(this: JQuery, option?: string | ModalOptions, relatedTarget?: HTMLElement): JQuery {
  return this.each(function (this: HTMLElement) {
    const $this = $(this);
    let data = $this.data('bs.modal') as Modal | undefined;
    const options = {
      ...DEFAULT_OPTIONS,
      ...$this.data(),
      ...(typeof option === 'object' ? option : {})
    } as ModalOptions;

    if (!data) {
      data = new Modal(this, options);
      $this.data('bs.modal', data);
    }

    if (typeof option === 'string') {
      (data as any)[option](relatedTarget);
    } else if (options.show) {
      data.show(relatedTarget);
    }
  });
}

const oldModalPlugin = $.fn.modal;

$.fn.modal = modalPlugin;
$.fn.modal.Constructor = Modal;
$.fn.modal.noConflict = function (): typeof modalPlugin {
  $.fn.modal = oldModalPlugin;
  return modalPlugin;
};

$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (this: HTMLElement, event) {
  const $trigger = $(this);
  const href = $trigger.attr('href');
  const target = $trigger.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''));
  const $target = $(target);
  const existingModal = $target.data('bs.modal');
  const options: ModalOptions | string = existingModal
    ? 'toggle'
    : {
        ...{ remote: !/#/.test(href || '') && href },
        ...$target.data(),
        ...$trigger.data()
      };

  if ($trigger.is('a')) {
    event.preventDefault();
  }

  $target.one('show.bs.modal', (showEvent) => {
    if (showEvent.isDefaultPrevented()) {
      return;
    }

    $target.one('hidden.bs.modal', () => {
      if ($trigger.is(':visible')) {
        $trigger.trigger('focus');
      }
    });
  });

  modalPlugin.call($target, options, this);
});