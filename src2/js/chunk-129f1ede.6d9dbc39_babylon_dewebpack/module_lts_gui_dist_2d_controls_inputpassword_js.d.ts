import { InputText } from './inputText';
import { TextWrapper } from './textWrapper';
import { Observable } from 'core/Misc/observable';

/**
 * Input control specialized for password entry.
 * Displays bullet characters (•) instead of actual text for security.
 * @extends InputText
 */
export class InputPassword extends InputText {
  /**
   * Gets the type name of this control.
   * @returns The string "InputPassword"
   */
  protected _getTypeName(): string {
    return 'InputPassword';
  }

  /**
   * Pre-processes text before rendering by replacing all characters with bullets.
   * This ensures the actual password text is never displayed visually.
   * @param text - The actual password text to be masked
   * @returns A TextWrapper containing bullet characters (•) matching the length of the input
   */
  protected _beforeRenderText(text: string): TextWrapper {
    const wrapper = new TextWrapper();
    let maskedText = '';
    
    for (let i = 0; i < text.length; i++) {
      maskedText += '•';
    }
    
    wrapper.text = maskedText;
    return wrapper;
  }
}

/**
 * Type declaration for the InputPassword class registration.
 * Registers the class with the Babylon.js GUI system under the namespace "BABYLON.GUI.InputPassword".
 */
declare module 'babylonjs-gui' {
  namespace BABYLON.GUI {
    export { InputPassword };
  }
}