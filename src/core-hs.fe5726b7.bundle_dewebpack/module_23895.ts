import { anObject } from './utils/an-object';
import { toString } from './utils/to-string';
import { isCallable } from './utils/is-callable';
import { call } from './utils/function-call';
import { exportToGlobal } from './utils/export';

const FORCED_REGEX_TEST = (() => {
  let executionFlag = false;
  const testRegex = /[ac]/;
  
  testRegex.exec = function(this: RegExp): RegExpExecArray | null {
    executionFlag = true;
    return /./.exec.apply(this, arguments as unknown as [string]);
  };
  
  return testRegex.test("abc") === true && executionFlag;
})();

const nativeRegExpTest = /./.test;

interface RegExpPolyfill {
  test(str: unknown): boolean;
}

exportToGlobal({
  target: "RegExp",
  proto: true,
  forced: !FORCED_REGEX_TEST
}, {
  test(this: RegExp, str: unknown): boolean {
    const regex = anObject(this);
    const stringValue = toString(str);
    const execMethod = regex.exec;
    
    if (!isCallable(execMethod)) {
      return call(nativeRegExpTest, regex, stringValue) as boolean;
    }
    
    const result = call(execMethod, regex, stringValue);
    
    if (result !== null) {
      anObject(result);
      return true;
    }
    
    return false;
  }
});