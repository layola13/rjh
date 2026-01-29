const userAgent: string = navigator.userAgent;

export const isWebOS: boolean = /web0s(?!.*chrome)/i.test(userAgent);