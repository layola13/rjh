import { BaseObject } from './BaseObject';
import { Model } from './Model';

/**
 * Tree structure manager for concealed work tubes and nodes.
 * Handles junction box detection and view model creation.
 */
export class ConcealedWorkTubeTree extends BaseObject {
  private childNodes?: Map<unknown, { entity: Model.ConcealedWorkNode | Model.ConcealedWorkTube }>;

  /**
   * Initialize the tree by processing all child entities.
   * Creates view models for tubes and nodes with junction boxes.
   */
  onInit(): void {
    const processedContents: unknown[] = [];

    this.entity.forEachChild((child: Model.ConcealedWorkTube | Model.ConcealedWorkNode) => {
      if (child instanceof Model.ConcealedWorkTube) {
        this.createViewModel(child);
      } else if (child instanceof Model.ConcealedWorkNode) {
        const deviceComponent = child.getComponent(Model.CWDeviceComp.Type);

        if (
          deviceComponent?.content &&
          this._hasJunctionBox(deviceComponent.content) &&
          !processedContents.includes(deviceComponent.content)
        ) {
          this.createViewModel(child);
        }
      }
    });
  }

  /**
   * Handle child entity addition events.
   * Creates view models for new nodes that contain junction boxes.
   */
  onChildAdded(event: { data: { entity?: Model.ConcealedWorkNode | Model.ConcealedWorkTube } }): void {
    const entity = event.data.entity;
    if (!entity) {
      return;
    }

    if (entity instanceof Model.ConcealedWorkNode) {
      const deviceComponent = entity.getComponent(Model.CWDeviceComp.Type);

      if (!deviceComponent?.content || !this._hasJunctionBox(deviceComponent.content)) {
        return;
      }

      if (this.childNodes) {
        const existingContents: unknown[] = [];

        for (const [, nodeData] of this.childNodes) {
          const nodeEntity = nodeData.entity;
          if (!(nodeEntity instanceof Model.ConcealedWorkNode)) {
            continue;
          }

          const existingDeviceComponent = nodeEntity.getComponent(Model.CWDeviceComp.Type);
          if (existingDeviceComponent?.content) {
            existingContents.push(existingDeviceComponent.content);
          }
        }

        if (existingContents.includes(deviceComponent.content)) {
          return;
        }
      }
    }

    this.createViewModel(entity);
  }

  /**
   * Determine if a content item requires a junction box.
   * Returns true for lighting, switches, and sockets (excluding cabinet/desk/floor lamps).
   */
  private _hasJunctionBox(content: { contentType: { isTypeOf: (type: unknown) => boolean } }): boolean {
    const excludedTypes = [
      HSCatalog.ContentTypeEnum.CabinetLighting,
      HSCatalog.ContentTypeEnum.DeskLamp,
      HSCatalog.ContentTypeEnum.FloorLamp
    ];

    if (content.contentType.isTypeOf(excludedTypes)) {
      return false;
    }

    return (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Switch) ||
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Socket)
    );
  }

  /**
   * Create a view model for the given entity.
   * Implementation should be provided by the concrete class or base class.
   */
  protected createViewModel(entity: Model.ConcealedWorkTube | Model.ConcealedWorkNode): void {
    // Implementation expected from base class or subclass
  }
}