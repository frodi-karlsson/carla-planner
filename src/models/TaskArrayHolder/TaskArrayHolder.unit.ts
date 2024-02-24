import {deserialize, serialize} from 'serializr'
import {TaskArrayHolder} from './TaskArrayHolder.model'
import {taskArraySchema} from './TaskArrayHolder.schema'

describe('TaskArrayHolder', () => {
	it('should be able to serialize and deserialize', () => {
		const tasks = new TaskArrayHolder([])
		const serialized: unknown = serialize(taskArraySchema, tasks)
		const deserialized = deserialize(taskArraySchema, serialized)
		expect(deserialized).toEqual(tasks)
	})
})
