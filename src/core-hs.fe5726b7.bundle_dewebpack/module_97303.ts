const toStringFunction = ({}).toString;
const sliceFunction = "".slice;

export function getObjectType(value: unknown): string {
    return sliceFunction.call(toStringFunction.call(value), 8, -1);
}