import React from 'react'
import {TimeUnit} from './TimeUnit'

describe('TimeUnit', () => {
	test('TimeUnit initialized with hour and minute has correct values', () => {
		const timeUnit = new TimeUnit(1, 30)
		expect(timeUnit.minutes).toBe(90)
	})

	test('TimeUnit initialized with minutes has correct values', () => {
		const timeUnit = new TimeUnit(65)
		expect(timeUnit.minutes).toBe(65)
	})

	test('TimeUnit gets rounded with hour and minute', () => {
		const timeUnit = new TimeUnit(1, 32)
		expect(timeUnit.minutes).toBe(90)
	})

	test('TimeUnit gets rounded with minutes', () => {
		const timeUnit = new TimeUnit(63)
		expect(timeUnit.minutes).toBe(65)
	})

	test('0 minutes with hour and minute not counted as falsy', () => {
		const timeUnit = new TimeUnit(10, 0)
		expect(timeUnit.minutes).toBe(600)
	})
})
