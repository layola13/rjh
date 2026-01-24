import { Component, ReactNode } from 'react';

/**
 * Camera bar component for controlling the 2D view camera
 * Provides functionality to fit the view to the largest room
 */
export declare class CameraBar extends Component<CameraBarProps> {
  /**
   * Creates an instance of CameraBar
   * @param props - Component properties
   */
  constructor(props: CameraBarProps);

  /**
   * Handles the camera fit action
   * Finds the largest room and fits the viewbox to it
   * Executes camera movement command and repositions to room center
   */
  onCameraFit(): void;

  /**
   * Adjusts the viewbox to fit a specific room
   * Calculates optimal viewbox dimensions while maintaining aspect ratio
   * @param room - The room entity to fit the view to
   */
  fitViewBoxToRoom(room: HSRoom): void;

  /**
   * Renders the camera bar UI
   * @returns React element containing the camera control button with tooltip
   */
  render(): ReactNode;
}

/**
 * Props for the CameraBar component
 */
export interface CameraBarProps {
  // Add specific props if needed based on usage
  [key: string]: unknown;
}

/**
 * Room entity from the HS application
 */
interface HSRoom {
  id: string;
  [key: string]: unknown;
}

/**
 * 2D point coordinates
 */
type Point2D = [number, number];

/**
 * Room center calculation result
 */
interface RoomCenter {
  room: HSRoom | null;
  point: Point2D;
}

/**
 * Geometry boundary box
 */
interface BrepBound {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Plugin size dimensions
 */
interface PluginSize {
  width: number;
  height: number;
}

/**
 * Global HSApp namespace declarations
 */
declare global {
  namespace HSApp {
    namespace Util {
      namespace Room {
        function getLargestRoomCenter(): RoomCenter;
      }
    }

    namespace App {
      function getApp(): HSApplication;
    }

    namespace View {
      namespace SVG {
        namespace Util {
          function ModelPointToCanvas(point: Point2D): Point2D;
        }
      }
    }
  }

  namespace HSCore {
    namespace Util {
      class BrepBound {
        constructor(top: number, left: number, width: number, height: number);
        top: number;
        left: number;
        width: number;
        height: number;
        appendPoint(point: Point2D): void;
      }
    }
  }

  namespace HSFPConstants {
    enum CommandType {
      MoveCamera = 'MoveCamera'
    }

    namespace Constants {
      const PIXEL_TO_M_FACTOR: number;
    }
  }

  interface HSApplication {
    floorplan: {
      active_camera: unknown;
    };
    cmdManager: CommandManager;
    geometryManager: GeometryManager;
    pluginManager: PluginManager;
    getActive2DView(): View2D;
  }

  interface CommandManager {
    createCommand(type: string, args: unknown[]): Command;
    execute(command: Command): void;
    receive(event: string, data: Record<string, unknown>): void;
  }

  interface GeometryManager {
    getGeometry(room: HSRoom): RoomGeometry | null;
  }

  interface PluginManager {
    getPlugin(pluginId: string): ResizeWidgetPlugin | null;
  }

  interface RoomGeometry {
    floor?: Point2D[];
  }

  interface ResizeWidgetPlugin {
    getSize(): PluginSize;
  }

  interface View2D {
    setViewBox(x: number, y: number, width: number, height: number): void;
  }

  interface Command {
    [key: string]: unknown;
  }
}

export {};