import functionBind from './92617';
import fails from './679594';
import isCallable from './170452';
import classof from './357142';
import getBuiltIn from './738380';
import functionUncurryThis from './720045';

const emptyFunction = function(): void {};
const emptyArray: unknown[] = [];
const ReflectConstruct = getBuiltIn('Reflect', 'construct');
const constructorRegExp = /^\s*(?:class|function)\b/;
const regExpExec = functionBind(constructorRegExp.exec);
const isRegExpExecSupported = !constructorRegExp.exec(emptyFunction);

const isConstructorViaReflect = (target: unknown): boolean => {
  if (!isCallable(target)) return false;
  try {
    ReflectConstruct(emptyFunction, emptyArray, target as ProxyConstructor);
    return true;
  } catch (error) {
    return false;
  }
};

const isConstructorViaRegExp = (target: unknown): boolean => {
  if (!isCallable(target)) return false;
  
  switch (classof(target)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }
  
  try {
    return isRegExpExecSupported || !!regExpExec(constructorRegExp, functionUncurryThis(target));
  } catch (error) {
    return true;
  }
};

(isConstructorViaRegExp as any).sham = true;

const isConstructor: ((target: unknown) => boolean) & { sham?: boolean } = 
  !ReflectConstruct || fails(() => {
    let called = false;
    return isConstructorViaReflect(isConstructorViaReflect.call) || 
           !isConstructorViaReflect(Object) || 
           !isConstructorViaReflect(() => { called = true; }) || 
           called;
  }) ? isConstructorViaRegExp : isConstructorViaReflect;

export default isConstructor;