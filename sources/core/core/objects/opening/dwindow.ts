import { DHole } from './DHole';
import { WindowSill } from './WindowSill';
import { WebCadDocument } from './WebCadDocument';
import type * as HSCore from '../utils/HSCore';

interface ChildAddedEvent {
  data: {
    entity?: HSCore.Model.IEntity;
  };
}

interface Context {
  // Define context properties based on your application
}

interface ChildNodesMap extends Map<string, WindowSill> {}

export class DWindow extends DHole {
  protected childNodes?: ChildNodesMap;

  constructor(
    entity: HSCore.Model.Parametrization.Window,
    document: WebCadDocument,
    context: Context
  ) {
    super(entity, document, context);
  }

  onInit(): void {
    const windowSill = this.entity.getWindowSill();
    
    if (windowSill) {
      const sillObject = this.createSillObject(windowSill);
      
      if (sillObject && this.childNodes) {
        this.childNodes.set(windowSill.id, sillObject);
      }
    }
    
    super.onInit();
  }

  createSillObject(windowSill: HSCore.Model.Parametrization.WindowSill): WindowSill {
    const document = new WebCadDocument();
    return new WindowSill(windowSill, document, this.context, this);
  }

  onChildAdded(event: ChildAddedEvent): void {
    const entity = event.data.entity;
    
    if (!entity) {
      return;
    }
    
    if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      const sillObject = this.createSillObject(entity);
      
      if (this.childNodes) {
        this.childNodes.set(entity.id, sillObject);
      }
    } else {
      super.onChildAdded(event);
    }
  }
}