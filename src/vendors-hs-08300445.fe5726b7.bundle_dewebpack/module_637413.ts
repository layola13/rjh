const isFirefox: boolean = 
  typeof navigator !== 'undefined' && 
  typeof navigator === 'object' && 
  /Firefox/i.test(navigator.userAgent);

export default isFirefox;