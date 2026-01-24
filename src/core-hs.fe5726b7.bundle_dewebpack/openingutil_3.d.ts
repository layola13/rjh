/**
 * Utility module for managing opening elements (windows, doors) and their assignment to wall hosts.
 * Handles reassignment of openings to appropriate walls based on geometric proximity and constraints.
 */

import * as THREE from 'three';

/**
 * Represents a wall segment with from/to endpoints
 */
interface WallSegment {
  /** Wall unique identifier */
  id: string;
  /** Start point of the wall */
  from: THREE.Vector3;
  /** End point of the wall */
  to: THREE.Vector3;
  /** Child elements attached to this wall */
  children?: Record<string, Opening>;
}

/**
 * Represents an opening element (window, door, etc.) that can be assigned to a wall
 */
interface Opening {
  /** X coordinate of the opening */
  x: number;
  /** Y coordinate of the opening */
  y: number;
  /** Z coordinate of the opening */
  z?: number;
  
  /**
   * Checks if this element is an instance of the specified model class
   * @param className The model class name to check against
   */
  instanceOf(className: string): boolean;
  
  /**
   * Assigns this opening to a specific wall
   * @param wall The wall to assign to
   */
  assignTo(wall: WallSegment): void;
  
  /**
   * Gets the current host wall of this opening
   * @returns The host wall or undefined if not assigned
   */
  getHost(): WallSegment | undefined;
}

/**
 * Internal structure for tracking wall candidates during reassignment
 */
interface WallCandidate {
  /** Squared distance from opening to wall */
  dist: number;
  /** The candidate wall */
  wall: WallSegment;
}

/**
 * Utility class for managing opening-to-wall assignments
 */
export interface OpeningUtil {
  /**
   * Reassigns opening elements to their appropriate host walls based on geometric proximity.
   * 
   * This function processes all opening children (windows, doors, etc.) of a container element
   * and reassigns them to the most appropriate wall from the provided list. Assignment is
   * determined by:
   * - For regular openings: whether the opening center lies on the wall segment
   * - For bay/corner windows: alignment with the original host wall direction
   * - For ambiguous cases: minimum distance to wall segment
   * 
   * @param container The parent element containing openings as children
   * @param walls Array of wall segments to consider for reassignment
   * @param wallMap Fallback map of wall IDs to segments for cases where from/to are undefined
   */
  reassignOpeningHost(
    container: { children?: Record<string, Opening> } | undefined,
    walls: WallSegment[] | undefined,
    wallMap: Map<string, WallSegment>
  ): void;
}

/**
 * Default implementation of OpeningUtil
 */
export const OpeningUtil: OpeningUtil = {
  reassignOpeningHost: (
    container: { children?: Record<string, Opening> } | undefined,
    walls: WallSegment[] | undefined,
    wallMap: Map<string, WallSegment>
  ): void => {
    // Early exit if no container
    if (!container) return;

    const children = container.children;
    const wallList = walls || [];
    let openings: Opening[] = [];

    // Filter children to get only opening elements
    if (children) {
      openings = Object.values(children).filter(
        (child) =>
          HSCore.Util.Content.isWallOpening(child) ||
          child.instanceOf(HSConstants.ModelClass.NgCornerWindow) ||
          child.instanceOf(HSConstants.ModelClass.NgBayWindow)
      );
    }

    // Process each opening if both openings and walls exist
    if (wallList.length && openings.length) {
      openings.forEach((opening) => {
        let minDistanceSquared = Infinity;
        let candidates: WallCandidate[] = [];
        let isAssigned = false;

        // Get opening position as 2D point (ignoring Z)
        const openingPosition = new THREE.Vector3(opening.x, opening.y, 0);

        // Iterate through all walls to find best match
        for (let wallIndex = 0, wallCount = wallList.length; wallIndex < wallCount; wallIndex++) {
          const wall = wallList[wallIndex];
          const wallStart = wall.from;
          const wallEnd = wall.to;
          const wallLine = new THREE.Line3(
            new THREE.Vector3(wallStart.x, wallStart.y, wallStart.z),
            new THREE.Vector3(wallEnd.x, wallEnd.y, wallEnd.z)
          );
          const closestPoint = wallLine.closestPointToPoint(openingPosition);

          // For regular openings: check if point is inside line segment
          if (opening.instanceOf(HSConstants.ModelClass.NgOpening)) {
            if (GeLib.LineUtils.isPointInsideLineSegment(openingPosition, wallLine)) {
              opening.assignTo(wall);
              isAssigned = true;
            }
          } else {
            // For special window types: check alignment with original host
            const currentHost = opening.getHost();
            if (currentHost) {
              const hostFrom = currentHost.from;
              const hostTo = currentHost.to;
              let originalHostLine: THREE.Line3;

              // Build original host line from coordinates or fallback map
              if (hostFrom && hostTo) {
                originalHostLine = new THREE.Line3(
                  new THREE.Vector3(hostFrom.x, hostFrom.y, hostFrom.z),
                  new THREE.Vector3(hostTo.x, hostTo.y, hostTo.z)
                );
              } else {
                const mappedWall = wallMap.get(currentHost.id);
                if (!mappedWall) continue;
                originalHostLine = new THREE.Line3(mappedWall.from, mappedWall.to);
              }

              const candidateWallLine = new THREE.Line3(wallStart, wallEnd);

              // Check if lines are aligned for specific window types
              switch (true) {
                case opening.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow):
                case opening.instanceOf(HSConstants.ModelClass.NgBayWindow):
                case opening.instanceOf(HSConstants.ModelClass.NgCornerWindow):
                  if (
                    GeLib.LineUtils.isSameLines(originalHostLine, candidateWallLine) &&
                    GeLib.LineUtils.isPointOnLineSegment(closestPoint, wallLine)
                  ) {
                    opening.assignTo(wall);
                    isAssigned = true;
                  }
              }
            }
          }

          if (isAssigned) break;

          // Track candidates by distance for fallback assignment
          const distanceSquared = openingPosition.distanceToSquared(closestPoint);
          const TOLERANCE = 0.001;

          if (GeLib.MathUtils.nearlyEqual(distanceSquared, minDistanceSquared, TOLERANCE)) {
            candidates.push({ dist: minDistanceSquared, wall });
          } else if (distanceSquared < minDistanceSquared) {
            minDistanceSquared = distanceSquared;
            candidates[0] = { dist: minDistanceSquared, wall };
            // Remove stale candidates with different distances
            if (candidates.length > 1 && candidates[1].dist !== minDistanceSquared) {
              candidates = candidates.slice(0, 1);
            }
          }
        }

        // Fallback assignment logic when no direct match found
        if (!isAssigned) {
          const currentHost = opening.getHost();

          if (currentHost instanceof HSCore.Model.Wall && (currentHost.from || currentHost.to)) {
            // Skip if original host is still in children and not in new wall list
            if (children[currentHost.id] && !wallList.includes(currentHost)) {
              return;
            }

            // Single candidate: assign directly
            if (candidates.length === 1) {
              opening.assignTo(candidates[0].wall);
            } else if (candidates.length > 1 && (currentHost.from || currentHost.to)) {
              // Multiple candidates: find best match by alignment with original host
              const hostFrom = currentHost.from;
              const hostTo = currentHost.to;
              let originalHostLine: THREE.Line3;

              if (hostFrom && hostTo) {
                originalHostLine = new THREE.Line3(
                  new THREE.Vector3(hostFrom.x, hostFrom.y, hostFrom.z),
                  new THREE.Vector3(hostTo.x, hostTo.y, hostTo.z)
                );
              } else {
                const mappedWall = wallMap.get(currentHost.id);
                if (!mappedWall) return;
                originalHostLine = new THREE.Line3(mappedWall.from, mappedWall.to);
              }

              let minEndpointDistance = Infinity;
              let bestWall = candidates[0].wall;

              for (let i = 0, candidateCount = candidates.length; i < candidateCount; i++) {
                const candidate = candidates[i].wall;
                const candidateStart = new THREE.Vector3(candidate.from.x, candidate.from.y, candidate.from.z);
                const candidateEnd = new THREE.Vector3(candidate.to.x, candidate.to.y, candidate.to.z);
                const candidateLine = new THREE.Line3(candidateStart, candidateEnd);

                // If lines are aligned, choose wall with closest endpoint
                if (GeLib.LineUtils.isSameLines(originalHostLine, candidateLine)) {
                  const distanceToStart = openingPosition.distanceTo(candidateStart);
                  const distanceToEnd = openingPosition.distanceTo(candidateEnd);
                  const minDistance = distanceToStart < distanceToEnd ? distanceToStart : distanceToEnd;

                  if (minDistance < minEndpointDistance) {
                    minEndpointDistance = minDistance;
                    bestWall = candidate;
                  }
                }
              }

              opening.assignTo(bestWall);
            }
          } else if (candidates.length > 0) {
            // No valid host: assign to first candidate
            opening.assignTo(candidates[0].wall);
          }
        }
      });
    }
  }
};