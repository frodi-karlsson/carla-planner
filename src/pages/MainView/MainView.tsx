import React from 'react'
import './MainView.scss'
import {
	IonPage,
} from '@ionic/react'
import CalendarWeek from '@/components/CalendarWeek/CalendarWeek'

const MainView: React.FC = () => (
	<IonPage className='MainView'>
		<div className='MainView__content'>
			{
				<CalendarWeek />
			}
		</div>
	</IonPage>
)

export default MainView
