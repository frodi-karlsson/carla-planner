import React, {useEffect} from 'react'
import './CalendarWeek.scss'
import {IonTitle} from '@ionic/react'
import CalendarDay from './components/CalendarDay/CalendarDay'

const CalendarWeek: React.FC = () => {
	let timeOut: NodeJS.Timeout | undefined
	const scrollTo = (element: HTMLElement) => {
		element.scrollIntoView()
	}

	useEffect(() => {
		timeOut = setTimeout(() => {
			const morningHour = 8
			const ticks = document.getElementsByClassName('CalendarWeek__content__timeTicks__tick')
			const tick = ticks?.[morningHour - 1] as HTMLElement | undefined
			if (tick) {
				scrollTo(tick)
			}
		})
		return () => {
			if (timeOut) {
				clearTimeout(timeOut)
			}
		}
	}, [])

	const timeTicks = []
	const getTimeString = (hour: number): string => {
		let hourString = hour.toString()
		if (hourString.length === 1) {
			hourString = '0' + hourString
		}

		return hourString
	}

	for (let i = 0; i < 24; i++) {
		timeTicks.push(
			<div key={i} className='CalendarWeek__content__timeTicks__tick'>
				<p style={{
					color: 'var(--tickPrimary)',
				}}>
					{getTimeString(i)}:00
				</p>
			</div>,
		)
	}

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	return (
		<div className='CalendarWeek'>
			<div className='CalendarWeek__content'>
				<div className='CalendarWeek__content__timeTicks'>
					{timeTicks}
				</div>
				<div className='CalendarWeek__content__days'>
					<div className='CalendarWeek__content__days__grid' />
					<div className='CalendarWeek__content__days__titles'>
						{
							days.map(day => (
								<div className='CalendarWeek__content__days__titles__day' key={day}>
									<p>{day}</p>
									<div className='CalendarWeek__content__days__titles__day__lines' />
								</div>
							))
						}
					</div>
					<div className='CalendarWeek__content__days__list'>
						{
							days.map((day, index) => (
								<div key={index} className='CalendarWeek__content__days__list__day'>
									<CalendarDay />
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalendarWeek
