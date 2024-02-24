import {type TimeUnitProps} from '@/models/TimeUnit/TimeUnit.model'

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
	/**
   * The parent recurring task that this single task is made from
   */
	parent?: string;
}

export class SingleTask implements SingleTaskProps {
	date: `${number}-${number}-${number}`
	/**
   * @deprecated Use an object with type SingleTaskProps instead
   * @param props The properties that define the single task
   */
	constructor(props: SingleTaskProps) {
		this.date = props.date
	}
}

export type RecurrenceProps = {
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
	/**
   * The times the task is cancelled for
   */
	cancelledFor: Array<{
		/**
     * The day the task is cancelled for
     * This is used for daily-like tasks
     */
		day?: number;
		/**
     * The week the task is cancelled for
     * This is used for weekly tasks
     */
		week?: number;
		/**
     * The month the task is cancelled for
     * This is used for monthly and daily tasks
     */
		month?: number;
		/**
     * The year the task is cancelled for
     * This is used for yearly, monthly, weekly, and daily tasks
     */
		year?: number;
	}>;
}

export type CancelledForItemProps = {
	day?: number;
	week?: number;
	month?: number;
	year?: number;
}

export class CancelledForItem implements CancelledForItemProps {
	day?: number
	week?: number
	month?: number
	year?: number
	/**
   * @deprecated Use an object with type CancelledForItemProps instead
   * @param props The properties that define the cancelled for item
   */
	constructor(props: CancelledForItemProps) {
		this.day = props.day
		this.week = props.week
		this.month = props.month
		this.year = props.year
	}
}

export class Recurrence implements RecurrenceProps {
	type: 'daily' | 'workdaily' | 'weekly' | 'monthly' | 'yearly'
	day?: number
	month?: number
	cancelledFor: CancelledForItemProps[]

	/**
   * @deprecated Use an object with type recurrenceProps instead
   * @param props The properties that define the recurrence
   */
	constructor(props: RecurrenceProps) {
		this.type = props.type
		this.day = props.day
		this.month = props.month
		this.cancelledFor = props.cancelledFor ?? []
	}
}

export type RecurringTaskProps = {
	/**
   * Properties that define the recurrence of the task
   */
	recurrence: RecurrenceProps;
}

export class RecurringTask implements RecurringTaskProps {
	recurrence: RecurrenceProps
	/**
   * @deprecated Use an object with type recurringTaskProps instead
   * @param props The properties that define the recurring task
   */
	constructor(props: RecurringTaskProps) {
		this.recurrence = props.recurrence
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
	recurringTask?: RecurringTaskProps;
}

export class TaskFields implements TaskPropsFields {
	id: string
	title: string
	description?: string
	startTime: TimeUnitProps
	length: TimeUnitProps
	color: string
	singleTask?: SingleTaskProps
	recurringTask?: RecurringTaskProps
	/**
   * @deprecated Use an object with type TaskFields instead
   * @param props The properties that define the task
   */
	constructor(props?: TaskPropsFields) {
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
	}
}

export type TaskAllProps = {
	/**
   * The type of task
   */
	type: 'single' | 'recurring';
	/**
   * The fields that define the task
   */
	fields: TaskFields;
}

export class Task implements TaskAllProps {
	static from(props: TaskAllProps): Task {
		if (!props.fields.singleTask && !props.fields.recurringTask) {
			throw new Error('Task must have type specific fields')
		}

		return props
	}

	type: 'single' | 'recurring'

	fields: TaskFields

	/**
   * @deprecated Use Task.from instead
   * @param props The properties that define the task
   */
	constructor(props?: TaskAllProps) {
		if (!props) {
			throw new Error('Task must have props')
		}

		this.type = props.type
		this.fields = props.fields
	}
}
