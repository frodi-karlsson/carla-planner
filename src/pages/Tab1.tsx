import React from 'react'
import {
	IonPage,
} from '@ionic/react'
import './Tab1.scss'
import CalendarWeek from '@/components/CalendarWeek/CalendarWeek'

const Tab1: React.FC = () => (
	<IonPage className='Tab1'>
		<div className='Tab1__content'>
			{
				<CalendarWeek />
			}
		</div>
	</IonPage>
)

export default Tab1
