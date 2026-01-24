import { Observable } from "core/Misc/observable";
import { TouchHolographicMenu } from "../../../lts/gui/dist/3D/controls/touchHolographicMenu";
import { HandConstraintBehavior } from "core/Behaviors/Meshes/handConstraintBehavior";
import { WebXRExperienceHelper } from "core/XR/webXRExperienceHelper";
import { AbstractMesh } from "core/Meshes/abstractMesh";

/**
 * A holographic hand menu that follows the user's hand in WebXR experiences.
 * Extends TouchHolographicMenu with hand constraint behavior for immersive positioning.
 */
export declare class HandMenu extends TouchHolographicMenu {
  /**
   * The behavior that constrains the menu to follow the user's hand.
   * @internal
   */
  private _handConstraintBehavior: HandConstraintBehavior;

  /**
   * Gets the hand constraint behavior attached to this menu.
   * This behavior handles the menu's positioning relative to the tracked hand.
   */
  get handConstraintBehavior(): HandConstraintBehavior;

  /**
   * Creates a new HandMenu instance.
   * @param xrExperience - The WebXR experience helper to link the hand tracking to
   * @param scene - The scene to create the menu in (inherited from TouchHolographicMenu)
   */
  constructor(xrExperience: WebXRExperienceHelper, scene: any);

  /**
   * Creates the mesh node for the menu and attaches the hand constraint behavior.
   * @param mesh - The mesh to use as the menu's visual representation
   * @returns The configured mesh with hand constraint behavior attached
   * @internal
   */
  protected _createNode(mesh: AbstractMesh): AbstractMesh;

  /**
   * Disposes of the hand menu and detaches the hand constraint behavior.
   * Cleans up all resources including the parent TouchHolographicMenu.
   */
  dispose(): void;
}