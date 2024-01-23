import {type DragSourceHookSpec, type DropTargetHookSpec} from 'react-dnd'
import {type Task} from '@/models/Task/Task.model'
import {type CalendarDayProps} from '../CalendarDay'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import moment from 'moment'
import {minuteHeight} from './constants'
import {useCallback} from 'react'
import {useTasks} from '@/hooks/useTasks'

type DropTargetUtil = {
	onDrop: NonNullable<DropTargetHookSpec<
	Task,
	void,
	unknown
	>['drop']>;
}

type DragTargetUtil = {
	onDrop: NonNullable<DragSourceHookSpec<
	Task,
	unknown,
	unknown
	>['end']>;
}

const modifyTaskOnDrop = (
	task: Task,
	deltaTimeUnit: TimeUnit,
	dropDay: CalendarDayProps,
	tasks: Task[],
): Task[] => {
	const {year, month, week, day} = dropDay
	const date = moment().year(year).week(week).day(day).toDate()
	if (task.fields.recurringTask) {
		const originalId = task.fields.id
		const [id] = originalId.split('-')

		const newTask: Task = {
			type: 'single',
			fields: {
				id: `${id}-recurred-${date.toISOString()}`,
				title: task.fields.title,
				description: task.fields.description,
				startTime: TimeUnit.from({
					minutes: task.fields.startTime.minutes + deltaTimeUnit.minutes,
				}),
				length: task.fields.length,
				color: task.fields.color,
				singleTask: {
					date: `${year}-${week}-${day}`,
				},
			},
		}

		task.fields.recurringTask.recurrence?.cancelledFor?.push({
			day,
			week,
			month,
			year,
		})

		tasks.push(newTask)
	} else {
		task.fields.startTime = TimeUnit.from({
			minutes: task.fields.startTime.minutes + deltaTimeUnit.minutes,
		})
	}

	return tasks
}

export const dropTarget = (
	calDayProps: CalendarDayProps,
	tasks: Task[],
	setTasks: (tasks: Task[]) => void,
): DropTargetUtil => ({
	onDrop(item, monitor) {
		console.log('onDrop', item)
		const diff = monitor.getDifferenceFromInitialOffset()
		const delta = diff?.y

		if (!delta) {
			return
		}

		const deltaTimeUnit = TimeUnit.from({
			minutes: delta / minuteHeight,
		})

		const newTasks = [...modifyTaskOnDrop(item, deltaTimeUnit, calDayProps, tasks)]
		const taskIndex = newTasks.findIndex(task => task.fields.id === item.fields.id)
		if (taskIndex === -1) {
			return
		}

		newTasks[taskIndex] = item
		console.log('after modifyTaskOnDrop', newTasks[taskIndex])
		setTasks([...tasks])
	},
})

export const dragSource = (): DragTargetUtil => ({
	onDrop(_, monitor) {
		const item = monitor.getItem()
		if (item) {
			console.log(item)
		}
	},
})
