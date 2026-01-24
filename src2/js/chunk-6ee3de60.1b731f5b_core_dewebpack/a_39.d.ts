/**
 * Factory utility for adding getter/setter methods to prototype chains.
 * Provides methods to dynamically add property accessors with validation,
 * transformation, and change event handling.
 */

import { Util } from './Util';
import { validateFactory } from './validators';

/**
 * Configuration for a property getter/setter pair
 */
interface PropertyConfig<T = any> {
  /** Default value if property is undefined */
  defaultValue?: T;
  /** Validator/transformer function called before setting */
  validator?: (value: T, propertyName: string) => T;
  /** Callback invoked after property is set */
  afterSetHook?: () => void;
}

/**
 * Component-based property configuration
 */
interface ComponentPropertyConfig<T = any> {
  /** List of component property names (e.g., ['x', 'y'] for position) */
  components: string[];
  /** Validator for the composite object */
  validator?: (value: T) => T;
  /** Callback invoked after any component is set */
  afterSetHook?: () => void;
}

/**
 * Base class with attribute storage and change event support
 */
interface AttributeContainer {
  /** Internal attribute storage */
  attrs: Record<string, any>;
  /** Get a single attribute value */
  getAttr(name: string): any;
  /** Set a single attribute value */
  _setAttr(name: string, value: any): void;
  /** Fire change event for a property */
  _fireChangeEvent(propertyName: string, oldValue: any, newValue: any): void;
}

/**
 * Constructor type for classes with AttributeContainer prototype
 */
type AttributeContainerConstructor = new (...args: any[]) => AttributeContainer;

/**
 * Factory methods for dynamically adding property accessors to class prototypes
 */
export const Factory = {
  /**
   * Add both getter and setter methods for a property, plus an overloaded accessor
   * @param constructor - Target class constructor
   * @param propertyName - Name of the property
   * @param defaultValue - Default value if undefined
   * @param validator - Optional validation/transformation function
   * @param afterSetHook - Optional callback after setting value
   */
  addGetterSetter<T>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    defaultValue?: T,
    validator?: (value: T, propertyName: string) => T,
    afterSetHook?: () => void
  ): void {
    Factory.addGetter(constructor, propertyName, defaultValue);
    Factory.addSetter(constructor, propertyName, validator, afterSetHook);
    Factory.addOverloadedGetterSetter(constructor, propertyName);
  },

  /**
   * Add a getter method for a property (e.g., getX())
   * @param constructor - Target class constructor
   * @param propertyName - Name of the property
   * @param defaultValue - Default value if property is undefined
   */
  addGetter<T>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    defaultValue?: T
  ): void {
    const getterName = `get${Util._capitalize(propertyName)}`;
    
    constructor.prototype[getterName] = constructor.prototype[getterName] || function(this: AttributeContainer): T {
      const value = this.attrs[propertyName];
      return value === undefined ? defaultValue : value;
    };
  },

  /**
   * Add a setter method for a property (e.g., setX())
   * @param constructor - Target class constructor
   * @param propertyName - Name of the property
   * @param validator - Optional validation/transformation function
   * @param afterSetHook - Optional callback after setting value
   */
  addSetter<T>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    validator?: (value: T, propertyName: string) => T,
    afterSetHook?: () => void
  ): void {
    const setterName = `set${Util._capitalize(propertyName)}`;
    
    if (!constructor.prototype[setterName]) {
      Factory.overWriteSetter(constructor, propertyName, validator, afterSetHook);
    }
  },

  /**
   * Create/overwrite a setter method with validation and hooks
   * @param constructor - Target class constructor
   * @param propertyName - Name of the property
   * @param validator - Optional validation/transformation function
   * @param afterSetHook - Optional callback after setting value
   */
  overWriteSetter<T>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    validator?: (value: T, propertyName: string) => T,
    afterSetHook?: () => void
  ): void {
    const setterName = `set${Util._capitalize(propertyName)}`;
    
    constructor.prototype[setterName] = function(this: AttributeContainer, value: T): AttributeContainer {
      let processedValue = value;
      
      // Apply validator if provided and value is not null/undefined
      if (validator && value != null) {
        processedValue = validator.call(this, value, propertyName);
      }
      
      this._setAttr(propertyName, processedValue);
      
      // Invoke after-set hook if provided
      if (afterSetHook) {
        afterSetHook.call(this);
      }
      
      return this;
    };
  },

  /**
   * Add getter/setter for a composite property with multiple components
   * (e.g., position with x/y components)
   * @param constructor - Target class constructor
   * @param propertyName - Name of the composite property
   * @param components - Array of component names
   * @param validator - Optional validator for the composite object
   * @param afterSetHook - Optional callback after setting
   */
  addComponentsGetterSetter<T extends Record<string, any>>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    components: string[],
    validator?: (value: T) => T,
    afterSetHook?: () => void
  ): void {
    const componentCount = components.length;
    const capitalize = Util._capitalize;
    const getterName = `get${capitalize(propertyName)}`;
    const setterName = `set${capitalize(propertyName)}`;
    
    // Getter: collect all component values into an object
    constructor.prototype[getterName] = function(this: AttributeContainer): T {
      const result: Record<string, any> = {};
      
      for (let i = 0; i < componentCount; i++) {
        const component = components[i];
        result[component] = this.getAttr(propertyName + capitalize(component));
      }
      
      return result as T;
    };
    
    // Get validation factory if available
    const validationFactory = validateFactory(components);
    
    // Setter: distribute object properties to individual component attributes
    constructor.prototype[setterName] = function(this: AttributeContainer, value: T): AttributeContainer {
      const oldValue = this.attrs[propertyName];
      let processedValue = value;
      
      // Apply validator if provided
      if (validator) {
        processedValue = validator.call(this, value);
      }
      
      // Apply validation factory if available
      if (validationFactory) {
        validationFactory.call(this, processedValue, propertyName);
      }
      
      // Set each component as a separate attribute
      for (const componentName in processedValue) {
        if (processedValue.hasOwnProperty(componentName)) {
          this._setAttr(
            propertyName + capitalize(componentName),
            processedValue[componentName]
          );
        }
      }
      
      // Fire change event for the composite property
      this._fireChangeEvent(propertyName, oldValue, processedValue);
      
      // Invoke after-set hook if provided
      if (afterSetHook) {
        afterSetHook.call(this);
      }
      
      return this;
    };
    
    Factory.addOverloadedGetterSetter(constructor, propertyName);
  },

  /**
   * Add an overloaded method that acts as both getter and setter
   * (e.g., x() to get, x(value) to set)
   * @param constructor - Target class constructor
   * @param propertyName - Name of the property
   */
  addOverloadedGetterSetter(
    constructor: AttributeContainerConstructor,
    propertyName: string
  ): void {
    const capitalizedName = Util._capitalize(propertyName);
    const setterName = `set${capitalizedName}`;
    const getterName = `get${capitalizedName}`;
    
    constructor.prototype[propertyName] = function(this: AttributeContainer, ...args: any[]): any {
      // If called with argument, act as setter
      if (args.length > 0) {
        this[setterName](args[0]);
        return this;
      }
      // Otherwise act as getter
      return this[getterName]();
    };
  },

  /**
   * Add deprecated getter/setter with console warnings
   * @param constructor - Target class constructor
   * @param propertyName - Name of the deprecated property
   * @param defaultValue - Default value if undefined
   * @param validator - Optional validation function
   */
  addDeprecatedGetterSetter<T>(
    constructor: AttributeContainerConstructor,
    propertyName: string,
    defaultValue?: T,
    validator?: (value: T, propertyName: string) => T
  ): void {
    Util.error(`Adding deprecated ${propertyName}`);
    
    const getterName = `get${Util._capitalize(propertyName)}`;
    const deprecationMessage = 
      `${propertyName} property is deprecated and will be removed soon. Look at Konva change log for more information.`;
    
    // Deprecated getter
    constructor.prototype[getterName] = function(this: AttributeContainer): T {
      Util.error(deprecationMessage);
      const value = this.attrs[propertyName];
      return value === undefined ? defaultValue : value;
    };
    
    // Deprecated setter with warning callback
    Factory.addSetter(constructor, propertyName, validator, () => {
      Util.error(deprecationMessage);
    });
    
    Factory.addOverloadedGetterSetter(constructor, propertyName);
  },

  /**
   * Add backward-compatible method aliases with deprecation warnings
   * @param constructor - Target class constructor
   * @param aliasMap - Map of old method names to new method names
   */
  backCompat(
    constructor: AttributeContainerConstructor,
    aliasMap: Record<string, string>
  ): void {
    Util.each(aliasMap, (oldMethodName: string, newMethodName: string) => {
      const originalMethod = constructor.prototype[newMethodName];
      const capitalize = Util._capitalize;
      const oldGetterName = `get${capitalize(oldMethodName)}`;
      const oldSetterName = `set${capitalize(oldMethodName)}`;
      
      function deprecatedMethodWrapper(this: any, ...args: any[]): any {
        originalMethod.apply(this, args);
        Util.error(
          `"${oldMethodName}" method is deprecated and will be removed soon. Use "${newMethodName}" instead.`
        );
      }
      
      constructor.prototype[oldMethodName] = deprecatedMethodWrapper;
      constructor.prototype[oldGetterName] = deprecatedMethodWrapper;
      constructor.prototype[oldSetterName] = deprecatedMethodWrapper;
    });
  },

  /**
   * Hook called after filter properties are set to invalidate cache
   */
  afterSetFilter(this: AttributeContainer & { _filterUpToDate: boolean }): void {
    this._filterUpToDate = false;
  }
};