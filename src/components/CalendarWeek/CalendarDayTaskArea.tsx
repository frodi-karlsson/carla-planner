import React, {useCallback, useEffect, useState} from 'react'
import './CalendarDayTaskArea.scss'
import {Task} from '@/models/Task/Task.model'
import TaskElem from './TaskElem'
import {useDrop} from 'react-dnd'
import {type CalendarDayProps} from './CalendarDay'
import {dropTarget} from './util/task-dnd'

type CalendarDayTaskAreaProps = CalendarDayProps

const CalendarDayTaskArea: React.FC<CalendarDayTaskAreaProps> = ({year, month, week, day, taskContext}) => {
	const thisYear = year
	const thisMonth = month
	const thisWeek = week
	const thisDay = day

	const [tasks, setTasks] = useState<Task[]>([])
	const {current, add} = taskContext

	const makeSingleFromRecurring = (task: Task): Task => {
		if (!task.fields.recurringTask) {
			return task
		}

		const {id, title, description, startTime, length, color} = task.fields
		return Task.from({
			type: 'single',
			fields: {
				id: id + thisYear + thisMonth + thisDay,
				title,
				description,
				startTime,
				length,
				color,
				singleTask: {
					date: `${thisYear}-${thisMonth}-${thisDay}`,
					parent: task.fields.id,
				},
			},
		})
	}

	useEffect(() => {
		const singleTasksToday = current.filter(task => {
			const date = task.fields.singleTask?.date
			if (!date) {
				return false
			}

			const [year, week, day] = date.split('-').map(Number)
			return year === thisYear && week === thisWeek && day === thisDay
		})
		const recurringTasksToday = current.filter(task => {
			const recurrenceType = task.fields.recurringTask?.recurrence.type
			const cancelledFor = task.fields.recurringTask?.recurrence.cancelledFor
			const isCancelledDaily = cancelledFor?.find(({year, month, day}) =>
				thisYear === year && thisMonth === month && thisDay === day,
			)

			const isCancelledWeekly = cancelledFor?.find(({year, week}) =>
				thisYear === year && thisWeek === week,
			)

			const isCancelledMonthly = cancelledFor?.find(({year, month}) =>
				thisYear === year && thisMonth === month,
			)

			const isCancelledYearly = cancelledFor?.find(({year}) =>
				thisYear === year,
			)

			return (recurrenceType === 'daily' && !isCancelledDaily)
						|| (recurrenceType === 'workdaily' && !(thisDay > 5 || Boolean(isCancelledDaily)))
						|| (recurrenceType === 'weekly' && !isCancelledWeekly)
						|| (recurrenceType === 'monthly' && !isCancelledMonthly)
						|| (recurrenceType === 'yearly' && !isCancelledYearly)
		})

		const recurringToSingle = recurringTasksToday.filter(task =>
			!singleTasksToday.find(({fields}) => fields.singleTask?.parent === task.fields.id),
		).map(makeSingleFromRecurring)

		if (recurringToSingle.length) {
			recurringToSingle.forEach(async task => {
				add(task)
			})
		}

		const newTasks = singleTasksToday.concat(recurringToSingle)
		setTasks(newTasks)
	}, [current])

	const onDrop = useCallback(dropTarget(taskContext).onDrop, [tasks])
	const [, drop] = useDrop<Task, void>(() => ({
		accept: 'Task',
		drop: onDrop?.bind(this),
	}), [tasks])

	const getNumberOfTasksWithSamestartTime = (task: Task): number => {
		const {startTime} = task.fields
		return tasks.filter(t => t.fields.startTime.minutes === startTime.minutes).length ?? 0
	}

	const getNumberOfTasksAfterWithSamestartTime = (task: Task, index: number): number => {
		const {startTime} = task.fields
		const tasksAfter = tasks.slice(index + 1)
		return tasksAfter.filter(t => t.fields.startTime.minutes === startTime.minutes).length ?? 0
	}

	return (
		<div className='CalendarDayTaskArea' ref={drop}>
			{tasks.map((task, i) => (
				<TaskElem
					key={task.fields.id}
					task={task}
					widthModifier={getNumberOfTasksWithSamestartTime(task)}
					left={(getNumberOfTasksAfterWithSamestartTime(task, i) * 100 / getNumberOfTasksWithSamestartTime(task)) + '%'}
					zIndex={i}
					taskContext={taskContext}
				/>
			))}
		</div>
	)
}

export default CalendarDayTaskArea
