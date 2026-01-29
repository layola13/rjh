const isIOS = /(?:ipad|iphone|ipod).*applewebkit/i.test(navigator.userAgent);

export default isIOS;