function formatPastExpression(e: string): string {
    const spaceIndex: number = e.indexOf(" ");
    const prefix: string = e.substr(0, spaceIndex);
    
    return n(prefix) ? `viru ${e}` : `virun ${e}`;
}