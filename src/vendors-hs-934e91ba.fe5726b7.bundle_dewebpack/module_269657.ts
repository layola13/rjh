const globalObject = (typeof global === "object" && global && global.Object === Object && global) as typeof globalThis | false;
const selfObject = (typeof self === "object" && self && self.Object === Object && self) as typeof globalThis | false;
const root = (globalObject || selfObject || Function("return this")()) as typeof globalThis;
const SymbolConstructor = root.Symbol;

const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const nativeObjectToString = objectProto.toString;
const symToStringTag = SymbolConstructor ? SymbolConstructor.toStringTag : undefined;

function getRawTag(value: unknown): string {
    const isOwn = hasOwnProperty.call(value, symToStringTag);
    const tag = (value as Record<symbol, unknown>)[symToStringTag!];
    
    try {
        (value as Record<symbol, unknown>)[symToStringTag!] = undefined;
        var unmasked = true;
    } catch (error) {
        // Ignored
    }
    
    const result = nativeObjectToString.call(value);
    
    if (unmasked) {
        if (isOwn) {
            (value as Record<symbol, unknown>)[symToStringTag!] = tag;
        } else {
            delete (value as Record<symbol, unknown>)[symToStringTag!];
        }
    }
    
    return result;
}

const objectProtoToString = Object.prototype.toString;

function objectToString(value: unknown): string {
    return objectProtoToString.call(value);
}

const symToStringTagAlt = SymbolConstructor ? SymbolConstructor.toStringTag : undefined;

function baseGetTag(value: unknown): string {
    if (value == null) {
        return value === undefined ? "[object Undefined]" : "[object Null]";
    }
    return symToStringTagAlt && symToStringTagAlt in Object(value)
        ? getRawTag(value)
        : objectToString(value);
}

function getPrototype(value: unknown): unknown {
    return Object.getPrototypeOf(Object(value));
}

function isObjectLike(value: unknown): value is object {
    return value != null && typeof value === "object";
}

const funcProto = Function.prototype;
const objectProtoAlt = Object.prototype;
const funcToString = funcProto.toString;
const hasOwnPropertyAlt = objectProtoAlt.hasOwnProperty;
const objectCtorString = funcToString.call(Object);

function isPlainObject(value: unknown): value is Record<string | number | symbol, unknown> {
    if (!isObjectLike(value) || baseGetTag(value) !== "[object Object]") {
        return false;
    }
    
    const proto = getPrototype(value);
    
    if (proto === null) {
        return true;
    }
    
    const Ctor = hasOwnPropertyAlt.call(proto, "constructor") && (proto as Record<string, unknown>).constructor;
    
    return typeof Ctor === "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}

export default isPlainObject;