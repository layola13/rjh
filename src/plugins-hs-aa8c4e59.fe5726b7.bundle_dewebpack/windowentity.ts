import { OpeningEntity } from './OpeningEntity';
import { SillStoneEntity } from './SillStoneEntity';

interface WindowSill {
  // Define the structure of a window sill based on your domain model
}

interface WindowData {
  getWindowSills(): Iterable<WindowSill>;
}

export class WindowEntity extends OpeningEntity {
  constructor() {
    super();
  }

  protected buildChildren(windowData: WindowData): void {
    super.buildChildren(windowData);

    for (const sill of windowData.getWindowSills()) {
      const sillEntity = new SillStoneEntity();
      this.addChild(sillEntity.accept(sill));
    }
  }
}