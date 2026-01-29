const globalObject = (typeof self === 'object' && self && self.Object === Object && self) || 
                     (typeof global === 'object' && global && global.Object === Object && global) || 
                     Function('return this')();

export default globalObject;