import {type ArrayHolder} from '@/models/ArrayHolder/ArrayHolder.model'
import {arraySchema} from '@/models/ArrayHolder/ArrayHolder.schema'
import {type Task} from '@/models/Task/Task.model'
import {taskModelSchema} from '@/models/Task/Task.schema'
import {deserialize, serialize} from 'serializr'

export const taskUtil = {
	toJson(tasks: ArrayHolder<Task>): string {
		return JSON.stringify(serialize(arraySchema(taskModelSchema), tasks))
	},
	fromJson(json: string): Task[] {
		return deserialize(arraySchema(taskModelSchema), JSON.parse(json)).array
	},
}
