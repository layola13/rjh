import hasDetectableBug from './module_87524';
import { RegExp as RegExpPolyfill } from './module_81482';

export default hasDetectableBug((): boolean => {
  const regex: RegExp = RegExpPolyfill('(?<a>b)', 'g');
  const execResult = regex.exec('b');
  
  return execResult?.groups?.a !== 'b' || 'b'.replace(regex, '$<a>c') !== 'bc';
});