interface ShowParameter {
  [key: string]: unknown;
}

export class Handler {
  private ui: UI;

  constructor() {
    this.init();
  }

  private init(): void {
    this.ui = new UI({});
  }

  public show(parameter: ShowParameter): void {
    this.ui.show(parameter);
  }
}

interface UIConfig {
  [key: string]: unknown;
}

class UI {
  constructor(config: UIConfig) {
    // UI initialization logic
  }

  public show(parameter: ShowParameter): void {
    // Show logic implementation
  }
}