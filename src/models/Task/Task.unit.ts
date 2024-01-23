import {TimeUnit} from '../TimeUnit/TimeUnit.model'
import {Task} from './Task.model'

describe('Task', () => {
	test('Single task initializes correctly', () => {
		const task = Task.from({
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
		expect(task.fields.singleTask?.date).toBe('2021-01-01')
	})

	test('Task with no type specific fields throws error', () => {
		expect(() => {
			const task = Task.from({
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
				},
			})
		}).toThrow('Task must have type specific fields')
	})
})
