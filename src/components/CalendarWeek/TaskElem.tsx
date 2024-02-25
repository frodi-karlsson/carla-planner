import React, {useCallback, useState} from 'react'
import {type CancelledForItem, type Task} from '@/models/Task/Task.model'
import './TaskElem.scss'
import {minuteHeight} from './util/constants'
import {IonButton, IonChip, IonText} from '@ionic/react'
import {useDrag} from 'react-dnd'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import {type CalendarDayProps} from './CalendarDay'
import {dragSource} from './util/task-dnd'
import {Modal} from '../Modal/Modal'
import {type TaskContext} from '@/types/TaskContext'
import moment from 'moment'

type TaskElemProps = {
	task: Task;
	widthModifier: number;
	left: string;
	zIndex?: number;
	isDragging?: boolean;
	taskContext: TaskContext;
}

const TaskElem: React.FC<TaskElemProps> = ({task, widthModifier, zIndex, left, taskContext}) => {
	const onDrop = useCallback(dragSource().onDrop, [])

	const [, drag] = useDrag<Task, CalendarDayProps>(() => ({
		type: 'Task',
		item: task,
		end: onDrop?.bind(this),
	}))

	const taskHeight = Math.max((task.fields.length.minutes * minuteHeight), 30 * minuteHeight) + 'px'
	const [showModal, setShowModal] = useState(false)

	const handleModalCloseButtonClick = () => {
		setShowModal(false)
	}

	const saveTask = (task: Task) => {
		taskContext.update(task.fields.id, task)
		setShowModal(false)
	}

	const deleteTask = (task: Task) => {
		if (task.fields.singleTask?.parent) {
			const [year, week, day] = task.fields.singleTask?.date.split('-').map(Number) ?? []
			const parentId = task.fields.singleTask.parent
			const parent = taskContext.get(parentId)
			if (parent) {
				const cancelledFor: CancelledForItem = {
					year,
					week,
					day,
				}
				parent.fields.recurringTask?.recurrence?.cancelledFor.push(cancelledFor)
				taskContext.update(parentId, parent)
			}
		}

		taskContext.remove(task)

		setShowModal(false)
	}

	return (
		<div
			ref={drag}
			className='Task'
			style={{
				backgroundColor: task.fields.color,
				height: taskHeight,
				width: `calc(${100 / widthModifier}% - 2px)`,
				top: task.fields.startTime.minutes * minuteHeight,
				left,
				zIndex,
			}}
		>
			<div className='Task__small' onClick={() => {
				setShowModal(true)
			}}>
				<div className='Task__small__title'>
					{task.fields.title}
				</div>

				<div className='Task__small__time'>
					{task.fields.startTime.timeString} - {
						TimeUnit.from({
							minutes: task.fields.startTime.minutes + task.fields.length.minutes,
						}).timeString
					}

				</div>
				{task.fields.description && Number(taskHeight.split('px')[0]) / minuteHeight > 30 && widthModifier <= 1
				&& <div className='Task__small__description'>
					{task.fields.description}
				</div>}
			</div>

			<Modal
				isOpen={showModal}
				title={task.fields.title}
				onClose={handleModalCloseButtonClick}
			>
				<IonChip className='Task__modal__time' color='white'>
					{task.fields.startTime.timeString} - {
						TimeUnit.from({
							minutes: task.fields.startTime.minutes + task.fields.length.minutes,
						}).timeString
					}
				</IonChip>
				<IonText className='Task__modal__description' color='white'>
					{task.fields.description}
				</IonText>
				<div className='Task__modal__buttons'>
					<IonButton color='dark' onClick={() => {
						saveTask(task)
					}}>Save</IonButton>
					<IonButton color='dark' onClick={() => {
						deleteTask(task)
					}}>Delete</IonButton>
				</div>
			</Modal>

			<div onClick={() => {
				setShowModal(true)
			}}>
				<IonChip className='Task__small__time' color='white'>
					{task.fields.startTime.timeString} - {
						TimeUnit.from({
							minutes: task.fields.startTime.minutes + task.fields.length.minutes,
						}).timeString
					}
				</IonChip>
				<IonText className='Task__small__description' color='white'>
					{task.fields.description}
				</IonText>
			</div>
		</div>

	)
}

export default TaskElem
