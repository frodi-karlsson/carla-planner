import React from 'react'
import './MainView.scss'
import {
	IonPage,
} from '@ionic/react'
import CalendarWeek from '@/components/CalendarWeek/CalendarWeek'
import {type useTasks} from '@/hooks/useTasks'

type MainViewProps = {
	taskContext: ReturnType<typeof useTasks>;
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
