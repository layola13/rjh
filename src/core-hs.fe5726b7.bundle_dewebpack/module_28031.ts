const userAgent: string = navigator.userAgent;

export const isIE: boolean = /MSIE|Trident/.test(userAgent);

export default isIE;