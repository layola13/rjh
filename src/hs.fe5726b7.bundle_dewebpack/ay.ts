export enum SketchTypes {
  // Values from module 962391
  // Add actual enum values based on a.default

  // Values from module 147323
  // Add actual enum values based on r.default

  // Values from module 668540
  // Add actual enum values based on s.default

  // Values from module 160282
  // Add actual enum values based on l.default

  // Values from module 513046
  // Add actual enum values based on u.default

  // Values from module 692382
  // Add actual enum values based on c.default

  // Values from module 345615
  // Add actual enum values based on d.default

  // Values from module 228130
  // Add actual enum values based on p.default

  // Values from module 215144
  // Add actual enum values based on h.default

  // Values from module 999536
  // Add actual enum values based on m.default

  // Values from module 487459
  // Add actual enum values based on g.default

  // Values from module 386875
  // Add actual enum values based on f.default
}

export { ExtraordinarySketch2dTypes } from './ExtraordinarySketch2d';
export { OutdoorRequestTypes } from './OutdoorRequest';

/**
 * Merges multiple objects into a single object with all properties
 */
function mergeObjects<T extends Record<string, unknown>>(
  ...sources: Array<Record<string, unknown>>
): T {
  const result: Record<string, unknown> = {};

  for (const source of sources) {
    if (source == null) continue;

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source).filter(sym =>
        Object.getOwnPropertyDescriptor(source, sym)?.enumerable
      )
    ];

    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor) {
        Object.defineProperty(result, key, descriptor);
      }
    }
  }

  return result as T;
}

import module962391 from './module962391';
import module147323 from './module147323';
import module668540 from './module668540';
import module160282 from './module160282';
import module513046 from './module513046';
import module692382 from './module692382';
import module345615 from './module345615';
import module228130 from './module228130';
import module215144 from './module215144';
import module999536 from './module999536';
import module487459 from './module487459';
import module386875 from './module386875';
import { ExtraordinarySketch2dTypes } from './ExtraordinarySketch2d';
import module433842 from './module433842';
import module431353 from './module431353';
import { OutdoorRequestTypes } from './OutdoorRequest';

const allTypes = mergeObjects(
  module962391,
  module147323,
  module668540,
  module160282,
  module513046,
  module692382,
  module345615,
  module228130,
  module215144,
  module999536,
  module487459,
  module386875,
  ExtraordinarySketch2dTypes,
  module433842,
  module431353,
  OutdoorRequestTypes
);

Object.freeze(allTypes);

export default allTypes;