import {recurrence, recurringTask, Task, TaskFields} from '@/models/Task/Task.types'
import {taskUtil} from './TaskUtils'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.types'
describe('TaskUtils', () => {
	test('serialize and deserialize single', () => {
		const task: Task = Task.from({
			type: 'single',
			fields: {
				id: 'test',
				title: 'test',
				description: 'test',
				startTime: TimeUnit.from({
					hours: 1,
					minutes: 30,
				}),
				length: TimeUnit.from({
					hours: 1,
					minutes: 30,
				}),
				color: '#000000',
				singleTask: {
					date: '2021-01-01',
				},
			},
		})
		const serialized = taskUtil.toJson([task])
		const deserialized = taskUtil.fromJson(serialized)
		expect(deserialized).toEqual([task])
	})

	test('serialize and deserialize recurring', () => {
		const task: Task = Task.from({
			type: 'recurring',
			fields: {
				id: 'test',
				title: 'test',
				description: 'test',
				startTime: TimeUnit.from({
					minutes: 30,
				}),
				length: TimeUnit.from({
					hours: 1,
					minutes: 30,
				}),
				color: '#000000',
				recurringTask: {
					recurrence: {
						type: 'weekly',
						day: 1,
					},
				},
			},
		})
		const serialized = taskUtil.toJson([task])
		const deserialized = taskUtil.fromJson(serialized)
		expect(deserialized).toEqual([task])
	})

	test('serialize and deserialize override', () => {
		const task: Task = Task.from({
			type: 'override',
			fields: {
				id: 'test',
				title: 'test',
				description: 'test',
				startTime: TimeUnit.from({
					minutes: 30,
				}),
				length: TimeUnit.from({
					hours: 1,
					minutes: 30,
				}),
				color: '#000000',
				overrideTask: {
					reOccuringTaskId: 'test',
				},
			},
		})
		const serialized = taskUtil.toJson([task])
		const deserialized = taskUtil.fromJson(serialized)
		expect(deserialized).toEqual([task])
	})
})
