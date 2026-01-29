interface SymbolRegistry {
  [key: string]: symbol;
}

interface GlobalSymbol {
  for?: (key: string) => symbol;
  withoutSetter?: (key: string) => symbol;
  [key: string]: any;
}

interface GlobalObject {
  Symbol?: GlobalSymbol;
}

import { global } from './module_81482';
import { shared } from './module_80880';
import { hasOwnProperty } from './module_98324';
import { uid } from './module_38251';
import { nativeSymbolSupported } from './module_98126';
import { useSymbolAsUid } from './module_20479';

const NativeSymbol: GlobalSymbol | undefined = (global as GlobalObject).Symbol;
const symbolRegistry: SymbolRegistry = shared('wks');

const createSymbol: (key: string) => symbol = useSymbolAsUid
  ? NativeSymbol?.for ?? NativeSymbol
  : NativeSymbol?.withoutSetter ?? uid;

export function wellKnownSymbol(symbolName: string): symbol {
  if (!hasOwnProperty(symbolRegistry, symbolName)) {
    symbolRegistry[symbolName] =
      nativeSymbolSupported && hasOwnProperty(NativeSymbol, symbolName)
        ? NativeSymbol[symbolName]
        : createSymbol(`Symbol.${symbolName}`);
  }
  
  return symbolRegistry[symbolName];
}