import { generateCreateToekickRequests, generateCreateWrapToekickRequests } from './module_653226';
import { loadToeKick, loadWrapToekick } from './module_949283';
import { CabinetStyle } from './module_509398';

interface TransactionManager {
  commit(request: unknown): void;
}

interface App {
  transManager: TransactionManager;
  getApp(): App;
}

declare const HSApp: {
  App: App;
};

export function generateToekick(cabinetStyle: typeof CabinetStyle | undefined, options: unknown): Promise<void> {
  const transactionManager = HSApp.App.getApp().transManager;
  
  return loadToeKick(cabinetStyle).then((toeKickData) => {
    const style = cabinetStyle ?? CabinetStyle.getCabinetStyle();
    let loadPromise = Promise.resolve();
    
    if (style.isEmpty()) {
      loadPromise = style.loadStyles();
    }
    
    return loadPromise.then(() => {
      const finalStyle = style;
      const requests = generateCreateToekickRequests(transactionManager, toeKickData, finalStyle, options);
      
      requests.forEach((request) => {
        return transactionManager.commit(request);
      });
    });
  });
}

export function generateWrapToekick(
  cabinetStyle: typeof CabinetStyle | undefined,
  wrapOptions: unknown,
  additionalOptions: unknown
): Promise<void> {
  const transactionManager = HSApp.App.getApp().transManager;
  
  return loadWrapToekick(cabinetStyle).then((wrapToeKickData) => {
    const style = cabinetStyle ?? CabinetStyle.getCabinetStyle();
    let loadPromise = Promise.resolve();
    
    if (style.isEmpty()) {
      loadPromise = style.loadStyles();
    }
    
    return loadPromise.then(() => {
      const finalStyle = style;
      const requests = generateCreateWrapToekickRequests(
        transactionManager,
        wrapToeKickData,
        finalStyle,
        wrapOptions,
        additionalOptions
      );
      
      requests.forEach((request) => {
        return transactionManager.commit(request);
      });
    });
  });
}