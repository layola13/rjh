import { get } from './436476';
import { default as updateScrollHandler } from './391564';

export default function initScrollBinding(element: HTMLElement): void {
  const eventManager = get(element);
  eventManager.event.bind(element, 'scroll', () => {
    updateScrollHandler(element);
  });
}