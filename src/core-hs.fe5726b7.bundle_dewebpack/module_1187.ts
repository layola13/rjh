const userAgent: string = navigator.userAgent;
const webkitVersionMatch: RegExpMatchArray | null = userAgent.match(/AppleWebKit\/(\d+)\./);
const webkitVersion: number | false = webkitVersionMatch ? +webkitVersionMatch[1] : false;

export default webkitVersion;