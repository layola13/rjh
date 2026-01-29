const userAgent: string = navigator.userAgent || '';

export const isAppleDeviceWithPebble: boolean = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble !== 'undefined';