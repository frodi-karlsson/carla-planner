import {TimeUnit} from './TimeUnit.model'

describe('TimeUnit', () => {
	test('TimeUnit initialized with hour and minute has correct values', () => {
		const timeUnit = TimeUnit.from({
			minutes: 30,
			hours: 1,
		})
		expect(timeUnit.minutes).toBe(90)
	})

	test('TimeUnit initialized with minutes has correct values', () => {
		const timeUnit = TimeUnit.from({
			minutes: 30,
		})
		expect(timeUnit.minutes).toBe(30)
	})

	test('TimeUnit gets rounded with hour and minute', () => {
		const timeUnit = TimeUnit.from({
			minutes: 63,
			hours: 1,
		})
		expect(timeUnit.minutes).toBe(125)
	})

	test('TimeUnit gets rounded with minutes', () => {
		const timeUnit = TimeUnit.from({
			minutes: 63,
		})
		expect(timeUnit.minutes).toBe(65)
	})

	test('0 minutes with hour and minute not counted as falsy', () => {
		const timeUnit = TimeUnit.from({
			minutes: 0,
			hours: 1,
		})
		expect(timeUnit.minutes).toBe(60)
	})

	test('timeString returns correct value for < 12', () => {
		const timeUnit = TimeUnit.from({
			minutes: 30,
			hours: 1,
		})
		expect(timeUnit.timeString).toBe('1:30')
	})

	test('timeString returns correct value for > 12', () => {
		const timeUnit = TimeUnit.from({
			minutes: 30,
			hours: 13,
		})
		expect(timeUnit.timeString).toBe('13:30')
	})
})
