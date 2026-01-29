import { HSApp } from './HSApp';

export function onScroll(event: Event): void {
  HSApp.Catalog.BaseApiManager.getInstance()
    .eventsManager
    .listenMouseEvent(event);
}