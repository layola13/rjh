const globalObject = (typeof self === "object" && self && self.Object === Object && self) || Function("return this")();

export default globalObject;