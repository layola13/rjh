import { DesignEntity } from './872204';
import { registerProvider } from './208816';

registerProvider(
  { type: 'Design' },
  {
    collectEntity(): DesignEntity[] {
      return [new DesignEntity().accept(HSApp.App.getApp())];
    }
  }
);