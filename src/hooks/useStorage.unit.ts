import {renderHook} from '@testing-library/react'
import {useStorage} from './useStorage'
import {act} from 'react-dom/test-utils'
import {createModelSchema, object, primitive} from 'serializr'

// We use timeouts to wait for the state to be updated
// This is because the state is updated in a useEffect

describe('useStorage', () => {
	const mockStorage: unknown[] = []
	beforeEach(() => {
		mockStorage.forEach(() => mockStorage.pop())
	})

	class NestTestObject {
		constructor(public c: string) {
			this.c = c
		}
	}

	class TestObject {
		constructor(public id?: string, public a?: string, public b?: NestTestObject) {	}
	}

	test('add', () => {
		const obj = new TestObject('test', 'a', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema, t => t?.id ?? ''))
		const {current, add} = result.current
		setTimeout(() => {
			expect(current).toEqual([])
		}, 10)
		act(() => {
			add(obj)
		})
		setTimeout(() => {
			expect(current).toEqual([obj])
		}, 10)
	})

	test('consecutive adds', () => {
		const obj1 = new TestObject('test', 'a', {c: 'c'})
		const obj2 = new TestObject('test2', 'a', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema, t => t?.id ?? ''))
		const {current, add} = result.current
		act(() => {
			add(obj1)
			add(obj2)
		})
		setTimeout(() => {
			expect(current).toEqual([obj1, obj2])
		}, 10)
	})

	test('add and remove', () => {
		const obj = new TestObject('test', 'a', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema, t => t?.id ?? ''))
		const {current, add, remove} = result.current
		act(() => {
			add(obj)
			remove(obj)
		})
		setTimeout(() => {
			expect(current).toEqual([])
		}, 10)
	})

	test('add and update', () => {
		const obj = new TestObject('test', 'a', {c: 'c'})
		const obj2 = new TestObject('test', 'b', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema, t => t?.id ?? ''))
		const {current, add, update} = result.current
		act(() => {
			add(obj)
			update('test', obj2)
		})
		setTimeout(() => {
			expect(current).toEqual([obj2])
		}, 10)
	})

	test('add and update with long delay', () => {
		const obj = new TestObject('test', 'a', {c: 'c'})
		const obj2 = new TestObject('test', 'b', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema, t => t?.id ?? ''))
		const {current, add, update} = result.current
		act(() => {
			add(obj)
		})
		setTimeout(() => {
			act(() => {
				update('test', obj2)
			})
		}, 100)
		setTimeout(() => {
			expect(current).toEqual([obj2])
		}, 200)
	})
})
