const hasDefineProperty = require('./module_63855');
const fails = require('./module_87524');

const isDefinePropertyBroken: boolean = hasDefineProperty && fails(function(): boolean {
  return 42 !== Object.defineProperty(function(): void {}, "prototype", {
    value: 42,
    writable: false
  }).prototype;
});

export default isDefinePropertyBroken;