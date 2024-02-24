import {useTasks} from './useTasks'
import {act, renderHook} from '@testing-library/react-hooks'
import {Task} from '@/models/Task/Task.model'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'

describe('useTasks', () => {
	test('useTasks initializes correctly', async () => {
		const {result} = renderHook(() => useTasks())
		const [tasks] = result.current
		expect(tasks).toEqual([])
	})

	test('useTasks sets tasks correctly', async () => {
		const {result} = renderHook(() => useTasks())
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
		const [tasks, taskStorage, waitUntilLoaded] = result.current
		await waitUntilLoaded()
		act(() => {
			taskStorage.addTask(task)
		})
		setTimeout(() => {
			expect(tasks[0].fields.id).toBe('test')
		}, 10)
	})
})
