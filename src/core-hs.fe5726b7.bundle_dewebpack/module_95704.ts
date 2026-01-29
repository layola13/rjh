const userAgent: string = navigator.userAgent;

export default /web0s(?!.*chrome)/i.test(userAgent);