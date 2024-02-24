import {deserialize, serialize} from 'serializr'
import {Task} from '../Task/Task.model'
import {TimeUnit} from '../TimeUnit/TimeUnit.model'
import {arraySchema} from './ArrayHolder.schema'
import {taskModelSchema} from '../Task/Task.schema'

describe('TaskArrayHolder', () => {
	it('should be able to serialize and deserialize', () => {
		const tasks = [
			Task.from({
				type: 'single',
				fields: {
					id: '1',
					title: 'Task 1',
					description: 'Task 1 description',
					color: 'red',
					startTime: TimeUnit.from({hours: 0, minutes: 0}),
					length: TimeUnit.from({hours: 1, minutes: 0}),
					singleTask: {
						date: '2021-01-01',
						parent: '2',
					},
				},
			}),
			Task.from({
				type: 'recurring',
				fields: {
					id: '2',
					title: 'Task 2',
					description: 'Task 2 description',
					color: 'blue',
					startTime: TimeUnit.from({hours: 0, minutes: 0}),
					length: TimeUnit.from({hours: 1, minutes: 0}),
					recurringTask: {
						recurrence: {
							type: 'daily',
							cancelledFor: [
								{year: 2021, month: 1, day: 1},
							],
						},
					},
				},
			}),
		]
		const serialized: unknown = serialize(arraySchema(taskModelSchema), {array: tasks})
		const deserialized = deserialize(arraySchema(taskModelSchema), serialized).array
		expect(deserialized).toEqual(tasks)
	})
})
