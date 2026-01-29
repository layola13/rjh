import BaseCollecter from './path/to/BaseCollecter';

interface CollecterClass {
  new (...args: any[]): BaseCollecter;
  collecterName?: string;
  prototype: BaseCollecter;
}

interface CollecterRegistry {
  [key: string]: CollecterClass;
}

const collecterRegistry: CollecterRegistry = {};

// Auto-register collecters from require.context
// Note: In production TS, replace this with explicit imports
// const collecterModules = require.context('./collecters', true, /\.ts$/);
// collecterModules.keys().forEach((modulePath: string) => {
//   const module = collecterModules(modulePath);
//   const CollecterClass = module.default as CollecterClass;
//   const collecterName = CollecterClass.collecterName;
//   if (collecterName && !collecterRegistry[collecterName]) {
//     collecterRegistry[collecterName] = CollecterClass;
//   }
// });

/**
 * Decorator for registering collecter classes
 * @param name - Optional name to register the collecter under
 * @returns Class decorator function
 */
export function collecterDecortator(name?: string) {
  return function <T extends CollecterClass>(CollecterClass: T): void {
    if (CollecterClass.prototype instanceof BaseCollecter) {
      const registryKey = name || CollecterClass.collecterName || '';
      if (registryKey) {
        collecterRegistry[registryKey] = CollecterClass;
      }
    } else {
      console.error(
        `${CollecterClass.name} not Collecter; need Inheritance Collecter`
      );
    }
  };
}

export default collecterRegistry;