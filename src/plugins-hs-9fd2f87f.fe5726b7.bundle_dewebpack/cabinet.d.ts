/**
 * Cabinet module for kitchen cabinet creation and management
 * Provides types and factory functions for creating different cabinet types
 */

/**
 * Enum defining all available cabinet types in the kitchen system
 */
export enum CabinetType {
  /** Base cabinet with door, no appliance */
  BaseNoApplianceWithDoor = "BaseNoApplianceWithDoor",
  /** Base cabinet with drawer, no appliance */
  BaseNoApplianceWithDrawer = "BaseNoApplianceWithDrawer",
  /** Base cabinet with integrated sink */
  BaseWithSink = "BaseWithSink",
  /** Base cabinet with cooktop */
  BaseWithCooktop = "BaseWithCooktop",
  /** Base cabinet for straight corner */
  BaseStraightCorner = "BaseStraightCorner",
  /** Wall cabinet with range cooktop (two doors) */
  WallCooktop = "WallTwoDoorWithRangeCooktop",
  /** Wall cabinet with single door */
  WallSingleDoor = "WallSingleDoorCabinet",
  /** Wall cabinet with two doors */
  WallTwoDoor = "WallTwoDoorCabinet",
  /** Lightboard cabinet */
  Lightboard = "Lightboard",
  /** Wall cabinet with two doors for corner placement */
  WallTwoDoorCorner = "WallTwoDoorCornerCabinet",
  /** Base cabinet with single door for corner placement */
  BaseSingleDoorCorner = "BaseSingleDoorCornerCabinet",
  /** Base cabinet with integrated oven */
  BaseOven = "BaseCabinetWithOven",
  /** High cabinet with normal size and appliance */
  HighCabinetNormal = "HighCabinetNormalSizeWithAppliance",
  /** Single door fridge cabinet */
  FridgeSingleDoor = "FridgeSingleDoor",
  /** Double door fridge cabinet */
  FridgeDoubleDoor = "FridgeDoubleDoor",
  /** High cabinet with half size and appliance */
  HighCabinetHalf = "HighCabinetHalfSizeWithAppliance",
  /** High cabinet with full size and appliance */
  HighCabinetFull = "HighCabinetFullSizeWithAppliance",
  /** High cabinet with full size and two appliances */
  HighCabinetFullTwo = "HighCabinetFullSizeWithTwoAppliance",
  /** High cabinet with full size without appliance */
  HighCabinetFullNone = "HighCabinetFullSizeWithoutAppliance",
}

/**
 * Enum mapping cabinet detail types to their unique identifiers (UUIDs)
 * These IDs are used for product lookup in the catalog system
 */
export enum CabinetDetailType {
  BaseSingleDoorCabinet = "8ce4ed58-4224-34ef-84b2-4af77db15733",
  BaseSingleDoorWidthSinkCabinet = "0a7794f2-a524-3019-bfe4-47169658fa68",
  BaseSingleDoorWidthCookingCabinet = "fcde1606-1b1f-3c3f-8056-66a5d0c572b6",
  BaseSingleDoorCornerCabinet = "9fd14132-f5da-40ba-854e-c7625f1238dc",
  BaseTwoDoorCabinet = "8fc804dd-3170-3144-ba1d-0d291e67f4ee",
  BaseTwoDoorCornerCabinet = "96b6bf2c-fe6d-3ef1-a07e-bea1e057d215",
  BaseTwoDoorWidthSinkCabinet = "fbb0f4a0-359f-3a3c-830e-3fb43a481d8a",
  BaseTwoDoorWidthCookingCabinet = "0ddc88c9-54e6-3e1f-b459-da55d7a17f11",
  BaseTwoDoorCornerWidthSinkCabinet = "2673390c-1672-37c5-a4ed-fbab535197cc",
  BaseTwoDoorCornerWidthCookingCabinet = "7c6ab9d5-0f24-39f8-88f0-119006d44177",
  BaseSingleDrawerCabinet = "d09e28ec-ab02-3881-9130-2244ac988278",
  BaseTwoDrawerCabinet = "82457864-682f-3c91-812d-38c75727254e",
  BaseThreeDrawerCabinet = "8a4ff8a5-18cb-377b-983c-4161b6a05f0b",
  BaseFourDrawerCabinet = "506e17bc-0bb6-3078-a4a4-6fdf37222233",
  BaseCabinetWithDishWasher = "276a3f67-9a09-3f53-bea3-cd87d8d4e10f",
  BaseCabinetWithOven = "e96fb05c-bde4-35ad-bf22-77233f7e4ec7",
  BaseCabinetWithMicrowaveOven = "200a4f90-91d5-3bb9-a7fd-eb9bd96e6af5",
  BaseStraightCornerCabinet = "33da6b5a-7f90-4615-b876-c359092ce8b5",
  BaseFiveCornerCabinet = "e4ecd13d-a1b6-321d-ade4-124fb23d7160",
  WallSingleCabinet = "4f4beb7d-479c-31ea-ac60-b6043b42702e",
  WallTwoDoorCabinet = "e2e27f8d-6260-347a-bdc7-f31e89a0714b",
  WallSingleDoorOpeningUpCabinet = "8155a97f-3d6d-3af9-989c-aefa95d32152",
  WallDoubleDoorOpeningUpCabinet = "0d2b3f3e-edd0-365d-8dc7-20bdc032eb54",
  WallTwoDoorWithRangeCooktopCabinet = "f68a7788-a7c8-3513-a295-e04a31c5ddb1",
  WallTwoDoorCornerCabinet = "f6428810-bc8e-468f-b87b-e4e25456c1b2",
  WallStraightCornerCabinet = "e6e64fe0-95d9-4635-bf62-f002a315918b",
  WallFiveCornerCabinet = "82d85fad-050c-398b-9ba3-ccdce86d7923",
  HighCabinetHalfSizeWithAppliance = "abc9a552-5600-3ba7-96d4-e098d4aadf13",
  HighCabinetNormalSizeWithAppliance = "b8d2a2df-50dd-3f36-865b-8ff41d7772f6",
  HighCabinetFullSizeWithAppliance = "33235c0d-1204-32f0-9bd5-ef1440a9fe94",
  HighCabinetFullSizeWithTwoAppliance = "fb8b70fa-aa1f-3ece-a748-f67a80432a59",
  HighCabinetFullSizeWithoutAppliance = "b65db994-365b-3ed3-98ae-10544283bb84",
  FridgeSingleDoor = "c96a5061-a4f7-4463-bc70-6ebd578f1189",
  FridgeDoubleDoor = "7ad71445-44b8-4050-affe-1184b27d9514",
  ZipboardI = "1ace54d0-344a-3abe-a92d-8ae737d64e17",
  ZipboardL = "dabecf6a-8a50-3203-b5f6-e4e55e7e651c",
  Lightboard = "79dabeb7-d0d3-34f0-89ec-b195de881711",
}

/**
 * 3D position coordinates
 */
export interface Position3D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
}

/**
 * Cabinet dimensions
 */
export interface CabinetDimensions {
  /** Width (X axis) in meters */
  XLength?: number;
  /** Depth (Y axis) in meters */
  YLength?: number;
  /** Height (Z axis) in meters */
  ZLength?: number;
}

/**
 * Cabinet state configuration for dynamic properties
 */
export interface CabinetStateConfig {
  [stateId: string]: unknown;
}

/**
 * Creates a cabinet instance by its detail type identifier
 * 
 * @param detailType - The specific cabinet detail type (UUID)
 * @param position - 3D position where the cabinet should be placed
 * @param dimensions - Desired dimensions of the cabinet
 * @param rotation - Rotation angle in degrees (default: 0)
 * @param styles - Style configuration for the cabinet
 * @param stateConfig - State values to configure cabinet properties
 * @returns Promise resolving to the created cabinet product instance
 */
export function createCabinetByDetailType(
  detailType: string,
  position: Partial<Position3D>,
  dimensions: CabinetDimensions,
  rotation?: number,
  styles?: unknown,
  stateConfig?: CabinetStateConfig
): Promise<unknown>;

/**
 * Creates a cabinet instance by its type and size specifications
 * Automatically selects appropriate detail type based on cabinet type and dimensions
 * 
 * @param cabinetType - The general cabinet type category
 * @param position - 3D position where the cabinet should be placed
 * @param dimensions - Desired dimensions of the cabinet
 * @param rotation - Rotation angle in degrees (default: 0)
 * @param styles - Style configuration for the cabinet
 * @param stateConfig - State values to configure cabinet properties
 * @param parent - Parent container or assembly ID
 * @returns Promise resolving to the created cabinet product instance
 */
export function createCabinetByTypeAndSize(
  cabinetType: CabinetType,
  position: Partial<Position3D>,
  dimensions: CabinetDimensions,
  rotation?: number,
  styles?: unknown,
  stateConfig?: CabinetStateConfig,
  parent?: string
): Promise<unknown>;