import React, {useMemo} from 'react'
import './CalendarDayTaskArea.scss'
import {type Task} from '@/models/Task/Task.types'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.types'
import TaskElem from './TaskElem'
import {useDrop} from 'react-dnd'
import {minuteHeight} from './util/constants'
import {useTasks} from '@/hooks/useTasks'
import moment from 'moment'

type CalendarDayTaskAreaProps = {
	year: number;
	week: number;
	day: number;
}

const CalendarDayTaskArea: React.FC<CalendarDayTaskAreaProps> = ({year, week, day}) => {
	const date = useMemo(() => moment().year(year).week(week).day(day).toDate(), [year, week, day])
	console.log('week', week, 'day', day, 'date', date)
	const [dbTasks, setDbTasks] = useTasks()
	const tasks = useMemo(() => dbTasks?.filter(task => {
		function handleSingle(task: Task): boolean {
			const taskStartTime = task.fields.startTime
			const taskEndTime = TimeUnit.from({
				minutes: taskStartTime.minutes + task.fields.length.minutes,
			})

			const dateStartTime = TimeUnit.from({
				hours: date.getHours(),
				minutes: date.getMinutes(),
			})

			const dateEndTime = TimeUnit.from({
				hours: date.getHours(),
				minutes: date.getMinutes(),
			})

			if (taskStartTime.minutes <= dateStartTime.minutes && taskEndTime.minutes >= dateEndTime.minutes) {
				return true
			}

			return false
		}

		const handleOverriding = (task: Task): boolean => {
			const taskStartTime = task.fields.startTime
			const taskEndTime = TimeUnit.from({
				minutes: taskStartTime.minutes + task.fields.length.minutes,
			})

			const dateStartTime = TimeUnit.from({
				hours: date.getHours(),
				minutes: date.getMinutes(),
			})

			const dateEndTime = TimeUnit.from({
				hours: date.getHours(),
				minutes: date.getMinutes(),
			})

			if (taskStartTime.minutes <= dateStartTime.minutes && taskEndTime.minutes >= dateEndTime.minutes) {
				return true
			}

			return false
		}

		function handleRecurring(task: Task): boolean {
			const recurrenceType = task.fields.recurringTask?.recurrence.type

			if (recurrenceType === 'daily') {
				return true
			}

			const currentDay = date.getDay()
			if (recurrenceType === 'workdaily' && currentDay !== 6 && currentDay !== 7) {
				return true
			}

			if (recurrenceType === 'weekly' && currentDay === task.fields.recurringTask?.recurrence.day) {
				return true
			}

			const currentMonth = date.getMonth()
			if (recurrenceType === 'monthly' && currentMonth === date.getMonth()) {
				return true
			}

			const currentYear = date.getFullYear()
			if (recurrenceType === 'yearly' && currentYear === date.getFullYear()) {
				return true
			}

			if (dbTasks.find(t => t.fields.overrideTask?.reOccuringTaskId === task.fields.id)) {
				if (handleOverriding(task)) {
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

	const setTasks = (tasks: Task[]) => {
		const dbTasksCopy = [...dbTasks ?? []]
		tasks.forEach(task => {
			const {id} = task.fields
			const index = dbTasksCopy.findIndex(t => t.fields.id === id)
			if (index === -1) {
				return
			}

			dbTasksCopy[index] = task
		})
		setDbTasks(dbTasksCopy)
	}

	const handleTaskDrop = (taskId: string, deltaTimeUnit: TimeUnit) => {
		const task: Task | undefined = tasks?.find(t => t.fields.id === taskId)
		if (task) {
			task.fields.startTime = TimeUnit.from({
				minutes: task.fields.startTime.minutes + deltaTimeUnit.minutes,
			})
			if (task.fields.recurringTask) {
				const originalId = task.fields.id
				task.fields.id = `${originalId}-override-${date.getTime()}`
				task.fields.overrideTask = {
					reOccuringTaskId: originalId,
				}
			}

			setTasks([...tasks ?? []])
		}
	}

	const [_, drop] = useDrop(() => ({
		accept: 'Task',
		drop(item: Task, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset()?.y

			if (!delta) {
				return
			}

			const deltaTimeUnit = TimeUnit.from({
				minutes: delta / minuteHeight,
			})
			handleTaskDrop(item.fields.id, deltaTimeUnit)
		},
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
