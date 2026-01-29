export default function unreachableCase(value: never): Error {
    return new Error(`unreachable case: ${JSON.stringify(value)}`);
}