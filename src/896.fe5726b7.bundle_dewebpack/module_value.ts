interface LoginCompletedData {
  isLogin: boolean;
}

interface LoginCompletedEvent {
  data: LoginCompletedData | null;
}

interface AdskUser {
  isLogin(): boolean;
  signalLoginCompleted: {
    listen(callback: (event: LoginCompletedEvent) => void): void;
  };
}

declare const adskUser: AdskUser;

export function initializeModule(): void {
  if (adskUser.isLogin()) {
    this.initData();
  } else {
    adskUser.signalLoginCompleted.listen((event: LoginCompletedEvent) => {
      const data = event.data;
      if (data !== null && data.isLogin) {
        this.initData();
      }
    });
  }
}