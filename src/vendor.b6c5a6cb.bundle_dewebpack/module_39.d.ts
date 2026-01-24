/**
 * CryptoJS NoPadding module
 * Provides a no-operation padding scheme for block cipher modes
 */

declare module 'crypto-js/pad-nopadding' {
  import { lib } from 'crypto-js';

  export interface NoPaddingStatic {
    /**
     * Pads the data block (no-op implementation)
     * @param data - The data block to pad
     * @param blockSize - The block size in bytes
     */
    pad(data: lib.WordArray, blockSize: number): void;

    /**
     * Unpads the data block (no-op implementation)
     * @param data - The data block to unpad
     */
    unpad(data: lib.WordArray): void;
  }

  /**
   * NoPadding padding strategy
   * This padding scheme does not add any padding to the data
   */
  export const NoPadding: NoPaddingStatic;
}

declare module 'crypto-js' {
  namespace pad {
    /**
     * NoPadding padding strategy
     * This padding scheme does not add any padding to the data
     */
    interface NoPaddingStatic {
      /**
       * Pads the data block (no-op implementation)
       * @param data - The data block to pad
       * @param blockSize - The block size in bytes
       */
      pad(data: lib.WordArray, blockSize: number): void;

      /**
       * Unpads the data block (no-op implementation)
       * @param data - The data block to unpad
       */
      unpad(data: lib.WordArray): void;
    }

    export const NoPadding: NoPaddingStatic;
  }
}