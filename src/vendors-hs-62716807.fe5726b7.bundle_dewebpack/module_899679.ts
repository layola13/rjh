import slice from './slice';
import apply from './apply';
import bind from './bind';

export default function(args: unknown[]): unknown {
  if (args.length < 1 || typeof args[0] !== "function") {
    throw new TypeError("a function is required");
  }
  return bind(slice, apply, args);
}