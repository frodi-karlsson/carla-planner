import React, {useState} from 'react'
import {type Task} from '@/types/Task'
import './TaskElem.scss'
import {minuteHeight} from '../constants'
import {IonChip, IonHeader, IonIcon, IonModal, IonText, IonTitle} from '@ionic/react'
import {closeOutline} from 'ionicons/icons'
import {useDrag} from 'react-dnd'
import {type TimeUnit} from '@/util/TimeUnit'

type TaskElemProps = {
	task: Task;
	widthModifier: number;
	left: string;
	zIndex?: number;
	isDragging?: boolean;
}

const TaskElem: React.FC<TaskElemProps> = ({task, widthModifier, zIndex, left, isDragging}) => {
	const [_, drag] = useDrag(() => ({
		type: 'Task',
		item: task,
	}))

	const taskHeight = Math.max((task.length.minutes * minuteHeight), 30 * minuteHeight) + 'px'
	const [showModal, setShowModal] = useState(false)

	const handleModalCloseButtonClick = () => {
		setShowModal(false)
	}

	return (
		<div
			ref={drag}
			className='Task'
			style={{
				backgroundColor: task.color,
				height: taskHeight,
				width: `calc(${100 / widthModifier}% - 2px)`,
				top: task.start.minutes * minuteHeight,
				left,
				zIndex,
			}}
		>
			<div className='Task__small' onClick={() => {
				setShowModal(true)
			}}>
				<div className='Task__small__title'>
					{task.title}
				</div>

				<div className='Task__small__time'>
					{task.start.timeString} - {(task.start.add(task.length)).timeString}
				</div>
				{task.description && Number(taskHeight.split('px')[0]) / minuteHeight > 30 && widthModifier <= 1
				&& <div className='Task__small__description'>
					{task.description}
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
						{task.title}
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
						{task.start.timeString} - {(task.start.add(task.length)).timeString}
					</IonChip>
					<IonText className='Task__modal__content__description' color='white'>
						{task.description}
					</IonText>
				</div>
				<div className='Task__modal__buttons'>
				</div>
			</IonModal>
		</div>

	)
}

export default TaskElem
