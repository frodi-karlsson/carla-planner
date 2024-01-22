import {OverrideTask, type OverrideTaskProps, recurrence, type recurrenceProps, recurringTask, type recurringTaskProps, SingleTask, type SingleTaskProps, Task, TaskFields, type TaskPropsFields, type TaskAllProps} from '@/models/Task/Task.types'
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

const recurrencePropSchema: Props<recurrenceProps> = {
	type: primitive(),
	day: primitive(),
	month: primitive(),
}

const recurrenceModelSchema = createModelSchema(recurrence, recurrencePropSchema, context => {
	const json = context.json as recurrenceProps
	return json
})

const recurringTaskPropSchema: Props<recurringTaskProps> = {
	recurrence: object(recurrenceModelSchema),
}

const recurringTaskModelSchema = createModelSchema(recurringTask, recurringTaskPropSchema, context => {
	const json = context.json as recurringTaskProps
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
