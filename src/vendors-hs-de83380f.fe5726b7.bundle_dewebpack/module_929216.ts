export default class ClassValidator {
  static validate(instance: unknown, constructor: Function): void {
    if (!(instance instanceof constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
}