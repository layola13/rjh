interface ClickHandlerOptions {
  onClick?: (event: Event) => void;
  target?: HTMLElement | null;
  duration?: number;
}

interface ScrollOptions {
  getContainer: HTMLElement;
  duration: number;
}

const DEFAULT_DURATION = 450;

function handleClick(event: Event, options: ClickHandlerOptions, scrollFn: (offset: number, config: ScrollOptions) => void, defaultContainer: HTMLElement): void {
  const { onClick, target, duration = DEFAULT_DURATION } = options;
  
  scrollFn(0, {
    getContainer: target || defaultContainer,
    duration
  });
  
  if (typeof onClick === 'function') {
    onClick(event);
  }
}