import hasPropertyDescriptors from './module_63855';
import hasOwnProperty from './module_98324';

const functionPrototype = Function.prototype;
const propertyDescriptor = hasPropertyDescriptors && Object.getOwnPropertyDescriptor;

const namePropertyExists = hasOwnProperty(functionPrototype, "name");

const namePropertyIsProper = namePropertyExists && "something" === (function something() {}).name;

const namePropertyIsConfigurable = namePropertyExists && (!hasPropertyDescriptors || (hasPropertyDescriptors && propertyDescriptor(functionPrototype, "name")!.configurable));

export interface FunctionNameProperty {
  EXISTS: boolean;
  PROPER: boolean;
  CONFIGURABLE: boolean;
}

export const functionNameProperty: FunctionNameProperty = {
  EXISTS: namePropertyExists,
  PROPER: namePropertyIsProper,
  CONFIGURABLE: namePropertyIsConfigurable
};

export default functionNameProperty;