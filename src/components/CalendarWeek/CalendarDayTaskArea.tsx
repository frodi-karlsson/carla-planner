import React, {useCallback, useEffect, useState} from 'react'
import './CalendarDayTaskArea.scss'
import {Task} from '@/models/Task/Task.model'
import TaskElem from './TaskElem'
import {useDrop} from 'react-dnd'
import {type CalendarDayProps} from './CalendarDay'
import {dropTarget} from './util/task-dnd'
import moment from 'moment'

type CalendarDayTaskAreaProps = CalendarDayProps

const CalendarDayTaskArea: React.FC<CalendarDayTaskAreaProps> = ({year, week, day, taskContext}) => {
	const thisDate = moment().isoWeekYear(year).isoWeek(week).isoWeekday(day)
	const [tasks, setTasks] = useState<Task[]>([])
	const {current, add} = taskContext

	const makeSingleFromRecurring = (task: Task): Task => {
		if (!task.fields.recurringTask) {
			return task
		}

		const {id, title, description, startTime, length, color} = task.fields
		const [year, week, day] = (['isoWeekYear', 'isoWeek', 'isoWeekday'] as const).map(k => thisDate[k]())
		return Task.from({
			type: 'single',
			fields: {
				id: `${id}-${year}-${week}-${day}`,
				title,
				description,
				startTime,
				length,
				color,
				singleTask: {
					date: `${year}-${week}-${day}`,
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
			const taskDate = moment().isoWeekYear(year).isoWeek(week).isoWeekday(day)
			return taskDate.isSame(thisDate, 'day')
		})
		const recurringTasksToday = current.filter(task => {
			const {day} = task.fields.recurringTask?.recurrence ?? {}
			const recurrenceType = task.fields.recurringTask?.recurrence.type
			const cancelledFor = task.fields.recurringTask?.recurrence.cancelledFor
			const isCancelledDaily = cancelledFor?.find(({year, week, month, day}) => {
				let isCancelled = false
				if (year && week && day) {
					const cancelledDate = moment().isoWeekYear(year).isoWeek(week).isoWeekday(day)
					isCancelled = thisDate.isSame(cancelledDate, 'day')
				} else if (year && month && day) {
					const cancelledDate = moment().isoWeekYear(year).month(month).date(day)
					isCancelled = thisDate.isSame(cancelledDate, 'day')
				}

				return isCancelled
			})

			const isCancelledWeekly = cancelledFor?.find(({year, week}) => {
				if (!year || !week) {
					return false
				}

				const cancelledDate = moment().isoWeekYear(year).isoWeek(week)
				return thisDate.isSame(cancelledDate, 'week')
			})

			const isCancelledMonthly = cancelledFor?.find(({year, month}) => {
				if (!year || !month) {
					return false
				}

				const cancelledDate = moment().isoWeekYear(year).month(month)
				return thisDate.isSame(cancelledDate, 'month')
			})

			const isCancelledYearly = cancelledFor?.find(({year}) => {
				if (!year) {
					return false
				}

				const cancelledDate = moment().isoWeekYear(year)
				return thisDate.isSame(cancelledDate, 'year')
			})

			return (recurrenceType === 'daily' && !isCancelledDaily)
						|| (recurrenceType === 'workdaily' && !(thisDate.isoWeekday() > 5 || Boolean(isCancelledDaily)))
						|| (recurrenceType === 'weekly' && !isCancelledWeekly && thisDate.isoWeekday() === (day ? day - 1 : 0))
						|| (recurrenceType === 'monthly' && !isCancelledMonthly && thisDate.date() === (day ? day - 1 : 0))
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
