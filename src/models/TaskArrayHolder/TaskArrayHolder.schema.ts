import {createModelSchema, list, object} from 'serializr'
import {TaskArrayHolder} from './TaskArrayHolder.model'
import {taskModelSchema} from '../Task/Task.schema'

export const taskArraySchema = createModelSchema<TaskArrayHolder>(TaskArrayHolder, {
	array: list(object(taskModelSchema)),
})
