import Collecter from './path/to/Collecter';

interface CollecterConstructor {
  new (...args: any[]): Collecter;
  collecterName?: string;
}

interface CollecterRegistry {
  [key: string]: CollecterConstructor;
}

const collecterRegistry: CollecterRegistry = {};

// Note: The original code used webpack's require.context (r(676))
// You need to manually import and register collecters or implement a different discovery mechanism
// Example:
// import SomeCollecter from './collecters/SomeCollecter';
// if (SomeCollecter.collecterName) {
//   collecterRegistry[SomeCollecter.collecterName] = SomeCollecter;
// }

export function collecterDecortator(name?: string) {
  return function <T extends CollecterConstructor>(constructor: T): void {
    if (constructor.prototype instanceof Collecter) {
      const collecterName = name || constructor.collecterName || '';
      if (collecterName) {
        collecterRegistry[collecterName] = constructor;
      }
    } else {
      console.error(`${constructor.name} not Collecter; need Inheritance Collecter`);
    }
  };
}

export default collecterRegistry;