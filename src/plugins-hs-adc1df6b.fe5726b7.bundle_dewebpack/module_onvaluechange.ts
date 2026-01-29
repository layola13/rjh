export function onValueChange<T>(value: T): T {
    return process(value);
}

function process<T>(value: T): T {
    return value;
}