import React, {useState} from 'react'
import './CalendarDayTaskArea.scss'
import {type Task} from '@/types/Task'
import {TimeUnit} from '@/util/TimeUnit'
import TaskElem from './components/TaskElem'

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
	const [tasks, setTasks] = useState(testTasks)

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
		<div className='CalendarDayTaskArea'>
			{tasks.map((task, i) => (
				<TaskElem
					key={task.id}
					task={task}
					widthModifier={getNumberOfTasksWithSameStart(task, i)}
					left={(getNumberOfTasksAfterWithSameStart(task, i) * 100 / getNumberOfTasksWithSameStart(task, i)) + '%'}
					zIndex={10 + getNumberOfTasksAfterWithSameStart(task, i)}
				/>
			))}
		</div>
	)
}

export default CalendarDayTaskArea
