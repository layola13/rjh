/**
 * EnterPrise AI Mood Board Page Component
 * Provides a wrapper for the AI Moodboard feature with team query configuration
 */

import React from 'react';

/**
 * Scene type enumeration for AI Moodboard
 */
export enum SceneType {
  /** Team collaboration scene */
  TEAM = 6
}

/**
 * Query type for mood board data fetching
 */
export type QueryType = 'team' | 'personal' | 'project';

/**
 * Pre-configuration for AI Moodboard
 */
export interface MoodBoardPreConfig {
  /** Type of query to execute */
  queryType: QueryType;
  /** Scene type identifier */
  sceneType: SceneType;
}

/**
 * Props for the AiMoodboardPage component
 */
export interface AiMoodboardPageProps {
  /** Function to get the container height dynamically */
  getContainerHeight: () => number;
  /** Function to retrieve pre-configuration for the moodboard */
  getPreConfig: () => Promise<MoodBoardPreConfig>;
}

/**
 * EnterPrise AI Mood Board Page Component
 * Renders an AI-powered moodboard interface for team collaboration
 * 
 * @returns React component wrapping the AI Moodboard functionality
 */
export declare function EnterPriseAiMoodBoardPage(): React.ReactElement;