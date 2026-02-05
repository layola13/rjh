// @ts-nocheck
export class AliXiaoMi {
  start(): void {
    let appKey = "DL5pXcyGOW";
    
    const queryEnv = HSApp.Util.Url.getQueryStrings().env;
    const appBiz = HSApp.App.getApp().appParams.biz;
    
    if (queryEnv === "ihomeDecoration") {
      appKey = "vPxKAf6VPf";
    } else if (appBiz === "tpzz") {
      appKey = "Gp0wI2gyk1";
    }
    
    this.initializeAlicareDialog(document, appKey);
  }

  private initializeAlicareDialog(document: Document, appKey: string): void {
    const initDialog = (AlicareDialogClass: AlicareDialogConstructor): void => {
      NWTK.mtop.User.getAlimeToken().then((response: AlimeTokenResponse) => {
        if (
          response &&
          response.ret[0].includes("SUCCESS") &&
          response.data &&
          response.data.code === "SUCCESS" &&
          response.data.data
        ) {
          const dialogInstance = new AlicareDialogClass({
            from: appKey,
            accessToken: response.data.data.token,
            position: {
              bottom: 60,
              right: 64
            },
            tpl: '<div class="alicare-dialog-customized"></div>',
            "z-index": 10510
          });

          dialogInstance.onRendered((event: AlicareRenderEvent) => {
            const { layout, config } = event;
            
            if (config.type === "customized") {
              layout.addEventListener("click", (clickEvent: MouseEvent) => {
                dialogInstance.ui.emit("toggleDialog");
                
                const target = clickEvent.target as HTMLElement;
                if (target.nodeName === "LI") {
                  dialogInstance.ui.emit("message", target.innerText);
                }
              }, false);
            }
          });
        }
      });
    };

    if ((window as any).AlicareDialog) {
      const existingDialog = document.getElementById("J_xiaomi_dialog");
      
      if (existingDialog?.parentNode) {
        existingDialog.parentNode.removeChild(existingDialog);
      }
      
      initDialog((window as any).AlicareDialog);
    } else {
      (window as any).alicareDialogAsyncInit = initDialog;
      
      const script = document.createElement("script");
      script.src = "//g.alicdn.com/alime/dialog/alicare-dialog.js";
      script.charset = "utf-8";
      document.body.append(script);
    }
  }
}

interface AlicareDialogConfig {
  from: string;
  accessToken: string;
  position: {
    bottom: number;
    right: number;
  };
  tpl: string;
  "z-index": number;
}

interface AlicareDialogConstructor {
  new (config: AlicareDialogConfig): AlicareDialogInstance;
}

interface AlicareDialogInstance {
  onRendered(callback: (event: AlicareRenderEvent) => void): void;
  ui: {
    emit(event: string, data?: string): void;
  };
}

interface AlicareRenderEvent {
  layout: HTMLElement;
  config: {
    type: string;
  };
}

interface AlimeTokenResponse {
  ret: string[];
  data: {
    code: string;
    data: {
      token: string;
    };
  };
}