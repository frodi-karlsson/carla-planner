import React from 'react'
import './CalendarDay.scss'
import {IonCard} from '@ionic/react'
import CalendarDayTaskArea from './CalendarDayTaskArea'

const CalendarDay: React.FC = () => (
	<div
		className='CalendarDay'
	>
		<div className='CalendarDay__content'>
			<CalendarDayTaskArea />
		</div>
	</div>
)

export default CalendarDay
