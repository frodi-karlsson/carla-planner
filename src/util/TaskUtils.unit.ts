import {type Task, type TaskJsonObj} from '@/types/Task'
import {TimeUnit} from '@/util/TimeUnit'
import {taskUtil} from './TaskUtils'

describe('TaskUtils', () => {
	test('task stays the same after being converted to json and back', () => {
		const task: Task = {
			id: 'test',
			title: 'test',
			description: 'test',
			start: new TimeUnit(1, 30),
			length: new TimeUnit(1, 30),
			color: '#000000',
		}

		const json = taskUtil.toJson([task])
		const tasks = taskUtil.fromJson(json)

		expect(tasks[0]).toEqual(task)
		expect(tasks[0].start).toEqual(task.start)
		expect(tasks[0].length).toEqual(task.length)
		expect(tasks.length).toBe(1)
	})
})
