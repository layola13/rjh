import hasDescriptors from './907253';
import hasOwnProperty from './791914';

interface NameDescriptor {
  EXISTS: boolean;
  PROPER: boolean;
  CONFIGURABLE: boolean;
}

const functionPrototype = Function.prototype;
const getOwnPropertyDescriptor = hasDescriptors && Object.getOwnPropertyDescriptor;

const nameExists = hasOwnProperty(functionPrototype, 'name');

const nameProper = nameExists && (function something() {}).name === 'something';

const nameConfigurable = nameExists && (!hasDescriptors || (hasDescriptors && getOwnPropertyDescriptor?.(functionPrototype, 'name')?.configurable === true));

const nameDescriptor: NameDescriptor = {
  EXISTS: nameExists,
  PROPER: nameProper,
  CONFIGURABLE: nameConfigurable
};

export default nameDescriptor;
export { nameExists as EXISTS, nameProper as PROPER, nameConfigurable as CONFIGURABLE };