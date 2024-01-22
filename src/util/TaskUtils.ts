import {taskModelSchema} from '@/models/Task/Task.model'
import {type Task} from '@/models/Task/Task.types'
import {deserialize, serialize} from 'serializr'

export const taskUtil = {
	toJson(tasks: Task[]): string {
		return JSON.stringify(serialize(taskModelSchema, tasks))
	},
	fromJson(json: string): Task[] {
		const parsed = JSON.parse(json) as Array<readonly [string, unknown]>
		return parsed.map(
			task => deserialize(taskModelSchema, task),
		)
	},
}
