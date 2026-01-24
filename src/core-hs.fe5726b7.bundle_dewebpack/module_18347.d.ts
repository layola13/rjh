/**
 * Defines a property descriptor with getter/setter enforcement.
 * 
 * This utility ensures that if a property descriptor contains a getter or setter,
 * it is properly configured before defining the property on the target object.
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined or modified
 * @param descriptor - The property descriptor containing optional getter, setter, and other attributes
 * @returns The result of Object.defineProperty operation
 */
export default function definePropertyWithAccessors<T extends object, K extends PropertyKey>(
  target: T,
  propertyKey: K,
  descriptor: PropertyDescriptor
): void;

/**
 * Property descriptor interface with optional getter and setter.
 */
interface PropertyDescriptor {
  /** Property getter function */
  get?: () => any;
  
  /** Property setter function */
  set?: (value: any) => void;
  
  /** Property value (mutually exclusive with get/set) */
  value?: any;
  
  /** Whether the property is writable */
  writable?: boolean;
  
  /** Whether the property shows up during enumeration */
  enumerable?: boolean;
  
  /** Whether the property descriptor may be changed or deleted */
  configurable?: boolean;
}