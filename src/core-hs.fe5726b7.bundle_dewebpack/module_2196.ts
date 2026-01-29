const userAgent: string = navigator.userAgent || '';

const isIOS: boolean = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

export default isIOS;