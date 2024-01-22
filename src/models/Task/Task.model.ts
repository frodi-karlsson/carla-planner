import {OverrideTask, type OverrideTaskProps, Recurrence, type RecurrenceProps, RecurringTask, type RecurringTaskProps, SingleTask, type SingleTaskProps, Task, TaskFields, type TaskPropsFields, type TaskAllProps} from '@/models/Task/Task.types'
import {
	object,
	primitive,
	createModelSchema,
	type PropSchema,
	identifier,
} from 'serializr'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.types'
import {timeUnitSchema} from '@/models/TimeUnit/TimeUnit.model'

type Props<T extends Record<string, unknown>> = {
	[K in keyof Required<T>]: PropSchema
}

const singleTaskPropSchema: Props<SingleTaskProps> = {
	date: primitive(),
}

const singleTaskModelSchema = createModelSchema(SingleTask, singleTaskPropSchema, context => {
	const json = context.json as SingleTaskProps
	return json
})

const recurrencePropSchema: Props<RecurrenceProps> = {
	type: primitive(),
	day: primitive(),
	month: primitive(),
}

const recurrenceModelSchema = createModelSchema(Recurrence, recurrencePropSchema, context => {
	const json = context.json as RecurrenceProps
	return json
})

const recurringTaskPropSchema: Props<RecurringTaskProps> = {
	recurrence: object(recurrenceModelSchema),
}

const recurringTaskModelSchema = createModelSchema(RecurringTask, recurringTaskPropSchema, context => {
	const json = context.json as RecurringTaskProps
	return json
})

const overrideTaskPropSchema: Props<OverrideTaskProps> = {
	reOccuringTaskId: primitive(),
}

const overrideTaskModelSchema = createModelSchema(OverrideTask, overrideTaskPropSchema, context => {
	const json = context.json as OverrideTaskProps
	return json
})

const taskFieldsSchema: Props<TaskPropsFields> = {
	id: identifier(),
	title: primitive(),
	description: primitive(),
	startTime: object(timeUnitSchema),
	length: object(timeUnitSchema),
	color: primitive(),
	overrideTask: object(overrideTaskModelSchema),
	recurringTask: object(recurringTaskModelSchema),
	singleTask: object(singleTaskModelSchema),
}

const taskFieldsModelSchema = createModelSchema(TaskFields, taskFieldsSchema, context => {
	const json = context.json as TaskPropsFields
	return json
})

const taskPropSchema: Props<TaskAllProps> = {
	type: primitive(),
	fields: object(taskFieldsModelSchema),
}

export const taskModelSchema = createModelSchema(Task, taskPropSchema, context => {
	const json = context.json as TaskAllProps
	return json
})
