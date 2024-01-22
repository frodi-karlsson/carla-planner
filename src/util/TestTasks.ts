import {Task, TaskFields, Recurrence, RecurringTask, SingleTask, OverrideTask} from '@/models/Task/Task.types'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.types'

export const testTasks: Task[] = [
	Task.from({
		type: 'recurring',
		fields: {
			id: '1',
			title: 'Eat breakfast',
			description: 'This is a recurring task for every day',
			startTime: TimeUnit.from({
				hours: 7,
				minutes: 0,
			}),
			length: TimeUnit.from({
				hours: 0,
				minutes: 30,
			}),
			color: 'rgb(255, 80, 80)',
			recurringTask: {
				recurrence: {
					type: 'daily',
				},
			},
		},
	}),
	Task.from({
		type: 'recurring',
		fields: {
			id: '2',
			title: 'Standup',
			description: 'This is a recurring task for every work day',
			startTime: TimeUnit.from({
				hours: 10,
				minutes: 0,
			}),
			length: TimeUnit.from({
				hours: 0,
				minutes: 15,
			}),
			color: 'rgb(255, 80, 80)',
			recurringTask: {
				recurrence: {
					type: 'workdaily',
				},
			},
		},
	}),
	Task.from({
		type: 'recurring',
		fields: {
			id: '3',
			title: 'Go to the gym',
			description: 'This is a recurring task for every week',
			startTime: TimeUnit.from({
				hours: 17,
				minutes: 0,
			}),
			length: TimeUnit.from({
				hours: 1,
				minutes: 0,
			}),
			color: 'rgb(255, 80, 80)',
			recurringTask: {
				recurrence: {
					type: 'weekly',
					day: 5,
				},
			},
		},
	}),
	Task.from({
		type: 'single',
		fields: {
			id: '4',
			title: 'Go to the dentist',
			description: 'This is a single task',
			startTime: TimeUnit.from({
				hours: 12,
				minutes: 0,
			}),
			length: TimeUnit.from({
				hours: 1,
				minutes: 0,
			}),
			color: 'rgb(255, 80, 80)',
			singleTask: {
				date: `${2021}-${1}-${1}`,
			},
		},
	}),
	Task.from({
		type: 'override',
		fields: {
			id: '5',
			title: 'Skip breakfast',
			description: 'This is an override task',
			startTime: TimeUnit.from({
				hours: 7,
				minutes: 0,
			}),
			length: TimeUnit.from({
				hours: 0,
				minutes: 0,
			}),
			color: 'rgb(255, 80, 80)',
			overrideTask: {
				reOccuringTaskId: '1',
			},
		},
	}),
]
