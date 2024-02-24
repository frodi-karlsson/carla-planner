import {Task} from '@/models/Task/Task.model'
import {taskUtil} from './TaskUtils'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import {ArrayHolder} from '@/models/ArrayHolder/ArrayHolder.model'
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
		const serialized = taskUtil.toJson(new ArrayHolder([task]))
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
						cancelledFor: [],
					},
				},
			},
		})
		const serialized = taskUtil.toJson(new ArrayHolder([task]))
		const deserialized = taskUtil.fromJson(serialized)
		expect(deserialized).toEqual([task])
	})
})
