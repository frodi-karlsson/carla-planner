import {Recurrence, type RecurrenceProps, RecurringTask, type RecurringTaskProps, SingleTask, type SingleTaskProps, Task, TaskFields, type TaskPropsFields, type TaskAllProps, CancelledForItem, type CancelledForItemProps} from '@/models/Task/Task.model'
import {
	object,
	primitive,
	createModelSchema,
	type PropSchema,
	identifier,
	list,
} from 'serializr'
import {timeUnitSchema} from '@/models/TimeUnit/TimeUnit.schema'

type Props<T extends Record<string, unknown>> = {
	[K in keyof Required<T>]: PropSchema
}

const singleTaskPropSchema: Props<SingleTaskProps> = {
	date: primitive(),
	parent: primitive(),
}

const singleTaskModelSchema = createModelSchema(SingleTask, singleTaskPropSchema, context => {
	const json = context.json as SingleTaskProps
	return json
})

const cancelledForPropItemSchema: Props<CancelledForItemProps> = {
	day: primitive(),
	week: primitive(),
	month: primitive(),
	year: primitive(),
}

const cancelledForModelSchema = createModelSchema(CancelledForItem, cancelledForPropItemSchema, context => {
	const json = context.json as CancelledForItemProps
	return json
})

const recurrencePropSchema: Props<RecurrenceProps> = {
	type: primitive(),
	day: primitive(),
	month: primitive(),
	cancelledFor: list(object(cancelledForModelSchema)),
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

const taskFieldsSchema: Props<TaskPropsFields> = {
	id: identifier(),
	title: primitive(),
	description: primitive(),
	startTime: object(timeUnitSchema),
	length: object(timeUnitSchema),
	color: primitive(),
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
