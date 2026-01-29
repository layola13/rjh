function hasComplexCase(input: string): boolean {
    const complexCasePattern = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    return complexCasePattern.test(input);
}

export default hasComplexCase;