export default function getOwnKeys(obj: object): (string | symbol)[] {
  if (typeof Reflect !== "undefined" && typeof Reflect.ownKeys === "function") {
    return Reflect.ownKeys(obj);
  }
  
  let keys: (string | symbol)[] = Object.getOwnPropertyNames(obj);
  
  if (typeof Object.getOwnPropertySymbols === "function") {
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  }
  
  return keys;
}