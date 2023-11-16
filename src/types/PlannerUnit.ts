/**
 * Represents a unit of your day.
 */
export interface PlannerUnit {
  /**
   * The title of the unit.
   */
  title: string;

  /**
   * The internal id of the unit.
   */
  id: string;

  /**
   * Duration of the unit in minutes.
   */
  duration: number;

  /**
   * Optional description of the unit.
   */
  description?: string;

  /**
   * Optional duration of the pause you want to take after the unit in minutes.
   */
  pause?: number;

  /**
   * Whether the pause is active or not.
   */
  pauseActive?: boolean;

  tags?: string[];
}
