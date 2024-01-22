import React from 'react'
import './CalendarDay.scss'
import {IonCard} from '@ionic/react'
import CalendarDayTaskArea from './CalendarDayTaskArea'

type CalendarDayProps = {
	year: number;
	week: number;
	day: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({year, week, day}) => (
	<div
		className='CalendarDay'
	>
		<div className='CalendarDay__content'>
			<CalendarDayTaskArea year={year} week={week} day={day} />
		</div>
	</div>
)

export default CalendarDay
