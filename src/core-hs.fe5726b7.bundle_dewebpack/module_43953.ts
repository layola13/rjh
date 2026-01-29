function wrapFunction<T extends Function>(e: T): T | undefined {
    const typeOf = require('./97303');
    const wrapFn = require('./61259');
    
    if (typeOf(e) === "Function") {
        return wrapFn(e);
    }
    
    return undefined;
}

export default wrapFunction;