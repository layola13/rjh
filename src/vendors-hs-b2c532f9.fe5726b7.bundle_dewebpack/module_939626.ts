import * as psClasses from './ps-classes';
import * as dom from './dom';
import * as instances from './instances';

export function destroy(element: HTMLElement): void {
  const instance = instances.get(element);
  
  if (instance) {
    instance.event.unbindAll();
    dom.remove(instance.scrollbarX);
    dom.remove(instance.scrollbarY);
    dom.remove(instance.scrollbarXRail);
    dom.remove(instance.scrollbarYRail);
    psClasses.removePsClasses(element);
    instances.remove(element);
  }
}