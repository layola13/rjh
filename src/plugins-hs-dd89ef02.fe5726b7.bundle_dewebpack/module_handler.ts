import { getMoldingItemsV2 } from './utils';
import { HSCore } from './core';

interface HandlerContext {
  handler: {
    entity: HSCore.Model.Cornice | HSCore.Model.Baseboard | HSCore.Model.Mitre | unknown;
  };
}

interface EventData {
  data: unknown[];
}

interface MoldingOptions {
  isBaseboard: boolean;
  isCornice: boolean;
  isMitre: boolean;
}

function handleModuleEvent(event: EventData, context: HandlerContext): boolean {
  const entity = context.handler.entity;
  
  const isCornice = entity instanceof HSCore.Model.Cornice;
  const isBaseboard = entity instanceof HSCore.Model.Baseboard;
  const isMitre = entity instanceof HSCore.Model.Mitre;
  
  if (isCornice || isBaseboard || isMitre) {
    const host = (entity as HSCore.Model.Cornice | HSCore.Model.Baseboard | HSCore.Model.Mitre).host;
    
    const moldingOptions: MoldingOptions = {
      isBaseboard,
      isCornice,
      isMitre
    };
    
    const moldingItems = getMoldingItemsV2(host, moldingOptions, context.handler);
    event.data.push(...moldingItems);
    
    return true;
  }
  
  return false;
}

export { handleModuleEvent };