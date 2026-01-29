const userAgent: string = navigator.userAgent;
const firefoxMatch: RegExpMatchArray | null = userAgent.match(/firefox\/(\d+)/i);
const firefoxVersion: number | false = firefoxMatch ? +firefoxMatch[1] : false;

export default firefoxVersion;