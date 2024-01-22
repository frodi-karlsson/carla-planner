import {type TimeUnitProps, type TimeUnit} from '@/models/TimeUnit/TimeUnit.types'
import {primitive} from 'serializr'

export type SingleTaskProps = {
	/**
	 * The date of the task in the format YYYY-WW-DD
	 * We use weeks instead of months because months are not a consistent length.
	 * This is not suitable for recurring tasks because the week number will change every year,
	 * but it is suitable for single tasks because the week number will not change.
	 *
	 * Week number is according to ISO 8601
	 */
	date: `${number}-${number}-${number}`;
}

export class SingleTask implements SingleTaskProps {
	date: `${number}-${number}-${number}`
	/**
	 * @deprecated Use an object with type SingleTaskProps instead
	 * @param props The properties that define the single task
	 */
	constructor(private readonly props: SingleTaskProps) {
		this.date = props.date
	}
}

export type recurrenceProps = {
	/**
	 * The type of recurrence
	 *
	 * - daily: The task occurs every day
	 * - workdaily: The task occurs every day except weekends
	 * - weekly: The task occurs every week on a specific day
	 * - monthly: The task occurs every month on a specific day
	 * - yearly: The task occurs every year on a specific day
	 */
	type: 'daily' | 'workdaily' | 'weekly' | 'monthly' | 'yearly';
	/**
	 * The day the task occurs on
	 * - For weekly tasks, this is the day of the week
	 * - For monthly and yearly tasks, this is the day of the month
	 */
	day?: number;
	/**
	 * The month the task occurs on
	 * - For yearly tasks, this is the month of the year
	 */
	month?: number;
}

export class recurrence implements recurrenceProps {
	type: 'daily' | 'workdaily' | 'weekly' | 'monthly' | 'yearly'
	day?: number
	month?: number
	/**
	 * @deprecated Use an object with type recurrenceProps instead
	 * @param props The properties that define the recurrence
	 */
	constructor(private readonly props: recurrenceProps) {
		this.type = props.type
		this.day = props.day
		this.month = props.month
	}
}

export type recurringTaskProps = {
	/**
	 * Properties that define the recurrence of the task
	 */
	recurrence: recurrenceProps;
}

export class recurringTask implements recurringTaskProps {
	recurrence: recurrenceProps
	/**
	 * @deprecated Use an object with type recurringTaskProps instead
	 * @param props The properties that define the recurring task
	 */
	constructor(private readonly props: recurringTaskProps) {
		this.recurrence = props.recurrence
	}
}

export type OverrideTaskProps = {
	/**
	 * The id of the task that this override overrides
	 */
	reOccuringTaskId: string;
}

export class OverrideTask implements OverrideTaskProps {
	reOccuringTaskId: string
	/**
	 * @deprecated Use an object with type OverrideTaskProps instead
	 * @param props The properties that define the override task
	 */
	constructor(private readonly props: OverrideTaskProps) {
		this.reOccuringTaskId = props.reOccuringTaskId
	}
}

export type TaskPropsFields = {
	/**
	 * Unique identifier for the task
	 */
	id: string;
	/**
	 * The title of the task
	 */
	title: string;
	/**
	 * The description of the task
	 */
	description?: string;
	/**
	 * The start time of the task.
	 */
	startTime: TimeUnitProps;
	/**
	 * The length of the task.
	 */
	length: TimeUnitProps;
	/**
	 * The color the task should be displayed as in the UI
	 */
	color: string;
	/**
	 * Fields specific to single tasks
	 */
	singleTask?: SingleTaskProps;
	/**
	 * Fields specific to recurring tasks
	 */
	recurringTask?: recurringTaskProps;
	/**
	 * Fields specific to override tasks
	 */
	overrideTask?: OverrideTaskProps;
}

export class TaskFields implements TaskPropsFields {
	id: string
	title: string
	description?: string
	startTime: TimeUnitProps
	length: TimeUnitProps
	color: string
	singleTask?: SingleTaskProps
	recurringTask?: recurringTaskProps
	overrideTask?: OverrideTaskProps
	/**
	 * @deprecated Use an object with type TaskFields instead
	 * @param props The properties that define the task
	 */
	constructor(private readonly props?: TaskPropsFields) {
		if (!props) {
			throw new Error('Task must have props')
		}

		this.id = props.id
		this.title = props.title
		this.description = props.description
		this.startTime = props.startTime
		this.length = props.length
		this.color = props.color
		this.singleTask = props.singleTask
		this.recurringTask = props.recurringTask
		this.overrideTask = props.overrideTask
	}
}

export type TaskAllProps = {
	/**
	 * The type of task
	 */
	type: 'single' | 'recurring' | 'override';
	/**
	 * The fields that define the task
	 */
	fields: TaskFields;
}

export class Task implements TaskAllProps {
	static from(props: TaskAllProps): Task {
		if (!props.fields.singleTask && !props.fields.recurringTask && !props.fields.overrideTask) {
			throw new Error('Task must have type specific fields')
		}

		return props
	}

	type: 'single' | 'recurring' | 'override'

	fields: TaskFields

	/**
	 * @deprecated Use Task.from instead
	 * @param props The properties that define the task
	 */
	constructor(private readonly props?: TaskAllProps) {
		if (!props) {
			throw new Error('Task must have props')
		}

		this.type = props.type
		this.fields = props.fields
	}
}
