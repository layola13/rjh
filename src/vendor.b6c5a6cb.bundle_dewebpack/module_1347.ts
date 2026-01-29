/**
 * @pixi/mixin-get-child-by-name - v5.2.4
 * Compiled Sun, 03 May 2020 22:38:52 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

import { DisplayObject, Container } from '@pixi/display';

declare module '@pixi/display' {
  interface DisplayObject {
    name: string | null;
  }

  interface Container {
    /**
     * Returns a child with the matching name.
     * @param name - The name of the child to find
     * @returns The child with the specified name, or null if not found
     */
    getChildByName(name: string): DisplayObject | null;
  }
}

DisplayObject.prototype.name = null;

Container.prototype.getChildByName = function(name: string): DisplayObject | null {
  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i].name === name) {
      return this.children[i];
    }
  }
  return null;
};