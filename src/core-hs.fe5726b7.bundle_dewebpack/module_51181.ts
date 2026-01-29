const userAgent: string = navigator.userAgent;

export const isIosWithPebble: boolean = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble !== "undefined";