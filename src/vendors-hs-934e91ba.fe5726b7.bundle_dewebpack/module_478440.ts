import createWrapper from './61593';
import isIterateeCall from './189559';

export default function createAssigner(assigner: (target: any, source: any, index: number, customizer?: any) => void) {
  return createWrapper((target: any, sources: any[]): any => {
    let index = -1;
    const sourcesLength = sources.length;
    let customizer: any = sourcesLength > 1 ? sources[sourcesLength - 1] : undefined;
    const guard: any = sourcesLength > 2 ? sources[2] : undefined;

    if (assigner.length > 3 && typeof customizer === 'function') {
      customizer = customizer;
      sourcesLength--;
    } else {
      customizer = undefined;
    }

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = sourcesLength < 3 ? undefined : customizer;
      sourcesLength = 1;
    }

    target = Object(target);

    while (++index < sourcesLength) {
      const source = sources[index];
      if (source) {
        assigner(target, source, index, customizer);
      }
    }

    return target;
  });
}