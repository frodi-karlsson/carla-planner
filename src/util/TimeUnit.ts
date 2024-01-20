import {type TimeUnitType} from '@/types/Task'
/**
 * Represents a 5 minute span of time.
 */
export class TimeUnit implements TimeUnitType {
	public minutes: number

	/**
     * If timeB is not provided, timeA is assumed to be the number of minutes since epoch.
     * Otherwise, timeA is assumed to be the hour, and timeB is assumed to be the number of minutes since epoch.
     *
     * @example
     * const timeA = new TimeUnit(10, 30) // 10:30
     * const timeB = new TimeUnit(630) // 10:30
     *
     * @param timeA Either the number of minutes since epoch, or the hour.
     * @param timeB The number of minutes since epoch.
     */
	constructor(timeA: number, timeB?: number) {
		if (timeB === undefined) {
			this.minutes = this.getFromMinutes(timeA)
		} else {
			this.minutes = this.getFromHourMinutes(timeA, timeB)
		}
	}

	getFromMinutes(minutes: number) {
		return Math.max(Math.round(minutes / 5) * 5, 5)
	}

	getFromHourMinutes(hour: number, minutes: number) {
		return Math.max(Math.round(((hour * 60) + minutes) / 5) * 5, 5)
	}

	/**
     * Returns the minutes of this TimeUnit in ms since epoch.
     */
	get unix() {
		return new Date(this.minutes * 60 * 1000).getTime()
	}
}
