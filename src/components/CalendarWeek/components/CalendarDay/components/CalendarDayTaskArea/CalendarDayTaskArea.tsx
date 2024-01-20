import React, {useState} from 'react'
import './CalendarDayTaskArea.scss'
import {type Task} from '@/types/Task'
import {TimeUnit} from '@/util/TimeUnit'
import TaskElem from './components/TaskElem'
import {useDrop} from 'react-dnd'
import {minuteHeight} from './constants'

const CalendarDayTaskArea: React.FC = () => {
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
	const [tasks, _setTasks] = useState(testTasks)

	const setTasks = (tasks: Task[]) => {
		tasks.sort((a, b) => a.start.minutes - b.start.minutes)
		_setTasks([...tasks])
	}

	const handleTaskDrop = (taskId: string, deltaTimeUnit: TimeUnit) => {
		const task = tasks.find(t => t.id === taskId)
		if (task) {
			task.start = task.start.add(deltaTimeUnit)
			setTasks([...tasks])
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
	}))

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
