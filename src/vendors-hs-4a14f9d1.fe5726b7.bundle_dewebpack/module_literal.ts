function moduleLiteral(input: { text: string }): string {
    return '"' + escapeString(input.text) + '"';
}

function escapeString(text: string): string {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}