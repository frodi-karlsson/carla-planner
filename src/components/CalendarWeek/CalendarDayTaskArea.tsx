import React, {useCallback, useMemo} from 'react'
import './CalendarDayTaskArea.scss'
import {type Task} from '@/models/Task/Task.model'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import TaskElem from './TaskElem'
import {useDrop} from 'react-dnd'
import {useTasks} from '@/hooks/useTasks'
import moment from 'moment'
import {type CalendarDayProps} from './CalendarDay'
import {dropTarget} from './util/task-dnd'

type CalendarDayTaskAreaProps = CalendarDayProps

const CalendarDayTaskArea: React.FC<CalendarDayTaskAreaProps> = ({year, month, week, day}) => {
	const date = useMemo(() => moment().year(year).week(week).day(day).toDate(), [year, week, day])
	const thisYear = year
	const thisMonth = month
	const thisWeek = week
	const thisDay = day

	const [dbTasks, setTasks] = useTasks()
	const tasks = useMemo(() => dbTasks?.filter(task => {
		function handleSingle(task: Task): boolean {
			const date = task.fields.singleTask?.date
			if (!date) {
				return false
			}

			const [year, week, day] = date.split('-').map(Number)
			if (year !== thisYear || week !== thisWeek || day !== thisDay) {
				return false
			}

			return true
		}

		function handleRecurring(task: Task): boolean {
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

			if (recurrenceType === 'daily') {
				if (isCancelledDaily) {
					return false
				}

				return true
			}

			if (recurrenceType === 'workdaily' && thisDay !== 6 && thisDay !== 7) {
				if (isCancelledDaily) {
					return false
				}

				return true
			}

			if (recurrenceType === 'weekly' && thisDay === task.fields.recurringTask?.recurrence.day) {
				if (isCancelledWeekly) {
					return false
				}

				return true
			}

			const currentMonth = date.getMonth()
			if (recurrenceType === 'monthly' && currentMonth === date.getMonth()) {
				if (isCancelledMonthly) {
					return false
				}

				return true
			}

			const currentYear = date.getFullYear()
			if (recurrenceType === 'yearly' && currentYear === date.getFullYear()) {
				if (isCancelledYearly) {
					return false
				}

				return true
			}

			return false
		}

		if (task.fields.recurringTask) {
			return handleRecurring(task)
		}

		return handleSingle(task)
	}), [dbTasks, date])

	const onDrop = useCallback(dropTarget({day, month, week, year}, dbTasks, setTasks).onDrop, [tasks])
	const [_, drop] = useDrop<Task, void>(() => ({
		accept: 'Task',
		drop: onDrop?.bind(this),
	}), [tasks])

	const getNumberOfTasksWithSamestartTime = (task: Task, index: number): number => {
		const {startTime} = task.fields
		return tasks?.filter(t => t.fields.startTime.minutes === startTime.minutes).length ?? 0
	}

	const getNumberOfTasksAfterWithSamestartTime = (task: Task, index: number): number => {
		const {startTime} = task.fields
		const tasksAfter = tasks?.slice(index + 1)
		return tasksAfter?.filter(t => t.fields.startTime.minutes === startTime.minutes).length ?? 0
	}

	return (

		<div className='CalendarDayTaskArea' ref={drop}>
			{tasks?.map((task, i) => (
				<TaskElem
					key={task.fields.id}
					task={task}
					widthModifier={getNumberOfTasksWithSamestartTime(task, i)}
					left={(getNumberOfTasksAfterWithSamestartTime(task, i) * 100 / getNumberOfTasksWithSamestartTime(task, i)) + '%'}
					zIndex={i}
				/>
			))}
		</div>
	)
}

export default CalendarDayTaskArea
