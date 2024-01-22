export type TimeUnitProps = {
	minutes: number;
	hours?: number;
	timeString: string;
	unix: number;
}
/**
 * Represents a 5 minute span of time.
 */
export class TimeUnit implements TimeUnitProps {
	static getTimeString(minutes: number) {
		const hours = Math.floor(minutes / 60)
		const roundedMinutes = minutes % 60
		return `${hours}:${roundedMinutes < 10 ? '0' : ''}${roundedMinutes}`
	}

	static getUnix(minutes: number) {
		return new Date(minutes * 60 * 1000).getTime()
	}

	static from(props: Omit<TimeUnitProps, 'timeString' | 'unix' | 'hours'> & {hours?: number}) {
		function getFromMinutes(minutes: number) {
			return Math.round(minutes / 5) * 5
		}

		function getFromHourMinutes(hour: number, minutes: number) {
			return Math.round(((hour * 60) + minutes) / 5) * 5
		}

		let {minutes, hours} = props
		if (hours) {
			minutes = getFromHourMinutes(hours, minutes)
		} else {
			minutes = getFromMinutes(minutes)
		}

		return {
			hours: 0,
			minutes,
			timeString: this.getTimeString(minutes),
			unix: this.getUnix(minutes),
		}
	}

	public minutes: number
	public hours?: number
	public timeString: string
	public unix: number

	public constructor(props?: TimeUnitProps) {
		if (!props) {
			throw new Error('props must be defined')
		}

		this.minutes = props.minutes
		this.hours = props.hours
		this.timeString = props.timeString
		this.unix = props.unix
	}
}
