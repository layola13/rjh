import getBuiltIn from './738380';
import uncurryThis from './92617';
import getOwnPropertyNamesModule from './304757';
import toObject from './742706';
import getOwnPropertySymbolsModule from './972484';

const concat = uncurryThis([].concat);

const ReflectOwnKeys = getBuiltIn("Reflect", "ownKeys");

export default ReflectOwnKeys || function ownKeys(target: object): PropertyKey[] {
    const properties = getOwnPropertyNamesModule.f(toObject(target));
    const getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    
    return getOwnPropertySymbols 
        ? concat(properties, getOwnPropertySymbols(target)) 
        : properties;
};