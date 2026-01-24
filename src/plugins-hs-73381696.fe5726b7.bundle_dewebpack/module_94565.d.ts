export interface MenuHandler {
  name: string;
  isApplied(entities: Entity[]): boolean;
  getItems(context: MenuContext): MenuItem[];
}