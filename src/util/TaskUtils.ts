import {type Task} from '@/models/Task/Task.model'
import {deserialize, serialize} from 'serializr'
import {type TaskArrayHolder} from '@/models/TaskArrayHolder/TaskArrayHolder.model'
import {taskArraySchema} from '@/models/TaskArrayHolder/TaskArrayHolder.schema'

export const taskUtil = {
	toJson(tasks: TaskArrayHolder): string {
		return JSON.stringify(serialize(taskArraySchema, tasks))
	},
	fromJson(json: string): Task[] {
		return deserialize(taskArraySchema, JSON.parse(json)).array
	},
}
