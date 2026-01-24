/**
 * Component lifecycle mount status constants
 * Defines the different mounting states a component can be in
 */

/**
 * Status indicating the component is about to mount but hasn't mounted yet
 */
export const WillMountStatus = "WillMountStatus";

/**
 * Status indicating the component has been successfully mounted
 */
export const MountedStatus = "MountedStatus";

/**
 * Status indicating the component has been unmounted
 */
export const UnMountedStatus = "UnMountedStatus";

/**
 * Union type representing all possible mount status values
 */
export type MountStatus = typeof WillMountStatus | typeof MountedStatus | typeof UnMountedStatus;