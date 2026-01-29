import getBuiltIn from './module_12551';
import requireObjectCoercible from './module_77064';
import isObject from './module_899';

const setPrototypeOf: ((target: any, proto: object | null) => any) | undefined = 
  Object.setPrototypeOf || 
  ('__proto__' in {} 
    ? (() => {
        let setter: ((target: any, proto: any) => void) | undefined;
        let isSupported = false;
        const testObject: Record<string, any> = {};
        
        try {
          setter = getBuiltIn(Object.prototype, '__proto__', 'set');
          setter(testObject, []);
          isSupported = testObject instanceof Array;
        } catch (error) {
          // Setter not supported
        }
        
        return (target: any, proto: object | null): any => {
          requireObjectCoercible(target);
          isObject(proto);
          
          if (isSupported && setter) {
            setter(target, proto);
          } else {
            (target as any).__proto__ = proto;
          }
          
          return target;
        };
      })() 
    : undefined);

export default setPrototypeOf;