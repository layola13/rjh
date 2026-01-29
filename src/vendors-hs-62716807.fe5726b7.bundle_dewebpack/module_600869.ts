import getScroll from './getScroll';
import { isWindow } from './getScroll';
import raf from './raf';
import { easeInOutCubic } from './easings';

interface ScrollToOptions {
  getContainer?: () => Window | HTMLElement | HTMLDocument;
  callback?: () => void;
  duration?: number;
}

export default function scrollTo(
  targetScrollTop: number,
  options: ScrollToOptions = {}
): void {
  const {
    getContainer = () => window,
    callback,
    duration = 450
  } = options;

  const container = getContainer();
  const startScrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = (): void => {
    const elapsed = Date.now() - startTime;
    const clampedElapsed = elapsed > duration ? duration : elapsed;
    const nextScrollTop = easeInOutCubic(
      clampedElapsed,
      startScrollTop,
      targetScrollTop,
      duration
    );

    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop);
    } else if (
      container instanceof HTMLDocument ||
      container.constructor.name === 'HTMLDocument'
    ) {
      (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }

    if (elapsed < duration) {
      raf(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };

  raf(frameFunc);
}