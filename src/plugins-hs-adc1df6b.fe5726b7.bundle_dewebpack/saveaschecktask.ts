import { Signal } from './Signal';

interface AppInterface {
  designMetadata: {
    set(key: string, value: string): void;
  };
}

interface HSAppNamespace {
  App: {
    getApp(): AppInterface;
  };
  EditStatus: {
    ENUM_EDIT_MODEL: {
      EDIT: string;
    };
    EditStatusManager: {
      getInstance(): {
        status: string;
      };
    };
  };
  Util: {
    Url: {
      getQueryStrings(): QueryStrings;
    };
  };
}

interface QueryStrings {
  designType?: string;
  [key: string]: unknown;
}

interface AdskUser {
  adaId?: string;
  guid?: string;
}

interface ExecuteParams {
  isSaveas: boolean;
}

interface ExecuteResult {
  status: 'success';
}

interface SignalData {
  processType: string;
  data: {
    designID?: string;
    adaId?: string;
    guid?: string;
    designType?: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const adskUser: AdskUser | undefined;

class DesignUtils {
  static getDesignId(app: AppInterface): string | undefined {
    return undefined;
  }

  static isOwner(): boolean {
    return false;
  }
}

export class SaveAsCheckTask {
  public signal: Signal<SignalData>;

  constructor() {
    this.signal = new Signal(this);
  }

  async execute(params: ExecuteParams, _context?: unknown): Promise<ExecuteResult> {
    const app = HSApp.App.getApp();
    const designId = DesignUtils.getDesignId(app);
    const isOwner = DesignUtils.isOwner() || 
                    HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT === HSApp.EditStatus.EditStatusManager.getInstance().status;
    let shouldSaveAs = params.isSaveas;

    this.signal.dispatch({
      processType: 'check-owner',
      data: {
        designID: designId,
        adaId: adskUser?.adaId,
        guid: adskUser?.guid
      }
    });

    if (designId && !isOwner) {
      this.signal.dispatch({
        processType: 'isOwner',
        data: {
          designID: designId,
          adaId: adskUser?.adaId,
          guid: adskUser?.guid
        }
      });
      shouldSaveAs = true;
    }

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const publicDesignTypes = ['publicdesign', 'eadesign'];

    if (queryStrings.designType && publicDesignTypes.includes(queryStrings.designType)) {
      shouldSaveAs = false;
      this.signal.dispatch({
        processType: 'designTypeCheck',
        data: {
          designType: queryStrings.designType
        }
      });
      app.designMetadata.set('designId', '');
    }

    params.isSaveas = shouldSaveAs;

    return {
      status: 'success'
    };
  }
}