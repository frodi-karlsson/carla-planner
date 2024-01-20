import React, {useEffect, useState} from 'react'
import './CalendarDayTaskArea.scss'
import {type Task} from '@/types/Task'
import {TimeUnit} from '@/util/TimeUnit'
import TaskElem from './TaskElem'
import {useDrop} from 'react-dnd'
import {minuteHeight} from '../../util/constants'
import {useStorage} from '@capacitor-community/storage-react'
import {taskUtil} from '../../../../util/TaskUtils'

const CalendarDayTaskArea: React.FC = () => {
	const {set, get} = useStorage()
	const [tasks, _setTasks] = useState<Task[]>([])

	const testTasks: Task[] = [
		{
			id: '1',
			start: new TimeUnit(8, 30),
			length: new TimeUnit(60),
			title: 'Task 1',
			description: 'Task 1 description',
			color: 'rgb(255, 80, 80)',
		},
		{
			id: '2',
			start: new TimeUnit(10, 0),
			length: new TimeUnit(30),
			title: 'Task 2',
			description: 'Task 2 description',
			color: 'rgb(80, 80, 255)',
		},
		{
			id: '3',
			start: new TimeUnit(10, 0),
			length: new TimeUnit(45),
			title: 'Task 3',
			description: 'Task 3 description',
			color: 'rgb(80, 255, 80)',
		},
		{
			id: '4',
			length: new TimeUnit(5),
			start: new TimeUnit(12, 0),
			title: 'Task 4',
			description: 'This is task 4',
			color: 'rgba(255, 255, 80, 0.9)',
		},
	]

	const getDbTasks: () => Promise<Task[]> = async () => {
		const tasks = await get('tasks')
		console.log('tasks in getDbTasks: ', tasks)
		if (tasks) {
			return taskUtil.fromJson(tasks)
		}

		return []
	}

	const setTasks: (tasks: Task[]) => Promise<void> = async (tasks: Task[]) => {
		tasks.sort((a, b) => a.start.minutes - b.start.minutes)
		_setTasks([...tasks])
		await set('tasks', taskUtil.toJson(tasks)).catch(err => {
			console.error(err)
		}).then(() => {
			console.log('tasks saved')
		})
	}

	useEffect(() => {
		let _tasks: Task[] = []

		void getDbTasks().then(async tasks => {
			if (tasks.length > 0) {
				_tasks = tasks
			} else {
				_tasks = testTasks
			}

			console.log('tasks from getDbTasks: ', tasks)
			console.log('final tasks: ', _tasks)

			await setTasks(_tasks)
		}).catch(err => {
			console.error(err)
		})
	}, [])

	const handleTaskDrop = (taskId: string, deltaTimeUnit: TimeUnit) => {
		const task = tasks.find(t => t.id === taskId)
		if (task) {
			task.start = task.start.add(deltaTimeUnit)
			void setTasks([...tasks])
		}
	}

	const [_, drop] = useDrop(() => ({
		accept: 'Task',
		drop(item: Task, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset()?.y

			if (!delta) {
				return
			}

			const deltaTimeUnit = new TimeUnit(0, delta / minuteHeight)
			handleTaskDrop(item.id, deltaTimeUnit)
		},
	}), [tasks])

	const getNumberOfTasksWithSameStart = (task: Task, index: number): number => {
		const {start} = task
		return tasks.filter(t => t.start.minutes === start.minutes).length
	}

	const getNumberOfTasksAfterWithSameStart = (task: Task, index: number): number => {
		const {start} = task
		const tasksAfter = tasks.slice(index + 1)
		return tasksAfter.filter(t => t.start.minutes === start.minutes).length
	}

	return (

		<div className='CalendarDayTaskArea' ref={drop}>
			{tasks.map((task, i) => (
				<TaskElem
					key={task.id}
					task={task}
					widthModifier={getNumberOfTasksWithSameStart(task, i)}
					left={(getNumberOfTasksAfterWithSameStart(task, i) * 100 / getNumberOfTasksWithSameStart(task, i)) + '%'}
					zIndex={i}
				/>
			))}
		</div>
	)
}

export default CalendarDayTaskArea
