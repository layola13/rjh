import { CabinetStyle, DefaultStyles } from './cabinet-style';
import { getDesignStyles } from './design-styles';

interface CabinetStyleData {
  [key: string]: unknown;
}

interface FloorplanData {
  [key: string]: unknown;
}

interface DocumentResult {
  floorplan: FloorplanData;
}

interface ErrorLogger {
  push(message: string, details: ErrorDetails): void;
}

interface ErrorDetails {
  errorStack: Error;
  description: string;
  errorInfo: {
    info: unknown;
    path: {
      file: string;
      functionName: string;
    };
  };
}

interface App {
  errorLogger: ErrorLogger;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSCore {
  Doc: {
    getDocManager(): {
      newDocument(
        data: unknown,
        param2: undefined,
        param3: unknown,
        param4: boolean
      ): Promise<DocumentResult>;
    };
  };
}

interface NWTK {
  ajax: {
    get(url: string, options: { dataType: string }): Promise<unknown>;
  };
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;
declare const NWTK: NWTK;

export async function loadCabinetStyle(
  styleData: CabinetStyleData
): Promise<CabinetStyleData> {
  await CabinetStyle.setCabinetStyle(styleData);
  return CabinetStyle.getCabinetStyle();
}

export async function loadCabinetStyleFromDesign(
  designParam: unknown,
  url: string
): Promise<CabinetStyleData> {
  try {
    const response = await NWTK.ajax.get(url, { dataType: 'json' });
    
    let styles: CabinetStyleData;
    
    try {
      const { floorplan } = await HSCore.Doc.getDocManager().newDocument(
        response,
        undefined,
        designParam,
        false
      );
      styles = getDesignStyles(floorplan);
    } catch (error) {
      console.error(error);
      
      const app = HSApp.App.getApp();
      const errorMessage = 'Load design style of floorplan failed';
      
      app.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: 'homestyler-tools-web/web/plugin/customizedcabinetservice/api/style.js',
            functionName: 'loadCabinetStyleFromDesign()',
          },
        },
      });
      
      styles = {} as CabinetStyleData;
    }
    
    await CabinetStyle.setCabinetStyle(styles);
    return CabinetStyle.getCabinetStyle();
  } catch (error) {
    console.error(error);
    
    const errorMessage = 'Load design style of cabiner style failed';
    
    HSApp.App.getApp().errorLogger.push(errorMessage, {
      errorStack: new Error(errorMessage),
      description: errorMessage,
      errorInfo: {
        info: error,
        path: {
          file: 'homestyler-tools-web/web/plugin/customizedcabinetservice/api/style.js',
          functionName: 'loadCabinetStyleFromDesign()',
        },
      },
    });
    
    throw error;
  }
}

export async function loadDefaultStyle(): Promise<CabinetStyleData> {
  try {
    await CabinetStyle.setCabinetStyle(DefaultStyles);
    return CabinetStyle.getCabinetStyle();
  } catch (error) {
    console.error(error);
    throw error;
  }
}