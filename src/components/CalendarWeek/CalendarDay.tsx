import React from 'react'
import './CalendarDay.scss'
import CalendarDayTaskArea from './CalendarDayTaskArea'
import {type useTasks} from '@/hooks/useTasks'

export type CalendarDayProps = {
	year: number;
	month: number;
	week: number;
	day: number;
	taskContext: ReturnType<typeof useTasks>;
}

const CalendarDay: React.FC<CalendarDayProps> = ({year, month, week, day, taskContext}) => (
	<div
		className='CalendarDay'
	>
		<div className='CalendarDay__content'>
			<CalendarDayTaskArea taskContext={taskContext} year={year} month={month} week={week} day={day} />
		</div>
	</div>
)

export default CalendarDay
