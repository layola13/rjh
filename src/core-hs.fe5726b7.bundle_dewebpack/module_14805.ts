const element = document.createElement("span");
const classList = element.classList;
const prototype = classList && classList.constructor && classList.constructor.prototype;

export default prototype === Object.prototype ? undefined : prototype;