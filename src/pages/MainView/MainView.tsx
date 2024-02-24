import React from 'react'
import './MainView.scss'
import {
	IonPage,
} from '@ionic/react'
import CalendarWeek from '@/components/CalendarWeek/CalendarWeek'
import {type TaskContext} from '@/types/TaskContext'

type MainViewProps = {
	taskContext: TaskContext;
}

const MainView: React.FC<MainViewProps> = ({taskContext}) => (
	<IonPage className='MainView'>
		<div className='MainView__content'>
			{
				<CalendarWeek taskContext={taskContext}/>
			}
		</div>
	</IonPage>
)

export default MainView
