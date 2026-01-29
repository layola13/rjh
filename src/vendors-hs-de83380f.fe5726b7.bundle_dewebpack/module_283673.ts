export function interopRequireDefault<T>(module: T): T | { default: T } {
  return module && (module as any).__esModule ? module : { default: module };
}

export default interopRequireDefault;