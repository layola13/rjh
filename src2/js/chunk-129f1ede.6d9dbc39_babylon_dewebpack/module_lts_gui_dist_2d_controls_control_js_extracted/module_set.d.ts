/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets the read-only state of the current instance.
 * This method is typically used to control whether the object can be modified.
 */

/**
 * Sets the read-only state of the instance.
 * @param isReadOnly - Whether the instance should be read-only
 */
function setReadOnly(isReadOnly: boolean): void {
    this._isReadOnly = isReadOnly;
}