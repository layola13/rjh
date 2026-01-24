/**
 * Hand-attached menu component for WebXR experiences
 * Extends TouchHolographicMenu to provide hand-constrained behavior
 * @module HandMenu
 */

import { Observable } from "core/Misc/observable";
import { TouchHolographicMenu } from "../../../lts/gui/dist/3D/controls/touchHolographicMenu";
import { HandConstraintBehavior } from "core/Behaviors/Meshes/handConstraintBehavior";
import { WebXRExperienceHelper } from "core/XR/webXRExperienceHelper";
import { TransformNode } from "core/Meshes/transformNode";

/**
 * A 3D menu that follows the user's hand in WebXR experiences.
 * Automatically attaches to and tracks a specified hand using HandConstraintBehavior.
 * 
 * @example
 *