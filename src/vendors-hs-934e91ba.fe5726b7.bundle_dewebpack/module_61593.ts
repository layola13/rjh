import setToString from './399244';
import baseRest from './166514';
import identity from './843509';

function overRest<T extends (...args: any[]) => any>(
  func: T,
  transform: (args: any[]) => any = identity
): T {
  return setToString(baseRest(func, transform), func.name);
}

export default overRest;