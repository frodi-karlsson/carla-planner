import React, {useCallback, useState} from 'react'
import {type Task} from '@/models/Task/Task.model'
import './TaskElem.scss'
import {minuteHeight} from './util/constants'
import {IonChip, IonHeader, IonIcon, IonModal, IonText, IonTitle} from '@ionic/react'
import {closeOutline} from 'ionicons/icons'
import {useDrag} from 'react-dnd'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import {type CalendarDayProps} from './CalendarDay'
import {useTasks} from '@/hooks/useTasks'
import moment from 'moment'
import {dragSource} from './util/task-dnd'

type TaskElemProps = {
	task: Task;
	widthModifier: number;
	left: string;
	zIndex?: number;
	isDragging?: boolean;
}

const TaskElem: React.FC<TaskElemProps> = ({task, widthModifier, zIndex, left, isDragging}) => {
	const onDrop = useCallback(dragSource().onDrop, [])

	const [_, drag] = useDrag<Task, CalendarDayProps>(() => ({
		type: 'Task',
		item: task,
		end: onDrop?.bind(this),
	}))

	const taskHeight = Math.max((task.fields.length.minutes * minuteHeight), 30 * minuteHeight) + 'px'
	const [showModal, setShowModal] = useState(false)

	const handleModalCloseButtonClick = () => {
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

			<IonModal
				id='Task__modal'
				isOpen={showModal}
				onDidDismiss={() => {
					setShowModal(false)
				}}
				className='Task__modal'
			>
				<IonHeader className='Task__modal__header'>
					<IonTitle className='Task__modal__header__title' color='white'>
						{task.fields.title}
					</IonTitle>
					<IonIcon
						className='Task__modal__header__closeButton'
						onClick={() => {
							handleModalCloseButtonClick()
						}}
						color='white'
						size='large'
						icon={closeOutline}
					/>
				</IonHeader>
				<div className='Task__modal__content' onClick={() => {
					setShowModal(true)
				}}>
					<IonChip className='Task__modal__content__time' color='white'>
						{task.fields.startTime.timeString} - {
							TimeUnit.from({
								minutes: task.fields.startTime.minutes + task.fields.length.minutes,
							}).timeString
						}
					</IonChip>
					<IonText className='Task__modal__content__description' color='white'>
						{task.fields.description}
					</IonText>
				</div>
				<div className='Task__modal__buttons'>
				</div>
			</IonModal>
		</div>

	)
}

export default TaskElem
