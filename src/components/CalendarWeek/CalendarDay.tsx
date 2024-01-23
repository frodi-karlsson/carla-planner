import React from 'react'
import './CalendarDay.scss'
import CalendarDayTaskArea from './CalendarDayTaskArea'

export type CalendarDayProps = {
	year: number;
	month: number;
	week: number;
	day: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({year, month, week, day}) => (
	<div
		className='CalendarDay'
	>
		<div className='CalendarDay__content'>
			<CalendarDayTaskArea year={year} month={month} week={week} day={day} />
		</div>
	</div>
)

export default CalendarDay
